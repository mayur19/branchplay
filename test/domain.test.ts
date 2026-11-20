import { describe, expect, it } from "vitest";
import { choose, startStory, validateGraph, type StoryGraph } from "../src/domain.js";

const graph: StoryGraph = {
  defaults: { hasTicket: false },
  nodes: [
    { id: "start", type: "START", title: "Platform", body: "", choices: [{ id: "board", label: "Board", destinationId: "car", effects: [{ key: "hasTicket", value: true }] }] },
    { id: "car", type: "SCENE", title: "Carriage", body: "", choices: [{ id: "show", label: "Show ticket", destinationId: "end", condition: { key: "hasTicket", equals: true } }] },
    { id: "end", type: "ENDING", title: "Halcyon", body: "", choices: [] }
  ]
};

describe("story runtime", () => {
  it("validates and advances deterministic state", () => {
    expect(validateGraph(graph)).toEqual([]);
    const started = startStory(graph);
    const next = choose(graph, started, "board", "request-1");
    expect(next.currentNodeId).toBe("car");
    expect(next.variables.hasTicket).toBe(true);
  });

  it("is idempotent for a repeated request", () => {
    const started = startStory(graph);
    const once = choose(graph, started, "board", "request-1");
    expect(choose(graph, once, "show", "request-1")).toEqual(once);
  });

  it("reports unreachable scenes", () => {
    const invalid = structuredClone(graph);
    invalid.nodes.push({ id: "lost", type: "ENDING", title: "Lost", body: "", choices: [] });
    expect(validateGraph(invalid)).toContainEqual(expect.objectContaining({ code: "UNREACHABLE", nodeId: "lost" }));
  });
});


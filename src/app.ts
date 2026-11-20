import express from "express";
import { z } from "zod";
import { validateGraph, type StoryGraph } from "./domain.js";

const graphs = new Map<string, StoryGraph>();
const graphInput = z.object({
  nodes: z.array(z.object({
    id: z.string().min(1),
    type: z.enum(["START", "SCENE", "ENDING", "REDIRECT"]),
    title: z.string(),
    body: z.string(),
    choices: z.array(z.object({
      id: z.string(), label: z.string(), destinationId: z.string(),
      condition: z.object({ key: z.string(), equals: z.boolean() }).optional(),
      effects: z.array(z.object({ key: z.string(), value: z.boolean() })).optional()
    }))
  })),
  defaults: z.record(z.string(), z.boolean())
});

export function createApp() {
  const app = express();
  app.use(express.json({ limit: "512kb" }));
  app.use(express.static("public"));
  app.get("/api/health", (_request, response) => response.json({ status: "ok" }));
  app.post("/api/stories/:id/validate", (request, response) => {
    const parsed = graphInput.safeParse(request.body);
    if (!parsed.success) return response.status(422).json({ error: "VALIDATION_FAILED", details: parsed.error.issues });
    graphs.set(request.params.id, parsed.data);
    const issues = validateGraph(parsed.data);
    return response.json({ data: { valid: !issues.some((issue) => issue.blocking), issues } });
  });
  return app;
}


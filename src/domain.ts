export type NodeType = "START" | "SCENE" | "ENDING" | "REDIRECT";
export interface Choice { id: string; label: string; destinationId: string; condition?: { key: string; equals: boolean }; effects?: { key: string; value: boolean }[] }
export interface StoryNode { id: string; type: NodeType; title: string; body: string; choices: Choice[] }
export interface StoryGraph { nodes: StoryNode[]; defaults: Record<string, boolean> }
export interface ValidationIssue { code: string; nodeId?: string; blocking: boolean; message: string }

export function validateGraph(graph: StoryGraph): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const byId = new Map(graph.nodes.map((node) => [node.id, node]));
  const starts = graph.nodes.filter((node) => node.type === "START");
  if (starts.length !== 1) issues.push({ code: "START_COUNT", blocking: true, message: "A release needs exactly one start node." });
  for (const node of graph.nodes) {
    if (node.type !== "ENDING" && node.type !== "REDIRECT" && node.choices.length === 0) {
      issues.push({ code: "DEAD_END", nodeId: node.id, blocking: true, message: "A non-ending scene has no choices." });
    }
    for (const choice of node.choices) {
      if (!byId.has(choice.destinationId)) issues.push({ code: "DANGLING_CHOICE", nodeId: node.id, blocking: true, message: "A choice has no destination." });
      if (choice.condition && !(choice.condition.key in graph.defaults)) issues.push({ code: "UNKNOWN_VARIABLE", nodeId: node.id, blocking: true, message: "A choice references an unknown variable." });
    }
  }
  if (starts.length === 1) {
    const visited = new Set<string>();
    const queue = [starts[0]!.id];
    while (queue.length) {
      const id = queue.shift()!;
      if (visited.has(id)) continue;
      visited.add(id);
      for (const choice of byId.get(id)?.choices ?? []) queue.push(choice.destinationId);
    }
    graph.nodes.filter((node) => !visited.has(node.id)).forEach((node) => issues.push({ code: "UNREACHABLE", nodeId: node.id, blocking: true, message: "The scene is unreachable." }));
  }
  return issues;
}

export interface PlayState { currentNodeId: string; variables: Record<string, boolean>; visited: string[]; appliedRequestIds: string[] }

export function startStory(graph: StoryGraph): PlayState {
  const issues = validateGraph(graph).filter((issue) => issue.blocking);
  if (issues.length) throw new Error("INVALID_GRAPH");
  const start = graph.nodes.find((node) => node.type === "START")!;
  return { currentNodeId: start.id, variables: structuredClone(graph.defaults), visited: [start.id], appliedRequestIds: [] };
}

export function choose(graph: StoryGraph, state: PlayState, choiceId: string, requestId: string): PlayState {
  if (state.appliedRequestIds.includes(requestId)) return structuredClone(state);
  const node = graph.nodes.find((candidate) => candidate.id === state.currentNodeId);
  const choice = node?.choices.find((candidate) => candidate.id === choiceId);
  if (!choice) throw new Error("CHOICE_NOT_AVAILABLE");
  if (choice.condition && state.variables[choice.condition.key] !== choice.condition.equals) throw new Error("CHOICE_NOT_AVAILABLE");
  const next = structuredClone(state);
  for (const effect of choice.effects ?? []) next.variables[effect.key] = effect.value;
  next.currentNodeId = choice.destinationId;
  next.visited.push(choice.destinationId);
  next.appliedRequestIds.push(requestId);
  return next;
}


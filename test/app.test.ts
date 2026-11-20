import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("validation endpoint", () => {
  it("rejects incomplete story input", async () => {
    const response = await request(createApp()).post("/api/stories/demo/validate").send({ nodes: [] });
    expect(response.status).toBe(422);
  });
});


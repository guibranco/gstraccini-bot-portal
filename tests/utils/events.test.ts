import { describe, it, expect } from "vitest";
import { groupEventsByPayloadId } from "../../src/utils/events";
import type { Event } from "../../src/types";

const makeEvent = (delivery_id: string, type = "push"): Event => ({
  delivery_id,
  type,
  date: "2024-01-01T00:00:00Z",
  payload: {},
});

describe("groupEventsByPayloadId", () => {
  it("returns an empty object for an empty array", () => {
    expect(groupEventsByPayloadId([])).toEqual({});
  });

  it("groups a single event under its delivery_id", () => {
    const event = makeEvent("abc-123");
    const result = groupEventsByPayloadId([event]);
    expect(result).toEqual({ "abc-123": [event] });
  });

  it("groups multiple events with the same delivery_id together", () => {
    const e1 = makeEvent("id-1", "push");
    const e2 = makeEvent("id-1", "pull_request");
    const result = groupEventsByPayloadId([e1, e2]);
    expect(result["id-1"]).toHaveLength(2);
    expect(result["id-1"]).toContain(e1);
    expect(result["id-1"]).toContain(e2);
  });

  it("separates events with different delivery_ids into distinct keys", () => {
    const e1 = makeEvent("id-1");
    const e2 = makeEvent("id-2");
    const result = groupEventsByPayloadId([e1, e2]);
    expect(Object.keys(result)).toHaveLength(2);
    expect(result["id-1"]).toEqual([e1]);
    expect(result["id-2"]).toEqual([e2]);
  });

  it("preserves event order within a group", () => {
    const events = [makeEvent("same", "push"), makeEvent("same", "create"), makeEvent("same", "delete")];
    const result = groupEventsByPayloadId(events);
    expect(result["same"]).toEqual(events);
  });
});

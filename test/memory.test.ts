import { describe, expect, it } from "vitest";

import { makeMemory } from "../source/memory.js";

describe("Memory", () => {
  it("adds a message to the channel memory", () => {
    const memory = makeMemory({ memoryLimit: 1 });

    memory.addMessageToChannelMemory("channel-id", {
      role: "user",
      content: "Hello, world!",
    });

    const channelMemory = memory.getChannelMemory("channel-id");

    expect(channelMemory).toHaveLength(1);
    expect(channelMemory[0]).toEqual({
      role: "user",
      content: "Hello, world!",
    });
  });

  it("only remembers the last X number of messages in channel memory", () => {
    const memory = makeMemory({ memoryLimit: 2 });

    memory.addMessageToChannelMemory("channel-id", {
      role: "user",
      content: "First message",
    });
    memory.addMessageToChannelMemory("channel-id", {
      role: "user",
      content: "Second message",
    });
    memory.addMessageToChannelMemory("channel-id", {
      role: "user",
      content: "Third message",
    });

    expect(memory.getChannelMemory("channel-id")).toHaveLength(2);
    expect(memory.getChannelMemory("channel-id")[0].content).toEqual(
      "Second message",
    );
    expect(memory.getChannelMemory("channel-id")[1].content).toEqual(
      "Third message",
    );
  });
});

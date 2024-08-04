import { describe, expect, it } from "vitest";

import { renderMessage } from "../../source/lib/discord.js";

describe("Discord Utilities", () => {
  describe("renderMessage", () => {
    it("renders a message with mentioned resolved as usernames", () => {
      const message: any = {
        content: "Hello <@1234> there! My name is <@5678>",
        mentions: {
          users: new Map([
            ["1234", { username: "FalseBott" }],
            ["5678", { username: "FalseMann" }],
          ]),
        },
      };

      expect(renderMessage(message)).toEqual(
        "Hello FalseBott there! My name is FalseMann",
      );
    });
  });
});

import { Client } from "discord.js";

import { BotPlugin } from "../../lib/bot-plugin.js";

export class MessageLoggerPlugin extends BotPlugin {
  activate(client: Client) {
    client.on("messageCreate", (message) => {
      this.logger.info(`MSG ${message.author.tag}: ${message.content}`);
    });
  }
}

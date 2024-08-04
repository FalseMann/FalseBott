import { Client } from "discord.js";

import { BotPlugin, BotPluginDependencies } from "../../lib/bot-plugin.js";

type Dependencies = Pick<Container.Dependencies, "memory" | "openai"> &
  BotPluginDependencies & {
    conversationModel: string;
    guilds: string[];
    maxOutputTokens: number;
  };

export class MessageLoggerPlugin extends BotPlugin {
  private guilds: string[];

  constructor(dependencies: Dependencies) {
    super(dependencies);
    this.guilds = dependencies.guilds;
  }

  activate(client: Client) {
    client.on("messageCreate", (message) => {
      if (message.guildId && !this.guilds.includes(message.guildId)) {
        return;
      }

      this.logger.info(`MSG ${message.author.tag}: ${message.content}`);
    });
  }
}

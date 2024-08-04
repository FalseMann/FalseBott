import { Client, Events, GatewayIntentBits } from "discord.js";

import { BotPlugin } from "../lib/bot-plugin.js";

type Dependencies = Pick<
  Container.Dependencies,
  "intelligencePlugin" | "logger" | "messageLoggerPlugin"
> & {
  discordToken: string;
};

export interface Bot {
  start: () => Promise<void>;
}

export function makeBot({
  discordToken,
  intelligencePlugin,
  logger,
  messageLoggerPlugin,
}: Dependencies): Bot {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessages,
    ],
  });
  const plugins: BotPlugin[] = [intelligencePlugin, messageLoggerPlugin];

  client.once(Events.ClientReady, (readyClient) => {
    logger.info(`Ready! Logged in as ${readyClient.user.tag}`);
  });

  return {
    start: async () => {
      for (const plugin of plugins) {
        logger.info(`Plugin activated: ${plugin.constructor.name}`);
        plugin.activate(client);
      }

      await client.login(discordToken);
    },
  };
}

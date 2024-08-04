/* eslint-disable @typescript-eslint/no-namespace */
import { asClass, asFunction, createContainer } from "awilix";
import OpenAI from "openai";
import { Logger } from "winston";

import { loadConfig } from "./config.js";
import { makeMemory, Memory } from "./memory.js";
import { Bot, makeBot } from "./modules/bot.js";
import { IntelligencePlugin } from "./modules/bot-plugins/intelligence-plugin.js";
import { MessageLoggerPlugin } from "./modules/bot-plugins/message-logger-plugin.js";
import { makeLogger } from "./modules/logger.js";
import { makeOpenAI } from "./openai.js";

declare global {
  namespace Container {
    interface Dependencies {
      bot: Bot;
      intelligencePlugin: IntelligencePlugin;
      memory: Memory;
      messageLoggerPlugin: MessageLoggerPlugin;
      logger: Logger;
      openai: OpenAI;
    }
  }
}

export function configureContainer() {
  const container = createContainer<Container.Dependencies>({ strict: true });
  const config = loadConfig(process.env);

  container.register({
    bot: asFunction(makeBot).inject(() => ({
      discordToken: config.discord.token,
    })),
    intelligencePlugin: asClass(IntelligencePlugin).inject(() => ({
      conversationModel: config.openai.model.conversation,
      guilds: config.bot.guilds,
      maxOutputTokens: config.openai.maxOutputTokens,
    })),
    memory: asFunction(makeMemory).inject(() => ({
      memoryLimit: config.bot.memoryLimit,
    })),
    messageLoggerPlugin: asClass(MessageLoggerPlugin).inject(() => ({
      guilds: config.bot.guilds,
    })),
    logger: asFunction(makeLogger).inject(() => ({
      apiKey: config.datadog.apiKey,
      applicationName: config.datadog.applicationName,
      logLevel: config.logLevel,
    })),
    openai: asFunction(makeOpenAI).inject(() => ({
      apiKey: config.openai.apiKey,
    })),
  });

  return container;
}

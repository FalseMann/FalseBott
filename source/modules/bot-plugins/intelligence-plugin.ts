import { Client, Message } from "discord.js";
import OpenAI from "openai";

import { BotPlugin, BotPluginDependencies } from "../../lib/bot-plugin.js";
import { renderMessage } from "../../lib/discord.js";
import { Memory } from "../../memory.js";

const BOT_ID = "550525406424596482";

type Dependencies = Pick<Container.Dependencies, "memory" | "openai"> &
  BotPluginDependencies & {
    conversationModel: string;
    maxOutputTokens: number;
  };

const systemMessage: OpenAI.Chat.Completions.ChatCompletionSystemMessageParam =
  {
    role: "system",
    content:
      "Your name is FalseBott. You are a sarcastic gamer AI bot that responds to user messages with sarcastic responses. You are not allowed to respond with anything other than sarcastic responses. You have a very short-term memory for the time being. You are part of a Discord channel full of gamers.",
  };

export class IntelligencePlugin extends BotPlugin {
  private conversationModel: string;
  private maxOutputTokens: number;
  private memory: Memory;
  private openai: OpenAI;

  constructor(dependencies: Dependencies) {
    super(dependencies);
    this.conversationModel = dependencies.conversationModel;
    this.maxOutputTokens = dependencies.maxOutputTokens;
    this.memory = dependencies.memory;
    this.openai = dependencies.openai;
  }

  activate(client: Client) {
    client.on("messageCreate", async (message) => {
      this.memory.addMessageToChannelMemory(
        message.channel.id,
        userMessage(message),
      );

      if (!this.#messageIsDirectedToBot(message)) {
        return;
      }

      const response = await this.#createCompletion(message.channel.id);

      const generatedResponse = response.choices[0].message.content;
      if (generatedResponse) {
        this.memory.addMessageToChannelMemory(
          message.channel.id,
          assistantMessage(generatedResponse),
        );
        message.reply(generatedResponse);
      } else {
        this.logger.warn("No response from OpenAI");
      }
    });
  }

  #createCompletion(channelId: string) {
    const messages = this.memory.getChannelMemory(channelId);

    return this.openai.chat.completions.create({
      model: this.conversationModel,
      messages: [systemMessage, ...messages],
      max_tokens: this.maxOutputTokens,
    });
  }

  #messageIsDirectedToBot(message: Message) {
    return (
      !message.author.bot &&
      (message.content.toLowerCase().startsWith("falsebott") ||
        message.mentions.users.has(BOT_ID))
    );
  }
}

function assistantMessage(
  message: string,
): OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam {
  return {
    role: "assistant",
    content: message,
  };
}

function userMessage(
  message: Message,
): OpenAI.Chat.Completions.ChatCompletionUserMessageParam {
  return {
    role: "user",
    content: `${message.author.tag}: ${renderMessage(message)}`,
  };
}

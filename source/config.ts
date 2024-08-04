import { Static, Type } from "@sinclair/typebox";
import { envSchema } from "env-schema";

const schema = Type.Object({
  BOT_MEMORY_LIMIT: Type.Number({ default: 15 }),
  BOT_NAME: Type.String({ default: "FalseBott" }),
  DATADOG_API_KEY: Type.Optional(Type.String()),
  DATADOG_APPLICATION_NAME: Type.Optional(Type.String()),
  DISCORD_TOKEN: Type.String(),
  LOG_LEVEL: Type.String({ default: "info" }),
  OPENAI_API_KEY: Type.String(),
  OPENAI_MAX_OUTPUT_TOKENS: Type.Number({ default: 400 }),
  OPENAI_MODEL_CONVERSATION: Type.String({ default: "gpt-3.5-turbo" }),
});

type Env = Static<typeof schema>;

export function loadConfig(env: NodeJS.ProcessEnv) {
  const config = envSchema<Env>({
    schema,
    data: env,
    dotenv: true,
  });

  return {
    bot: {
      memoryLimit: config.BOT_MEMORY_LIMIT,
      name: config.BOT_NAME,
    },
    datadog: {
      apiKey: config.DATADOG_API_KEY,
      applicationName: config.DATADOG_APPLICATION_NAME,
    },
    discord: {
      token: config.DISCORD_TOKEN,
    },
    logLevel: config.LOG_LEVEL,
    openai: {
      apiKey: config.OPENAI_API_KEY,
      maxOutputTokens: config.OPENAI_MAX_OUTPUT_TOKENS,
      model: {
        conversation: config.OPENAI_MODEL_CONVERSATION,
      },
    },
  };
}

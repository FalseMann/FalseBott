import OpenAI from "openai";

type Dependencies = {
  apiKey: string;
};

export function makeOpenAI({ apiKey }: Dependencies) {
  return new OpenAI({ apiKey });
}

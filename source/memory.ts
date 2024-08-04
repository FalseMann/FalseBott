import OpenAI from "openai";

type ChatCompletionMessage = OpenAI.Chat.Completions.ChatCompletionMessageParam;
type ChannelMemory = ChatCompletionMessage[];
type Dependencies = {
  memoryLimit: number;
};

export type Memory = {
  addMessageToChannelMemory: (
    channelId: string,
    message: ChatCompletionMessage,
  ) => void;
  getChannelMemory: (channelId: string) => ChannelMemory;
};

export function makeMemory({ memoryLimit }: Dependencies) {
  const memory = new Map<string, ChannelMemory>();

  return {
    addMessageToChannelMemory: (
      channelId: string,
      message: ChatCompletionMessage,
    ) => {
      const channelMemory = memory.get(channelId) ?? [];
      const newChannelMemory = [...channelMemory, message];

      if (newChannelMemory.length > memoryLimit) {
        newChannelMemory.splice(0, newChannelMemory.length - memoryLimit);
      }

      memory.set(channelId, newChannelMemory);
    },
    getChannelMemory: (channelId: string) => {
      return memory.get(channelId) ?? [];
    },
  };
}

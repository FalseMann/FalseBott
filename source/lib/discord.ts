import { Message } from "discord.js";

export function renderMessage(message: Message) {
  return message.content.replace(
    /<@(\d+)>/g,
    (match, id) => message.mentions.users.get(id)?.username ?? match,
  );
}

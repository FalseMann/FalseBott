import { Client } from "discord.js";
import { Logger } from "winston";

export type BotPluginDependencies = Pick<
  Container.Dependencies,
  "bot" | "logger"
>;

export abstract class BotPlugin {
  protected logger: Logger;

  constructor({ logger }: BotPluginDependencies) {
    this.logger = logger;
  }
  abstract activate(client: Client): void;
}

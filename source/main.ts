import { configureContainer } from "./container.js";

const container = configureContainer();
const { bot } = container.cradle;

container.cradle.logger.info("Booting up...");
await bot.start();

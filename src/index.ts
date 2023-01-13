import { ShardingManager } from "discord.js";
import { config as loadEnv } from "dotenv";
import { botConfig } from "../config/bot.config";
import { Logger } from "../lib";

loadEnv()

const manager = new ShardingManager("./dist/src/bot/bot.js", {
  token: process.env.CLIENT_TOKEN
})


const logger = new Logger();

logger.info(`Starting ${botConfig.botName}...`)

manager.spawn({
  timeout: -1
})

manager.on("shardCreate", (shard) => {
  logger.info(`Starting shard: ${shard.id}`);
  if (shard.id + 1 === manager.totalShards) {
    shard.once("ready", () => {
        setTimeout(() => {
            logger.info("All shards are online and ready!");
        }, 200);
    });
  }
})
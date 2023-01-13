import { botConfig } from "../../config/bot.config";
import { BetterClient } from "../../lib";

const client = new BetterClient({
    allowedMentions: { parse: ["users"] },
    presence: botConfig.presence,
    intents: botConfig.intents
});

client.login().catch(error => {
    client.logger.error(error);
});
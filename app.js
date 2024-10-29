import { Client, GatewayIntentBits } from "discord.js";
import { DISCORD_TOKEN } from "./config/dotenv.config.js";
import { handleMessageCreate } from "./events/messageCreate.js";
import { handleReady } from "./events/ready.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", handleReady);
client.on("messageCreate", handleMessageCreate);

client.login(DISCORD_TOKEN);

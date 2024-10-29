import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log("Bot is online!");
});

// Helper function to add stuttering effect
function addStuttering(text) {
  return text
    .split(" ")
    .map((word) => (Math.random() > 0.5 ? `${word[0]}-${word}` : word))
    .join(" ");
}

client.on("messageCreate", async (message) => {
  // Ignore bot messages and check if the message includes the bot mention
  if (message.author.bot) return;

  const botMention = `<@${client.user.id}>`;
  if (message.content.includes(botMention)) {
    const userMessage = message.content.replace(botMention, "").trim();
    const authorName = message.member.displayName; // Get author's display name

    // Regex to find text within quotation marks
    const regex = /"(.*?)"/g;
    let modifiedMessage = userMessage;
    let match;

    // Apply stuttering only to quoted text
    while ((match = regex.exec(userMessage)) !== null) {
      const stutteredText = addStuttering(match[1]);
      modifiedMessage = modifiedMessage.replace(match[1], stutteredText);
    }

    // Construct the formatted message
    const responseMessage = `**${authorName}:** ${userMessage.replace(
      /"(.*?)"/g,
      `"${addStuttering("$1")}"`
    )}`;

    // Send the modified message and delete the original
    await message.channel.send(responseMessage);
    await message.delete(); // Delete original message
  }
});

client.login(process.env.DISCORD_TOKEN);

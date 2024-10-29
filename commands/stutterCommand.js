import { addStuttering } from "../utils/stutteringHelper.js";

export async function stutterCommand(message) {
  const botMention = `<@${message.client.user.id}>`;
  const userMessage = message.content.replace(botMention, "").trim();
  const authorName = message.member.displayName;

  // Regex to find text within quotation marks
  const regex = /"(.*?)"/g;
  let modifiedMessage = userMessage;
  let match;

  while ((match = regex.exec(userMessage)) !== null) {
    const stutteredText = addStuttering(match[1]);
    modifiedMessage = modifiedMessage
      .replace(match[1], `\n\n—*${stutteredText}*—\n\n`)
      .replace(/"/g, "");
  }

  const responseMessage = `**${authorName}:**\n ${modifiedMessage}`;
  await message.channel.send(responseMessage);
  await message.delete();
}

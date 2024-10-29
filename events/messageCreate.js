import { stutterCommand } from "../commands/stutterCommand.js";

export async function handleMessageCreate(message) {
  if (message.author.bot) return;

  if (message.content.includes(`<@${message.client.user.id}>`)) {
    await stutterCommand(message);
  }
}

import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { playCommand } from './commands/play.js'; // 👈 add .js
dotenv.config();

const token = process.env.DISCORD_TOKEN;
const prefix = process.env.PREFIX ?? "!"; // fallback to "!" if not set

if (!token) {
  throw new Error("DISCORD_TOKEN is not set in your .env file!");
}
console.log("Token from .env:", token);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  if (command === 'play') {
    await playCommand(message, args);
  }
});

client.login(token);

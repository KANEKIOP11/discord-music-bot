"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const play_js_1 = require("./commands/play.js"); // 👈 add .js
dotenv_1.default.config();
const token = process.env.DISCORD_TOKEN;
const prefix = process.env.PREFIX ?? "!"; // fallback to "!" if not set
if (!token) {
    throw new Error("DISCORD_TOKEN is not set in your .env file!");
}
console.log("Token from .env:", token);
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildVoiceStates
    ]
});
client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot)
        return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();
    if (command === 'play') {
        await (0, play_js_1.playCommand)(message, args);
    }
});
client.login(token);

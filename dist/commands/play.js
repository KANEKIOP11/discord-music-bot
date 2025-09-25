"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playCommand = void 0;
const voice_1 = require("@discordjs/voice");
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const playCommand = async (message, args) => {
    const voiceChannel = message.member?.voice.channel;
    if (!voiceChannel) {
        return message.reply("You need to be in a voice channel to play music!");
    }
    const song = args.join(" ");
    if (!song) {
        return message.reply("Please provide a song name or URL!");
    }
    const connection = (0, voice_1.joinVoiceChannel)({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        selfDeaf: false
    });
    try {
        console.log("Playing URL:", song);
        const stream = (0, ytdl_core_1.default)(song, {
            filter: "audioonly",
            quality: "highestaudio",
            highWaterMark: 1 << 25
        });
        const resource = (0, voice_1.createAudioResource)(stream, {
            inlineVolume: true
        });
        const player = (0, voice_1.createAudioPlayer)();
        player.play(resource);
        await (0, voice_1.entersState)(connection, voice_1.VoiceConnectionStatus.Ready, 30000);
        connection.subscribe(player);
        player.on(voice_1.AudioPlayerStatus.Idle, () => {
            connection.destroy();
        });
    }
    catch (err) {
        message.reply("Error playing the song.");
        console.error("Play error:", err);
    }
};
exports.playCommand = playCommand;

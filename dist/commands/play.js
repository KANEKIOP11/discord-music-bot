"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playCommand = void 0;
const voice_1 = require("@discordjs/voice");
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
const playCommand = async (message, args) => {
    console.log("Args received:", args);
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
        console.log("Playing:", song);
        // Check if it's a URL
        if (song.startsWith('http')) {
            // Use yt-dlp to get audio stream URL
            console.log("Getting audio stream from URL...");
            const { stdout } = await execAsync(`yt-dlp -f "bestaudio[ext=m4a]/bestaudio" --get-url "${song}"`);
            const audioUrl = stdout.trim();
            if (audioUrl) {
                console.log("Got audio URL:", audioUrl.substring(0, 50) + "...");
                const resource = (0, voice_1.createAudioResource)(audioUrl, {
                    inlineVolume: true
                });
                const player = (0, voice_1.createAudioPlayer)();
                player.play(resource);
                await (0, voice_1.entersState)(connection, voice_1.VoiceConnectionStatus.Ready, 30_000);
                connection.subscribe(player);
                player.on(voice_1.AudioPlayerStatus.Idle, () => {
                    console.log("Audio finished playing, staying in voice channel");
                    // Don't destroy connection immediately, let user manually disconnect
                });
                message.reply(`Now playing: ${song}`);
                return;
            }
        }
        // Fallback to test audio for non-URLs
        const resource = (0, voice_1.createAudioResource)("https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", {
            inlineVolume: true
        });
        const player = (0, voice_1.createAudioPlayer)();
        player.play(resource);
        await (0, voice_1.entersState)(connection, voice_1.VoiceConnectionStatus.Ready, 30_000);
        connection.subscribe(player);
        player.on(voice_1.AudioPlayerStatus.Idle, () => {
            console.log("Audio finished playing, staying in voice channel");
            // Don't destroy connection immediately, let user manually disconnect
        });
        message.reply(`Now playing: ${song} (Demo mode - using test audio)`);
    }
    catch (err) {
        message.reply("Error playing the song.");
        console.error("Play error:", err);
    }
};
exports.playCommand = playCommand;

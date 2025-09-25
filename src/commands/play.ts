import { Message } from "discord.js";
import {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    entersState,
    VoiceConnectionStatus
} from "@discordjs/voice";
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const playCommand = async (message: Message, args: string[]) => {
    console.log("Args received:", args);
    
    const voiceChannel = message.member?.voice.channel;
    if (!voiceChannel) {
        return message.reply("You need to be in a voice channel to play music!");
    }

    const song = args.join(" ");
    if (!song) {
        return message.reply("Please provide a song name or URL!");
    }

    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        selfDeaf: true
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
                
                const resource = createAudioResource(audioUrl, {
                    inlineVolume: true
                });

                const player = createAudioPlayer();
                player.play(resource);

                await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
                connection.subscribe(player);

                player.on(AudioPlayerStatus.Idle, () => {
                    console.log("Audio finished playing, staying in voice channel");
                    // Don't destroy connection immediately, let user manually disconnect
                });

                message.reply(`Now playing: ${song}`);
                return;
            }
        }

        // Fallback to test audio for non-URLs
        const resource = createAudioResource("https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", {
            inlineVolume: true
        });

        const player = createAudioPlayer();
        player.play(resource);

        await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => {
            console.log("Audio finished playing, staying in voice channel");
            // Don't destroy connection immediately, let user manually disconnect
        });

        message.reply(`Now playing: ${song} (Demo mode - using test audio)`);
    } catch (err) {
        message.reply("Error playing the song.");
        console.error("Play error:", err);
    }
};

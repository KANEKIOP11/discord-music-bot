import { Message } from "discord.js";
import {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    entersState,
    VoiceConnectionStatus
} from "@discordjs/voice";
import ytdl from "ytdl-core";

export const playCommand = async (message: Message, args: string[]) => {
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
        selfDeaf: false
    });

    try {
        console.log("Playing URL:", song);

        const stream = ytdl(song, {
            filter: "audioonly",
            quality: "highestaudio",
            highWaterMark: 1 << 25
        });

        const resource = createAudioResource(stream, {
            inlineVolume: true
        });

        const player = createAudioPlayer();
        player.play(resource);

        await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
        });
    } catch (err) {
        message.reply("Error playing the song.");
        console.error("Play error:", err);
    }
};

"use strict";
class MusicPlayer {
    constructor(connection) {
        this.connection = connection;
        this.queue = [];
    }
    play(song) {
        this.queue.push(song);
        if (this.queue.length === 1) {
            this.playNext();
        }
    }
    playNext() {
        if (this.queue.length === 0)
            return;
        const song = this.queue[0];
        // Logic to play the song using the connection
        console.log(`Now playing: ${song}`);
        // Simulate song playback
        setTimeout(() => {
            this.queue.shift();
            this.playNext();
        }, 3000); // Simulate a song duration of 3 seconds
    }
    stop() {
        this.queue = [];
        console.log('Playback stopped.');
    }
    skip() {
        if (this.queue.length > 0) {
            this.queue.shift();
            console.log('Skipped to next song.');
            this.playNext();
        }
    }
}

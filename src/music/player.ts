class MusicPlayer {
    private connection: any;
    private queue: string[];

    constructor(connection: any) {
        this.connection = connection;
        this.queue = [];
    }

    public play(song: string) {
        this.queue.push(song);
        if (this.queue.length === 1) {
            this.playNext();
        }
    }

    private playNext() {
        if (this.queue.length === 0) return;

        const song = this.queue[0];
        // Logic to play the song using the connection
        console.log(`Now playing: ${song}`);

        // Simulate song playback
        setTimeout(() => {
            this.queue.shift();
            this.playNext();
        }, 3000); // Simulate a song duration of 3 seconds
    }

    public stop() {
        this.queue = [];
        console.log('Playback stopped.');
    }

    public skip() {
        if (this.queue.length > 0) {
            this.queue.shift();
            console.log('Skipped to next song.');
            this.playNext();
        }
    }
}
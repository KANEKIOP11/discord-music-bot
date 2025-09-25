# Discord Music Bot

This is a simple Discord music bot that allows users to play music in voice channels. The bot is built using TypeScript and utilizes the Discord.js library for interaction with the Discord API.

## Features

- Play music from various sources
- Control playback (play, stop, skip)
- Easy to extend with additional commands

## Prerequisites

- Node.js (version 14 or higher)
- A Discord bot token (create a bot on the Discord Developer Portal)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/discord-music-bot.git
   ```

2. Navigate to the project directory:

   ```
   cd discord-music-bot
   ```

3. Install the dependencies:

   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and add your bot token:

   ```
   DISCORD_TOKEN=your_bot_token_here
   ```

## Running the Bot

To start the bot, run the following command:

```
npm start
```

## Usage

- Invite the bot to your server using the OAuth2 URL generated in the Discord Developer Portal.
- Use the command `!play <song_name>` in a text channel to play music in your voice channel.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements!

## License

This project is licensed under the MIT License.
/**
 * ╔══════════════════════════════════════════╗
 * ║         Void Music Bot                   ║
 * ║         Developed by Void                ║
 * ║         All Rights Reserved © Void       ║
 * ╚══════════════════════════════════════════╝
 */

require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { DisTube } = require("distube");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const fs = require("fs");
const path = require("path");

// ضروري لـ Railway — ffmpeg
process.env.FFMPEG_PATH = require("ffmpeg-static");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

client.distube = new DisTube(client, {
  plugins: [
    new YtDlpPlugin({ update: false }),
    new SpotifyPlugin(),
    new SoundCloudPlugin(),
  ],
  emitNewSongOnly: true,
  joinNewVoiceChannel: true,
});

// تحميل الهاندلرز
const handlersPath = path.join(__dirname, "handlers");
fs.readdirSync(handlersPath).forEach((file) => {
  require(path.join(handlersPath, file))(client);
});

// حماية من الكراش
process.on("unhandledRejection", (err) => {
  console.error("[UnhandledRejection]", err);
});

process.on("uncaughtException", (err) => {
  console.error("[UncaughtException]", err);
});

client.login(process.env.DISCORD_TOKEN);

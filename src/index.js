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

// التحقق من المتغيرات المطلوبة
const required = ["DISCORD_TOKEN", "DISCORD_CLIENT_ID"];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`❌ خطأ: المتغير ${key} غير موجود!`);
    process.exit(1);
  }
}

// ffmpeg
try {
  process.env.FFMPEG_PATH = require("ffmpeg-static");
  console.log("✅ ffmpeg محمّل:", process.env.FFMPEG_PATH);
} catch (e) {
  console.warn("⚠️ ffmpeg-static غير موجود، سيتم استخدام ffmpeg النظام");
}

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
  try {
    require(path.join(handlersPath, file))(client);
    console.log(`✅ handler محمّل: ${file}`);
  } catch (err) {
    console.error(`❌ خطأ في handler ${file}:`, err.message);
  }
});

// حماية من الكراش
process.on("unhandledRejection", (err) => {
  console.error("[UnhandledRejection]", err);
});

process.on("uncaughtException", (err) => {
  console.error("[UncaughtException]", err);
});

// تسجيل الدخول
console.log("🔄 جاري تسجيل الدخول...");
client.login(process.env.DISCORD_TOKEN).catch((err) => {
  console.error("❌ فشل تسجيل الدخول! تحقق من DISCORD_TOKEN:", err.message);
  process.exit(1);
});

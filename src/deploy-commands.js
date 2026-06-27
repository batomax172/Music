require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const commands = [];
const commandsPath = path.join(__dirname, "commands", "music");

fs.readdirSync(commandsPath)
  .filter((f) => f.endsWith(".js"))
  .forEach((file) => {
    const cmd = require(path.join(commandsPath, file));
    if (cmd.data) commands.push(cmd.data.toJSON());
  });

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("🎵 جاري رفع أوامر Void...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID,
        process.env.DISCORD_GUILD_ID
      ),
      { body: commands }
    );
    console.log("✅ تم رفع جميع الأوامر!");
  } catch (err) {
    console.error(err);
  }
})();

const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const musicPath = path.join(__dirname, "..", "commands", "music");
  fs.readdirSync(musicPath)
    .filter((f) => f.endsWith(".js"))
    .forEach((file) => {
      try {
        const cmd = require(path.join(musicPath, file));
        if (cmd.data && cmd.execute) {
          client.commands.set(cmd.data.name, cmd);
          console.log(`✅ أمر محمّل: ${cmd.data.name}`);
        }
      } catch (err) {
        console.error(`❌ خطأ في ${file}:`, err.message);
      }
    });
};

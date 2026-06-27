module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`✅ Void Music Bot Online! — ${client.user.tag}`);
    client.user.setPresence({
      activities: [{ name: "🎵 Void Music | /play", type: 2 }],
      status: "online",
    });
  },
};

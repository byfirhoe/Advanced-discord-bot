const { Client, IntentsBitField } = require("discord.js");
const { CommandKit } = require("commandkit");
const mongoose = require("mongoose");
require("dotenv/config");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

new CommandKit({
  client,
  commandsPath: `${__dirname}/commands`,
  eventsPath: `${__dirname}/events`,
  devGuildId: process.env.GUILD_ID,
  bulkRegister: true,
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to MongoDB.");
  client.login(process.env.TOKEN);
});

//discord init
const Discord = require("discord.js")
const client = new Discord.Client()
client.login(process.env.botToken)

module.exports = client

require("dotenv").config()

const Discord = require("discord.js")
const client = new Discord.Client()
client.login(process.env.botToken)

let prefix = "."

client.on("ready", () => {
	console.log("Ron is alive")
})

client.on("message", (msg) => {
	if (msg.content === "hey Ron") {
		msg.channel.send("hey")
	}

	if (msg.content === "Ron") {
		msg.channel.send("hey")
	}

	if (msg.mentions.has(client.user.id)) {
		msg.channel.send("<:ping:796217123982278687>")
	}

	if (msg.content === "promotion") {
		msg.channel.send("give")
	}

	if (msg.content === "promotion") {
		msg.channel.send("give")
	}

	if (msg.content.substring(0, 1) === prefix) {
		switch (msg.content.slice(1).split(" ")[0]) {
			case "help":
				msg.channel.send("no commands yet")
				break

			case "docs":
				if (!isNaN(msg.content.slice(1).split(" ")[1])) {
					msg.channel.send(
						"http://www.scpwiki.com/scp-" +
							msg.content.slice(1).split(" ")[1]
					)
				} else {
					msg.channel.send("give me an scp number")
				}

				break
			case "blue":
				msg.channel.send("<:blue:785702340975788063>")
				break
			default:
				msg.channel.send("invalid command")
		}
	}
})

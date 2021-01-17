require("dotenv").config()
const mongoose = require("mongoose")
const ScD = require('./models/scd')

//db connection
mongoose
	.connect(process.env.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log("db connected"))
	.catch((err) => console.log(err))

//discord init
const Discord = require("discord.js")
const client = new Discord.Client()
client.login(process.env.botToken)
let prefix = "."

client.on("ready", () => {
	console.log("Ron is alive")
})

client.on("message", (msg) => {

	if (msg.author.bot) return

	if (msg.content === "hey Ron") {
		msg.channel.send("hey")
	}

	if (msg.content === "Ron") {
		msg.channel.send("hey")
	}

	if (msg.content === "clown") {
		msg.channel.send("ewww")
	}

	if (msg.content === "no u") {
		msg.channel.send("no u")
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

	if (msg.content === "hey ron, are you connected to a database") {
		if (mongoose.connection.readyState) {
			msg.channel.send("yes")
		} else {
			msg.channel.send("no")
		}
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

			case "pogcheck":
				if (
					msg.content.slice(1).split(" ")[1] === "Dimensione" ||
					"DaRealBrine"
				) {
					msg.channel.send("pog")
				} else {
					msg.channel.send("unpog")
				}
				break

			case "grade":
				if (!msg.member.roles.cache.find((r) => r.name === "HR")) {
					msg.channel.send("Imagine not being hr")
					break
				}

				

				

				const userID = msg.content.slice(1).split(" ")[1]

				ScD.findOne({ userID: userID }).then( (user) => {
					if (!user) {
						const scd = new ScD({
							userID: userID
						})
						scd.save()
						console.log('ScD made')
					}

					if (msg.content.slice(1).split(" ")[2].toLocaleLowerCase() === 'valid') {
						user.validTests++
						user.save()
					} else if (msg.content.slice(1).split(" ")[2].toLocaleLowerCase() === 'invalid') {
						user.invalidTests++
						user.save()
					} else if (msg.content.slice(1).split(" ")[2].toLocaleLowerCase() === 'quality') {
						user.qualityTests++
						user.save()
					} else if (msg.content.slice(1).split(" ")[2].toLocaleLowerCase() === 'excellence') {
						user.excellentTests++
						user.save()
					} else {
						msg.channel.send('Grade level not a real level')
					}

				})
				
				

				break

			case 'file':
				const findID = msg.content.slice(1).split(" ")[1]
				ScD.findOne({ userID: findID }).then( (user) => {
					if (!user) {
						msg.channel.send("Who?")	
					}
				
					msg.channel.send(`Invalid reports: ${user.invalidTests}\nValid reports: ${user.validTests}\nQuality reports: ${user.qualityTests}\nExcellent reports: ${user.excellentTests}` )
				
				})


			
				break
			default:
				msg.channel.send("invalid command")
		}
	}
})

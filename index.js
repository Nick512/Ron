require("dotenv").config()
const mongoose = require("mongoose")
const client = require('./modules/login')
const chatReations = require('./modules/chat')
const commands = require("./modules/commands")

//db connection
mongoose
	.connect(process.env.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log("db connected"))
	.catch((err) => console.log(err))




//Startup console log
client.on("ready", () => {
	console.log("Ron is alive")
})


//Message listeners
client.on("message", (msg) => {

	if (msg.author.bot) return

	//module calls
	commands(msg)
	chatReations(msg)


	
})

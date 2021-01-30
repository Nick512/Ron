const client = require("./login")

function chatReactions(msg) {
    if (msg.mentions.has(client.user.id)) {
        msg.channel.send("<:ping:796217123982278687>")
        return
    }

    switch (msg.content) {
        case "hey Ron":
            msg.channel.send("hey")
            break

        case "SD?":
            msg.channel.send("SD pog")
            break

        case "femboy?":
            msg.channel.send("@Santio hey")
            break

        case "Ron":
            msg.channel.send("hey")
            break

        case "MTF?":
            msg.channel.send("ewww")
            break

        case "no u":
            msg.channel.send("no u")
            break

        case "promotion":
            msg.channel.send("give")
            break

        // case "hey ron, are you connected to a database":
        //     if (mongoose.connection.readyState) {
        //         msg.channel.send("yes")
        //         break
        //     } else {
        //         msg.channel.send("no")
        //         break
        //     }
    }
}

module.exports = chatReactions

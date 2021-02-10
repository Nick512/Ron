const client = require("./login")

function chatReactions(msg) {
    if (msg.mentions.has(client.user.id)) {
        msg.channel.send("<:ping:796217123982278687>")
        return
    }

    switch (msg.content.tolowercase()) {
        case "hey ron":
            msg.channel.send("hey")
            break

        case "sd?":
            msg.channel.send("SD pog")
            break

        case "femboy?":
            msg.channel.send("@Santio hey")
            break

        case "ron":
            msg.channel.send("hey")
            break

        case "mtf?":
            msg.channel.send("ewww")
            break

        case "no u":
            msg.channel.send("no u")
            break

        case "promotion":
            msg.channel.send("give")
            break
    }
}

module.exports = chatReactions

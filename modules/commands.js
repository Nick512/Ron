const ScD = require("../models/scd")
const Discord = require("discord.js")
const client = require("./login")

//Get user funtion
function getUserFromMention(mention) {
    if (!mention) return

    if (mention.startsWith("<@") && mention.endsWith(">")) {
        mention = mention.slice(2, -1)

        if (mention.startsWith("!")) {
            mention = mention.slice(1)
        }

        return client.users.cache.get(mention)
    }
}

function hrCheck(msg) {
    if (!msg.member.roles.cache.find((r) => r.name === "HR")) {
        msg.channel.send("Imagine not being hr")
        return true
    }
}

function commands(msg) {
    let args = msg.content.slice(1).split(" ")

    switch (args[0]) {
        case "help":
            msg.channel.send(
                new Discord.MessageEmbed()
                    .setTitle("Ron's Commands")
                    .setDescription(
                        `.docs [scp #] - Gives the Wiki page for the SCP
                        .poll - Show a poll
                            .grade [player] [grade] - Gives player points and grade from test
                            .removegrade [player] [grade] - Removes grade from player
                            .editgrade [player] [old grade] [new grade] - Modifies a player grade
                            .addpoints [player] [points] - Adds points to player without affecting grades
                            .removepoints [player] [points] - Removes points from player without affecting grades
                            `
                    )
                    .setColor("#fcba03")
            )
            break

        case "poll":
            //HR role check
            if (hrCheck(msg)) {
                break
            }

            //send poll embed
            msg.channel
                .send(
                    new Discord.MessageEmbed()
                        .setColor("#f5bf42")
                        .setTitle("ScD poll (by: " + msg.member.user.tag + ")")
                        .setDescription(msg.content.substring(6))
                        .setFooter("Vote below")
                )
                .then((sentEmbed) => {
                    sentEmbed.react("👍")
                    sentEmbed.react("👎")
                })
            msg.delete()
            break

        case "docs":
            //Vaidate scp # and send link appened with number
            if (!isNaN(args[1]) && args[1] < 9999) {
                msg.channel.send("http://www.scpwiki.com/scp-" + args[1])
            } else {
                msg.channel.send("give me an scp number")
            }
            break

        case "blue":
            // dnt worry about this one
            msg.delete()
            msg.channel.send("<:blue:785702340975788063>")
            break

        case "grade":
            //HR role check
            if (hrCheck(msg)) {
                break
            }

            //Argument check
            if (args[1] != null) {
                ScD.findOne({
                    userID: args[1],
                }).then((user) => {
                    //add grade to user if user exsists
                    if (user && !isNaN(args[2])) {
                        user.grades.push(parseInt(args[2]))
                        user.save()
                        msg.channel.send(
                            new Discord.MessageEmbed()
                                .setDescription(`Test score of ${args[2]} given to ${args[1]}`)
                                .setColor("#009900")
                        )
                        msg.delete()
                        return
                    }

                    if (!user && !isNaN(args[2])) {
                        //if no user then create user and give them grade
                        const scd = new ScD({
                            userID: userID,
                            points: 0,
                            grades: [parseInt(args[2])],
                        })
                        scd.save()
                        console.log("ScD made")
                        msg.channel.send(
                            new Discord.MessageEmbed()
                                .setDescription(`Test score of ${args[2]} given to ${args[1]}`)
                                .setColor("#009900")
                        )
                        msg.delete()
                        return
                    }
                })
            } else {
                msg.channel.send("Who you want to be graded?")
            }

            break

        case "addpoints":
            //HR role check
            if (hrCheck(msg)) {
                break
            }

            //Find ScD and give points but not add a grade to grades list
            ScD.findOne({ userID: args[1] }).then((user) => {
                //If user already exists them add points to their total
                if (user && !isNaN(args[2])) {
                    user.points += parseInt(args[2])
                    user.save()
                    msg.channel.send(
                        new Discord.MessageEmbed()
                            .setDescription(`${args[2]} points added to ${args[1]}`)
                            .setColor("#009900")
                    )
                    return
                }

                if (!user && !isNaN(args[2])) {
                    //if no user then create user and give them points
                    const scd = new ScD({
                        userID: args[1],
                        points: parseInt(args[2]),
                    })
                    scd.save()
                    msg.channel.send(
                        new Discord.MessageEmbed()
                            .setDescription(`${args[2]} points added to ${args[1]}`)
                            .setColor("#009900")
                    )
                    msg.delete()
                    return
                }
                msg.channel.send(
                    new Discord.MessageEmbed().setDescription(`Usage: .addpoints player points`).setColor("#999900")
                )
            })

            break

        case "removepoints":
            //HR role check
            if (hrCheck(msg)) {
                break
            }

            //Find player and remove points
            ScD.findOne({ userID: args[1] }).then((user) => {
                if (user && !isNaN(args[2])) {
                    user.points -= parseInt(args[2])
                    user.save()
                    msg.channel.send(
                        new Discord.MessageEmbed()
                            .setDescription(`Removed ${args[2]} points from ${args[1]}`)
                            .setColor("#009900")
                    )
                } else {
                    msg.channel.send(
                        new Discord.MessageEmbed()
                            .setDescription(`Usage: .removegrade player points`)
                            .setColor("#999900")
                    )
                }
            })
            break

        case "removegrade":
            //HR role check
            if (hrCheck(msg)) {
                break
            }

            //Find player and remove grade and points
            ScD.findOne({ userID: args[1] }).then((user) => {
                if (user && !isNaN(args[2])) {
                    if (user.grades.includes(args[2])) {
                        user.grades.splice(user.grades.lastIndexOf(parseInt(args[2], 1)))
                        user.save()
                        msg.channel.send(
                            new Discord.MessageEmbed()
                                .setDescription(`Removed grade ${args[2]} from ${args[1]}`)
                                .setColor("#009900")
                        )
                    } else {
                        msg.channel.send(
                            new Discord.MessageEmbed()
                                .setDescription(`Player does not have that grade`)
                                .setColor("#990000")
                        )
                    }
                } else {
                    msg.channel.send(
                        new Discord.MessageEmbed()
                            .setDescription(`Usage: .removegrade player grade`)
                            .setColor("#999900")
                    )
                }
            })
            break

        case "editgrade":
            //HR role check
            if (hrCheck(msg)) {
                break
            }

            //Find player and edit grade
            ScD.findOne({ userID: args[1] }).then((user) => {
                if (user && !isNaN(args[2]) && !isNaN(args[3])) {
                    if (user.grades.includes(args[2])) {
                        user.grades.splice(user.grades.lastIndexOf(parseInt(args[2], 1)))
                        user.grades.push(parseInt(args[3]))

                        user.save()
                        msg.channel.send(
                            new Discord.MessageEmbed()
                                .setDescription(`Grade Modifed: ${args[2]} to ${args[3]} for ${args[1]}`)
                                .setColor("#009900")
                        )
                        msg.delete()
                    } else {
                        msg.channel.send(
                            new Discord.MessageEmbed()
                                .setDescription(`Player does not have that grade`)
                                .setColor("#990000")
                        )
                    }
                } else {
                    msg.channel.send(
                        new Discord.MessageEmbed()
                            .setDescription(`Usage: .editgrade player oldGrade newGrade`)
                            .setColor("#999900")
                    )
                }
            })
            break

        case "grades":
            // If no user specified let user be the author
            if (args[1] == undefined) {
                args[1] = "<@!" + msg.author.id + ">"
                args[2] = true
            }
            //Find ScD and return grade list and additonal points
            ScD.findOne({ userID: args[1] }).then((user) => {
                if (user) {
                    if (user.grades[0]) {
                        const scd = getUserFromMention(args[1])
                        msg.channel.send(
                            new Discord.MessageEmbed()
                                .setColor("#009900")
                                .setTitle(`${scd.tag}'s grades`)
                                .setDescription(`Grades: ${user.grades.join(", ")} \n Additonal Points: ${user.points}`)
                        )
                    } else {
                        msg.channel.send("They have no grades yet")
                    }
                } else {
                    msg.channel.send(`${args[2] ? "You" : "They"} have no points`)
                }
            })
            break

        case "points":
            // If no user specified let user be the author
            if (args[1] == undefined) {
                args[1] = "<@!" + msg.author.id + ">"
                args[2] = true
            }

            //Find ScD and return points
            ScD.findOne({ userID: args[1] }).then((user) => {
                if (user) {
                    const scd = getUserFromMention(args[1])
                    msg.channel.send(
                        new Discord.MessageEmbed()
                            .setColor("#009900")
                            .setTitle(`${scd.tag}'s points`)
                            .setDescription(`${user.points + user.grades.reduce((a, b) => a + b, 0)}`)
                    )
                } else {
                    msg.channel.send(`${args[2] ? "You" : "They"} have no points`)
                }
            })

            break

        default:
            msg.channel.send("invalid command")
    }
}

module.exports = commands

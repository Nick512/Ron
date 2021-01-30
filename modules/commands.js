const ScD = require("../models/scd")
const { users } = require("./login")

let prefix = "."

function commands(msg) {
    if (msg.content.substring(0, 1) === prefix) {
        let command = msg.content.slice(1).split(" ")

        switch (command[0]) {
            case "help":
                msg.channel.send("no commands yet")
                break

            case "docs":
                if (!isNaN(command[1])) {
                    msg.channel.send("http://www.scpwiki.com/scp-" + command[1])
                } else {
                    msg.channel.send("give me an scp number")
                }
                break

            case "blue":
                msg.channel.send("<:blue:785702340975788063>")
                break

            case "grade":
                //HR role check
                if (!msg.member.roles.cache.find((r) => r.name === "HR")) {
                    msg.channel.send("Imagine not being hr")
                    break
                }

                const userID = command[1]

                try {
                    //Argument check
                    if (userID != null) {
                        ScD.findOne({
                            userID: userID,
                        }).then((user) => {
                            if (!user) {
                                //if no user then create user and give them points and grade
                                const scd = new ScD({
                                    userID: userID,
                                    points: parseInt(command[2]),
                                    grades: [command[2]],
                                })
                                scd.save()
                                console.log("ScD made")
                                msg.channel.send(`I gave them ${command[2]} points`)
                            }

                            if (user) {
                                //add points and grade to user
                                if (!isNaN(command[2])) {
                                    user.points += parseInt(command[2])
                                    user.grades.push(command[2])
                                    user.save()
                                    msg.channel.send(`I gave them ${command[2]} points`)
                                }
                            }
                        })
                    } else {
                        msg.channel.send("Who you want to be graded?")
                    }
                } catch (err) {
                    console.log(err)
                }
                break

            case "addpoints":
                //HR role check
                if (!msg.member.roles.cache.find((r) => r.name === "HR")) {
                    msg.channel.send("Imagine not being hr")
                    break
                }

                //Find ScD and give points but not add a grade to grades list
                ScD.findOne({ userID: command[1] }).then((user) => {
                    if (user && !isNaN(command[2])) {
                        user.points += parseInt(command[2])
                        user.save()
                        msg.channel.send(`I gave them ${command[2]} points`)
                    } else {
                        msg.channel.send("Usage: .addpoints player points")
                    }
                })
                break

            case "removepoints":
                //HR role check
                if (!msg.member.roles.cache.find((r) => r.name === "HR")) {
                    msg.channel.send("Imagine not being hr")
                    break
                }

                //Find player and remove points
                ScD.findOne({ userID: command[1] }).then((user) => {
                    if (user && !isNaN(command[2])) {
                        user.points -= parseInt(command[2])
                        user.save()
                        msg.channel.send(`I took away ${command[2]} points`)
                    } else {
                        msg.channel.send("Usage: .removepoints player points")
                    }
                })
                break

            case "removegrade":
                //HR role check
                if (!msg.member.roles.cache.find((r) => r.name === "HR")) {
                    msg.channel.send("Imagine not being hr")
                    break
                }

                //Find player and remove grade and points
                ScD.findOne({ userID: command[1] }).then((user) => {
                    if (user && !isNaN(command[2])) {
                        if (user.grades.includes(command[2])) {
                            user.grades.splice(user.grades.lastIndexOf(command[2], 1))
                            user.points -= parseInt(command[2])
                            user.save()
                            msg.channel.send(`I took away ${command[2]} points and removed that grade`)
                        } else {
                            msg.channel.send("They don't have that grade")
                        }
                    } else {
                        msg.channel.send("Usage: .removegrade player grade")
                    }
                })
                break

            case "editgrade":
                //HR role check
                if (!msg.member.roles.cache.find((r) => r.name === "HR")) {
                    msg.channel.send("Imagine not being hr")
                    break
                }

                //Find player and remove grade and points
                ScD.findOne({ userID: command[1] }).then((user) => {
                    if (user && !isNaN(command[2]) && !isNaN(command[3])) {
                        if (user.grades.includes(command[2])) {
                            user.grades.splice(user.grades.lastIndexOf(command[2], 1))
                            user.grades.push(command[3])

                            if (command[2] > command[3]) {
                                user.points -= parseInt(command[2] - command[3])
                            }
                            if (command[2] < command[3]) {
                                user.points += parseInt(command[3] - command[2])
                            }
                            user.save()
                            msg.channel.send(`Grade modified`)
                        } else {
                            msg.channel.send("They don't have that grade")
                        }
                    } else {
                        msg.channel.send("Usage: .removegrade player grade")
                    }
                })
                break

            case "grades":
                // If no user specified let user be the author
                if (command[1] == undefined) {
                    command[1] = "<@!" + msg.author.id + ">"
                }
                //Find ScD and return grade list
                ScD.findOne({ userID: command[1] }).then((user) => {
                    if (user) {
                        if (user.grades[0]) {
                            msg.channel.send(user.grades)
                        } else {
                            msg.channel.send("They have no grades yet")
                        }
                    } else {
                        msg.channel.send("Who?")
                    }
                })
                break

            case "points":
                // If no user specified let user be the author
                if (command[1] == undefined) {
                    command[1] = "<@!" + msg.author.id + ">"
                }

                //Find ScD and return points
                ScD.findOne({ userID: command[1] }).then((user) => {
                    if (user) {
                        msg.channel.send(user.points)
                    } else {
                        msg.channel.send("Who?")
                    }
                })

                break

            default:
                msg.channel.send("invalid command")
        }
    }
}

module.exports = commands

const request = require('request')
const Discord = require("discord.js");
var IP = "185.249.199.123:30598"
let api1 = `http://${IP}/players.json`
let api2 = `http://${IP}/info.json`

function error(channel, errorCode, errCode) {
    errCode = "Razón: "
    if (errorCode.toString() === "1")
        errCode = "404 - `el server solo esta off`"
    if (errorCode.toString() === "2")
        errCode = "404 - `el server solo esta off`"
    if (errorCode.toString() === "3")
        errCode = "404 - `La licencia del server falla.`"
   let embed = new Discord.RichEmbed()
    .setTitle("ESTADO")
    .setColor('#FA3838')
    .setDescription("Server OFF.")
    .addField("Que ocurre?", errCode)
    channel.send(embed)
}

module.exports.run = async(bot, message, args) => {
    request.get(api2, {timeout: 10000},function (err, response, main) {
        if (err) return error(message.channel, `IP: ${IP}`, 1)
        request.get(api1, {timeout: 10000},function (err, response, body) {
            if (err) return error(message.channel, `IP: ${IP}`, 2)
            request.get(`https://policy-live.fivem.net/api/policy/${JSON.parse(main).vars.sv_licenseKeyToken}`, {timeout: 2000}, function(err, response, content) {
                if (err) return error(message.channel, `IP: ${IP}`, 3)
                try {
                    var start = JSON.parse(body)
                    var start2 = JSON.parse(main)
                    var start3 = JSON.parse(content)

                    if (start == null || start == []) {
                        var playersCount = 0
                    } else {
                        var playersCount = start.length;
                    }

                    if (start3 === [] || start3.length === 0) {
                        var policy = `No policy.`
                    } else {
                        var policy = `${start3.join("\n")}`
                    }

                    let embed = new Discord.RichEmbed()
                    .setTitle("Informacion del server")
                    .setColor('#fc03df')
                    .addField("Jugadores: ", "**" + playersCount + "/" + start2.vars.sv_maxClients + "**", true)
                    .addField("Estado: ", "**On**", true)
                    message.channel.send(embed)
                } catch (err) {
                    console.log(err.toString())
                }
            })
        })
    })
}

module.exports.help = {
    name : "status"
}
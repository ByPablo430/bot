const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    //!Clear
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No tienes permisos");
    if(!args[0]) return message.channel.send("oof")
    message.channel.bulkDelete(args[0], true)
        message.channel.send(`Eliminados ${args[0]} mensajes`).then(msg => msg.delete(2000));
}

module.exports.help = {
    name: "clear"
}
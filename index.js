const Discord = require("discord.js")

const search = require("./commands/info/search")

// allows .env variable to be loaded into global variable that can be accessed anywhere in the code process.env
require("dotenv").config() 

const client = new Discord.Client({
    intents: 32767
})

const prefix = "-"

const welcomeId = "352235792967401472"

client.on("guildMemberAdd", async (member) => { 
    const image = await createImage(member)
    member.guild.channels.cache.get(welcomeId).send({
        content: `<@${member.id}> Welcome!`,
        files: [image]
    })
})

client.once("ready", () => {
    console.log(`Bot now online in ${client.guilds.cache.size} servers.`)
})

client.on("messageCreate", (message) => { 
    if (message.author.bot) return;
 
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const firstArg = args.shift()
    if (!firstArg) return;
    const command = firstArg.toLowerCase()

    if (command === 'hello') {
        message.reply("Hi")
    }

    if (command === 'search') {
        search.execute(message, args.join(' '))
    }

    if (command === 'ping') {
        message.reply("Pong")
    }

})

client.login(process.env.discord_token)

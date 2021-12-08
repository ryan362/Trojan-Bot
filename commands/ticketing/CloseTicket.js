const Command = require('../Command')
fs = require('fs')

module.exports = 
class CloseTicketCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'close',
            properName: 'close',
						description: 'Closes the ticket',
            alias: ['closeticket', 'shutup', 'thispersonisafuckingmoron', 'cl'],
            group: 'ticketing'
        })
    }

    async fn(message) {
        if (message.channel.parent.id == "888260401052123156") {
						console.log('Ran')
            var msgLog = message.channel.messages.fetch({limit: 100})
						.catch(console.error)
            var msgContent = []
            for (let i = 0; i < msgLog.length; i++) {
                let curMsg = msgLog[i]
                msgContent[i] = `${curMsg.createdAt} ${curMsg.author}: ${curMsg.content}`
            }
            // Write to file
            const path = `../../data/${message.channel.id}.txt`
						fs.writeFile(path, "", console.error)
            const writeStream = fs.createWriteStream(path)
            msgContent.forEach(value => writeStream.write(`${value}\n`))
            writeStream.on('finish', () => {
                let chnl = message.guild.channels.cache.get(918229591968055406)
                chnl.send(`Message Logs for ${message.channel.name}`, path)
            })

						message.channel.send("Channel would be deleted at this point.")
            // message.channel.delete(`Deletion of ticket issued by ${message.author.username}#${message.author.discriminator}`)
        }else{
					console.log('This shit is fuckin brokey')
				}
    }
}
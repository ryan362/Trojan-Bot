const Command = require('../Command')
fs = require('fs')

module.exports = class CloseTicketCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'close',
            properName: 'close',
            alias: ['closeticket', 'shutup', 'thispersonisafuckingmoron', 'cl'],
            group: 'ticketing'
        })
    }

    async fn(message) {
        if (message.channel.parentId === '888260401052123156') {
            var msgLog = message.channel.messages.fetch({limit: Infinity})
            var msgContent = []
            for (let i = 0; i < msgLog.length; i++) {
                let curMsg = msgLog[i]
                msgContent[i] = `${curMsg.createdAt} ${curMsg.author}: ${curMsg.content}`
            }
            // Write to file
            message.channel.delete(`Deletion of ticket issued by ${message.author.username}#${message.author.discriminator}`)
        }
    }
}
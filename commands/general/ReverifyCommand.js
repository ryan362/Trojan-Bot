const Util = require('../../Util')
const Command = require('../Command')

module.exports =
class ReverifyCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'reverify',
      properName: 'Reverify',
      aliases: ['trojanreverify'],
      description: 'Displays instructions on how to reverify',
      userPermissions: [],
			group: "general"
    })
  }

  async fn (msg) {
    msg.reply(`To change your verified account, visit ${Util.getVerifyLink(msg.guild)} and verify again.`)
  }
}
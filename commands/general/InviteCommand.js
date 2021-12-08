const Command = require('../Command')
const config = require('../../data/client.json')

module.exports =
class InviteCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'invite',
      properName: 'Invite',
      aliases: ['trojaninvite'],
      description: 'Sends the user an invite link to invite Trojan.',
      userPermissions: [],
			group: "general"
    })
  }

  async fn (msg) {
    msg.author.send(`Use the following link to invite Trojan: <${config.invite}>`).then(() => {
      msg.reply('Sent you a DM with information.')
    }).catch(() => {
      msg.reply('I can\'t seem to message you - please make sure your DMs are enabled!')
    })
  }
}
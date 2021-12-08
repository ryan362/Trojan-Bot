const Command = require('../Command')

module.exports =
class VerifyCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'verify',
      properName: 'Verify',
      aliases: ['getroles', 'getrole'],
			group: 'general',
      userPermissions: [],
      description: "Update the sender's roles and nickname.",
      throttling: { usages: 1, duration: 30 },
			group: "general"
    })
  }

  async fn (msg) {

    const server = await this.discordBot.getServer(msg.guild.id)
    const member = await server.getMember(msg.author.id)

    if (!member) {
      return msg.reply('User not in guild.')
    }

    member.verify({ message: msg })
  }
}
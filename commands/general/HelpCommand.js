const Command = require('../Command')

module.exports =
class HelpCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'trojanhelp',
      properName: 'Trojan',
      aliases: ['trojan'],
      description: 'Displays a description of Trojan',
			group: "general"
    })
  }

  async fn (msg) {
    const output = `Welcome to Trojan, a bot that makes integrating your server with Roblox easy. If you need help, you can join our support server by using the \`${msg.guild.commandPrefix}support\` command. You can run \`${msg.guild.commandPrefix}help\` to see a list of commands.` //For instructions, please see the README at https://github.com/evaera/Trojan/blob/master/README.md.`

    msg.reply(output)
  }
}
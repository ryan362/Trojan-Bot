const Command = require('../Command')
const Database = require("@replit/database")
const db = new Database()
//const Discord = require('discord.js')

module.exports =
class CreateTicketCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ticket',
			properName: 'ticket',
			aliases: ['new', 'create', 'createticket'],
      userPermissions: [],			description: 'Creates a new ticket and assigns it to the user.',
      throttling: { usages: 1, duration: 1000 },			group: "ticketing"
		})
	}

async fn(message) {
		var count
		await db.get(`${message.guild.id}-ticketCount`)
		.then(value => {
			count = parseInt(value)
			return count = count
			});
		if (count === undefined) {
			db.set(`${message.guild.id}-ticketCount`, "0")
			count = 0
		}
		count = (count).toPrecision(8).split('.').reverse().join('');
    const channel = await message.guild.channels.create(`${count}-${message.author.username}`, {parent: "888260401052123156"});
    count = parseInt(count) + 1
		db.set(`${message.guild.id}-ticketCount`, count.toString())

  		// Customer's Permissions:
  	channel.updateOverwrite(message.author, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true,
      READ_MESSAGE_HISTORY: true,
      ATTACH_FILES: true
      
    });

		//var sendMessages = true;
  
    const reactionMessage = await channel.send("**Welcome to Trojan Technologies Customer Support!** \n\nPlease, describe your reason for creating a ticket in detail. Also, be patient, our team will respond to your ticket within the next 72 hours.");

    try {
      await reactionMessage.react("✅")
      await reactionMessage.react("🔒");
      await reactionMessage.react("⚠️");
    } catch (err) {
      channel.send("Error sending emojis!");
      throw err;
    }

    message.channel
      .send(`Please, go to ${channel} and describe your reason for creating this customer support ticket. Also, be patient, our team will respond to the ticket within the next 72 hours.`)
      .then((msg) => {
        setTimeout(() => msg.delete(), 10000);
        setTimeout(() => message.delete(), 7000);
      })
      .catch((err) => {
        throw err;
      });
/*
		const collector = reactionMessage.createReactionCollector();

    await collector.on('collect', (reaction, user) => {
			let member = message.guild.members.cache.find(user)
			if (!member.hasPermission("MANAGE_MESSAGES")) {
				return;
			}
      switch (reaction.emoji.name) {
        case "🔒":
          if (sendMessages === true) {
            channel.updateOverwrite(message.author, { SEND_MESSAGES: false });
            sendMessages = false;
          } else if (sendMessages === false) {
            channel.updateOverwrite(message.author, { SEND_MESSAGES: true });
            sendMessages = true;
          }
          break;
          
        case "✅":
          channel.send("Deleting channel in 5 seconds.");
          setTimeout(() => channel.delete(), 5000);
          break;
          
        case "⚠️":
          channel.send("Hey <@350094566277251072> or <@249572165337219073>, we need your help!");
          break;
      }
    });
  */
  }
};
  
/*
	async fn (msg) {
		const gld = msg.guild
    var ticketing = 0
		var chnls = undefined;
		msg.guild.channels.fetch()
			.then(fetched => chnls = fetched)
			.catch(console.error);
   //const ticketing = msg.guild.channels.cache.get('738649796897800235') 
		if (!chnls.has('trojan | ticketing'')) {
			var catprop = {
				type: 'GUILD_CATEGORY',
				permissionOverrides: {VIEW_CHANNEL: false},
				position: 0
			}
			ticketing = gld.channels.create('trojan | ticketing', catprop)
		}else{
			print(chnls)
			ticketing = chnls.ticketing	
			var tchnls = undefined;
				ticketing.channels.fetch()
					.then(fetched => tchnls = fetched)
					.catch(console.error);
			for (let i = 0; i <= ticketing.channels.size; i++) {
				let curChnl = tchnls[i]
				if (curChnl.includes(msg.author.username)) {
					break
					msg.channel.send("`Error: You already have a ticket open, please close that before opening a new one.`")
					return
				}
			}
    }
		const properties = {
			type: 'GUILD_TEXT',
    //type: 'GUILD_PRIVATE_THREAD'
			topic: 'A private channel for you to discuss your questions and concerns.',
			parent: ticketing,
			permissionOverrides: {VIEW_CHANNEL: false},
			position: ticketing.children.size
		}
		gld.channels.create(`#${ticketing.children.size}-${msg.author.username}`, properties)
	}
}
*/
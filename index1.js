/*require('dotenv').config()
const request = require('request-promise')
const Discord = require('discord.js') 
const Commando = require('discord.js-commando')
const { GlobalCache } = require('./GlobalCache')
const path = require('path')
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const config = require('./data/client.json')
const Util = require('./Util.js')

const client = new Commando.Client ({
	owner: '249572165337219073',
	commandPrefix: 'r!'
})

client
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log)
	.on('ready', () => {
		console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
	})
	.on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnecting', () => { console.warn('Reconnecting...'); })
	.on('commandError', (cmd, err) => {
		if(err instanceof commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		console.log(oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	});

client.setProvider(
    sqlite.open({ filename: 'database.db', driver: sqlite3.Database }).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

/*client.registry
   // Registers the custom command groups
    .registerGroups([
        ['setup', 'Settings/Setup Commands'],
        ['ranking', 'Ranking Commands'],
				['general', 'General Commands'],
				['utility', 'Utility Commands']
    ])

    // Registers all built-in groups, commands, and argument types
    .registerDefaults()

    // Registers all of the commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));*/

// trojan code below
/*const shardingManager = new Discord.ShardingManager(path.join(__dirname, 'Shard.js'), {
  token: config.token,
  totalShards: config.totalShards || 'auto',
  shardArgs: typeof v8debug === 'object' ? ['--inspect'] : undefined,
  execArgv: ['--trace-warnings']
})

shardingManager.on('shardCreate', shard => {
  console.log(`Launching shard ${shard.id + 1}/${shardingManager.totalShards}`)
})

shardingManager.spawn(config.totalShards || 'auto', 8000, -1)

// Instantiate a GlobalCache, which will cache information from the shards.
global.GlobalCache = new GlobalCache(shardingManager)

// Set bot status messages
let currentActivity = 0
let totalUsers = null

async function getNextActivity () {
  currentActivity++
  if (currentActivity === 2 && totalUsers == null) currentActivity++

  if (currentActivity > 3) {
    currentActivity = 0
  }

  switch (currentActivity) {
    case 0:
      return { text: 'https://glitch.trojan.technology/discord' }
    case 1: {
      let totalGuilds = (await shardingManager.fetchClientValues('guilds.cache.size')).reduce((prev, val) => prev + val, 0)
      totalGuilds = Util.toHumanReadableNumber(totalGuilds)
      return { text: `${totalGuilds} servers`, type: 'WATCHING' }
    } case 2:
      return { text: `${totalUsers} users`, type: 'LISTENING' }
    case 3:
      return { text: '!trojan', type: 'LISTENING' }
  }
}

request('https://verify.eryn.io/api/count')
  .then(count => {
    totalUsers = Util.toHumanReadableNumber(count)
  })

/*setInterval(async () => {
  if (shardingManager.shards.size === shardingManager.totalShards) {
    shardingManager.broadcast({
      action: 'status',
      argument: await getNextActivity()
    })
  }
}, 15000)*/

// If updateServer is defined, start that up as well.
/*if (config.updateServer) {
  updateServer(shardingManager, config.updateServer)
}

if (config.mainLifeTime) {
  setTimeout(() => {
    shardingManager.respawn = false
    shardingManager.broadcastEval('process.exit()')
  }, config.mainLifeTime * 1000)

  setTimeout(() => {
    process.exit()
  }, (config.mainLifeTime + 5) * 1000)
}

client.login(process.env.token)
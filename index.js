const fs = require('node:fs'); // fs is Node's native file system module.
const path = require('node:path'); // path is Node's native path utility module.
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
// https://discordjs.guide/popular-topics/intents.html#enabling-intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection(); // Collection is a class that extends JavaScript's native Map

// command를 client에 등록하는 과정
{
	const commandsPath = path.join(__dirname, 'commands');
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		client.commands.set(command.data.name, command);
	}
}

// 위의 command와 같은 파일 내부의 interaction 등록하는 과정
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// 위의 command와 별개로 interaction 등록하는 과정
{
	const eventsPath = path.join(__dirname, 'events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
}

client.login(token);

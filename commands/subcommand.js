const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get info about a user of a server')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Info about a user')
				.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Info about the server')),
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction){
		if (interaction.options.getSubcommand() === 'user')
			interaction.reply(`${interaction.user.tag}`);
		else if (interaction.options.getSubcommand() === 'server')
			interaction.reply(`${interaction.guild.name}(${interaction.guildId})`);
	}
}

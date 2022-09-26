const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('쉬')
		.setDescription('쉬아~'),
	async execute(interaction) {
		await interaction.reply('졸졸졸...');
	},
};

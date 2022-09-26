const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('똥')
		.setDescription('휴지필수'),
	async execute(interaction) {
		await interaction.reply('뿌지직');
	},
};

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('방구')
		.setDescription('냄새남'),
	async execute(interaction) {
		await interaction.reply('뿡!!!');
	},
};

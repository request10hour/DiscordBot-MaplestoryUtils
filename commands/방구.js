const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('방구끼기')
		.setDescription('냄새남'),
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction) {
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('환기하기')
				.setLabel('환기하기')
				.setStyle(ButtonStyle.Primary)
				.setEmoji('🪟'),
			new ButtonBuilder()
				.setCustomId('그대로두기')
				.setLabel('그대로두기')
				.setStyle(ButtonStyle.Danger)
				.setEmoji('☠️'),
		)
		await interaction.reply({ content: '뿡!💨💨💨', components: [row] });
	},
};

const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('쉬싸기')
		.setDescription('똥싸면 자동으로 나오는데 굳이 단독선택을'),
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction) {
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
			.setCustomId('물내리기')
			.setLabel('물내리기')
			.setStyle(ButtonStyle.Primary),
		);
		await interaction.reply({content: '쉬~', components: [row]});
	},
};

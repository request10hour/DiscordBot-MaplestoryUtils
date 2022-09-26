const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('똥싸기')
		.setDescription('휴지필수'),
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction) {
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
			.setCustomId('똥치우기')
			.setLabel('똥치우기')
			.setStyle(ButtonStyle.Danger)
			.setEmoji('💩'),
		)
		await interaction.reply({content: '뿌지지지직!', components: [row]});
	},
};

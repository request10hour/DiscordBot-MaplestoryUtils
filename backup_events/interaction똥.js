const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
	name: 'interactionCreate',
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction) {
		if (!interaction.isButton) return;
		if (interaction.customId === '똥치우기') {
			const row = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId('휴지버리기')
					.setLabel('휴지버리기')
					.setStyle(ButtonStyle.Success)
					.setEmoji('🧻'),
			)
			await interaction.update({ content: '똥치워땨 휴', components: [row] });
		}
		else if (interaction.customId === '휴지버리기') {
			await interaction.update({ content: '쓰레기통 골인!', components: [] });
		}
	}
}

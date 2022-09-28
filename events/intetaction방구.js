module.exports = {
	name: 'interactionCreate',
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction) {
		if (!interaction.isButton()) return;
		if (interaction.customId.match('환기하기')) {
			await interaction.update({ content: '야호! 살았다!', components: [] });
		}
		else if (interaction.customId.match('그대로두기')) {
			await interaction.update({ content: '방구에 질식해 그만 정신을 잃었습니다', components: [] });
		}
	},
};

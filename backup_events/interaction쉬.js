module.exports = {
	name: 'interactionCreate',
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction) {
		if (!interaction.isButton()) return;
		if (interaction.customId === '물내리기') {
			await interaction.update({ content: '물내려땨 앗싸!', components: [] });
		}
	},
};

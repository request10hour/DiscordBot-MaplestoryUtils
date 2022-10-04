const date = new Date();

module.exports = {
	name: 'interactionCreate',
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	execute(interaction) {
		console.log(date + `${interaction.user.tag} in #${interaction.channel.name} \
triggered ${interaction.commandName === undefined ? interaction.id : interaction.commandName}.`);
	},
};

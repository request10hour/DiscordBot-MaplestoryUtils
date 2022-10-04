const date = new Date();

module.exports = {
	name: 'interactionCreate',
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	execute(interaction) {
		console.log(`[\'${new Intl.DateTimeFormat('kr', {dateStyle: 'medium', timeStyle: 'medium'}).format(date)}\', \
\'${interaction.user.tag}\', \'#${interaction.channel.name}\', \'${interaction.guild.name}\', \
\'${interaction.commandName === undefined ? interaction.customId : interaction.commandName}\'],`);
	},
};

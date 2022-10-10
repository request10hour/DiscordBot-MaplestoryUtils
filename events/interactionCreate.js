module.exports = {
	name: 'interactionCreate',
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	execute(interaction) {
		var iChannelname;
		var iGuildname;
		const iOptionvalue = [];

		if (!interaction.channel) iChannelname = null;
		else iChannelname = interaction.channel.name;

		if (!interaction.guild) iGuildname = null;
		else iGuildname = interaction.guild.name;

		if (!interaction.options || !interaction.options._hoistedOptions[0]) iOptionvalue.push('null');
		else {
			for (i in interaction.options._hoistedOptions)
				iOptionvalue.push(interaction.options._hoistedOptions[i].value);
		}
		const date = new Date();
		console.log(`[\'${new Intl.DateTimeFormat('kr', { dateStyle: 'medium', timeStyle: 'medium' }).format(date)}\', \
\'${interaction.user.tag}\', \'#${iChannelname}\', \'${iGuildname}\', \
\'${interaction.commandName === undefined ? interaction.customId : interaction.commandName}\', \'${iOptionvalue}\'],`);
	},
};

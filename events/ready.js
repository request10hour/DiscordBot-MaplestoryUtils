module.exports = {
	name: 'ready',
	once: true,
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('뚱소리')
		.setDescription('뚜이가 이상한말을 해땨'),
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction) {
		await interaction.reply({files: ['https://media.discordapp.net/attachments/605106925750714387/1024693663063867473/unknown.png?width=695&height=695']});
	},
};

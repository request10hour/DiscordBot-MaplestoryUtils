const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('검색')
		.setDescription('구글 검색')
		.addStringOption(option => option
			.setName('구글_검색')
			.setDescription('검색어를 입력하세요')
			.setRequired(true)),
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction) {
		await interaction.reply({ content: `https://www.google.com/search?q=${interaction.options.getString('구글_검색').replaceAll(' ', '%20')}` })
	},
};

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('찬양')
		.setDescription('찬양짤')
		.addStringOption(option => option
			.setName('찬양한다누구를')
			.setDescription('찬양찬양찬양')
			.setRequired(true)
			.addChoices(
				{ name: '강원기', value: '강원기' },
				{ name: '이사장', value: '이사장' },)),
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction) {
		var imageUrl;
		const whois = interaction.options.getString('찬양한다누구를');
		if(whois === '강원기')
			imageUrl = 'https://cdn.discordapp.com/attachments/664852880783704068/1027569904536256532/e238e18e02077525.png';
		else if(whois === '이사장')
			imageUrl = 'https://cdn.discordapp.com/attachments/664852880783704068/1027569379547820092/--.jpg';
		await interaction.reply({files: [imageUrl]});
	},
};

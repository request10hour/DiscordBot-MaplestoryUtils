const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('똥의_모양을_적어주세요')
		.setDescription('addStringOption method test')
		.addStringOption(option =>
			option.setName('똥의_모양')
				.setDescription('똥은 여러가지 모양이 있다')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply(`${interaction.options.getString('똥의_모양')}모양의 똥을 쌌군여...`);
	},
};

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('똥의_모양을_적어주세요')
		.setDescription('addStringOption method test')
		.addStringOption(option =>
			option.setName('똥의_모양')
				.setDescription('똥은 여러가지 모양이 있다')
				.setRequired(true)
				.addChoices(
					{ name: '네모', value: '네모네모한' },
					{ name: '세모', value: '삼각김밥가튼' },
					{ name: '동그라미', value: '동글동글한' },
					{ name: '뚱샘', value: '김뚱이밤새눙' },
					{ name: '메떵', value: '떠이가메롱하눙' },
				)),
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction) {
		const string = interaction.options.getString('똥의_모양');
		if (string === '떠이가메롱하눙')
		await interaction.reply({content: `${interaction.options.getString('똥의_모양')}모양의 똥을 쌌군여...😝`});
		else
		await interaction.reply(`${interaction.options.getString('똥의_모양')}모양의 똥을 쌌군여...`);
	},
};

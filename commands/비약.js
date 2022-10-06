const { SlashCommandBuilder } = require('discord.js')
const expportiontable = require('../db/expportiontable.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('비약')
		.setDescription('레벨별 비약 사용시 상승량')
		.addStringOption(option => option
			.setName('비약종류')
			.setDescription('사용할 비약 종류를 선택하세요')
			.setRequired(true)
			.addChoices(
				{ name: '익성비', value: '익스트림 성장의 비약 (~199)' },
				{ name: '성장의비약1 (~209)', value: '~209 성장의 비약' },
				{ name: '성장의비약2 (~219)', value: '~219 성장의 비약' },
				{ name: '성장의비약3 (~229)', value: '~229 성장의 비약' },
				{ name: '태성비', value: '태풍 성장의 비약 (~239)' },
				{ name: '극성비', value: '극한 성장의 비약 (~249)' },
			))
		.addIntegerOption(option => option
			.setName('레벨')
			.setDescription('비약을 사용할 레벨을 입력하세요')
			.setRequired(true)
			.setMinValue(200)
			.setMaxValue(299)),
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction) {
		const portionname = interaction.options.getString('비약종류');
		const level = interaction.options.getInteger('레벨').toString();
		const restult = expportiontable.find(portion => portion.level === level);
		await interaction.reply(`**${level}**레벨에서 **${portionname}**사용시 획득 경험치량
**${restult[portionname]}**`);
	}
}

const { SlashCommandBuilder } = require("discord.js");
const bosstable = require('../db/bosstable.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('보스')
		.setDescription('보스 체력/결정석 가격 정보')
		.addStringOption(option => option
			.setName('보스이름')
			.setDescription('보스의 난이도 또는 이름을 입력해주세요. 키워드 예시) ‘이지 루시드’, ‘윌’, ‘하드’')
			.setRequired(true),
		),
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction) {
		const bossname = interaction.options.getString('보스이름');
		const splited = bossname.split('');
		const joined = '(.*)' + splited.join('(.*)') + '(.*)';
		const reg = new RegExp(joined, 'g');
		const out = [];
		var searched = 0;
		for (i in bosstable) {
			if (bosstable[i].name.match(reg)) {
				if (!bosstable[i].price){
					var price = '결정석 정보 없음';
				}
				else {
					var price = bosstable[i].price;
				}
				out.push('\n**' + bosstable[i].name + '** - ' + bosstable[i].hp + ' - ' + price);
				searched++;
			}
		}
		if (searched == 0) {
			await interaction.reply('보스명을 찾을 수 없습니다');
		}
		else {
			await interaction.reply(`${out}`);
		}
	}
}

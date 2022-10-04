const { default: axios } = require('axios');
const cheerio = require('cheerio');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('무릉')
		.setDescription('무릉도원이세요?')
		.addStringOption(option => option
			.setName('캐릭터이름')
			.setDescription('검색할 캐릭터명을 입력하세요')
			.setRequired(true)),
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction) {
		try {
			const charname = interaction.options.getString('캐릭터이름');
			const sync = await axios.get('https://maple.gg/u/' + encodeURIComponent(charname) + '/sync');
			const resp = await axios.get('https://maple.gg/u/' + encodeURIComponent(charname));
			const $ = cheerio.load(resp.data);
			const namesection = $('.align-middle');
			const realcharname = namesection.eq(1).text();
			// 존재하지 않는 캐릭터 예외처리
			if (!realcharname) {
				throw 'nouser';
			}
			const floor = $('.user-summary-floor');
			const duration = $('.user-summary-duration');
			const elements = $('.user-summary-item');
			const out = [];
			elements.each((idx, el) => {
				out.push($(el).text().replaceAll(' ', ''));
			})
			const reg = /.[0-9]/g;
			const floorNum = floor.eq(0).text().match(reg);
			// 무릉 층 데이터 없는 경우 예외처리
			if (!floorNum) {
				throw 'floor null data';
			}
			else {
				await interaction.reply({
					content:
						`${realcharname}(${out[1]}) - ${floorNum}층(${duration.eq(0).text()})`
				});
			}
		} catch (error) {
			if (error === 'floor null data') {
				await interaction.reply('무릉 데이터 없음');
			}
			else {
				console.log(error);
				await interaction.reply('검색 오류');
			}
		}
	},
};

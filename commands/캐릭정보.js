const { default: axios } = require('axios');
const cheerio = require('cheerio');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('캐릭정보')
		.setDescription('메이플 캐릭터 정보 검색')
		.addStringOption(option => option
			.setName('캐릭터이름')
			.setDescription('검색할 캐릭터명을 입력하세요')
			.setRequired(true)),
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction) {
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('경험치히스토리')
				.setLabel('경험치히스토리')
				.setStyle(ButtonStyle.Primary)
				.setEmoji('📔'),
		)
		const row0 = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('최신정보가아니에요')
				.setLabel('최신정보가아니에요')
				.setStyle(ButtonStyle.Danger)
				.setEmoji('🔁'),
		)
		try {
			const charname = interaction.options.getString('캐릭터이름');
			const sync = await axios.get('https://maple.gg/u/' + encodeURIComponent(charname) + '/sync');
			const resp = await axios.get('https://maple.gg/u/' + encodeURIComponent(charname));
			const $ = cheerio.load(resp.data);
			const namesection = $('.align-middle');
			const charimage = $('.character-image');
			const elements = $('.user-summary-item');
			const out = [];
			elements.each((idx, el) => {
				out.push($(el).text().replaceAll(' ', ''));
			})
			await interaction.reply({
				content:
					`**이름** ${namesection.eq(1).text()}\n**직업** ${out[1]}\n**서버** ${namesection.eq(0).attr('alt')}\n\
${out[0]}`, files: [charimage.attr('src')], components: [row, row0]
			});
		} catch (error) {
			await interaction.reply('검색 오류');
		}

	},
};

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
		try {
			const charname = interaction.options.getString('캐릭터이름');
			const sync = await axios.get('https://maple.gg/u/' + encodeURIComponent(charname) + '/sync');
			const resp = await axios.get('https://maple.gg/u/' + encodeURIComponent(charname));
			const $ = cheerio.load(resp.data);
			const server = $('.align-middle');
			const charimage = $('.character-image');
			const elements = $('.user-summary-item');
			const out = [];
			elements.each((idx, el) => {
				out.push($(el).text().replaceAll(' ', ''));
			})
			await interaction.reply({
				content:
					`**이름** ${server.eq(1).text()}\n**직업** ${out[1]}\n**서버** ${server.eq(0).attr('alt')}\n\
${out[0]}`, files: [charimage.attr('src')], components: [row]
			});
		} catch (error) {
			await interaction.reply('검색 오류');
		}

	},
};

const { default: axios } = require('axios');
const cheerio = require('cheerio');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction) {
		if (!interaction.isButton()) return;
		if (interaction.customId === '최신정보가아니에요') {
			const charname = interaction.message.toString().split('\n')[0].split(' ')[1];
			interaction.message.delete();
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
		}
	},
};

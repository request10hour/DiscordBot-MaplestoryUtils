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
		if (interaction.customId === '최신정보가아니에요2') {
			const row = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId('경험치히스토리2')
					.setLabel('경험치히스토리2')
					.setStyle(ButtonStyle.Primary)
					.setEmoji('📔'),
			)
			const row0 = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId('최신정보가아니에요2')
					.setLabel('최신정보가아니에요2')
					.setStyle(ButtonStyle.Danger)
					.setEmoji('🔁'),
			)
			try {
				const charname = interaction.message.embeds[0].data.fields[0].name.split('/')[0].split('*').join('');
				const encodedUrl = 'https://maple.gg/u/' + encodeURIComponent(charname);
				const sync = await axios.get(encodedUrl + '/sync');
				const resp = await axios.get(encodedUrl);
				const $ = cheerio.load(resp.data);
				const namesection = $('.align-middle');
				const charimage = $('.character-image');
				const elements = $('.user-summary-item');
				const out = [];
				elements.each((idx, el) => {
					out.push($(el).text().replaceAll(' ', ''));
				})
				//무릉
				const floor = $('.user-summary-floor');
				const duration = $('.user-summary-duration');
				elements.each((idx, el) => {
					out.push($(el).text().replaceAll(' ', ''));
				})
				const reg = /.[0-9]/g;
				const floorNum = floor.eq(0).text().match(reg);
				// 무릉 층 데이터 없는 경우 예외처리
				var floor_duration;
				if (!floorNum) {
					floor_duration = '무릉 데이터 없음';
				}
				else {
					floor_duration = `${floorNum}층(${duration.text()})`;
				}
				//유니온
				const tier = $('.user-summary-tier-string');
				const level = $('.user-summary-level');
				elements.each((idx, el) => {
					out.push($(el).text().replaceAll(' ', ''));
				})
				const tierText = tier.eq(0).text();
				const levelText = level.eq(0).text();
				// 유니온 데이터 없는 경우 예외처리
				var tier_level;
				if (!tierText) {
					tier_level = '유니온 데이터 없음\n(본캐로 검색 권장)';
				}
				else {
					tier_level = `${tierText}(${levelText})`;
				}
				//임베드
				const exampleEmbed = {
					color: 0xfff48b,
					author: {
						name: '캐릭정보(타이틀 클릭시 maple.gg 연결)',
						icon_url: 'https://i.imgur.com/bmJbuDN.png',
						url: encodedUrl,
					},
					description: '캐릭터 검색 결과입니다',
					fields: [
						{
							name: `**${namesection.eq(1).text()}/${namesection.eq(0).attr('alt')}**`,
							value: `${out[1]} ${out[0]}`,
						},
						{
							name: '**무릉**',
							value: floor_duration,
							inline: true,
						},
						{
							name: '**유니온**',
							value: tier_level,
							inline: true,
						},
					],
					image: {
						url: 'attachment://image.png',
					},
				};
				const exampleEmbed0 = {
					color: 0xfff48b,
					author: {
						name: '경험치히스토리',
						icon_url: 'https://i.imgur.com/bmJbuDN.png',
						url: 'https://discord.js.org',
					},
				};

				await interaction.update({
					embeds: [exampleEmbed, exampleEmbed0], files: [{
						attachment: charimage.attr('src'),
						name: 'image.png'
					},], components: [row, row0],
				});
			}
			catch (error) {
				console.error(error);
				await interaction.reply('검색 오류');
			}
		}
	},
};

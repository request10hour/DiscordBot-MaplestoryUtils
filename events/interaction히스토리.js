const { default: axios } = require('axios');
const cheerio = require('cheerio');

module.exports = {
	name: 'interactionCreate',
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction) {
		if (!interaction.isButton()) return;
		if (interaction.customId === '경험치히스토리') {
			const msg = interaction.message.toString();
			const resp = await axios.get('https://maple.gg/u/' + encodeURIComponent(msg.split('\n')[0].split(' ')[1]));
			const $ = cheerio.load(resp.data);
			const script = $('script');
			var hist;
			for (var i = 0; i < script.length; i++) {
				try {
					if (script[i].children[0].data.includes('expHistoryLabels')) {
						hist = script[i].children[0].data;
						break;
					}
				}
				catch {
					continue;
				}
			}
			const histarr = hist.split('\n');
			var expHistoryLabels;
			var expColumns;
			var check = true;
			for (i in histarr) {
				if (check && histarr[i].includes('expHistoryLabels')) {
					expHistoryLabels = histarr[i];
					check = false;
				}
				if (histarr[i].includes('columns')) {
					expColumns = histarr[i];
				}
			}
			// / /g : 정규식 틀
			// \[ : 대괄호로 시작
			// \] : 대괄호로 끝남
			// (.*) : 아무 문자열
			const reg = /\[(.*)\]/g;
			const s_expHistoryLabels = expHistoryLabels.match(reg);
			const s_expColumns = expColumns.match(reg);
			const p_expHistoryLabels = JSON.parse(s_expHistoryLabels);
			const p_expColumns = JSON.parse(s_expColumns);
			console.log(p_expHistoryLabels.length + p_expColumns[0].length);
			const expPrint = [];
			for (var i = 0; i < p_expHistoryLabels.length; i++) {
				const expDate = p_expColumns[0][i + 1];
				const expLevel = p_expHistoryLabels[i].level;
				const expPercent = p_expHistoryLabels[i].exp;
				expPrint.push('\n' + expDate + ' : ' + expLevel + '레벨 (' + expPercent + '%)');
			}
			await interaction.update({ content: msg + '\n' + expPrint, components: [] });
		}
	},
};

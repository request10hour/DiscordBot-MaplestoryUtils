const { default: axios } = require('axios');
const cheerio = require('cheerio');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('검색')
		.setDescription('구글 검색')
		.addStringOption(option => option
			.setName('구글_검색')
			.setDescription('검색어를 입력하세요')
			.setRequired(true)),
	/**
	 * @param {import("discord.js").Interaction} [interaction]
	 */
	async execute(interaction) {
		const search = interaction.options.getString('구글_검색');
		const url = `https://www.google.com/search?q=${encodeURI(search)}`;
		// console.log(url);
		// const resp = await axios.get(`${url}&tbm=isch`);
		// console.log(`${url}&tbm=isch`);
		// const $ = cheerio.load(resp.data);
		// console.log($('img').prop('src'));
		await interaction.reply({ content: search + ' : ' + url, files: [] })
	},
};

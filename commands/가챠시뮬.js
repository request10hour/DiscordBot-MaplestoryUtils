const { SlashCommandBuilder } = require('discord.js')
const royaltable = require('../db/royaltable.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('가챠시뮬')
        .setDescription('내 꿈은 로또 1등')
        .addStringOption(option => option
            .setName('가챠종류')
            .setDescription('어떤 가챠를 하시겠어요?')
            .setRequired(true)
            .addChoices(
                { name: '로또', value: '로또' },
                { name: '로얄', value: '로얄' },
            ))
        .addIntegerOption(option => option
            .setName('구매개수')
            .setDescription('시뮬에서라도 많이 사보기...')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(9999999)),

    /**
     * @param {import("discord.js").Interaction} [interaction]
     */
    async execute(interaction) {
        if (interaction.options.getString('가챠종류') === '로또') {
            var results = [0, 0, 0, 0, 0, 0]
            for (var i = 0; i < interaction.options.getInteger('구매개수'); i++) {
                const onetry = Math.random();
                if (onetry < 1 / 8145060) results[0]++;
                else if (onetry < 1 / 1357510) results[1]++;
                else if (onetry < 1 / 35724) results[2]++;
                else if (onetry < 1 / 733) results[3]++;
                else if (onetry < 1 / 45) results[4]++;
                else results[5]++;
            }
            await interaction.reply(`1등 ***${results[0]}***회
2등 ***${results[1]}***회
3등 ***${results[2]}***회
4등 ***${results[3]}***회
5등 ***${results[4]}***회
꽝! ***${results[5]}***회`);
        }
        else if (interaction.options.getString('가챠종류') === '로얄') {
            const royalcount = royaltable.length;
            var results = new Array(royaltable.length);
            const realresults = [];
            results.fill(0);
            for (var i = 0; i < interaction.options.getInteger('구매개수'); i++) {
                const onetry = Math.random() * 100 * 100;
                var percent = 0;
                for (var j = 0; j < royalcount; j++) {
                    percent += Number(royaltable[j].획득확률.replace('%', '')) * 100;
                    if (onetry < percent) {
                        results[j]++;
                        break;
                    }
                }
            }
            for (var i = 0; i < royalcount; i++) {
                var itemname;
                if (royaltable[i].아이템명.includes('[스페셜 라벨]')) {
                    itemname = '**' + royaltable[i].아이템명 + '**';
                }
                else { itemname = royaltable[i].아이템명; }
                realresults.push(`\n${itemname} - ${results[i]}개`);
            }
            await interaction.reply(`${realresults}`);
        }
    }
}

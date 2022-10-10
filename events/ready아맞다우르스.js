const CronJob = require('cron').CronJob;

module.exports = {
	name: 'ready',
	/**
	 * @param {import("discord.js").Client} [client]
	 */
	async execute(client) {
		const channel = client.channels.cache.get('664852880783704068');
		const job = new CronJob(
			'30 22 * * *',
			function () {
				channel.send(`아맞다우르스!`);
			},
			null,
			true,
			'Asia/Seoul',
		)

	},
}

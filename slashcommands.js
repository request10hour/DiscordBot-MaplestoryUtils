const { REST, Routes } = require('discord.js');
const { token, clientId } = require('./config.json');
const fs = require('node:fs');

const commands = [];
// readdirSync 인자로 받은 디렉토리 내부 파일을 읽음
// filter 각 file(파일명)에 대해 '.js'로 끝나는 파일들만 필터
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// commandFiles에는 '.js'로 끝나는 파일명들이 들어가있음, 각 파일명을 돌면서
// 각 파일의 module.exports -> require로 받아옴
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// 데이터를 json형식의 문자열로 변환하여 commands에 push함
	// SlashCommandBuilder가 알아서 해줌
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

// https://ko.javascript.info/async-await
// function 앞에 async 키워드 추가
// promise를 리턴하는 모든 비동기 함수 앞에 await 추가
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// put()메소드가 promise리턴 * Runs a put request from the api
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

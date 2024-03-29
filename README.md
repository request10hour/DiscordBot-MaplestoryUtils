ctrl shift p -> reload window

1. npm init -y
2. npm install discord.js
3. npm install --save-dev eslint (vscode eslint 설치)
4. .eslintrc.json 생성
   ```json
   {
		"extends": "eslint:recommended",
		"env": {
			"node": true,
			"es6": true
		},
		"parserOptions": {
			"ecmaVersion": 2021
		},
		"rules": {
			"arrow-spacing": ["warn", { "before": true, "after": true }],
			"brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
			"comma-dangle": ["error", "always-multiline"],
			"comma-spacing": "error",
			"comma-style": "error",
			"curly": ["error", "multi-line", "consistent"],
			"dot-location": ["error", "property"],
			"handle-callback-err": "off",
			"indent": ["error", "tab"],
			"keyword-spacing": "error",
			"max-nested-callbacks": ["error", { "max": 4 }],
			"max-statements-per-line": ["error", { "max": 2 }],
			"no-console": "off",
			"no-empty-function": "error",
			"no-floating-decimal": "error",
			"no-inline-comments": "error",
			"no-lonely-if": "error",
			"no-multi-spaces": "error",
			"no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1, "maxBOF": 0 }],
			"no-shadow": ["error", { "allow": ["err", "resolve", "reject"] }],
			"no-trailing-spaces": ["error"],
			"no-var": "error",
			"object-curly-spacing": ["error", "always"],
			"prefer-const": "error",
			"quotes": ["error", "single"],
			"semi": ["error", "always"],
			"space-before-blocks": "error",
			"space-before-function-paren": ["error", {
				"anonymous": "never",
				"named": "never",
				"asyncArrow": "always"
			}],
			"space-in-parens": "error",
			"space-infix-ops": "error",
			"space-unary-ops": "error",
			"spaced-comment": "error",
			"yoda": "error"
		}
	}
	```
5. 콜백, 앞에 붙여서 타입을 지정
	```javascript
		/**
		 * @param {import("discord.js").Interaction} [interaction]
		 */
	```
6. new ButtonBuilder()에서 CustomId, Label, Style은 필수요소임!
7. axios(http request), cheerio(dom구성)를 이용하여 크롤링
8. 프레이의 요구
	경험치히스토리
	무릉, 유니온
	보스 체력, 보상 (무릉 층수별 보스 가능)

9. 정규식 regex를 이용한 문자열 검색, 조작 - 보스, 무릉, 히스토리 검색에서 사용
10. pm2를 사용해서 (discordjs 공식문서에서 권장) 프로세스 실행 관리
11. 메세지 컨텐츠 (명령어 아님)을 읽어오기 위해서
	```
	1. discord developers portal 에서 봇의 message intent 권한 설정
	2. client 에 [GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] intent 추가
	intent calculator 참고 (https://discord-intents-calculator.vercel.app/)
	3. 이벤트 수신기 이름은 'messageCreate'
	```
12. favicon은 홈페이지의 메인 아이콘...https://maplestory.nexon.com/favicon.ico과 같이 접근 가능

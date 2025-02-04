---
title: Talking with Home Assistant - get your system up & running
related:
  - docs: /voice_control/android/
    title: Assist on Android
  - docs: /voice_control/apple/
    title: Assist on Apple
  - docs: /voice_control/thirteen-usd-voice-remote/
    title: Build a $13 voice remote using an ESPHome device
  - docs: /voice_control/best_practices/
    title: Best practices with Assist
  - url: https://www.nabucasa.com/config/assist/
    title: Home Assistant Cloud
  - url: https://voice-pe.home-assistant.io/
    title: Voice Preview Edition
---

This section will help you set up Assist, which is Home Assistant voice assistant.

Assist allows you to control Home Assistant using natural language. It is built on top of an open voice foundation and powered by knowledge provided by our community.

Assist is available to use on most platforms that can interface with Home Assistant. Look for the Assist icon <img src='/images/assist/assist-icon.svg' alt='Assist icon' style='height: 32px' class='no-shadow'>:

As for the rest of Home Assistant core functionalities, Assist can be personalized and extended to fit your needs.
- It can work locally or leverage the greatest LLMs of the moment.
- It can work on your phone or tablet or other custom voice devices.

<lite-youtube videoid="XF53wUbeLxA" videotitle="Voice at Home Assistant"></lite-youtube>

Although adding voice to your smart home configuration is exciting, it will require you to check your existing setup of Home Assistant, especially if you made a lot of customization. But we have prepared a guide of steps and best practices to help you out, as well as our [Troubleshooting](/voice_control/troubleshooting/) guides.

Ready? Now let's get started

- [I plan to use a local speech-to-text/text-to-speech setup](/voice_control/voice_remote_local_assistant/)
- [I plan to use Home Assistant Cloud](/voice_control/voice_remote_cloud_assistant/) (recommended as it is the simplest)

## Expand and Experiment

Once your setup is up and running and you follow the [best practices](/voice_control/best_practices), check all the possibilities we found for [Expanding your Assist setup](/voice_control/expanding_assist), and further experiment with different setups like [wake words](/voice_control/about_wake_word/). Do you want to talk to Super Mario? Or another figure? If you want Assist to respond in a fun way, you can create an assistant with an [AI personality](/voice_control/assist_create_open_ai_personality/).

Another things you can do to further push your setup:

- Voice assistant devices allow you to add Assist to a room and respond to wake words. Follow our tutorial to [create your own for just $13.](/voice_control/thirteen-usd-voice-remote/)

- You can use [ESPHome](https://www.esphome.io/components/voice_assistant.html) to create your own awesome voice assistant, like [@piitaya](https://github.com/piitaya) did with his 3D printed R5 droid:

- If you are interested in a voice assistant that is not always listening, consider using Assist on an analog phone. It will only listen when you pick up the horn, and the responses are for your ears only. Follow our tutorial to create your own [analog phone voice assistant](/voice_control/worlds-most-private-voice-assistant/).


## Supported languages and sentences

Assist aims to support more languages than other voice assistants, but this is still a work in progress, and we need your help.

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bluzky/nice-select2@2.1.0/dist/css/nice-select2.css">
<script src="https://cdn.jsdelivr.net/gh/bluzky/nice-select2@2.1.0/dist/js/nice-select2.js"></script>

<div class="language-card">
	<div class="form-title h3">Check supported languages here</div>
	<div class="input-wrapper">
		<select id="language-select">
			<option data-display="Select">Choose your language</option>
			<option value="en-US">English</option>
			<option value="es-ES">Spanish</option>
			<option value="pt-BR">Portuguese</option>
			<option value="de-DE">German</option>
			<option value="it-IT">Italian</option>
			<option value="ru-RU">Russian</option>
			<option value="ja-JP">Japanese</option>
			<option value="tr-TR">Turkish</option>
			<option value="ko-KR">Korean</option>
			<option value="fr-FR">French</option>
			<option value="ca-ES">Catalan</option>
			<option value="pl-PL">Polish</option>
			<option value="nl-BE">Dutch</option>
			<option value="id-ID">Indonesian</option>
			<option value="zh-HK">Chinese (Cantonese)</option>
			<option value="zh-CN">Chinese (Mandarin)</option>
			<option value="ms-MY">Malay</option>
			<option value="sv-SE">Swedish</option>
			<option value="uk-UA">Ukrainian</option>
			<option value="th-TH">Thai</option>
			<option value="vi-VN">Vietnamese</option>
			<option value="fi-FI">Finnish</option>
			<option value="no-NO">Norwegian</option>
			<option value="gl-ES">Galician</option>
			<option value="ar-JO">Arabic</option>
			<option value="ur-IN">Urdu</option>
			<option value="el-GR">Greek</option>
			<option value="ro-RO">Romanian</option>
			<option value="da-DK">Danish</option>
			<option value="ta-IN">Tamil</option>
			<option value="hr-HR">Croatian</option>
			<option value="mk-MK">Macedonian</option>
			<option value="sk-SK">Slovak</option>
			<option value="he-IL">Hebrew</option>
			<option value="sr-RS">Serbian</option>
			<option value="hu-HU">Hungarian</option>
			<option value="bg-BG">Bulgarian</option>
			<option value="cs-CZ">Czech</option>
			<option value="bs-BA">Bosnian</option>
			<option value="sl-SI">Slovenian</option>
			<option value="az-AZ">Azerbaijani</option>
			<option value="et-EE">Estonian</option>
			<option value="lv-LV">Latvian</option>
			<option value="af-ZA">Afrikaans</option>
			<option value="cy-GB">Welsh</option>
			<option value="fa-IR">Persian</option>
			<option value="lt-LT">Lithuanian</option>
			<option value="jv-ID">Javanese</option>
			<option value="sw-KE">Swahili</option>
			<option value="sw-TZ">Swahili</option>
			<option value="is-IS">Icelandic</option>
			<option value="mt-MT">Maltese</option>
			<option value="ps-AF">Pashto</option>
			<option value="mr-IN">Marathi</option>
			<option value="bn-IN">Bengali</option>
			<option value="lb-LU">Luxembourgish</option>
			<option value="hi-IN">Hindi</option>
			<option value="gu-IN">Gujarati</option>
			<option value="km-KH">Khmer</option>
			<option value="ne-NP">Nepali</option>
			<option value="lo-LA">Lao</option>
			<option value="te-IN">Telugu</option>
			<option value="kn-IN">Kannada</option>
			<option value="ml-IN">Malayalam</option>
			<option value="kk-KZ">Kazakh</option>
			<option value="so-SO">Somali</option>
			<option value="uz-UZ">Uzbek</option>
			<option value="ka-GE">Georgian</option>
			<option value="my-MM">Burmese</option>
			<option value="mn-MN">Mongolian</option>
			<option value="hy-AM">Armenian</option>
			<option value="am-ET">Amharic</option>
			<option value="nb-NO">Norwegian Bokmål</option>
			<option value="eu-ES">Basque</option>
			<option value="fil-PH">Filipino</option>
			<option value="ga-IE">Irish</option>
			<option value="si-LK">Sinhala</option>
			<option value="sq-AL">Albanian</option>
			<option value="su-ID">Sundanese</option>
			<option value="wuu-CN">Shanghainese</option>
			<option value="yue-CN">Cantonese</option>
			<option value="zu-ZA">Zulu</option>
		</select>
	</div>
	<div class="supported-cards">
		<div class="supported-card local warning" data-state="3">
			<div class="heading">
				<span>Local</span>
			</div>
			<div class="state-bar">
				<span></span><span></span><span></span>
			</div>
			<div class="info state-0">Not supported</div>
			<div class="info state-1">Needs more work</div>
			<div class="info state-2">Usable</div>
			<div class="info state-3">Fully supported</div>
		</div>
		<div class="supported-card cloud check" data-state="-1">
			<div class="heading">
				<span>Home Assistant Cloud</span>
			</div>
			<div class="state-bar">
				<span></span><span></span><span></span>
			</div>
			<div class="info state-0">Not supported</div>
			<div class="info state-1">Needs more work</div>
			<div class="info state-2">Usable</div>
			<div class="info state-3">Fully supported</div>
		</div>
	</div>
</div>

<style>
.nice-select {
	--grid-width: 6;
	box-shadow: 0 4px 12px 0px rgba(0, 35, 50, 0.2);
	border: unset;
	border-radius: 40px;
	line-height: 40px;
	height: 40px;
	width: 100%;
	max-width: calc(var(--grid-width) * var(--grid-m));

	.list {
		margin: 0;
	}
}

.language-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #ffffff;
	border-radius: 20px;
	padding: 30px 20px 40px 20px;
	height: calc(var(--grid-m) * 16);
	text-align: center;

	.input-wrapper{
		select{
			visibility: hidden;
			position: absolute;
		}
	}

	.supported-cards {
		display: flex;
		gap: 20px 40px;
		flex-wrap: wrap;
		width: 100%;
		margin-top: 40px;
		justify-content: center;
	}

	.supported-card {
		border-radius: 12px;
		align-items: center;
		color: #002332;
		display: flex;
		flex-direction: column;
		gap: 8px;
		height: 74px;
		/* margin-top: 19px; */
		max-width: 170px;
		margin: 0 12px;
		opacity: 1;
		position: relative;
		transition: border-color 0.2s, background-color 0.2s, opacity 0.2s;
		width: 100%;
		.heading {
			align-items: center;
			display: flex;
			gap: 12px;
			line-height: 1;
		}

		.heading span {
			font-size: 1rem;
			font-weight: 600;
		}

		.info {
			display: none;
			color: #4f606e;
			font-size: 0.75rem;
		}

		.state-bar {
			height: 4px;
			position: relative;
			display: flex;
			max-width: 166px;
			width: 100%;
			gap: 4px;
			margin: 10px 0;
		}

		.state-bar span {
			flex-grow: 1;
			flex-basis: 0;
			height: 4px;
			border-radius: 4px;
			position: relative;
			background-color: #e2e2e5;
		}

		.state-bar span:after {
			content: "";
			position: absolute;
			inset: 0;
			opacity: 0;
			transition: opacity 0.5s ease-out;
		}

		&[data-state="1"] .state-bar span:nth-child(1):after,
		&[data-state="2"] .state-bar span:nth-child(1):after,
		&[data-state="3"] .state-bar span:nth-child(1):after {
			background: linear-gradient(90deg, #ba1b1b 0%, #ff6b02 100%);
			opacity: 1;
		}

		&[data-state="2"] .state-bar span:nth-child(2):after,
		&[data-state="3"] .state-bar span:nth-child(2):after {
			background: linear-gradient(90deg, #ff6b02 0%, #fe0 100%);
			opacity: 1;
		}

		&[data-state="3"] .state-bar span:nth-child(3):after {
			background: linear-gradient(90deg, #fe0 0%, #16f3be 100%);
			opacity: 1;
		}

		.state-bar:before {
			content: "";
			background-color: #ffffff;
			width: 28px;
			height: 28px;
			border-radius: 50%;
			position: absolute;
			top: -12px;
			left: -12px;
			border: 1px solid #e2e2e5;
			transition: left 0.5s ease-out, background-color 0.5s ease-out;
			z-index: 1;
		}

		.state-bar:after {
			content: "";
			background-color: red;
			width: 8px;
			height: 8px;
			border-radius: 50%;
			position: absolute;
			top: -2px;
			left: -2px;
			transition: left 0.5s ease-out, background-color 0.5s ease-out;
			z-index: 1;
		}

		&[data-state="0"] .info.state-0 {
			display: block;
		}

		&[data-state="0"] .state-bar:before {
			left: calc(-14px + ((100% / 3) * 0));
		}

		&[data-state="0"] .state-bar:after {
			background-color: #ba1b1b;
			left: calc(-4px + ((100% / 3) * 0));
		}

		&[data-state="1"] .info.state-1 {
			display: block;
		}

		&[data-state="1"] .state-bar:before {
			left: calc(-14px + ((100% / 3) * 1));
		}

		&[data-state="1"] .state-bar:after {
			background-color: #ff6b02;
			left: calc(-4px + ((100% / 3) * 1));
		}

		&[data-state="1"] .state-bar:after {
		}

		&[data-state="2"] .info.state-2 {
			display: block;
		}

		&[data-state="2"] .state-bar:before {
			left: calc(-14px + ((100% / 3) * 2));
		}

		&[data-state="2"] .state-bar:after {
			background-color: #fe0;
			left: calc(-4px + ((100% / 3) * 2));
		}

		&[data-state="3"] .info.state-3 {
			display: block;
		}

		&[data-state="3"] .state-bar:before {
			left: calc(-14px + ((100% / 3) * 3));
		}

		&[data-state="3"] .state-bar:after {
			background-color: #16f3be;
			left: calc(-4px + ((100% / 3) * 3));
		}
	}
}
</style>
<script>
document.addEventListener("DOMContentLoaded", function () {
	registerNiceSelect();
	registerLanguageSelectChange();
});

let languageSelect = null;
function registerNiceSelect() {
	languageSelect = NiceSelect.bind(
		document.querySelector("select#language-select"),
		{ searchable: true }
	);
}

function registerLanguageSelectChange() {
	const browserLocale = navigator.language || navigator.userLanguage;

	updateLanguageSupports(browserLocale);

	document
		.querySelector("#language-select")
		.addEventListener("change", function (e) {
			updateLanguageSupports(e.target.value);
		});
}

function updateLanguageSupports(locale = null) {
	let data = {
		"en-US": [3, 3],
		"es-ES": [3, 3],
		"pt-BR": [3, 3],
		"de-DE": [3, 3],
		"it-IT": [2, 2],
		"ru-RU": [2, 2],
		"ja-JP": [0, 0],
		"tr-TR": [0, 1],
		"ko-KR": [0, 1],
		"fr-FR": [0, 3],
		"ca-ES": [0, 3],
		"pl-PL": [0, 3],
		"nl-BE": [0, 3],
		"id-ID": [0, 1],
		"zh-HK": [0, 2],
		"zh-CN": [0, 1],
		"ms-MY": [0, 1],
		"sv-SE": [0, 2],
		"uk-UA": [0, 2],
		"th-TH": [0, 1],
		"vi-VN": [0, 1],
		"fi-FI": [0, 3],
		"no-NO": [0, 0],
		"gl-ES": [0, 2],
		"ar-JO": [0, 2],
		"ur-IN": [0, 0],
		"el-GR": [0, 1],
		"ro-RO": [0, 3],
		"da-DK": [0, 2],
		"ta-IN": [0, 0],
		"hr-HR": [0, 3],
		"mk-MK": [0, 0],
		"sk-SK": [0, 1],
		"he-IL": [0, 2],
		"sr-RS": [0, 1],
		"hu-HU": [0, 3],
		"bg-BG": [0, 2],
		"cs-CZ": [0, 1],
		"bs-BA": [0, 0],
		"sl-SI": [0, 2],
		"az-AZ": [0, 0],
		"et-EE": [0, 1],
		"lv-LV": [0, 1],
		"af-ZA": [0, 0],
		"cy-GB": [0, 0],
		"fa-IR": [0, 1],
		"lt-LT": [0, 1],
		"jv-ID": [0, 0],
		"sw-KE": [0, 0],
		"sw-TZ": [0, 0],
		"is-IS": [0, 1],
		"mt-MT": [0, 0],
		"ps-AF": [0, 0],
		"mr-IN": [0, 0],
		"bn-IN": [0, 0],
		"lb-LU": [0, 0],
		"hi-IN": [0, 0],
		"gu-IN": [0, 0],
		"km-KH": [0, 0],
		"ne-NP": [0, 0],
		"lo-LA": [0, 0],
		"te-IN": [0, 1],
		"kn-IN": [0, 0],
		"ml-IN": [0, 1],
		"kk-KZ": [0, 0],
		"so-SO": [0, 0],
		"uz-UZ": [0, 0],
		"ka-GE": [0, 1],
		"my-MM": [0, 0],
		"mn-MN": [0, 0],
		"hy-AM": [0, 0],
		"am-ET": [0, 0],
		"nb-NO": [0, 3],
		"eu-ES": [0, 1],
		"fil-PH": [0, 0],
		"ga-IE": [0, 0],
		"si-LK": [0, 0],
		"sq-AL": [0, 0],
		"su-ID": [0, 0],
		"wuu-CN": [0, 0],
		"yue-CN": [0, 0],
		"zu-ZA": [0, 0]
	};

	let elems = document.querySelectorAll(".supported-cards .supported-card");
	if (!elems) return;

	let supports = data[locale];
	let foundLocale = locale;
	if (!supports) {
		Object.keys(data).forEach((key) => {
			if (key.split("-")[0] === locale.split("-")[0]) {
				supports = data[key];
				foundLocale = key;
			}
		});
	}
	if (!supports) return;

	document.querySelector("#language-select").value = foundLocale;
	languageSelect.update();

	elems.forEach((elem) => elem.setAttribute("data-state", "-1"));

	elems.forEach((elem, index) => {
		// set data-state to the value of the value
		elem.setAttribute("data-state", supports[index]);
	});
}
</script>



Assist already supports a wide range of [languages](https://developers.home-assistant.io/docs/voice/intent-recognition/supported-languages). Use the [built-in sentences](/voice_control/builtin_sentences) to control entities and areas, or [create your own sentences](/voice_control/custom_sentences/).



Did Assist not understand your sentence? [Contribute them](/voice_control/contribute-voice).

_Assist was introduced in Home Assistant 2023.2._

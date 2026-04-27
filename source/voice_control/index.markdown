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
  - url: https://support.nabucasa.com/hc/categories/24451727188125
    title: Voice Preview Edition
---

This section will help you set up Assist, which is Home Assistant's voice assistant.

Assist allows you to control Home Assistant using natural language. It is built on top of an open voice foundation and powered by knowledge provided by our community.

The simplest way to try out Assist is inside our companion app. Look for the Assist icon <img src='/images/assist/assist-icon.svg' alt='Assist icon' style='height: 32px' class='no-shadow'> at the top right of your dashboard.

The simplest way to get started with Assist is with our recommended voice assistant hardware, the [Home Assistant Voice Preview Edition](/voice-pe/).

As for the rest of Home Assistant Core functionalities, Assist can be personalized and extended to fit your needs.

- It can work locally or leverage the greatest LLMs of the moment.
- It can work on your phone or tablet or other custom voice devices.

<lite-youtube videoid="XF53wUbeLxA" videotitle="Voice at Home Assistant"></lite-youtube>

## Getting started

When you configure voice assistant hardware made for Home Assistant, it will use a wizard to help you configure your system and get started to use voice.

Our recommended voice assistant hardware is the [Home Assistant Voice Preview Edition](/voice-pe/).

In case your hardware does not support our wizard, do not worry. Here are two detailed guides based on how you plan to process your voice (Locally, or using Home Assistant Cloud voice services)

- [I plan to process my voice locally](/voice_control/voice_remote_local_assistant/)
- [I plan to use Home Assistant Cloud](/voice_control/voice_remote_cloud_assistant/) (recommended as it is the simplest)

## Expand and experiment

Once your setup is up and running and you follow the [best practices](/voice_control/best_practices), check all the possibilities we found for [Expanding your Assist setup](/voice_control/expanding_assist), and further experiment with different setups like [wake words](/voice_control/about_wake_word/). Do you want to talk to Super Mario? Or another figure? If you want Assist to respond in a fun way, you can create an assistant with an [AI personality](/voice_control/assist_create_open_ai_personality/).

To further improve your setup, try building other voice assistant satellite devices that allow you to add Assist with wake words to all your rooms:

- Enable [wake word detection on your Android phone](/voice_control/android/#using-wake-word-detection-on-android) to activate Assist hands-free by saying "Hey Jarvis" or "Hey Nabu", even when your phone is locked.

- You can use [ESPHome](https://www.esphome.io/components/voice_assistant/) to create your own awesome voice assistant satellites based on inexpensive ESP32 microcontrollers, like [@piitaya](https://github.com/piitaya) did with his 3D-printed R5 droid. Follow our tutorial to [create your own for just $13](/voice_control/thirteen-usd-voice-remote/).

- Another alternative voice satellite solution is the experimental [Linux-Voice-Assistant](https://github.com/OHF-Voice/linux-voice-assistant) project. It allows you to build a Linux-based voice assistant smart speaker that runs on any x64 or ARM64 hardware capable of handling local, on-device audio processing. This approach provides greater flexibility for customization. Because it runs on a full Linux system, it also gives you access to significantly more local computing resources for additional features and other integrations on the same satellite.

- If you are interested in a voice assistant that is not always listening, consider using Assist on an analog phone. It will only listen when you pick up the horn, and the responses are for your ears only. Follow our tutorial to create your own [analog phone voice assistant](/voice_control/worlds-most-private-voice-assistant/).

## Supported languages and sentences

Assist aims to support more languages than other voice assistants, but this is still a work in progress, and we need your help.

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bluzky/nice-select2@2.1.0/dist/css/nice-select2.css" integrity="sha384-LPh4ytLNuALl70+0CMnq0sP1tXQpGPWbSCH8/zknn1okTVRKHvyDGUg80R568fXO" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/gh/bluzky/nice-select2@2.1.0/dist/js/nice-select2.js" integrity="sha384-efeEfE1PkalgBRHHJ3qv56R1qnZhbbpil0g7lyf+5MOqiWYw579wZUNTTwjH5jjn" crossorigin="anonymous"></script>

<div class="language-card">
	<div class="form-title h3">Check supported languages</div>
	<div class="input-wrapper">
		<select id="language-select">
			<option data-display="Select">Select your language</option>
			<option value="af-ZA">Afrikaans (South Africa)</option>
			<option value="ar-JO">Arabic (Jordan)</option>
			<option value="bg-BG">Bulgarian (Bulgaria)</option>
			<option value="bn-BD">Bengali (Bangladesh)</option>
			<option value="bn-IN">Bengali (India)</option>
			<option value="ca-ES">Catalan (Spain)</option>
			<option value="cs-CZ">Czech (Czech Republic)</option>
			<option value="da-DK">Danish (Denmark)</option>
			<option value="de-DE">German (Germany)</option>
			<option value="de-CH">German (Switzerland)</option>
			<option value="el-GR">Greek (Greece)</option>
			<option value="en-US">English (United States)</option>
			<option value="en-GB">English (United Kingdom)</option>
			<option value="es-ES">Spanish (Spain)</option>
			<option value="es-MX">Spanish (Mexico)</option>
			<option value="et-EE">Estonian (Estonia)</option>
			<option value="eu-ES">Basque (Spain)</option>
			<option value="fa-IR">Persian (Iran)</option>
			<option value="fi-FI">Finnish (Finland)</option>
			<option value="fr-FR">French (France)</option>
			<option value="ga-IE">Irish (Ireland)</option>
			<option value="gl-ES">Galician (Spain)</option>
			<option value="gu-IN">Gujarati (India)</option>
			<option value="he-IL">Hebrew (Israel)</option>
			<option value="hi-IN">Hindi (India)</option>
			<option value="hr-HR">Croatian (Croatia)</option>
			<option value="hu-HU">Hungarian (Hungary)</option>
			<option value="id-ID">Indonesian (Indonesia)</option>
			<option value="is-IS">Icelandic (Iceland)</option>
			<option value="it-IT">Italian (Italy)</option>
			<option value="ka-GE">Georgian (Georgia)</option>
			<option value="kn-IN">Kannada (India)</option>
			<option value="ko-KR">Korean (South Korea)</option>
			<option value="lb-LU">Luxembourgish (Luxembourg)</option>
			<option value="lt-LT">Lithuanian (Lithuania)</option>
			<option value="lv-LV">Latvian (Latvia)</option>
			<option value="ml-IN">Malayalam (India)</option>
			<option value="mn-MN">Mongolian (Mongolia)</option>
			<option value="mr-IN">Marathi (India)</option>
			<option value="ms-MY">Malay (Malaysia)</option>
			<option value="nb-NO">Norwegian Bokmål (Norway)</option>
			<option value="ne-NP">Nepali (Nepal)</option>
			<option value="nl-BE">Dutch (Belgium)</option>
			<option value="nl-NL">Dutch (Netherlands)</option>
			<option value="pl-PL">Polish (Poland)</option>
			<option value="pt-PT">Portuguese (Portugal)</option>
			<option value="pt-BR">Portuguese (Brazil)</option>
			<option value="ro-RO">Romanian (Romania)</option>
			<option value="ru-RU">Russian (Russia)</option>
			<option value="sk-SK">Slovak (Slovakia)</option>
			<option value="sl-SI">Slovenian (Slovenia)</option>
			<option value="sr-RS">Serbian (Serbia)</option>
			<option value="sv-SE">Swedish (Sweden)</option>
			<option value="sw-KE">Swahili (Kenya)</option>
			<option value="te-IN">Telugu (India)</option>
			<option value="th-TH">Thai (Thailand)</option>
			<option value="tr-TR">Turkish (Turkey)</option>
			<option value="uk-UA">Ukrainian (Ukraine)</option>
			<option value="ur-IN">Urdu (India)</option>
			<option value="vi-VN">Vietnamese (Vietnam)</option>
			<option value="zh-CN">Chinese (China)</option>
			<option value="zh-HK">Chinese (Hong Kong)</option>
			<option value="zh-TW">Chinese (Taiwan)</option>
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
	const data = {{ site.data.language_scores | jsonify }};

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

	const localState = supports.focused_local > 0 && supports.full_local > 0
		? 3
		: supports.focused_local > 0
			? 2
			: supports.full_local > 0
				? 1
				: 0;
	const cloudState = supports.cloud;
	const stateValues = [localState, cloudState];

	document.querySelector("#language-select").value = foundLocale;
	languageSelect.update();

	elems.forEach((elem) => elem.setAttribute("data-state", "-1"));

	elems.forEach((elem, index) => {
		// set data-state to the value of the value
		elem.setAttribute("data-state", stateValues[index]);
	});
}
</script>



Assist already supports a wide range of [languages](https://developers.home-assistant.io/docs/voice/intent-recognition/supported-languages). Use the [built-in sentences](/voice_control/builtin_sentences) to control entities and areas, or [create your own sentences](/voice_control/custom_sentences/).



Did Assist not understand your sentence? [Contribute them](/voice_control/contribute-voice).

_Assist was introduced in Home Assistant 2023.2._

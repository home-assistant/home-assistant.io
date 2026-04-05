---
layout: post
title: "On device wake word on ESP32-S3 is here - Voice: Chapter 6"
description: "This chapter brings on-device wake word detection (microWakeWord), customization for sentence triggers, additional intents for controlling devices, and better error messages."
date: 2024-02-21 00:00:00
date_formatted: "February 21, 2024"
author: Michael Hansen
comments: true
categories: Assist
og_image: /images/blog/2024-02-21-voice-chapter-6/social.jpg
---

**TL;DR:** We have added on-device wake word detection (microWakeWord)! It's faster and more scalable than processing the wake word in Home Assistant. We will keep supporting wake word processing in Home Assistant. Also new is more customization for sentence triggers, additional intents for controlling more devices, and better error messages and debugging tools.

<p class='img'>
<lite-youtube videoid="NQIv3nsu7dE" videotitle="Voice - Chapter 6 Livestream"></lite-youtube>
Watch the full Voice chapter 6 livestream
</p>

2023's [Year of the Voice] built a solid foundation for letting users control Home Assistant by speaking in their own language.

We continue with improvements to [Assist], including:

- More customization options for [sentence triggers]
- Better error messages and [debugging tools]
- Additional [intents] for controlling valves, vacuums, and media players

Oh, and "one more thing": **on-device, open source wake word detection in ESPHome!** 🥳🥳🥳

Check out this video of the new [microWakeWord] system running on an [ESP32-S3-BOX-3] alongside one doing wake word detection inside Home Assistant:

<p class='img'>
<lite-youtube videoid="oSKBWtBJyDE" videotitle="On-device wake word is here! Demonstrating microWakeWord on the ESP32-S3-BOX-3 in Home Assistant."></lite-youtube>
On-device vs. streaming wake word
</p>

<!--more-->

## microWakeWord

Thanks to the incredible [microWakeWord] created by [Kevin Ahrendt], ESPHome can now perform wake word detection on devices like the [ESP32-S3-BOX-3].
You can [install it on your S3-BOX-3 today][s3-box-tutorial] to try it out.

Back in [Chapter 4], we added wake word detection using [openWakeWord]. Unfortunately, openWakeWord was too large to run on low power devices like S3-BOX-3.
So we chose to run wake word detection inside Home Assistant instead.

<p><img src='/images/blog/2024-02-21-voice-chapter-6/challenge.png' class='no-shadow' /></p>

Doing wake word detection in HA allows tiny devices like the [M5 ATOM Echo Development Kit][m5-tutorial] to simply stream audio and let all of the processing happen elsewhere. This is great, as it allows low-powered devices using a simple ESP32 chip to be transformed into a voice assistant even if they do not pack the necessary power to detect wake words.
The downside is that adding more voice assistants requires more CPU usage in HA as well as more network traffic.

Enter microWakeWord. After listening to an interview with Paulus Schoutsen (founder of Home Assistant) on the [Self Hosted](https://selfhosted.show/) podcast, Kevin Ahrendt created a model based on [Google's Inception neural network](https://towardsdatascience.com/a-simple-guide-to-the-versions-of-the-inception-network-7fc52b863202). As an existing contributor to [ESPHome], Kevin was able to get this new model running on the ESP32-S3 chip inside the S3-BOX-3! _(It also works on the, now discontinued, S3-BOX and S3-BOX-Lite)_

Kevin has trained [three models](https://github.com/esphome/micro-wake-word-models/tree/main/models) for the launch of microWakeWord:

* "okay nabu"
* "hey jarvis"
* "alexa"

You can try these out yourself now by following the [ESP32-S3-BOX tutorial][s3-box-tutorial]. Changing the default "okay nabu" wake word will require adjusting your [ESPHome configuration](https://beta.esphome.io/components/micro_wake_word.html) and recompiling the firmware, which may take a long time and requires a machine with more than 2GB of RAM.

We're grateful to Kevin for developing microWakeWord, and making it a part of the open home!

## Sentence trigger responses

Adding custom sentences to Assist is as easy as adding a [sentence trigger][sentence triggers] to an automation. This allows you to trigger any action in Home Assistant with whatever sentences you want.

Now with the new [conversation response] action in HA 2024.2, you can also customize the response spoken or printed back to you. Using [templating](/docs/automation/templating/#sentence), your response can refer to the current state of your home.

<p><img src='/images/blog/2024-02-21-voice-chapter-6/assist-custom-response-editor.png' class='no-shadow' /></p>

You can also refer to [wildcards](/docs/automation/trigger/#sentence-wildcards) in your sentence trigger. For example, the sentence trigger:

```
play {album} by {artist}
```

could have the response:

{% raw %}
```
Playing {{ trigger.slots.album }} by {{ trigger.slots.artist }}
```
{% endraw %}

in addition to calling a media service.

You can experiment now with sentence triggers, and custom conversation responses in our automation editor by clicking here:
[![Open your Home Assistant instance and show your automations.](https://my.home-assistant.io/badges/automations.svg)](https://my.home-assistant.io/redirect/automations/)

## Improved errors and debugging

Assist users know the phrase "Sorry, I couldn't understand that" all too well. This generic error message was given for a variety of reasons, such as:

* The sentence didn't match any known [intent](https://github.com/home-assistant/intents)
* The device/area names didn't match
* There weren't any devices of a specific type in an area (lights, windows, etc.)

Starting in HA 2024.2, Assist provides different error messages for each of these cases.

<img class="no-shadow" src='/images/blog/2024-02/assist-errors.png' alt='Screenshot showing the new errors Assist will return in case the intention is understood, but something else is missing.'>

Now if you encounter errors, you will know where to start looking! The first thing to check is that your device is [exposed to Assist](/voice_control/voice_remote_expose_devices/). Some types of devices, such as lights, are exposed by default. Other, like locks, are not and must be manually exposed.

Once your devices are exposed, make sure you've added an appropriate [alias](/voice_control/aliases) so Assist will know exactly how you'll be referring to them. Devices and areas can have multiple aliases, even in multiple languages, so everyone's preference can be accommodated.

If you are still having problems, the [Assist debug tool][debugging tools] has also been improved. Using the tool, you see how Assist is interpreting a sentence, including any missing pieces.

<p><img src='/images/blog/2024-02-21-voice-chapter-6/debug_tool.png' class='no-shadow' /></p>

[![Open your Home Assistant instance and show your Assist developer tools.](https://my.home-assistant.io/badges/developer_assist.svg)](https://my.home-assistant.io/redirect/developer_assist/)

Our community [language leaders](https://developers.home-assistant.io/docs/voice/language-leaders) are hard at work translating sentences for Assist. If you have suggestions for new sentences to be added, please create an issue on [the intents repository](https://github.com/home-assistant/intents) or drop us a line at voice@nabucasa.com


## Thank you

Thank you to the Home Assistant community for subscribing to [Home Assistant Cloud][nabucasa] to support voice and development of Home Assistant, ESPHome and other projects in general.

Thanks to our language leaders for extending the sentence support to all the various languages.

<p class='img'>
<img src='/images/blog/2024-02-21-voice-chapter-6/ha-support.png' alt="Thank you for supporting the Home Assistant project">
</p>

[Year of the Voice]: /blog/2022/12/20/year-of-voice/
[Assist]: /voice_control/
[exposed]: /voice_control/voice_remote_expose_devices/
[alias]: /voice_control/aliases
[wyoming]: https://github.com/rhasspy/wyoming
[openWakeWord]: https://github.com/dscripka/openWakeWord
[Piper]: https://github.com/rhasspy/piper/
[wyoming-satellite]: https://github.com/rhasspy/wyoming-satellite
[s3-box-tutorial]: /voice_control/s3_box_voice_assistant/
[ESP32-S3-BOX-3]: https://www.espressif.com/en/news/ESP32-S3-BOX-3
[ESPHome]: https://esphome.io
[nabucasa]: https://www.nabucasa.com
[sentence triggers]: /docs/automation/trigger/#sentence-trigger
[conversation response]: /docs/scripts/#respond-to-a-conversation
[microWakeWord]: https://github.com/kahrendt/microWakeWord
[Kevin Ahrendt]: https://www.kevinahrendt.com/
[debugging tools]: /voice_control/troubleshooting/#test-a-sentence-per-language-without-voice-without-executing-commands
[intents]: https://developers.home-assistant.io/docs/intent_builtin
[Chapter 4]: /blog/2023/10/12/year-of-the-voice-chapter-4-wakewords/
[m5-tutorial]: /voice_control/thirteen-usd-voice-remote/

---
layout: post
title: "Year of the Voice - Chapter 4: Wake words"
description: "Activate your voice assistant using wake words and learn how to make your own"
date: 2023-10-12 00:00:00
date_formatted: "October 12, 2023"
author: Paulus Schoutsen
comments: true
categories: Assist
og_image: /images/blog/2023-10-12-year-of-the-voice-chapter-4/social.png
---

<p><img src='/images/blog/2023-10-12-year-of-the-voice-chapter-4/social.png' class='no-shadow' /></p>

This year is Home Assistant’s [Year of the Voice](https://www.home-assistant.io/blog/2022/12/20/year-of-voice/). It is our goal for 2023 to let users control Home Assistant by speaking in their own language.

We’ve got great news: wake words are finally here! After 4 chapters, we now have the final building block for voice in Home Assistant.

In [Chapter 1](https://www.home-assistant.io/blog/2023/01/26/year-of-the-voice-chapter-1/), we started with text commands such as “turn on the kitchen light” and “open garage door”. We now [support 56 languages](https://home-assistant.github.io/intents/) and have 188 contributors helping to translate common smart home commands for everyone.

[Chapter 2](https://www.home-assistant.io/blog/2023/04/27/year-of-the-voice-chapter-2/) introduced audio for voice commands: both speech-to-text and text-to-speech. This included local options for maximum privacy as well as support for Home Assistant Cloud for incredible speed and language coverage. Lastly in [Chapter 3](https://www.home-assistant.io/blog/2023/07/20/year-of-the-voice-chapter-3/), we added the ability to set Home Assistant as your default assistant on Android phones and watches.

For Chapter 4, we’ve now added wake word processing inside Home Assistant. Wake words are special words or phrases that tell a voice assistant that a command is about to be spoken. Examples are: Hey Google, Hey Siri or Alexa.

Home Assistant’s wake words are leveraging a new project called [openWakeWord] by David Scripka. This project has real-world accuracy, runs on commodity hardware and anyone can [train a basic model of their own wake word][own-wake-word] in an hour, for free.

To try wake words today, follow our updated guide to [the $13 voice assistant][13-tutorial].

<lite-youtube videoid="ziebKt4XLZQ" videotitle="Wake word demonstration on $13 ATOM Echo in Home Assistant"></lite-youtube>

<lite-youtube videoid="vQ7Hmeume9g" videotitle="Wake word demonstration on ESPHome-based 3D printed droid in Home Assistant"></lite-youtube>

To watch the video presentation of this blog post, including live demos, check [the recording of our live stream.](https://www.youtube.com/watch?v=YzgYYkOrnhQ)

<!--more-->

## Wake words in Home Assistant

Wake words are hard to build. They are based on AI, there is little room for false positives, and they need to run extremely fast: as fast audio as comes in. You can’t have a voice assistant start listening 5 seconds after a wake word is spoken. Voice satellite hardware generally does not have a lot of computing power so wake word engines need hardware experts to optimise the models to run smoothly.

We didn’t want to limit ourselves to a single type of hardware, so we decided to change the approach: we do the wake word detection inside Home Assistant. Voice satellite devices will constantly sample current audio in your room for voice. When it detects voice, the satellite will send audio to Home Assistant where it will check if the wake word was said and handle the command that followed it.

<p class='img'>
<img src='/images/blog/2023-10-12-year-of-the-voice-chapter-4/wake-word-architecture.png'>
Overview of the wake word architecture
</p>

The advantage of this approach is that any device that streams audio can be turned into a voice satellite, even if it doesn't have enough power to do wake word detection locally. It also allows our developer community to easily experiment with new wake word models as they don’t have to first shrink it to be able to run on a low-powered voice satellite device.

To try it out, follow our updated tutorial to [create your own $13 voice assistant.][13-tutorial]

<lite-youtube videoid="ziebKt4XLZQ" videotitle="Wake word demonstration on $13 ATOM Echo in Home Assistant"></lite-youtube>

There are downsides to this approach. The first is that the quality of the captured audio differs. A speakerphone with multiple microphones and audio processing chips captures voice very cleanly. A device with a single microphone and no post-processing? Not so much. We compensate for poor audio quality with audio post-processing inside Home Assistant and users can use better speech-to-text models to improve accuracy like the one included with Home Assistant Cloud.

The other downside of this approach is that each satellite requires ongoing resources inside Home Assistant when it’s streaming audio. With our current approach, users can run 5 voice satellites without overwhelming a Raspberry Pi 4 (assuming all satellites are streaming at the same time). To scale up, we’ve updated [the Wyoming protocol][wyoming] to allow users to run wake word detection on an external server.

_Wyoming is our protocol allowing to run parts of a voice assistant in other programs and/or computers_

<p class='img'>
<img src='/images/blog/2023-10-12-year-of-the-voice-chapter-4/pick-wake-word.png'>
Users can pick per configured voice assistant what wake word to listen for
</p>

## openWakeWord

For the built-in wake words, we rely on [openWakeWord] by David Scripka. It’s a technological marvel that is created with 4 goals in mind:

- Be fast enough for real-world usage
- Be accurate enough for real-world usage
- Have a simple model architecture and inference process
- Require little to no manual data collection to train new models

To achieve its goals, openWakeWord is built around an open source audio embedding model trained by Google and fine-tuned using our text-to-speech system [Piper]. Piper is used to generate many thousands of audio clips for each wake word using a unique approach that creates endless variations of different speakers. These audio clips are then augmented to sound as if they were spoken in multiple kinds of rooms, at specific distances from a microphone, and with varying speeds. Finally, the clips are mixed with background noise like music, environmental sounds, and conversation before being fed into the training process to generate the wake word model.

<p class='img'>
<img src='/images/blog/2023-10-12-year-of-the-voice-chapter-4/open-wake-word-architecture.png'>
Overview of the openWakeWord training pipeline.
</p>

Home Assistant runs openWakeWord as an add-on and comes with various wake word models by default, including our “Okay Nabu” model. Click the button below to install it.

{% my supervisor_addon badge addon="core_openwakeword" %}

Once installed, the add-on will be discovered via the Wyoming integration.

OpenWakeWord currently only works for English wake words. This is because we lack models of other languages with many different speakers. Similar models for other languages can be trained as more multi-speaker models per language become available.

_If you’re not running Home Assistant OS, openWakeWord is also available as [a Docker container](https://github.com/rhasspy/wyoming-openwakeword#docker-image). Once the container is running, you will need to add the Wyoming integration and point it at its IP address and port (typically 10400)._

## Make your own wake word

What makes openWakeWord unique is its ability to fine tune Google’s model, trained on clips from real voices, with fake voice clips generated by Piper. This makes it possible to create your own wake words without collecting samples from real people (though real samples can improve the outcome).

David created a Google Collab notebook to create your own openWakeWord model. Enter your desired wake word and an hour later you get your own wake word (using the free computing available to all Google Collab users).

To get started, see our new ["create your own wake word"-tutorial.][own-wake-word]

The models generated with the notebook will perform reasonably well. They will not perform as well as the ones bundled with Home Assistant which have received a lot of extensive training.

<p class='img'>
<img src="/images/assist/wake_word_enter_target_word.png">
Screenshot of the wake word generation notebook
</p>

## Other wake word engines

In Home Assistant, we ship our defaults but allow a user to configure each part of their voice assistants. This also applies to our wake words.

Wake word engines can integrate with Home Assistant by adding them as an integration or run them as a standalone program that communicates with Home Assistant via [the Wyoming protocol][wyoming].

<p class='img'>
<img src='/images/blog/2023-10-12-year-of-the-voice-chapter-4/wake-word-integration.png'>
How wake words integrate into Home Assistant
</p>

As an example, we’re also making the Porcupine (v1) wake word engine available. It supports 29 wake words across English, French, Spanish and German, including Computer, Framboise, Manzana and Stachelschwein.

{% my supervisor_addon badge addon="47701997_porcupine1" repository_url="https://github.com/rhasspy/hassio-addons" %}

## Reuse and repurpose: different ways to create a voice satellite

We’re building our voice assistant based on our Open Home vision: a smart home that values privacy, choice and sustainability. Two words that are often mentioned as part of sustainability are reuse and repurpose.

Since our voice satellite is only responsible for capturing audio, a lot of devices one might have in their “old tech” drawer can be given a new life and purpose as a voice satellite.

When audio is captured via USB, we recommend using a USB speakerphone because they contain audio processing chips that clean up the audio and enhance voices. They also come with a speaker and look a bit like one expects a voice satellite to look. We had great results in our testing with the [Anker PowerConf S330]. It did require a firmware update before it could be used with Home Assistant.

_Some USB speakerphones will require a powered USB hub because of power limits on the Raspberry Pi’s USB ports._

## Turn Home Assistant into a voice satellite

You can configure your device running Home Assistant to capture audio and turn it into a voice assistant. To do this, you need to plug in a USB microphone or speakerphone and configure the Assist microphone add-on. Your Home Assistant device may need to be rebooted before the microphone is usable.

{% my supervisor_addon badge addon="47701997_assist_microphone" repository_url="https://github.com/rhasspy/hassio-addons" %}

<p class='img'>
<img src='/images/blog/2023-10-12-year-of-the-voice-chapter-4/assist-microphone-addon.png'>
Home Assistant Blue with a speakerphone
</p>

## Turn any ESP32 into a voice satellite using ESPHome

[ESPHome] is our firmware to allow users to easily create devices for their smart home. In Year of the Voice - Chapter 2, we’ve added support for ESPHome to accept voice commands when a user pushes a button.

Today, that support is extended to allow any ESP32 device with an i2s microphone to become a voice satellite for Home Assistant.

<p class='img'>
<img src='/images/blog/2023-10-12-year-of-the-voice-chapter-4/ESP32-breadboard.jpeg'>
Voice assistant on a breadboard.
</p>

Recommended parts:

- Microphone: [M5Stack PDM MEMS Microphone Unit (SPM1423)](https://shop.m5stack.com/products/pdm-microphone-unit-spm1423?ref=NabuCasa) or [INMP441 Omnidirectional i2s microphone](https://www.amazon.com/DAOKI-Omnidirectional-Microphone-Interface-Precision/dp/B0821521CV?crid=15LDQX6CCO0TU&keywords=dollatek+INMP441+i2s+microphone&qid=1697133224&sprefix=dollatek+inmp441+i2s+microphone%2Caps%2C53&sr=8-3&linkCode=li2&tag=homeassista0e-20&linkId=387c46c81aea5223b6a2dc46fe30071c&language=en_US&ref_=as_li_ss_il)
- DAC/Amp: [MAX98357 I2S 3W Class D Amp DAC](https://www.aliexpress.us/item/3256804094226058.html?algo_pvid=abd6f27c-cf43-4bb7-aad5-59db93afeef2&algo_exp_id=abd6f27c-cf43-4bb7-aad5-59db93afeef2-2&pdp_npi=4@dis!USD!0.75!0.75!!!0.75!!@2101c6e316970730845818417e16ee!12000028612275493!sea!US!171596461!&curPageLogUid=KcAyDJivsXHt)

[Example configuration](https://github.com/esphome/firmware/blob/main/voice-assistant/m5stack-atom-echo.yaml)

_This method requires users to have basic experience with configuring ESPHome devices._

## Turn any old Raspberry Pi into a voice satellite

We’ve made [homeassistant-satellite](https://github.com/synesthesiam/homeassistant-satellite) available that allows you to connect a USB microphone or speakerphone to an old Raspberry Pi, or any other Linux computer, and turn it into a voice satellite for Home Assistant.

<lite-youtube videoid="JeyZ4HQARMc" videotitle="Wake word demonstration on Raspberry Pi and custom ESP32 board in Home Assistant"></lite-youtube>

_While any Linux computer works, we recommend limiting it to ARM-based processors because they use a lot less energy._

_This method requires users to know how to install applications on a Linux system._

## Voice office hours for scientists

We want Home Assistant to be used as a platform for scientists that are developing new wake word, speech-to-text and text-to-speech engines. Working with Home Assistant allows you to try your model as part of a voice assistant in a real world scenario. The Home Assistant community loves new technology and will be great in testing it out and providig feedback.

Engines can be plugged Home Assistant’s voice pipelines using [the Wyoming protocol][wyoming]. While small, the Wyoming protocol can be tricky to get right for first time integrators. If you’re such a person, reach out to us at [voice@nabucasa.com](mailto:voice@nabucasa.com) and we’ll help you integrate.

## What's next

Now that the foundation is in place for all parts of a voice assistant, it will be easier for us to share what we are going to work on next.

We want to work towards supporting the most common tasks that people use with other voice assistants. This includes support for multiple shopping lists, timers and weather forecasts.

To improve accuracy, openWakeWord allows further fine-tuning of the model with recordings made by the user via their own voice satellite. We want users to be able to easily record themselves and let Home Assistant create this improved model.

On the voice satellite side we're going to integrate more advanced audio processing to improve wake word and Speech-to-Text accuracy. We will also do another attempt at getting wake words running inside ESPHome.

The voice satellite improvements will require more advanced hardware and we're aiming for the ESP32 S3 Box 3. This is the new variant of the now discontinued ESP32 S3 Box (and lite version). Espressif told us that it will be in stock soon.

If you already have an ESP32 S3 Box variant, you can install [our ESPHome configuration](https://github.com/esphome/firmware/tree/main/voice-assistant) to receive these updates as they come available.

## That's a wrap!

We hope that you enjoy the wake words and that you set up voice satellites around your house. Let us know how it goes and share your experience with us.

See you soon in chapter 5!

## Thank You

A big thanks to David Scripka for openWakeWord. Thanks to Jesse Hills for his patience and support while Mike and I explored wake word architectures and help ESPHome fit in. Big thanks to everyone at Nabu Casa who has helped make and review today's content.

Thank you to the Home Assistant community for subscribing to [Home Assistant Cloud][nabucasa] to support Year of the Voice and development of Home Assistant, ESPHome and other projects in general.

Thanks to our language leaders for extending the sentence support to all the various languages.

<p class='img'>
<img src='/images/blog/2023-10-12-year-of-the-voice-chapter-4/ha-support.png' alt="Thank you for supporting the Home Assistant project">
</p>

[wyoming]: https://github.com/rhasspy/wyoming
[13-tutorial]: /voice_control/thirteen-usd-voice-remote/
[openWakeWord]: https://github.com/dscripka/openWakeWord
[Piper]: https://github.com/rhasspy/piper/
[own-wake-word]: /voice_control/create_wake_word/
[my-wake-word-addon]: https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_openwakeword
[Anker PowerConf S330]: https://amzn.to/3tzXUhD
[ESPHome]: https://esphome.io
[nabucasa]: https://www.nabucasa.com

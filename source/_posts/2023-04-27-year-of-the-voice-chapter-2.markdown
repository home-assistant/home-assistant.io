---
layout: post
title: "Year of the Voice - Chapter 2: Let's talk"
description: "Talk to your smart home and let it talk back with our new voice assistant features."
date: 2023-04-27 00:00:00
date_formatted: "April 27, 2023"
author: Paulus Schoutsen
comments: true
categories: Assist
og_image: /images/blog/2023-04-27-year-of-the-voice-chapter-2/social.png
---


This year is Home Assistant’s [Year of the Voice]. It is our goal for 2023 to let users control Home Assistant in their own language. Today we’re presenting Chapter 2, our second milestone in building towards this goal.

In [Chapter 1], we focused on intents – what the user wants to do. Today, the Home Assistant community has translated common smart home commands and responses into [45 languages], closing in on the 62 languages that Home Assistant supports.

For Chapter 2, we’ve expanded beyond text to now include audio; specifically, turning audio (speech) into text, and text back into speech. With this functionality, [Home Assistant’s Assist feature][assist] is now able to provide a full voice interface for users to interact with.

A voice assistant also needs hardware, so today we’re launching ESPHome support for Assist and; to top it off: we’re launching the World’s Most Private Voice Assistant. Keep reading to see what that entails.

_To watch the video presentation of this blog post, including live demos, check [the recording of our live stream.][live-stream]_

<lite-youtube videoid="0YJzLIMrnGk" videotitle="World’s Most Private Voice Assistant"></lite-youtube>

[Year of the Voice]: https://www.home-assistant.io/blog/2022/12/20/year-of-voice/
[Chapter 1]: https://www.home-assistant.io/blog/2023/01/26/year-of-the-voice-chapter-1/
[45 languages]: https://home-assistant.github.io/intents/
[live-stream]: https://youtube.com/live/Tk-pnm7FY7c?feature=share
[assist]: /voice_control/

<!--more-->

## Composing Voice Assistants

The new [Assist Pipeline integration] allows you to configure all components that make up a voice assistant in a single place.

For voice commands, pipelines start with audio. A speech-to-text system determines the words the user speaks, which are then forwarded to a conversation agent. The intent is extracted from the text by the agent and executed by Home Assistant. At this point, “turn on the light” would cause your light to turn on 💡. The last part of the pipeline is text-to-speech, where the agent’s response is spoken back to you. This may be a simple confirmation (“Turned on light”) or the answer to a question, such as “Which lights are on?”

<p class='img'>
<img src='/images/blog/2023-04-27-year-of-the-voice-chapter-2/assist-config.png'>
Screenshot of the new Assist configuration in Home Assistant.
</p>

With the new Voice Assistant settings page users can create multiple assistants, mixing and matching voice services. Want a U.S. English assistant that responds with a British accent? No problem. What about a second assistant that listens for Dutch, German, or French voice commands? Or maybe you want to throw ChatGPT in the mix. Create as many assistants as you want, and use them from the [Assist dialog] as well as voice assistant hardware for Home Assistant.

Interacting with many different services means that many different things can go wrong. To help users figure out what went wrong, we’ve built extensive debug tooling for voice assistants into Home Assistant. You can always inspect the last 10 interactions per voice assistant.

<p class='img'>
<img src='/images/blog/2023-04-27-year-of-the-voice-chapter-2/assist-debug.png'>
Screenshot of the new Assist debug tool.
</p>

[Assist Pipeline integration]: https://www.home-assistant.io/integrations/assist_pipeline/
[Assist dialog]: /voice_control/

## Voice Assistant powered by Home Assistant Cloud

The [Home Assistant Cloud][nc] subscription, besides end-to-end encrypted remote connection, includes state of the art speech-to-text and text-to-speech services. This allows your voice assistant to speak 130+ languages (including dialects like Peruvian Spanish) and is extremely fast to respond. Sample:

<audio preload controls src="/images/assist/ha_cloud.mp3"></audio>

As a subscriber, you can directly start using voice in Home Assistant. You will not need any extra hardware or software to get started.

In addition to high quality speech-to-text and text-to-speech for your voice assistants, you will also be supporting the development of Home Assistant itself.

[Join Home Assistant Cloud today][nc]

[nc]: https://www.nabucasa.com

## The fully local voice assistant

With Home Assistant you can be guaranteed two things: there will be options and one of those options will be local. With our voice assistant that’s no different.

### Piper: our new model for high quality local text-to-speech

To make quality text-to-speech running locally possible, we’ve had to create our own text-to-speech system that is optimized for running on a Raspberry Pi 4. It’s called Piper.

<img style='width: 100%' src='/images/assist/piper-logo.svg' alt='Piper logo' class='no-shadow'>

Piper uses [modern machine learning algorithms][mm-algo] for realistic-sounding speech but can still generate audio quickly. On a Raspberry Pi 4, Piper can generate 2 seconds of audio with only 1 second of processing time. More powerful CPUs, such as the Intel Core i5, can generate 17 seconds of audio in the same amount of time. Sample:

<audio preload controls src="/images/assist/piper.wav"></audio>

_For more samples, see [the Piper website][piper-samples]_

An {% my supervisor_addon addon="core_piper" title="add-on with Piper" %} is available now for Home Assistant with [over 40 voices across 18 languages][piper-samples], including: Catalan, Danish, German, English, Spanish, Finnish, French, Greek, Italian, Kazakh, Nepali, Dutch, Norwegian, Polish, Brazilian Portuguese, Ukrainian, Vietnamese, and Chinese. Voices for Piper are trained from [open audio datasets][open-audio], many of which come from [free audiobooks read by volunteers][audiobook]. If you’re interested in contributing your voice, [let us know!][contact]

You can also run [Piper as a standalone Docker container](https://hub.docker.com/r/rhasspy/wyoming-piper).

[mm-algo]: https://github.com/jaywalnut310/vits/
[piper-samples]: https://rhasspy.github.io/piper-samples
[open-audio]: http://www.openslr.org/
[audiobook]: https://librivox.org/
[contact]: mailto:voice@nabucasa.com

### Local speech-to-text with OpenAI Whisper

[Whisper] is an open source speech-to-text model created by OpenAI that runs locally. Since its release in 2022, Whisper has been improved by the open source community to run on less powerful hardware by projects such as [whisper.cpp] and [faster-whisper]. In less than a year of progress, Whisper is now capable of providing speech-to-text for [dozens of languages][whisper-lang] on small servers and single-board computers!

An {% my supervisor_addon addon="core_whisper" title="add-on using faster-whisper" %} is available now for Home Assistant. On a Raspberry Pi 4, voice commands can take around 7 seconds to process with about 200 MB of RAM used. An Intel Core i5 CPU or better is capable of sub-second response times and can run larger (and more accurate) versions of Whisper.

You can also run [Whisper as a standalone Docker container](https://hub.docker.com/r/rhasspy/wyoming-whisper).

[Whisper]: https://github.com/openai/whisper
[whisper-lang]: https://github.com/openai/whisper#available-models-and-languages
[whisper.cpp]: https://github.com/ggerganov/whisper.cpp
[faster-whisper]: https://github.com/guillaumekln/faster-whisper/

## Wyoming: the voice assistant glue

Voice assistants share many common functions, such as speech-to-text, intent-recognition, and text-to-speech. We created the [Wyoming protocol][Wyoming] to provide a small set of standard messages for talking to voice assistant services, including the ability to stream audio.

Wyoming allows developers to focus on the core of a voice service without having to commit to a specific networking stack like HTTP or MQTT. This protocol is compatible with the upcoming [version 3.0 of Rhasspy][Rhasspy], so both projects can share voice services.

With Wyoming, we’re trying to kickstart a more interoperable open voice ecosystem that makes sharing components across projects and platforms easy. Developers and scientists wishing to experiment with new voice technologies need only implement a small set of messages to integrate with other voice assistant projects.

The Whisper and Piper add-ons mentioned above are integrated into Home Assistant via the new [Wyoming integration]. Wyoming services can also be run on other machines and still integrate into Home Assistant.

[Wyoming]: https://github.com/rhasspy/rhasspy3/blob/master/docs/wyoming.md
[Rhasspy]: https://github.com/rhasspy/rhasspy3/
[Wyoming integration]: https://www.home-assistant.io/integrations/wyoming/

## ESPHome powered voice assistants

[ESPHome] is our software for microcontrollers. Instead of programming, users define how their sensors are connected in a YAML file. ESPHome will read this file and generate and install software on your microcontroller to make this data accessible in Home Assistant.

Today we’re launching support for building voice assistants using ESPHome. Connect a microphone to your ESPHome device, and you can control your smart home with your voice. Include a speaker and the smart home will speak back.

<lite-youtube videoid="w6QxGdxVMJs" videotitle="$13 voice assistant for Home Assistant"></lite-youtube>

We’ve been focusing on the [M5STACK ATOM Echo][atom-echo] for testing and development. For $13 it comes with a microphone and a speaker in a nice little box. We’ve created a tutorial to turn this device into a voice assistant directly from your browser!

[Tutorial: create a $13 voice assistant for Home Assistant.](https://www.home-assistant.io/voice_control/thirteen-usd-voice-remote/)

[ESPHome Voice Assistant documentation.](https://esphome.io/components/voice_assistant.html)

[ESPHome]: https://esphome.io
[atom-echo]: https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit?ref=NabuCasa

## World’s Most Private Voice Assistant

If you were designing the world’s most private voice assistant, what features would it have? To start, it should only listen when you’re ready to talk, rather than all the time. And when it responds, you should be the only one to hear it. This sounds strangely familiar…🤔

A phone! No, not the featureless rectangle you have in your pocket; an analog phone. These great creatures once ruled the Earth with twisty cords and unique looks to match your style. Analog phones have a familiar interface that’s hard to beat: pick up the phone to listen/speak and put it down when done.

With Home Assistant’s new [Voice-over-IP integration][voip], you can now use an “old school” phone to control your smart home!

<lite-youtube videoid="0YJzLIMrnGk" videotitle="World’s Most Private Voice Assistant"></lite-youtube>

By configuring off-hook autodial, your phone will automatically call Home Assistant when you pick it up. Speak your voice command or question, and listen for the response. The conversation will continue as long as you please: speak more commands/questions, or simply hang up. Assign a unique voice assistant/pipeline to each VoIP adapter, enabling dedicated phones for specific languages.

We’ve focused our initial efforts on supporting [the Grandstream HT801 Voice-over-IP box][ht801]. It works with any phone with an RJ11 connector, and connects directly to Home Assistant. There is no need for an extra server.

[Tutorial: create your own World’s Most Private Voice Assistant](https://www.home-assistant.io/voice_control/worlds-most-private-voice-assistant/)


<p class='img'>
<lite-youtube videoid="eLx8_NAqptk" videotitle="World’s Most Private Voice Assistant meets ChatGPT"></lite-youtube>
Give your voice assistant personality using the OpenAI integration.
</p>

[voip]: https://www.home-assistant.io/integrations/voip/
[ht801]: https://amzn.to/40k7mRa

_Some links on this page are affiliate links and purchases using these links support the Home Assistant project._

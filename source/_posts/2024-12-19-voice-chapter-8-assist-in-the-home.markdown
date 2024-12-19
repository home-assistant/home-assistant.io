---
layout: post
title: "Voice Chapter 8 - Assist in the home today"
description: "All the things you can do with Assist today, along with the state of our development, limitations, and where you can help."
date: 2024-12-19 00:00:01
date_formatted: "December 19, 2024"
author: Mike Hansen
comments: true
categories: Assist
og_image: /images/blog/2024-12-voice-chapter-8/art.png
---

<img src='/images/blog/2024-12-voice-chapter-8/art.png' alt="Voice chapter 8 - Assist in the home today">

As you have probably already read, we launched our [Home Assistant Voice Preview Edition](/voice-pe/) today. The culmination of the past several years of open-source software progress on Home Assistant's home-grown voice assistant, [Assist](/voice_control/). A sizable group of dedicated developers has been working together on adding and honing its many features, and if it's been a while since you tried Assist, you should use this launch as a chance to jump back in and see the progress we've made.

[Home Assistant Voice Preview Edition](/voice-pe/) has been launched to build on this work, continuing the momentum we've already built and accelerating our goal of not only matching the capabilities of existing voice assistants but surpassing them. We had an early production run of Voice Preview Edition (a preview preview 😉), and we tried to get them in the hands of as many of our language leaders and voice developers as possible - and we're already seeing the fruits of their efforts with language support improving over the past month alone!

I'd like to highlight in this voice chapter all the things you can do with Assist today. I also want to give the state of our development, what the limitations are, and where your support can be best applied.

### Table of Contents

- [Assist in the home today](#assist-in-the-home-today)
  - [Origins of Assist](#origins-of-assist)
  - [Commands](#commands)
  - [Timers](#timers)
  - [Exposing devices and Aliases](#exposing-devices-and-aliases)
  - [Room context](#room-context)
  - [Wake words](#wake-words)
- [Speech Processing](#speech-processing)
  - [Language support](#language-support)
  - [Text-to-speech](#text-to-speech)
  - [Speech-to-text](#speech-to-text)
  - [AI and Assist](#ai-and-assist)
- [Conclusion](#conclusion)

<!--more-->

## Assist in the home today

### Origins of Assist

<p class='img'><img src='/images/blog/2024-12-voice-chapter-8/assist.png' style='border: 0;box-shadow: none;' alt="Early Assist being used in chat">Early versions of Assist via chat - things have come a long way</p>

Voice control for Home Assistant goes back further than most people assume, with some of the groundwork we use today being [added as far back as 2017](/blog/2017/07/29/release-50/). The major turning point came when we refocused our efforts and declared 2023 the [Year of the Voice](/blog/2022/12/20/year-of-voice/). This was an effort to focus development and find areas where our community could make the most impact. During the Year of the Voice [Assist](/voice_control/) was added to voice, intents were improved, languages added, wake words were created, and we established great local and cloud options for running voice. Shortly after Year of the Voice many more features were added, including integrated AI, timers, and even better wake words. Year of the Voice got the ball rolling, and Voice Preview Edition will continue its momentum.

### Commands

[Assist](/voice_control/) is the underlying technology that allows Home Assistant to turn commands ("turn on the light") into Actions (`light.turn_on`). Commands, or as we call them *intents*, allow you to control pretty much every aspect of your smart home, including on, off, play, pause, next, open, close, and more. We also have intents that give you helpful information like what's the time, weather, temperature, and so on. Lastly, there are a bunch of other useful miscellaneous things, like adding items to a shopping list and setting timers. If you're interested, there is a [full list here](https://developers.home-assistant.io/docs/intent_builtin/).

### Timers

<div style="text-align: center;">
  <video src="/images/blog/2024-12-voice-chapter-8/timer.webm"
         autoplay muted loop playsinline>
    Your browser does not support the video tag.
  </video>
</div>

When we [asked our community](https://community.home-assistant.io/t/poll-what-do-you-use-your-voice-assistant-for-what-do-you-expect-it-to-do-multiple-selections/693669) timers were a top-requested ability. You can not only set a timer, pause, increase, decrease or cancel it, but you can also set commands to [trigger after a set amount of time](/blog/2024/06/26/voice-chapter-7/#timers-control-devices), for example, "turn off the TV in 15 minutes". You can also just say "Stop" without a wake word, to silence the timer's alarm. On our Voice Preview Edition, when you set a timer the LED ring counts down the last seconds and flashes when it's done.

### Exposing devices and Aliases

This sets us apart from other voice assistants: we allow you to expose and effectively hide devices from your voice assistant. For example, you could choose not to expose a door lock but instead just expose the sensor that knows if the door is closed. It puts you in the driver's seat on what voice can do in your home. We also introduced aliases to allow you to give devices multiple names, allowing you to speak more naturally with Assist.

### Room context

If you tell your Assist hardware what room it is in and ensure other devices are organized by room, you can give commands like "turn off the lights", and without specifying anything, it will turn off the lights in the room you are in. This feature also works with media players (play/pause/next) and timers.

### Wake words

<p class='img'><img src='/images/blog/2024-12-voice-chapter-8/wake-word.webp' style="max-width: 100%; height: auto; display: inline-block;" alt="Timer animation video"><br>Our community is donating small amounts of time to improve wake words <a href="/blog/2024/10/24/wake-word-collective/" target="_blank">with our tool</a>.</br></a>

Wake Words are the unique phrases that initiate a voice assistant to listen and start processing a command. Wake words originally had to be processed on Home Assistant via an add-on like openWakeWord, meaning the Assist hardware needed to continuously stream audio to Home Assistant. Shortly after Year of the Voice [microWakeWord](/blog/2024/02/21/voice-chapter-6/#microwakeword) was released, which brought wake word processing on-device for faster responses. It is improving fast thanks to our community using our [fast and easy tool](/blog/2024/10/24/wake-word-collective/) to donate samples of their voice. There is a growing list of wake words, and  the on-device options include "Okay Nabu" (default and most reliable), "Hey Jarvis", and "Hey Mycroft". Both of these wake word engines were built by the Home Assistant community and are open source, giving the world two great free and open wake word engines!

## Speech Processing

<p class='img'><img src='/images/blog/2024-12-voice-chapter-8/voice-pipeline.png' alt="Timer animation video">The Assist pipeline in all its glory</a>

Assist can't understand spoken words and needs something to take that audio and turn it into text - all this together is called an Assist pipeline. This speech processing is really CPU intensive, so it can't happen on the Voice Assistant Hardware, and sometimes your Home Assistant system can't even handle it. One important step we made was adding speech-to-text and text-to-speech capabilities to [Home Assistant Cloud](/cloud/), which allows low-powered Home Assistant hardware to offload speech processing to the cloud. Home Assistant Cloud doesn't store or use this data to train on - clouds don't get any more private than ours. It is also the most accurate and power-efficient way to process speech. We've put considerable effort into local speech processing, building the add-ons and a new protocol they use to speak to Home Assistant, but they are very reliant on language support from the community.

### Language support

<p class='img'><img src='/images/blog/2024-12-voice-chapter-8/language-support.png' style='border: 0;box-shadow: none;' alt="Our language checker">See if your language is supported with <a href="/voice-pe/#language-support" target="_blank">our checker</a>.</p>

Assist aims to support more languages than other voice assistants, and this has been a massive undertaking for our community - We need more help. The first step for language support is getting the commands (intents) right, and we have [over 25 major languages](https://home-assistant.github.io/intents/) that are ready to use today. Our wake words are also getting better at understanding different accents thanks to our [Wake Word Collective tool](https://ohf-voice.github.io/wake-word-collective/).

### Text-to-speech

We built our own text-to-speech system, [Piper](/integrations/piper/), and it now supports over 30 languages. It's a fast, local neural network-powered text-to-speech system that sounds great and can run on low-powered hardware (it's optimized for Pi4!). It was built with the voices of our community, and if you don't see your native tongue, [add your voice](https://github.com/rhasspy/piper/blob/master/TRAINING.md)!

### Speech-to-text

There is one area that holds back the rest of our language support more than others, and that's local speech-to-text. Building a full speech-to-text model needs big compute resources and terabytes of samples, which is currently outside our reach. We use [Whisper](/integrations/whisper/) for local speech-to-text processing, an open-source project from OpenAI, and we're grateful it exists. For some languages, it works great and doesn't require a lot of system resources to run well, but for others, you need a pretty beefy system to get acceptable results. In our opinion, only about 15 languages are ready to be run locally on reasonable hardware (an Intel N100 or better) - that's why before you begin dreaming up your perfect all-local setup, we recommend checking [language support](/voice-pe/#language-support).

We're always looking for new solutions for low-powered hardware, and are now building another tool that uses much less complex sentence recognition. This could even run on a Raspberry Pi 4, but it would only be able to identify predefined sentences, so if you go off script you may need to call in an AI to help Assist understand your needs. Our language leaders are hard at work putting together the needed translations, but if you want to learn more visit [Rhasspy Speech](https://github.com/rhasspy/rhasspy-speech).

In general, even when your language is supported, you'll almost always get better results from Home Assistant Cloud. Use the free trial to see what works best for you. Also, you can use both, we know someone using an automation to switch the Assist pipeline to an all local setup when their internet is down.

### AI and Assist

<p class='img'><lite-youtube videoid="vThoxRIxHyI" videotitle="Assist working with AI"></lite-youtube>Our default local conversation agent mixed with AI is great for natural language and speed</p>

Another aspect where we beat the competition hands down is the integration of AI into our voice assistant. You can choose from some of the biggest cloud AI providers like ChatGPT, Google Gemini, and Claude (paid accounts required). You can also run it locally via [Ollama](https://ollama.com/) if you have a modern graphics processor with enough VRAM, allowing you to build the most capable offline voice setup around.

Our intents (Assist's built-in sentences) are getting better at understanding most commands, but AI processes commands in natural language, meaning if you get the device's name ever so slightly off, it can still figure things out. It also provides the ability to ask outside the built-in intents. For instance, if you tell it "It's a bit cold in here", it may raise the temperature on your thermostat, but it could forgo any home control and just tell you to put on a jacket - results are not yet consistent. More useful is its ability to take multiple sensors and provide context. For instance, you could ask it for an air quality report, and it could review the CO2 levels and tell you to open a window it observes is shut. All this is experimental, and having an AI control your home is not for everyone, but what's important is that you have the choice.

## Conclusion

So many new innovations and improvements for Assist have happened in the past couple of months, and this speaks to the power of having good hardware to build our software on. Voice Preview Edition is the best open voice hardware available today, and even with it only in the hands of a couple of hundred people today, it's making a noticeable difference. Whether that's writing code, improving language support, making blueprints, or even just reporting bugs. The momentum we will build having this in the hands of thousands will be game-changing - it's why we've declared that the era of open voice assistants has arrived.

In the comments sections, we always have a couple of people saying, "but I don't use voice, what about improving (this or that)". The good news is that improving Assist and Home Assistant's other features are already happening in tandem (check out [our roadmap](/blog/2024/11/15/roadmap-2024h2/) for the complete picture of our priorities). In the end, only a fraction of our development goes towards voice, and our budget is what Amazon's voice team probably spends on pizza parties 😆. A great side effect is the problems we're solving with voice are benefiting other parts of Home Assistant, for example, our integration of AI was driven by voice.

We really think voice is an integral part of a well-rounded smart home ecosystem. It's especially important for improving the accessibility of home control to all members of the household. There needs to be real options in the space, most importantly ones that give you full control and a real choice on privacy.

### Home Assistant Voice Preview is available at retailers today,<!-- omit in toc -->

<div style="text-align: center; margin-bottom: 20px;">
  <img src="/images/blog/2024-12-voice-chapter-8/vpe-packaging.png"
       alt="Voice Preview Edition with packaging">
</div>

<div style="text-align: center; margin-bottom: 20px;">
  <a href="/voice-pe/">
    <img src="/images/blog/2024-12-voice-chapter-8/buy-now.png"
         style="border: 0; box-shadow: none;"
         alt="buy now">
  </a>
</div>

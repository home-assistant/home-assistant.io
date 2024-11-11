---
layout: post
title: "Voice Chapter 7 - Supercharged wake words and timers"
description: "MicroWakeWord v2 brings huge improvements, and we introduce advanced timers."
date: 2024-06-26 00:00:01
date_formatted: "June 26, 2024"
author: Mike Hansen
comments: true
categories: Assist
og_image: /images/blog/2024-06-voice-chapter-7/art.jpg
---
This chapter might be one of the most feature-packed yet, bringing the highly requested timer feature and major improvements to wake words, along with experimental technology that even outclasses big tech's voice assistants.

<lite-youtube videoid="nLLO4u2Tbbo" videotitle="Voice - Chapter 7 live stream"></lite-youtube>

Welcome to Voice Chapter 7, on today's menu:

- [Big things for microWakeWord](#big-things-for-microwakeword)
- [Timers are here!](#timers-are-here)
- [Timers control devices](#timers-control-devices)
- [AI in control](#ai-in-control)
- [Expand an LLM with scripts](#expand-an-llm-with-scripts)
- [Enhanced Media Control](#enhanced-media-control)
- [Easier updates for your voice assistant](#easier-updates-for-your-voice-assistant)

<!--more-->

## Big things for microWakeWord

At the beginning of this year wake word detection could only run on Home Assistant itself. Voice devices would pass on all audio to Home Assistant, which would listen out for supported wake words like "Hey Jarvis" or "Okay Nabu".  This had the downside that your device, let's say a Raspberry Pi, could only support a handful of voice satellites, and there would always be a delay in responses. We knew the benefits of wake word detection running on-device, but there was a lack of good open source options.

[Kevin Ahrendt](https://github.com/kahrendt), a former mathematics professor, took up the task and created [microWakeWord](https://github.com/kahrendt/microWakeWord) in his spare time. It is a wake word engine optimized to run fast and reliably on microcontrollers. It was made for ESPHome, but it is available standalone and under the Apache 2.0 open source license. No one will ever have to pay for wake words ever again.

In our [Chapter 6 Livestream](https://www.youtube.com/live/NQIv3nsu7dE?si=9RZy-LpcRLiMjGg3&t=863) we did a deep dive into how this voice processing is possible on such lean hardware (we're talking late-90s PC levels of RAM and CPU power). It was in this last chapter where we launched [v1 of microWakeWord](/blog/2024/02/21/voice-chapter-6/), which at the time could only run on ESP32-S3 chips. A lot has happened since then, and it's all *awesome*.

### microWakeWord and Kevin join the team <!-- omit in toc -->

We are proud to announce that microWakeWord has become a collaboration partner of the [Open Home Foundation](https://www.openhomefoundation.org/) (OHF). The foundation owns and supports Home Assistant, ESPHome, and our Text-to-Speech engine, Piper. The collaboration partner status recognizes microWakeWord as an important technology for the Open Home.

Nabu Casa, the company behind Home Assistant Cloud, has no investors and its sole purpose is to serve the Open Home Foundation. The money it earns is used to hire developers to work on Home Assistant and other Open Home projects. They have been a driving force behind voice development and are building their own [ESPHome-based voice hardware](/blog/2024/06/12/roadmap-2024h1/#current-priority-2-make-assist-easier-to-start-with), to allow anyone to enjoy a privacy-focused voice assistant.

Kevin's contributions have already been incredibly valuable to our work with Voice. That's why we're super stoked to announce that Kevin has joined Nabu Casa, where he will initially focus on microWakeWord and voice handling in ESPHome.

To support this work on Home Assistant, ESPHome, voice assistants, and more, consider subscribing to [Home Assistant Cloud](https://www.nabucasa.com/).

### 3x wake words and 2x accuracy <!-- omit in toc -->

Kevin has been hard at work on improving microWakeWord, and we're happy to announce version 2, which will be included in the next ESPHome release. It runs a lot faster and with improved accuracy.

<p class='img'><lite-youtube videoid="LbS3Udx36H8" videotitle="Multiple wake words on a single esp32 device"></lite-youtube>
$13 Atom Echo running two wake words on-device!</p>

When we say the new model is faster, we mean a lot faster. Not only does it now run on the normal ESP32 chips, those chips can now run **three wake words at the same time**! We haven't added this feature to Home Assistant yet, but expect to be able to trigger your Dutch and English voice assistants, each with their own wake words.

The new performance doesn't come at the cost of accuracy - it's the opposite. **The new model performs twice as well** as microWakeWord v1, especially when you take advantage of its [voice activity detection](https://en.wikipedia.org/wiki/Voice_activity_detection) feature. We would love to benchmark our models against commercial competitors, but "false acceptances per hour" are considered by most companies to be a trade secret and not published.

<img src='/images/blog/2024-06-voice-chapter-7/mWW-v1-vs-v2.png' style='border: 0;box-shadow: none;' alt="Picovoice benchmark microWakeWord v1 vs v2">

The graph above gives the results from the Picovoice benchmark, which uses hundreds of samples of the wake word from real speakers spread out over 24 hours with realistic background noise mixed in. Spoken English sentences that don't contain the wake word are layered in to test false acceptances, ie. triggering when the wake word wasn't actually said. We can increase the model's confidence level, which makes it less likely to have a false trigger, but also less likely to accept a wake word. Across the board v2 outperforms v1, and in good circumstances it outperforms v1 by nearly double!

Next for microWakeWord is to improve the accuracy for non-native English speakers. It will require us to collect recordings of people around the world saying the wake words. We're working on a website to allow anyone to easily participate directly from their phone.

## Timers are here!

Ask and you shall receive - in February this year [we asked our community](https://community.home-assistant.io/t/poll-what-do-you-use-your-voice-assistant-for-what-do-you-expect-it-to-do-multiple-selections/693669) what features they want from a voice assistant, and next to controlling devices and responding to wake words, timers were the third most requested. This is just one example of how [our roadmap](/blog/2024/06/12/roadmap-2024h1/) is helping us spot gaps and build solutions.

First the important bits: **yes, you can have multiple timers**. These short-lived timers allow users to be reminded of something after a period of time. For example, if you're boiling eggs, you can set a timer to remind you to take the eggs out. Each timer has a duration, and optionally a name.

Users can use their voice to create, cancel, pause, resume, and change the duration of a timer:

 - "Create a timer for 5 minutes"
 - "Create a 15-minute timer for pizza"
 - "Cancel my timer"
 - "Add 2 minutes to my 5-minute timer"
 - "Subtract 3 minutes from my pizza timer"

When you give timers a name, it is easier to distinguish when you have multiple running as you can now reference it by name or duration ("cancel pizza timer" or "cancel 15-minute timer").

<p class='img'><lite-youtube videoid="v3mNdTsX4J0" videotitle="Voice timers with countdown text and loading bar"></lite-youtube>Timers running on an S3 Box, with countdown text and a loading bar!</p>

Timers are available today on ESPHome and Wyoming voice satellites that are connected to the latest version of Home Assistant. If you use the firmware we provided for the Atom Echo Dev Kit or the ESP32-S3 Box 3, update to the latest version for timer support.

## Timers control devices

While working on timers, we thought: why limit our users to just playing a beeping sound after the clock ticks down. What if any command could be executed with a timed delay?

<p class='img'><lite-youtube videoid="rgf5t3vn7TQ" videotitle="Using timers to control devices"></lite-youtube>A timer controlling a light</p>

That's why in this release, users can now allow **any voice command** to be executed with a timed delay: "turn off the lights in 10 minutes". When the time is up, the text of the voice command is processed by the same voice assistant that heard the delayed command. Just be careful, unlike regular voice timers, these delayed commands cannot be canceled or modified.

 - Turn off the lights in 5 minutes
 - Pause TV in 10 minutes
 - Open the blinds in 5 minutes

Large language models (LLMs) are also able to create delayed commands, for instance saying "I'm going to bed early tonight", might lead the LLM to send itself a delayed command to start the bedtime routine sooner.

## AI in control

Speaking of LLMs, our Home Assistant 2024.6 update allows [AI agents to control your devices](/blog/2024/06/05/release-20246/#voice--assist). This is part of our broader AI strategy we outlined [in a recent blog](/blog/2024/06/07/ai-agents-for-the-smart-home/). It will be an important part of the future smart home, and Home Assistant will be the best platform for AI because of its focus on privacy and choice. We know it is not for everyone, nor is it ready for mass adoption, but we are making it available to experiment with. Give it a try on your voice hardware today, with device control currently available on both [Google AI](/integrations/google_generative_ai_conversation/) and [OpenAI](/integrations/openai_conversation/).

## Expand an LLM with scripts

To make it easier to expand the things that LLMs can do, Home Assistant 2024.7 (coming next week), will allow LLMs to access approved scripts. This lets you precisely control what the LLM will do in specific situations while retaining flexibility and natural language processing AI's are so good at.

<img src='/images/blog/2024-06-voice-chapter-7/voice-script.png' alt="Exposing voice scripts to Assist in Home Assistant Voice settings" class='no-shadow'>

For example, telling an LLM conversation agent that you're leaving the house may result in some unexpected behavior, such as turning off devices you want to be left on. To fix this, create a "leaving home" script that does exactly what you want and expose it to Assist. You could also add fields into the script, which help further guide the LLM, like giving it different behaviors for short or long trips away from home. Now when you say something like "I'm heading out for a couple of minutes", using the script it will lock the door, but not turn off the air conditioning.

## Enhanced Media Control

Assist can now control media players with simple commands like "pause", "resume", "next", and "set volume to 100%". While simple on the surface, a lot of complexity is hidden underneath. Consider a living room with two media players: a smart speaker that is paused and a TV that is playing. If the user says "pause", the TV will be paused since it is the only media player that is currently playing. However, if the user then says "resume", Assist will only resume the TV because it was the last media player paused.

<p class='img'><lite-youtube videoid="pFmwY-k5IcU" videotitle="Demo of media player commands of Home Assistant Assist"></lite-youtube>Media control in action</p>

Media players can be targeted by name ("pause TV") or by area ("resume music in the kitchen"). When not provided, the area and floor of the voice satellite are used to determine which media player(s) to target. So "pause" will look for media players that are playing in the current area, followed by the current floor.

## Easier updates for your voice assistant

Our voice satellites are powered by ESPHome, our open source framework for making private, secure, and reliable smart home devices of all kinds. We are regularly improving our voice capabilities in updates and we want our users to have easy access to these new features.

With the latest version of ESPHome we have introduced [Over-the-Air updates](https://esphome.io/changelog/2024.6.0.html#ota-platforms). Following our upcoming Home Assistant 2024.7 release, users building a [ready-made voice satellite projects](https://esphome.io/projects/?type=voice) (such as the Atom Echo or S3 Box), will be able to update the device directly from Home Assistant without requiring the ESPHome add-on. These devices can download their firmware directly from the web, no building required.

*If you stuck around all the way to the end, don't forget to check out the [Chapter 7 live stream](https://www.youtube.com/watch?v=nLLO4u2Tbbo) for even more on voice!*
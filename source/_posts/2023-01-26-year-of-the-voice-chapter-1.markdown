---
layout: post
title: "Year of the Voice - Chapter 1: Assist"
description: "Assist is the new feature in Home Assistant to handle all your conversations."
date: 2023-01-26 00:00:00
date_formatted: "January 26, 2023"
author: Paulus Schoutsen
comments: true
categories: Assist
og_image: /images/blog/2023-01-26-year-of-the-voice-chapter-1/social.png
---

This year is Home Assistant's [year of the voice](https://www.home-assistant.io/blog/2022/12/20/year-of-voice/). It is our goal for 2023 to let users control Home Assistant in their own language. Today, one month into 2023, we start our first chapter.

At Home Assistant we believe that technology is meant to be played with and projects should be usable as soon as possible. Together with the community we can then iterate and refine. That's why today, we're delivering a basic experience for 22 different languages to interact with Home Assistant. Oh, and we are also releasing some fun stuff that we cooked up along the way too.

_To watch the video presentation of this blog post, including live demos, check [the recording of our live stream](https://www.youtube.com/live/ixgNT3RETPg)._

## Intentions

The core of a voice assistant is to be able to understand the intention of a spoken sentence. What is it the user wants to do? To extract these intentions we created our own template sentence matching syntax and intent recognizer named [Hassil](https://github.com/home-assistant/hassil).

This new format is used by our new [Home Assistant Intents](https://github.com/home-assistant/intents) project. The goal of this project is to start collecting home automation sentences in every possible language. Since it's start a month ago, we have had 112 different people contribute. The project now supports 22 languages and 14 more are on the way.

## <img src='/images/assist/assist-icon.svg' alt='Assist icon' style='height: 32px' class='no-shadow'> Assist

We have added a new feature to Home Assistant: Assist. It will use our new intent recognizer Hassil and the sentences from the Home Assistant Intent project to allow users to use natural language to control Home Assistant.

<!--more-->

Matching exact sentences is not going to perform as good as an AI system would do. We won't exclude implementing such a system in the future. However, it is important that we offer a basic version that works in Home Assistant without requiring the user to invest in extra hardware to run AI models. This keeps the Assist feature accessible to as many people as possible.

The new feature is enabled by default in the Home Assistant 2023.2 release. Tap the new Assist icon <img src='/images/assist/assist-icon.svg' alt='Assist icon' style='height: 32px' class='no-shadow'> at the top right of the dashboard to use it.

[Read the Assist documentation.](/docs/assist/)

<img src="/images/blog/2023-01-26-year-of-the-voice-chapter-1/assist-dialog.png" alt="Screenshot of the Assist dialog" class='no-shadow' />

## Assist on Android Wear

We want to make it as easy as possible to use Assist. To enable this for Android users, we have added a new tile to the Android Wear app. A simple swipe from the clock face will show the assist button and allows you to send voice commands.

_The new tile is currently available in beta and will be part of the next Android release._

<img src="/images/assist/android_watch.png" alt="Screenshot of the Android Wear Assist tile" class="no-shadow" />

## Assist via Siri and Apple Shortcuts

For Apple devices we have been able to create a fully hands-free experience by integrating with Siri. The Home Assistant app has been updated to include a new Apple Shortcut Assist action.

The shortcut can also be manually triggered from your Mac taskbar, iPhone home screen or Apple Watch complication.

<lite-youtube videoid="sQ7X7jz1SrA" videotitle="Assist on Apple HomePod"></lite-youtube>

## Custom Sentences

With Home Assistant we believe that every home is uniquely yours and that [technology should adapt to you, not the other way around.](https://www.home-assistant.io/blog/2016/01/19/perfect-home-automation/) That's why we have architected Home Assistant to allow users to extensively customize their experience. Our Assist feature is no different.

- Are you into Game of Thrones and want every response to be "hodor"?
- Do you like magic and want to turn on the lights by saying "Hocus pocus living room"?
- Do you want to trigger your party mode script using a custom sentence?

With Home Assistant 2023.2 we're introducing support for custom sentences, responses and intents, allowing you to achieve all that. We've designed the custom sentence format in a way that it can be easily shared with the community.
Read [the documentation](/docs/assist/custom_sentences) on how to get started.

_In a future release we're planning on adding a user interface to customize sentences and allow importing sentences directly from the forums._

## Custom Assist engines

By default Assist is powered by our intent recognizer. It is local but it's sentence matching capability is limited to controlling devices. Maybe you want to be able to ask more wide-range queries or you are looking for a conversational AI that will make up responses and present it as the truth. For such cases the Assist feature supports [swapping out its engine](https://developers.home-assistant.io/docs/core/conversation/custom_agent) that handles all Assist interactions.

The Home Assistant 2023.2 release includes two Assist engines that you can enable: Google Assistant and OpenAI GPT-3. If you have linked up your Home Assistant instance to Google Assistant, you will actually be able to control your home when using Assist with Google Assistant.

All Assist interfaces will continue to work, regardless of the Assist engine that is being used. So if you ever wanted to use Google Assistant on your HomePod, now you can 🤭

<lite-youtube videoid="orgTMVy0TrI" videotitle="Google Assistant on Apple HomePod"></lite-youtube>


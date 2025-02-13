---
layout: post
title: "Speech-to-Phrase brings voice home - Voice chapter 9"
description: "This new tool brings fast, local speech processing to low-end hardware, along with some useful new voice and AI features"
date: 2025-02-13 00:00:01
date_formatted: "February 13, 2025"
author: Mike Hansen
comments: true
categories: Assist
og_image: /images/blog/2025-02-voice-chapter-9/art.jpg
---

<lite-youtube videoid="k6VvzDSI8RU" videotitle="Voice Chapter 9 - Speech-to-Phrase"></lite-youtube>

**Welcome to Voice chapter 9 🎉 part of our [long-running series](https://www.home-assistant.io/blog/categories/assist/) following the development of open voice.**

We're still pumped from the launch of the [Home Assistant Voice Preview Edition](/voice-pe/) at the end of December. It sold out 23 minutes into our announcement - wow! We've been working hard to keep it in stock at [all our distributors](/voice-pe#buy).

Today, we have a lot of cool stuff to improve your experience with Voice PE or any other Assist satellite you're using. This includes fully local and offline voice control that can be powered by nearly any Home Assistant system.

- [Voice for the masses](#voice-for-the-masses)
- [Building an Open Voice Ecosystem](#building-an-open-voice-ecosystem)
- [Large language model improvements](#large-language-model-improvements)
- [Expanding Voice Capabilities](#expanding-voice-capabilities)
- [Home Assistant phones home: analog phones are back!](#home-assistant-phones-home-analog-phones-are-back)
- [Wyoming improvements](#wyoming-improvements)
- [🫵 Help us bring choice to voice!](#-help-us-bring-choice-to-voice)
<!--more-->

Dragon NaturallySpeaking was a popular speech recognition program introduced in 1997. To run this software you needed at least a 133 MHz Pentium processor, 32 MB of RAM, and Windows 95 or later. Nearly thirty years later, Speech-to-Text is much better, but needs orders of magnitude more resources.

Incredible technologies are being developed in speech processing, but it's currently unrealistic for a device that costs less than $100 to take real advantage of them. It's possible, of course, but running the previously recommended Speech-to-Text tool, [Whisper](https://github.com/openai/whisper), on a Raspberry Pi 4 takes at least 5 seconds to turn your speech into text, with varying levels of success. This is why we ended up recommending at least an Intel N100 to run your voice assistant fully locally. That stung. Our opt-in analytics shows over [50% of the Home Assistant OS users](https://analytics.home-assistant.io/) are running their homes on affordable, low-powered machines like the [Home Assistant Green](/green) or a Raspberry Pi.

What's more, advancing the development of Whisper is largely in the hands of OpenAI, as we don't have the resources required to add languages to that tool. We could add every possible language to Home Assistant, but if any single part of our voice pipeline lacks language support, it renders voice unusable for that language. As a result, many widely spoken languages were unsupported for local voice control.

This left many users unable to use voice to control their smart home without purchasing extra hardware or services. We’re changing this today with the launch of a key new piece of our voice pipeline.

## Voice for the masses

<img src='/images/blog/2025-02-voice-chapter-9/stp-logo.jpg' style='border: 0;box-shadow: none;' alt="Speech-to-Phrase logo">

[Speech-to-Phrase](https://github.com/OHF-voice/speech-to-phrase) is based on old, almost ancient, voice technology by today's standards. Instead of the ability to transcribe virtually any speech into text, it is limited to a set of pre-trained phrases. Speech-to-Phrase will automatically generate the phrases and fine-tune a model based on the devices, areas, and sentence triggers in your Home Assistant server - 100% locally and offline.

**The result:** speech transcribed in under a second on a Home Assistant Green or Raspberry Pi 4. The Raspberry Pi 5 processes commands seven times faster, clocking in at 150 milliseconds per command!

With great speed comes *some* limitations. Speech-to-Phrase only supports a subset of Assist's voice commands, and more open-ended things like shopping lists, naming a timer, and broadcasts are not usable out of the box. Really any commands that can accept random words (wildcards) will not work. For the same reasons, Speech-to-Phrase is intended for home control only and not LLMs.

The most important home control commands are supported, including turning lights on and off, changing brightness and color, getting the weather, setting timers, and controlling media players. [Custom sentences](/docs/automation/trigger/#sentence-trigger) can also be added to trigger things not covered by the current commands, and we expect the community will come up with some clever new ways to use this tech.

<img src='/images/blog/2025-02-voice-chapter-9/green-pe.png' style='border: 0;box-shadow: none;' alt="Green and Voice PE join forces">
<p align="center"><em>All you need to get started with voice</em></p>

Speech-to-Phrase is launching with support for English, French, German, Dutch, Spanish, and Italian - covering nearly 70% of Home Assistant users. Nice. Unlike the local Speech-to-Text tools currently available, adding languages to Speech-to-Phrase is much easier. This means many more languages will be available in future releases, and [we would love your help](/voice_control/contribute-voice) adding them!

We're working on updating the Voice wizard to include Speech-to-Phrase. Until then, you need to install the add-on manually:

[<img src='https://my.home-assistant.io/badges/supervisor_addon.svg' style='border: 0;box-shadow: none;' alt="!Open your Home Assistant instance and show the dashboard of an add-on.">](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_speech-to-phrase)

## Building an Open Voice Ecosystem

When we launched Home Assistant Voice Preview Edition, we didn't just launch a product; we kickstarted an ecosystem. We did this by open-sourcing all parts and ensuring that the voice experience built into Home Assistant is not tied to a single product. Any voice assistant built for the Open Home ecosystem can take advantage of all this work. Even your DIY ones!

With ESPHome 2025.2, which we're releasing next week, any ESPHome-based voice assistant will support making [broadcasts](/blog/2025/02/05/release-20252/#new-broadcast-intent) (more on that below), and they will also be able to use our new voice wizard to ensure new users have everything they need to get started.

This will include updates for the [$13 Atom Echo](/voice_control/thirteen-usd-voice-remote/) and ESP32-S3-Box-3 devices that we used for development during the Year of the Voice!

<p class='img'><lite-youtube videoid="HMqXHN0KBQM" videotitle="New broadcast feature in action with Atom and Box 3"></lite-youtube>New broadcast feature in action with Atom and Box 3</p>

## Large language model improvements

We aim for Home Assistant to be [the place for experimentation with AI in the smart home](/blog/2024/06/07/ai-agents-for-the-smart-home/). We support a wide range of models, both local and cloud-based, and are constantly improving the different ways people can interact with them. We're always running [benchmarks](https://github.com/allenporter/home-assistant-datasets/tree/main/reports) to track the best models, and make sure our changes lead to an improved experience.

If you set up [Assist](/voice_control/), Home Assistant's built-in voice assistant, and configure it to use an LLM, you might have noticed some new features landing recently. One major change was the new "[prefer handling commands locally](/blog/2024/12/04/release-202412/#let-your-voice-assistant-fall-back-to-an-llm-based-agent)" setting, which always attempts to run commands with the built-in conversation agent before it sends it off to an LLM. We noticed many easy-to-run commands were being sent to an LLM, which can slow down things and waste tokens. If Home Assistant understands the command (e.g., turn on the lights), it will perform the necessary action, and only passes it on to your chosen LLM if it doesn't understand the command (e.g., what's the air quality like now).

Adding the above features made us realize that LLMs need to understand the commands handled locally. Now, the [conversation history is shared](/blog/2025/02/05/release-20252/#shared-history-between-the-default-conversation-agent-and-its-llm-based-fallback) with the LLM. The context allows you to ask the LLM for follow-up questions that refer to recent commands, regardless of whether they helped process the request.

<img src='/images/blog/2025-02-voice-chapter-9/shared-history.png' style='border: 0;box-shadow: none;' alt="Speech-to-Phrase logo">
<p align="center"><em>Left: without shared conversations. Right: Shared conversations enable GPT to understand context.</em></p>

### Reducing the time to first word with streaming<!-- omit in toc -->

When experimenting with larger models, or on slower hardware, LLM's can feel sluggish. They only respond once the entire reply is generated, which can take frustratingly long for lengthy responses (you'll be waiting a while if you ask it to tell you an epic fairy tale).

In Home Assistant 2025.3 we're introducing support for LLMs to stream their response to the chat, allowing users to start reading while the response is being generated. A bonus side effect is that commands are now also faster: they will be executed as soon as they come in, without waiting for the rest of the message to be complete.

Streaming is coming initially for Ollama and OpenAI.

### Model Context Protocol brings Home Assistant to every AI<!-- omit in toc -->

In November 2024, Anthropic announced the [Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP). It is a new protocol to allow LLMs to control external services. In this release, contributed by [Allen Porter](https://github.com/allenporter), Home Assistant can speak MCP.

Using the new Model Context Protocol [integration](/integrations/mcp), Home Assistant can integrate external MCP servers and make their tools available to LLMs that Home Assistant talks to (for your voice assistant or in automations). There is [quite a collection of MCP servers](https://github.com/punkpeye/awesome-mcp-servers), including wild ones like scraping websites ([tutorial](https://gist.github.com/allenporter/b0e9946feb2ab60901c4f467ac1ba6f9)), file server access, or even BlueSky.

With the new Model Context Protocol [server integration](/integrations/mcp_server), Home Assistant's LLM tools can be included in other AI apps, like the Claude desktop app ([tutorial](https://modelcontextprotocol.io/quickstart/user)). If agentic AI takes off, your smart home will be ready to be integrated.

Thanks Allen!

## Expanding Voice Capabilities

We keep enhancing the capabilities of the built-in conversation agent of Home Assistant. With the latest release, we're unlocking two new features:

#### "Broadcast that it's time for dinner"<!-- omit in toc -->

The new [broadcast](/blog/2025/02/05/release-20252/#new-broadcast-intent) feature lets you quickly send messages to the other Assist satellites in your home. This makes it possible to announce it's time for dinner, or announce battles between your children 😅.

#### "Set the temperature to 19 degrees"<!-- omit in toc -->

Previously Assist could only tell you the temperature, but now it can help you change the temperature of your HVAC system. Perfect for changing the temperature while staying cozy under a warm blanket.

## Home Assistant phones home: analog phones are back!

Two years ago, we introduced the [world's most private voice assistant](/voice_control/worlds-most-private-voice-assistant/): an analog phone! Users can pick it up to talk to their smart home, and only the user can hear the response. A fun feature we're adding today is that Home Assistant can now **call your analog phone!**

Analog phones are great when you want to notify a room, instead of an entire home. For instance, when the laundry is done, you can notify someone in the living room, but not the office. Also since the user needs to pick up the horn to receive the call, you will know if your notification was received.

<p class='img'><lite-youtube videoid="TaoNY1gINWc" videotitle="Have your Home Assistant give you a call"></lite-youtube>Have your Home Assistant give you a call</p>

If you're using an LLM as your voice assistant, you can also start a conversation from a phone call. You can provide the opening sentence and via a new "extra system prompt" option, provide extra context to the LLM to interpret the response from the user. For example,

- Extra system context: garage door cover.garage_door was left open for 30 minutes. We asked the user if it should be closed
- Assistant: should the garage door be closed?
- User: sure

Thanks [JaminH](https://github.com/jaminh) for the contribution.

## Wyoming improvements

Wyoming is our standard for linking together all the different parts needed to build a voice assistant. Home Assistant 2025.3 will add support for announcements to Wyoming satellites, making them eligible for the new broadcast feature too.  

We're also adding a new microWakeWord add-on (the same wake word engine running on Voice PE!) that can be used as an alternative to openWakeWord. As we collect more real-world samples from our [Wake Word Collective](https://ohf-voice.github.io/wake-word-collective/), the models included in microWakeWord will be retrained and improved.

## 🫵 Help us bring choice to voice!

We've said it before, and we'll say it again---the era of open voice has begun, and the more people who join us, the better it gets. Home Assistant offers many ways to start with voice control, whether by [building your own](/voice_control/#expand-and-experiment) Assist hardware or getting a [Home Assistant Voice Preview Edition](/voice-pe/). With every update, you'll see new features, and you'll get to preview the future of voice today.

A huge thanks to all the language leaders and contributors helping to shape open voice in the home! There are many ways to get involved, from translating or sharing voice samples to building new features---learn more about how [you can contribute here](/voice_control/contribute-voice). Another great way to support development is by subscribing to [Home Assistant Cloud](/cloud/), which helps fund the Open Home projects that power voice.

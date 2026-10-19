---
layout: post
title: "Help us make voice better in under a minute"
description: "We’ve built a tool to allow you to help us make local and private voice better for all languages."
date: 2024-10-24 00:00:01
date_formatted: "October 24, 2024"
author: Mike Hansen
comments: true
categories: Assist
og_image: /images/blog/2024-10-wake-word-collective/art.jpg
---
<img src='/images/blog/2024-10-wake-word-collective/art.jpg' alt="Help us improve voice">

Give us a minute of your time and [lend your voice](https://ohf-voice.github.io/wake-word-collective/) to improve our community-driven, privacy-focused voice assistant, and together we'll break big tech's stranglehold on home voice control.

When you use Home Assistant Assist we'll never take your data unwillingly to improve its functionality; that's why we're asking for your help today (more on that below).

Specifically, we're trying to improve our wake word engine, which "wakes" the device to listen for more commands. Our open source [microWakeWord](https://github.com/kahrendt/microWakeWord) engine is an incredible, lightweight bit of code but requires training with real voices to improve. Everyone's voice is unique, and we need recordings of people of all genders, ages, and accents from around the world saying this wake word. So get the whole home involved, along with friends and family.

[**Help us today**](https://ohf-voice.github.io/wake-word-collective/)

<!--more-->

## Your voice, your choice

Privacy is at the core of everything we do, and that's what's driving us to build an open, local, and private voice assistant. Years ago a voice assistant arms race began between a couple of big tech companies, where they sold very cheap voice hardware, all because they wanted your data. They used that voice data to rapidly improve their voice capabilities (and who knows what else) at [the expense of your privacy](https://www.bbc.co.uk/news/technology-47893082).

We will never use those tactics to improve Home Assistant. We do something novel and bewildering to the smart home industry - we explicitly ask for your help. For instance, Home Assistant has [opt-in statistics](https://analytics.home-assistant.io/); these really help us focus on what people are using and put resources into making the biggest impact. When you [opt-in it really helps](/integrations/analytics/), but we totally understand if you don't - it's your home and your data. We're doing the same with voice, explicitly asking for help, and would love your help to improve its wake word capability.

What big tech might consider a weakness is actually our greatest strength - privacy empowers our users, allowing them to not worry about being tracked or classified by an algorithm.

## microWakeWord goes global

microWakeWord is a very lightweight wake word engine that can run on ESP32-class devices. This allows the voice assistant to listen for a specific phrase, for instance "Okay Nabu", and ignore all other noise and speech until it hears that. Running it on-device speeds everything up significantly, cutting out the lag from streaming audio continuously to a more powerful device running wake word software. The downside to running it on-device is the amount of training required to get good results.

A few months ago, we promoted an early version of this Wake Word Collective tool in the Open Home Foundation newsletter ([subscribe if you haven't already](https://newsletter.openhomefoundation.org/)). From that one email alone, we received over 5,800 samples covering 30 different languages. While microWakeWord used to only excel at picking up the English pronunciation of "Okay Nabu", it's now many times more effective at picking up different accents. Our testing shows our model trained on this data falsely rejects 5% of samples, while previous models rejected 18%, which shows your samples are making a difference!

We still need more different types of voices from different parts of the world. If you or your family use Assist and find it still struggling to wake up to hear your commands, this is the perfect opportunity to lend your voice to the project.

## How it works

Before you start recording you will fill in what language you're most comfortable speaking, allowing us to train language-specific wake word models that are better at detecting subtle differences in pronunciation. You must also read and agree to the [Wake Word Collective terms](https://ohf-voice.github.io/wake-word-collective/terms.html). This explains, among other things, that these recordings will be made available publicly under a Creative Commons CC0 public domain dedication. We operate our research openly for the benefit of all, and that is why these will be available to the public.

<img src='/images/blog/2024-10-wake-word-collective/demo.gif' alt="Animation showing how to use the wake word collective tool">

Next, it explains that you only need you to say two words,  "Okay, Nabu", a couple of times.  You'll need to set down your phone, tablet, or laptop, and walk around the room, saying the wake word whenever the circle on the screen turns green. Taking samples from all around the room better reflects the real-world use of a voice assistant. Don't worry about background noise; it's useful for training.

I said this would only take a minute, but you've probably been reading this for longer, so go on and [get recording](https://ohf-voice.github.io/wake-word-collective/).

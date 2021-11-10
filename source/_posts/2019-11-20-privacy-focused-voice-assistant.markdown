---
layout: post
title: "Almond & Ada: privacy-focused voice assistant"
description: "Say Hi! to Almond, a privacy-focused virtual assistant and Ada, a voice assistant powered by Home Assistant."
date: 2019-11-20 0:43:02
date_formatted: "November 20, 2019"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Announcements
og_image: /images/blog/2019-11-voice-assistant/almond.png
---

TL;DR:

- Teamed up with [Almond](https://almond.stanford.edu/), available in Home Assistant 0.102.
- Introducing [Ada](https://github.com/home-assistant/ada), voice assistant powered by Home Assistant integrations. Available as Hass.io add-on.
- New beta speech-to-text and text-to-speech service for Home Assistant Cloud subscribers.

---

Voice assistants are a great way to interact with your house, ask a quick question, set a timer or control your devices. The more an assistant knows about you, your home and its other inhabitants, the better it is able to help you.

Today's available virtual assistants work great, but they have a big problem: They store your data in the cloud, don't provide APIs to allow other companies to build products on top and are run by companies whose core business is building profiles on their users to help serve ads and product suggestions.

The backbone to our homes needs to be one that keeps data local and has APIs allowing other companies to build on top. Innovation happens when many different people, with many different backgrounds, do many different experiments until we find something that sticks. This cannot be left to a single company.

Recently we got in touch with the [Open Virtual Assistant Lab at Stanford University](https://oval.cs.stanford.edu/). In the last four years, they have been working on a virtual assistant named Almond. And it's a perfect match for Home Assistant.

<!--more-->

## Almond

[Almond](https://almond.stanford.edu/) is an open, privacy-preserving virtual assistant that is open source. With Almond, you can run a virtual assistant at home, that can tell you the news or control your house. It is powered by [LUInet](https://almond.stanford.edu/doc/genie-intro.md), a state-of-the-art neural network developed at Stanford. And it now works with Home Assistant.

The Almond team has updated Almond to make it aware of the different device types in Home Assistant and allow Almond to control them. In turn, we have upgraded the conversation integration in Home Assistant to support Almond, allowing users to converse with Almond via the frontend.

<p class='img'><img src='/images/blog/2019-11-voice-assistant/almond.png' alt='Screenshot showing Almond integration in Home Assistant.'>Screenshot showing Almond integration in Home Assistant.</p>

Almond is available to users today in Home Assistant 0.102. It requires an Almond Server, which you can either install yourself, use the new Almond Hass.io add-on or rely on Almond Web, a cloud version hosted by Stanford. By default, Almond Server will rely on a cloud version of LUInet, but it is possible to run it locally.

Almond is set up in a way such that your privacy is still partially preserved even with LUInet running in the cloud. This is made possible because LUInet is only responsible for converting the text into a program, whose details are filled in locally by the Almond Server. For example, LUInet will convert "turn on the lights" into code that Almond Server understands. Only Almond Server will know which lights the user has, how to control them and the context of how the text was received.

### How Almond compares to Google/Alexa

You're probably wondering if Almond is as good as Alexa or Google. And it's not yet as good. However, it doesn't matter.

If you want to have an assistant in your home that knows everything about you, it needs to be one that cares about privacy. It needs to be one that is open. That's not negotiable.

Almond has room for improvement. But it's open source, and with the Home Assistant community, we'll work with the Almond team on making it better. You can start helping right now:

Almond is gathering sentences that you want to use to control the devices in your home. We already have a basic set of sentences, but the more, the better. You can submit those sentences [using this form](https://docs.google.com/forms/d/e/1FAIpQLSeStJfjvueNAiueRVmP47XALRaJlx7tttzJjRfVjX4J546-uA/viewform).

You are also able to help train LUInet directly by teaching it how to interpret sentences [in the training console](https://almond.stanford.edu/developers/train).

## Ada

Almond is not the full story. Almond only works with text input, and generates text as output. It doesn't handle speech-to-text to receive input nor text-to-speech to speak answers. Those technologies are out of scope for Almond. However, not out of scope for Home Assistant! Home Assistant already has a text-to-speech integration with different backends. In Home Assistant 0.102, we're introducing a new speech-to-text integration to complement this.

Now we almost have all the pieces for a voice assistant built-in to Home Assistant, and so we decided to finish it off by introducing a new project called [Ada](https://github.com/home-assistant/ada). Ada integrates hotword detection and will route all data to the various integrations to provide a full voice assistant experience.

<a href='/images/blog/2019-11-voice-assistant/overview.svg'><img src='/images/blog/2019-11-voice-assistant/overview.svg' alt='Architectural overview of how all pieces fit together.' style='border: 0;box-shadow: none;'></a>

Ada is still very much in the beginning. We'll be working on improving it. If you have expertise in this area and want to help, please get in touch.

Ada is also available as a [Hass.io](http://hass.io) add-on. This means that you can plug a microphone and speakers into your Raspberry Pi and turn Hass.io into a full, privacy-focused, voice assistant.

To make it easier to add speech-to-text and text-to-speech integrations to your system, Nabu Casa is introducing a new beta service offering speech-to-text and text-to-speech services to Home Assistant Cloud subscribers, powered by Azure Cognitive Services.

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/8VFZiHcjp78" frameborder="0" allowfullscreen></iframe>
</div>

## Can a virtual assistant still be private if parts run in the cloud?

With Home Assistant we care about privacy and local control. We want to be able to offer home automation that keeps working if there is no internet. Home automation, that is fast and reliable.

But we also want privacy to be accessible. A user should be able to get a private solution without running a big server at home. Privacy should not be something that is reserved for the rich.

With the current approach, some things will still run in the cloud, but the home data and control stays local. We will bring more things local when faster technology becomes more accessible or new projects emerge that can help with this.

We don't want to wait with integrating this until all the pieces run 100% locally. We need to help build the future we want to see.

## What's next?

With Almond and Ada, we've put the building blocks in place to create voice assistants. It's now time to use it, improve it and surprise us by sharing the things you'll use it for.

We've added a new section on the forums to discuss [voice setups](https://community.home-assistant.io/c/configuration/voice-assistant).

## Bonus

I hacked together a quick prototype to allow you to talk to Almond via a Telegram Bot! It's available as a [custom component](https://gist.github.com/balloob/d59cae89d19a14bcec99ce1bde05bd44).

<p class='img'><img src='/images/blog/2019-11-voice-assistant/telegram.png' style='max-width: 300px' alt='Screenshot of talking to Almond via Telegram.'>Screenshot of talking to Almond via Telegram.</p>

---
layout: post
title: "State of the Union 2019: Recap"
description: "ING hosted 150 Home Assistant community members to hear about the what and why of Home Assistant."
date: 2019-11-22 0:41:02
date_formatted: "November 22, 2019"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Announcements
og_image: /images/blog/2019-11-state-of-the-union/social.jpeg
---

On November 13, 2019, 150 Home Assistant community members gathered at [ING](https://www.ing.com) in Amsterdam for the Home Assistant State of the Union 2019.

That evening, Paulus Schoutsen (founder Home Assistant) and Pascal Vizeli (founder hass.io) presented what Home Assistant is up to, why we're doing what we're doing and what we got planned.

Video of the event is embedded below (it starts at 7:12):

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/tc17q1Zn0Xs?start=437" frameborder="0" allowfullscreen></iframe>
</div>

## Thanks

The State of the Union could not have been possible without the time and energy of the following people:

- [ING](https://www.ing.com) for hosting us once again ❤️
- Erik-Jan Riemers for organizing – Rockstar ⭐️
- Frenck for managing the livestream
- Arjan Vroege for assisting the team

## Announcements

### We're #10 open-source project in the world

GitHub posted their [State of the Octoverse](https://octoverse.github.com/#top-and-trending-projects), listing Home Assistant as the tenth biggest project in the last year based on the number of contributors.

This is especially impressive because all the other things on the list are related to, or maintained by billion dollar companies.

<p class='img'><img src='/images/blog/2019-11-state-of-the-union/octoverse.png' alt='Top 10 biggest open-source projects.'>Top 10 biggest open-source projects.</p>

### Home Assistant around the world ❤️

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/AsPqrAxSMbU" frameborder="0" allowfullscreen></iframe>
</div>

### Improved Scenes

In Home Assistant 0.102 we're launching a new scene editor. We're also adding two scene services `scene.apply` and `scene.create`. First one allows you to apply a scene without prior defining it, the second one allows you to create a scene on the fly.

### iOS app

[@robbiet480](https://github.com/robbiet480) has submitted the new and updated iOS app to the app store and it will be available soon.

[Source code](https://github.com/home-assistant/home-assistant-ios)

### Android app

We have released a new Android app! [Download it here.](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android) It's being developed by [@CedrickFlocon](https://github.com/CedrickFlocon) and we're already seeing a ton of other contributors jump in. Awesome!

[Source code](https://github.com/home-assistant/home-assistant-android/)

### OAuth2 Account Linking

We've made it easier in Home Assistant for integrations to use OAuth2 account linking. This is available starting Home Assistant 0.102. Somfy is the first partner to use it.

It works using a small cloud service provided by Home Assistant Cloud. It is available to all users for free, no cloud account necessary.

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/y0SECWUVR-M" frameborder="0" allowfullscreen></iframe>
</div>

Check the [updated developer documentation](https://developers.home-assistant.io/docs/en/config_entries_config_flow_handler.html#configuration-via-oauth2) if you want to add OAuth2 account linking to an integration.

### Teamed up with Almond: privacy-preserving virtual assistant

We've teamed up with the Stanford Open Virtual Assistant Lab to bring [Almond](https://almond.stanford.edu/) to Home Assistant users. Almond has been upgraded with Home Assistant integration and users can now talk to Almond via the Lovelace UI.

You can run this standalone, as a hass.io add-on or via a version hosted in the cloud by Stanford.

<p class='img'><img src='/images/blog/2019-11-state-of-the-union/almond.png' alt='Short description of what Almond is.'>Short description of what Almond is.</p>

For more information, check [the announcement blog](/blog/2019/11/20/privacy-focused-voice-assistant/).

### Ada, voice assistant powered by Home Assistant

We have introduced a new project called Ada. Ada is a voice assistant that outsources all processing to the speech-to-text (new!), conversation and text-to-speech integrations in Home Assistant. You can pick your own providers for each integration.

You can run this standalone or as a hass.io add-on.

For more information, check [the announcement blog](/blog/2019/11/20/privacy-focused-voice-assistant/).

[Source code](https://github.com/home-assistant/ada).

<p class='img'><img src='/images/blog/2019-11-state-of-the-union/ada.png' alt='Architectural overview of Ada.'>Architectural overview of Ada.</p>

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/8VFZiHcjp78" frameborder="0" allowfullscreen></iframe>
</div>

### Voice for Home Assistant Cloud

Nabu Casa has introduced a new beta service providing speech-to-text and text-to-speech services to Home Assistant Cloud subscribers powered by Azure Cognitive Services. This will make it easy to get started with Ada or use it to send spoken notifications to speakers in your house.

### Z-Wave

We've been working with the Open Z-Wave developers on a new solution that will allow us to migrate to the new Open Z-Wave 1.6 relase and make it easier to stay up to date in the future.

We're expecting to launch an MVP soon. This effort is driven by [@cgarwood](https://github.com/cgarwood).

[Source code](https://github.com/cgarwood/python-openzwave-mqtt)

### Frenck is joining Nabu Casa

Frenck will be joining Nabu Casa as the fourth employee working full-time on Home Assistant.

_"If I could describe my dream job, it would be being a full-time open source developer; Helping the world to become a better place by dedicating my time & knowledge to create & innovate open source software solutions. Allowing everybody on this earth the privilege to enjoy those things for free."_ &nbsp;&nbsp;&nbsp;–&nbsp;Franck&nbsp;Nijhof&nbsp;(Frenck)&nbsp;on&nbsp;[frenck.dev](https://frenck.dev/donate/)

### Create automations using your voice

We have been able to leverage Almond's neural network to **allow users to generate automations using natural language**. This means that you can now create an automation by telling Home Assistant to "turn on the lights when I get home" and we'll convert it to the appropriate automation in Home Assistant.

[Source code](https://github.com/NabuCasa/thingtalk-hass-generator/).

<p class='img'>
<img src='/images/blog/2019-11-0.102/thingtalk-automation.png' alt='Screenshot of the create automation dialog.'></a>
Screenshot of the create automation dialog.
</p>

### Share the love ❤️

Home Assistant is the community and the community is Home Assistant. Help us spread the Home Assistant love, help others and share your knowledge on YouTube, blogs and other media.

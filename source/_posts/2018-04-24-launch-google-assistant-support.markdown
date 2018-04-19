---
layout: post
title: "Our Google Assistant skill is live!"
description: "The Google Assistant integration for Home Assistant Cloud is now available to all."
date: 2018-04-24 00:01:00
date_formatted: "April 24, 2018"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Announcement
og_image: /images/blog/2018-04-google-assistant/google-assistant-home-assistant.png
---

<p class='img'>
  <img
    src='/images/blog/2018-04-google-assistant/google-assistant-home-assistant.png'
    alt='Home Assistant logo and the Works with the Google Assistant badge'
  />
</p>

Guess what? Yep, our Google Assistant Smart Home skill is live! It's a mouthful but it means that you can now control your Home Assistant devices via any Google Assistant enabled device by simply saying things like "Ok Google, turn on the lights".

To get started:

 - [Enable Home Assistant Cloud](/cloud/#enabling-the-cloud)
 - [Install our skill for Google Assistant](https://assistant.google.com/services/a/uid/00000091fd5fb875). Alternatively, you can find it by opening the Google Home app -> Home Control and click on the blue + at the bottom right.
 - Optional: [Tweak the devices](/cloud/google_assistant/) that are getting exposed to Google Assistant.

Things to note:

 - The skill is called Hass.io, but will work with normal Home Assistant too. This is to avoid confusion between Home Assistant, Google Assistant and Google Home.
 - No need to update Home Assistant if you're running Home Assistant 0.65 or later.
 - All message handling is done local and is [open source](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/components/google_assistant/trait.py).
 - If you have an Android device with Google Assistant, you can control your devices too.
 - Home Assistant 0.68 will introduce a button to the Cloud config panel to trigger a sync of available devices.

Home Assistant Cloud is still in public beta and free to use. Open beta period has been extended to June 1. Many thanks to [Quadflight] for providing the Raspberry Pis that Google used for physical testing and thanks to [Arsaboo] for helping me with testing.

[Quadflight]: https://github.com/quadflight
[Arsaboo]: https://github.com/arsaboo

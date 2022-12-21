---
layout: post
title: "Matter in Home Assistant workshop announcement"
description: "On June 15 we're showing how Matter will work and guide you in getting it set up."
date: 2022-05-29 00:00:00
date_formatted: "May 29, 2022"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories:
- Announcements
og_image: /images/blog/2022-05-matter-in-home-assistant-workshop-announcement/social.png
---

<!--<img src='/images/blog/2022-05-matter-in-home-assistant-workshop-announcement/header.png' alt="Decorative header." class='no-shadow'>-->

<lite-youtube videoid="9fOHBl5w0_k" videotitle="Matter in Home Assistant workshop"></lite-youtube>

## [The workshop instructions can be found here.](/matter-june-22)

## [Home Assistant SkyConnect interest form](/skyconnect-interest)

Matter is a new [smart home standard](https://csa-iot.org/all-solutions/matter/) that is scheduled to launch in fall. Across the industry, companies like Hue, IKEA, Google and Apple are working together to try and solve connectivity, ease of setup and interoperability once and for all. Development is happening as part of the [Connectivity Standards Alliance](https://csa-iot.org/) (CSA) of which we ([Nabu Casa](https://www.nabucasa.com)) are also a participating member.

<center><img src='/images/supported_brands/matter.png' alt='Matter logo' class='no-shadow'></center><br>

We’ve been hard at work on Matter support for Home Assistant. The [Home Assistant Yellow](/yellow/) hub will come with a radio that supports Thread, required to talk to low power Matter devices. We also have some tricks up our sleeves for devices used to run Home Assistant without such a radio, like Raspberry Pi’s. We want to show what we’re up to and allow you to test it out.

**On June 15 @ 12:00 PDT / 21:00 CET we will be hosting our free Matter in Home Assistant workshop.**

The workshop will be held on YouTube. [Go to the listing to set a reminder to be notified when we start.](https://www.youtube.com/watch?v=9fOHBl5w0_k)

The workshop will contain two parts. In the first part we will talk about what Matter is and how it will work in Home Assistant. In the second part we will walk you through how to add experimental Matter support to your Home Assistant installation and integrate your first Wi-Fi based Matter device.

The workshop will be free but you will need a couple of things if you want to be able to follow along with the second part:

- Home Assistant OS 8.0 or newer, 64-bit version only (x86-64 or aarch64). Matter relies on an add-on and Bluetooth.
- [Home Assistant Community Store](https://hacs.xyz/) installed
- Espressif ESP32-C3-DevKitM-1 ($9 @ [Mouser](https://www.mouser.com/ProductDetail/356-ESP32-C3DEVKITM1), €17 @ [Conrad](https://www.conrad.com/p/espressif-pcb-design-board-esp32-c3-devkitm-1-2490158)) or M5Stamp C3 ($6 @ [M5Stack](https://twitter.com/home_assistant/status/1531712479016890369))
- Bluetooth. If you use a Raspberry Pi to run Home Assistant you’re set. If you have a Home Assistant Blue or another device without Bluetooth, get a Bluetooth USB adapter that is supported by Home Assistant OS ([like this one](https://www.amazon.com/gp/product/B09DMP6T22/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B09DMP6T22&linkCode=as2&tag=homeassista0e-20&linkId=c5046239bf04d5b21835299dfb393f0e)).

Even if you can’t follow along, it will still be an informative session!

_It is possible to get the experimental Matter support working with other Home Assistant installation methods and other dev kits, but we won’t be covering those in our workshop._

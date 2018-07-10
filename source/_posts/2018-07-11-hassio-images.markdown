---
layout: post
title: "New Hass.io images"
description: "We release our new images."
date: 2018-07-11 00:00:00
date_formatted: "April 22, 2018"
author: Pascal Vizeli
author_twitter: pvizeli
comments: true
categories: Announcements
og_image: /images/blog/2018-07-hassio-images/blogpost.png
---

After 4 month we are happy to announce our new images for Hass.io, based on HassOS.

Note that the descriptions of new System can be get quite technical. Feel free to jump to the [migration steps].

## {% linkable_title What is new %}

This will be a bit technical. 

## {% linkable_title Migration %}

The design of HassOS is diferent to ResinOS. That is the reason why we can't provide a OTA update from old too new System.

1. Make a snapshot of current system. You should remove the bluetooth add-on before, that is not need anymore.
2. Download the latest [HassOS stable] version.
3. Flash the images with [Etcher] to SD card.
5. On Raspberry: if you modify the `config.txt`, you need applay this also on boot partition of HassOS, but __don't__ copy this file!
4. If you used custom network configuration or ssh development access, we can use a [USB stick]. You can simple copy the resin-sample into `network` folder on USB stick.
5. Take SD card into device slot and boot your system like before. 

[USB stick]: https://github.com/home-assistant/hassos/blob/rel-1/Documentation/configuration.md#automatic
[HassOS stable]: https://www.home-assistant.io/hassio/installation/
[migration steps]: #migration
[Etcher]: https://etcher.io/

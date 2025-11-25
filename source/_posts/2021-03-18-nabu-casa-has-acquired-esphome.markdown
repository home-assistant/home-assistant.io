---
layout: post
title: "Nabu Casa has acquired ESPHome"
description: "Nabu Casa has acquired ESPHome to ensure that the project can continue to flourish as a free and open source project."
date: 2021-03-18 00:00:00
date_formatted: "March 18, 2021"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Announcements
og_image: /images/blog/2021-03-18-nabu-casa-acquired-esphome/social.png
---

<img alt="Nabu Casa heart ESPHome" src="/images/blog/2021-03-18-nabu-casa-acquired-esphome/social.png" />


Today I'm happy to announce that [ESPHome](https://esphome.io) is from now on under the [Nabu Casa](https://www.nabucasa.com) umbrella. ESPHome is the easiest way to program ESP8266 and ESP32 devices and integrate them into Home Assistant. It has become an important piece of the Home Assistant ecosystem, so much so that we want to ensure that the project can continue to flourish as a free and open source project. This week Nabu Casa came to an agreement to acquire the ESPHome project from [Otto Winter](https://github.com/ottowinter), the founder of ESPHome.

Otto started ESPHome three years ago to make programming ESP devices as easy as possible. With ESPHome, users write simple YAML files in which you describe what components are attached to what pins of the ESP device. ESPHome will then make this available in Home Assistant. No extra work necessary. Super simple.

{% details "Example ESPHome configuration" %}

The following ESPHome YAML example will program your ESP device. When you plug it in, it will make the light on pin 16 available in Home Assistant.

```yaml
esphome:
  name: esp32_light
  platform: ESP32
  board: esp32dev

wifi:
  ssid: "MySSID"
  password: "supersecret"

api:

light:
  - platform: binary
    name: "Desk Lamp"
    output: light_output

output:
  - id: light_output
    platform: gpio
    pin: GPIO16
```

{% enddetails %}

<img alt="ESPHome logo" src="/images/sponsors/esphome.svg" class='no-shadow' />

Otto’s vision was right and ESPHome has become the easiest way for people to integrate ESP devices in Home Assistant. For example, the [tag reader](/blog/2020/09/15/home-assistant-tags/#standalone-tag-reader) is based on ESPHome, and many other projects are too.

As the project grew, so did Otto’s obligations in his personal life until they could no longer be combined. With the acquisition of ESPHome, Nabu Casa now owns the copyright of Otto’s code and the ESPHome organizations on GitHub, Docker, etc. Otto has shut down his Patreon account. Otto will step back from being part of the project management side of things. The project will continue as an open source project with the current ESPHome development team, [@jesserockz](https://github.com/jesserockz) and [@glmnet](https://github.com/glmnet). Otto will still be around and help out on development as his time allows.

We are going to bring our experience gained from the Home Assistant project and apply it to ESPHome, like focus on community and ease of use. If you have any ideas, make sure to share them in the [ESPHome discord](https://discord.gg/KhAMKrd).

**Update**: I've joined the Home Assistant podcast to discuss the acquisition. [Episode 83 is worth a listen.](https://hasspodcast.io/ha083/)

**About Nabu Casa**<br>
Nabu Casa was founded by the founders of Home Assistant. It exists to make the privacy-centered smart home accessible to everyone. Nabu Casa has no investors and is solely funded by users via Home Assistant Cloud subscriptions. With Home Assistant, Nabu Casa already works on making sure the brains of your home are the best it can be. And with ESPHome they will help you make sure that other devices are too.


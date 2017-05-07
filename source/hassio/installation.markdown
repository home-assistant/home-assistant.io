---
layout: page
title: "Installing Hass.io"
description: "Instructions on how-to install Hass.io."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Hass.io images are available for all available Raspberry Pi platforms.

- Download the appropriate image for your Raspberry Pi:
  - [Raspberry Pi / Zero][pi1]
  - [Raspberry Pi 2][pi2]
  - [Raspberry Pi 3][pi3]
- Flash the downloaded image to an SD card using [Etcher].
- Optional - Setup the WiFi: On the SD-card, edit the `system-connections/resin-sample` file and change `ssid` and `psk`.
- Insert SD card to Raspberry Pi and turn it on. On first boot, it downloads the latest version of Home Assistant which can take some time.
- You will be able to reach your installation at [http://hassio.local][local].

### {% linkable_title Alternative: install on generic Linux server %}

For advanced users, it is also possible to try Hass.io on your Linux server or inside a VM. To do so, [follow these instructions][linux].

[Etcher]: https://etcher.io/
[pi1]: https://github.com/home-assistant/hassio-build/releases/download/0.7/resinos-hassio-0.7-raspberrypi.img.bz2
[pi2]: https://github.com/home-assistant/hassio-build/releases/download/0.7/resinos-hassio-0.7-raspberrypi2.img.bz2
[pi3]: https://github.com/home-assistant/hassio-build/releases/download/0.7/resinos-hassio-0.7-raspberrypi3.img.bz2
[linux]: https://github.com/home-assistant/hassio-build/tree/master/install#install-hassio
[local]: http://hassio.local:8123

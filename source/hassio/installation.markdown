---
layout: page
title: "Installing Hass.io"
description: "Instructions how to install Hass.io."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Hass.io images are available for all available Raspberry Pi platforms. Download the appropriate image for your Raspberry Pi:

 - [Raspberry Pi / Zero][pi1]
 - [Raspberry Pi 2][pi2]
 - [Raspberry Pi 3][pi3]

Once downloaded, write it to an SD card using [Etcher]. Then put the SD card into your Raspberry Pi and turn it on. You will be able to reach your installation on [http://hassio.local][local].

On first boot it does download the HomeAssistant container and they can take a time after we can access to our hub.

### {% linkable_title Alternative: install on generic Linux server %}

For advanced users, it is also possible to try Hass.io on your Linux server or inside a VM. To do so, [follow these instructions][linux].

[Etcher]: https://etcher.io/
[pi1]: https://github.com/home-assistant/hassio-build/releases/download/0.7/resinos-hassio-0.7-raspberrypi.img.bz2
[pi2]: https://github.com/home-assistant/hassio-build/releases/download/0.7/resinos-hassio-0.7-raspberrypi2.img.bz2
[pi3]: https://github.com/home-assistant/hassio-build/releases/download/0.7/resinos-hassio-0.7-raspberrypi3.img.bz2
[linux]: https://github.com/home-assistant/hassio-build/tree/master/install
[local]: http://hassio.local:8123

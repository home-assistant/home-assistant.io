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

Hass.io images are available for all available Raspberry Pi and intel nuc platforms.

- Download the appropriate image for your Raspberry Pi / intel nuc:
  - [Raspberry Pi / Zero][pi1]
  - [Raspberry Pi 2][pi2]
  - [Raspberry Pi 3][pi3]
  - [Intel Nuc][nuc]
- Flash the downloaded image to an SD card using [Etcher].
- Optional - Setup the WiFi or static ip: On the SD-card, edit the `system-connections/resin-sample` file and follow the [ResinOS howto][resinos-network].
- Insert SD card to Raspberry Pi and turn it on. On first boot, it downloads the latest version of Home Assistant which can take some time.
- You will be able to reach your installation at [http://hassio.local:8123][local].

<p class='note'>
If you copy over your existing Home Assistant configuration, make sure to enable the Hass.io panel by adding either `discovery:` or `hassio:` to your configuration.
</p>

### {% linkable_title Alternative: install on generic Linux server %}

For advanced users, it is also possible to try Hass.io on your Linux server or inside a VM. To do so, [follow these instructions][linux].

[Etcher]: https://etcher.io/
[resinos-network]: https://docs.resin.io/deployment/network/2.0.0/
[pi1]: https://github.com/home-assistant/hassio-build/releases/download/0.8/resinos-hassio-0.8-raspberrypi.img.bz2
[pi2]: https://github.com/home-assistant/hassio-build/releases/download/0.8/resinos-hassio-0.8-raspberrypi2.img.bz2
[pi3]: https://github.com/home-assistant/hassio-build/releases/download/0.8/resinos-hassio-0.8-raspberrypi3.img.bz2
[nuc]: https://github.com/home-assistant/hassio-build/releases/download/0.8/resinos-hassio-0.8-intel-nuc.img.bz2
[linux]: https://github.com/home-assistant/hassio-build/tree/master/install#install-hassio
[local]: http://hassio.local:8123

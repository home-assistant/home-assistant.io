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

Hass.io images are available for all available Raspberry Pi and Intel NUC platforms.

- Download the appropriate image for your Raspberry Pi / Intel NUC:
  - [Raspberry Pi / Zero][pi1]
  - [Raspberry Pi 2][pi2]
  - [Raspberry Pi 3][pi3]
  - [Intel NUC][nuc]

- Flash the downloaded image to an SD card using [Etcher].
- Optional - Setup the WiFi or static IP: On the SD-card, edit the `system-connections/resin-sample` file and follow the [ResinOS howto][resinos-network].
- Insert SD card to Raspberry Pi and turn it on. On first boot, it downloads the latest version of Home Assistant which takes ~20 minutes (slower/faster depending on the platform).

<img src='/images/hassio/screenshots/first-start.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 12px;' width='150' />

- You will be able to reach your installation at [http://hassio.local:8123][local].
- Enable either the [Samba add-on][samba] or the [SSH add-on][ssh] to manage your configuration in `/config/` (From the UI choose **Hass.io** which is located in the sidebar).

<p class='note'>
Please remember to ensure you're using an [appropriate power supply](https://www.raspberrypi.org/help/faqs/#powerReqs) with your Pi. Mobile chargers may not be suitable since some are designed to only provide the full power with that manufacturer's handsets.
</p>

<p class='note'>
If you copy over your existing Home Assistant configuration, make sure to enable the Hass.io panel by adding either `discovery:` or `hassio:` to your configuration.
</p>

## {% linkable_title Alternative: install on generic Linux server %}

For advanced users, it is also possible to try Hass.io on your [Linux server or inside a virtual machine][linux]. To do so, run the following command as root:

```bash
curl -sL https://raw.githubusercontent.com/home-assistant/hassio-build/master/install/hassio_install | bash -s
```

<p class='note'>
When you use this installation method, some add-ons will not be available, and the documentation might not work for your installation.
</p>

A detailed guide about running Hass.io as a virtual machine is available in the [blog](/blog/2017/11/29/hassio-virtual-machine/).

[Etcher]: https://etcher.io/
[resinos-network]: https://docs.resin.io/deployment/network/2.0.0/
[pi1]: https://github.com/home-assistant/hassio-build/releases/download/1.3/resinos-hassio-1.3-raspberrypi.img.bz2
[pi2]: https://github.com/home-assistant/hassio-build/releases/download/1.3/resinos-hassio-1.3-raspberrypi2.img.bz2
[pi3]: https://github.com/home-assistant/hassio-build/releases/download/1.3/resinos-hassio-1.3-raspberrypi3.img.bz2
[nuc]: https://github.com/home-assistant/hassio-build/releases/download/1.3/resinos-hassio-1.3-intel-nuc.img.bz2
[linux]: https://github.com/home-assistant/hassio-build/tree/master/install#install-hassio
[local]: http://hassio.local:8123
[samba]: /addons/samba/
[ssh]: /addons/ssh/

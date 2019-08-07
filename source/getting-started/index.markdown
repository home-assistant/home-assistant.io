---
title: "Install Home Assistant"
description: "Getting started: How to install Home Assistant."
---

{% comment %}

Note for contributors:

The getting started guide aims at getting new users get Home Assistant  up and
running as fast as possible. Nothing else. All other things should not be
written down, as it creates a spaghetti of links and the user will lose focus.

So here are guidelines:

 - Focus on the bare necessities. No remote port, no securing installation. The
   defaults are good enough to get a system up and running for the first guide.
 - Avoid or explain technical terms.
 - Do not talk about YAML if it can be partially/fully done in UI.
 - Do not tell people about stuff they can do later. This can be added to a
   2nd tier guide.
 - The first page of the guide is for installation, hence hass.io specific.
   Other pages should not refer to it except for the page introducing the last
   page that introduces `configuration.yaml`.

{% endcomment %}

The goal of this getting started guide is to get Home Assistant running on a Raspberry Pi. The easiest way to do this is by using [Hass.io](/hassio/), which is our own all in one solution that turns Raspberry Pi's and other devices into the ultimate home automation hubs.

Follow this guide if you want to get started with Home Assistant easily, or if you have little or no Linux experience. For advanced users or if you don't have a [device that is supported by this guide][supported], check our [alternative installation methods](/docs/installation/). Once you finish your alternative installation, you can continue at the [next step][next-step].

[supported]: /hassio/installation/

### Suggested hardware

We will need a few things to get started with installing Home Assistant. The latest Raspberry Pi model makes a good and affordable starting point for your home automation journey. Links below lead to Amazon US. If you're not in the US, you should be able to find these items in web stores in your country.

- [Raspberry Pi 3 Model B+](https://amzn.to/2IAyNl0) + [Power Supply](https://www.raspberrypi.org/help/faqs/#powerReqs) (at least 2.5A)
- [Micro SD Card](https://amzn.to/2X0Z2di). Ideally get one that is [Application Class 2](https://www.sdcard.org/developers/overview/application/index.html) as they handle small I/O much more consistently than cards not optimized to host applications. Size 32 GB or bigger recommended.
- SD Card reader. Part of most laptops, and also available as [standalone USB sticks](https://amzn.to/2WWxntY) (the brand doesn't matter, just pick the cheapest)
- Ethernet cable (optional, Hass.io can work with WiFi as well)

### Software requirements

- Download the Hass.io image for [your device](/hassio/installation/)
- Download [balenaEtcher] to write the image to an SD card

[balenaEtcher]: https://www.balena.io/etcher

### Installing Hass.io

1. Put the SD card in your SD card reader.
2. Open balenaEtcher, select the Hass.io image and flash it to the SD card.
3. Unmount the SD card and remove it from your SD card reader.
4. Only if you want to configure WiFi or a Static IP (requires USB stick):
   - Format a USB-Stick to FAT32 with volume-name `CONFIG`.
   - Create a folder named `network` in the root of the newly formatted USB-stick.
   - Within that folder create a file named `my-network` without extension.
   - Copy one of [the examples] to the `my-network` file and adjust accordingly.
   - Plug the USB-stick into the Raspberry Pi 3.

5. Insert the SD card into your Raspberry Pi 3. If you are going to use an Ethernet cable, connect that too.
6. Connect your Raspberry Pi to the power supply, so it turns on.
7. The Raspberry Pi will now boot up, connect to the Internet and download the latest version of Home Assistant, which will take about 20 minutes.
8. Home Assistant will be available at [http://hassio.local:8123][local]. If you are running an older Windows or have stricter network configuration, you might need to access Home Assistant at [http://hassio:8123][host].
9. If you have used a USB-stick for configuring the network, it can now be removed.

[local]: http://hassio.local:8123
[host]: http://hassio:8123
[the examples]: https://github.com/home-assistant/hassos/blob/dev/Documentation/network.md

### [Next step: Onboarding &raquo;][next-step]

[next-step]: /getting-started/onboarding/

_As an Amazon Associate Home Assistant earns from qualifying purchases._

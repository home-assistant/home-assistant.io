---
layout: post
title: "Home Assistant Yellow gets CM5 support in HAOS 14"
description: "We've tested the CM5 with the Home Assistant Yellow, and it works! But the CM4 is still great!"
date: 2024-11-27 00:00:00
date_formatted: "November 27, 2024"
author: Andy Gill
comments: true
categories: 
- HAOS
- Hardware
og_image: /images/blog/2024-11-cm5/art.jpg
---

<img src='/images/blog/2024-11-cm5/art.jpg' alt="Home Assistant Yellow in all its glory">

We launched our [Home Assistant Yellow](/yellow/) over two years ago, with the design philosophy that it would grow and extend its capabilities with its users' needs. Need more storage, add an NVMe drive. Need Matter over Thread instead of Zigbee, change the firmware.

Thanks to Raspberry Pi providing us with an early sample, we have been able to add **Compute Module 5 (CM5) compatibility to the Home Assistant Yellow**, which will be included in Home Assistant OS 14 (along with some [other hardware support](#other-additions-to-haos-14)). This gives current and future users a great option to get more performance if they need it, but we must say that CM4 is still more than enough for most Home Assistant users' needs.

As part of the Open Home Foundation, we fight for privacy, choice, and sustainability in the smart home. The Yellow achieves all three, and this announcement only improves the choices available and long-term sustainability.

<!--more-->

## Using Compute Modules

When designing Yellow to give our users the ability to expand the capabilities of the device we chose Raspberry Pi's Compute Module platform. It allows users to increase the RAM, add eMMC, built-in Bluetooth, or even get more speed 😉 - without having to replace the Yellow - all you need to do is get a new module. This is also great for the repairability of the product over its lifetime.

Though it was designed for the Compute Module 4 (CM4), we always hoped it would be compatible with its future successors. Over the past couple of months, we've been updating firmware and testing early hardware, and it is indeed compatible. Due to changes on CM5, the installation method is slightly more complex than it was on CM4, which is detailed below.

## What CM5 could bring

I must admit, it is fun to play with the latest and greatest hardware (while also finding new uses for the hardware it replaces - old Pi products make great [Wyoming satellites](https://github.com/rhasspy/wyoming-satellite)). In most use cases, such as running automations or connecting an average home's worth of devices, the majority of users will not notice any difference between a Green, CM4, or CM5.

For certain power user needs CM5 might provide big improvements. Some Pi 5 users have seen nearly [3x improvements](https://www.youtube.com/watch?v=kaVND-M9pkA&t=415s) in ESPHome compilation times; saving a minute or two per device can really add up in big deployments. Another area where CM5 can excel over CM4 is running local speech-to-text processing if you're using [Assist](/voice_control/) fully locally.

## Installing on CM5

For the Home Assistant Yellow, we have [two ways to install Home Assistant OS](https://yellow.home-assistant.io/guides/reinstall-os/) onto the Compute Module. One is very easy and quick (using USB 2.0), while the other is more complex (using rpiboot). Unfortunately, due to firmware differences with CM5 it cannot boot off USB 2.0 devices (though the USB 2.0 ports work once the device is booted).

If you already have a Yellow running Home Assistant OS, upgrading to CM5 can be a drop-in replacement, but in some circumstances it can be more complex,

- **CM4 Lite (no eMMC) with NVMe storage** - Update to the latest HAOS (version 14.0 or greater - as of writing 14.0 is still pre-release, we recommend you wait for the stable release, but if you want to get the pre-release today either [join the beta channel](https://www.home-assistant.io/common-tasks/os/#running-a-beta-version) or [explicitly install](https://www.home-assistant.io/common-tasks/os/#running-a-specific-version) `14.0.rc2`), power it down, swap the CM4 Lite for a CM5 Lite, and you're good to go.

- **CM4 with eMMC (regardless if you are using NVMe or not)** -  Download a backup of your Home Assistant, power down your system, and install Home Assistant OS on the CM5 using [rpiboot](https://yellow.home-assistant.io/guides/reinstall-os/#:~:text=Option%202%3A%20Reinstall%20Home%20Assistant%20OS%20using%20rpiboot) (the more complex installation method). Once installed restore the backup.

- **New Yellow with CM5**: You will need to install Home Assistant with [rpiboot](https://yellow.home-assistant.io/guides/reinstall-os/#:~:text=Option%202%3A%20Reinstall%20Home%20Assistant%20OS%20using%20rpiboot) (the more complex installation method).

For full details on how to set up your Home Assistant Yellow [visit our documentation](https://yellow.home-assistant.io/).

## CM4 is still great

If you have, or were looking at getting, a Home Assistant [Green](/green/) or [Yellow](/yellow/) with a CM4, both are more than capable. A third of all Home Assistant users are using Pi 4 class hardware.

<img src='/images/blog/2024-11-cm5/analytics.png' style='border: 0;box-shadow: none;' alt="In our analytics Pi 4 class hardware is the most used SBC">

In fact, according to our [opt-in analytics](https://analytics.home-assistant.io/), more people are using Pi 3 hardware than Pi 5 hardware (granted the Pi 5 has only had official support since [February this year](/blog/2024/02/26/home-assistant-os-12-support-for-raspberry-pi-5/)). Home Assistant continues to get updates that improve its speed on all hardware, most recently [faster backups](/blog/2024/02/26/home-assistant-os-12-support-for-raspberry-pi-5/#faster-backups) and [reboots](/blog/2024/03/06/release-20243/#home-assistant-boots-twice-as-fast). This allows people to keep hardware running longer, and in the end that is our goal 🌎.

CM4 is not only powerful enough for most users, it also has a long life ahead of it. Raspberry Pi has even confirmed that they will **fully support CM4 [until 2034](https://www.raspberrypi.com/products/compute-module-4/?variant=raspberry-pi-cm4001000#:~:text=Obsolescence%20Statement)💪,** and will continue to manufacture them.

## Other additions to HAOS 14

On the topic of newly supported hardware, our release of Home Assistant OS 14 will bring support not only for CM5 but also for the Hailo-8 AI accelerator. This is the AI accelerator found in the [Raspberry Pi AI Kit](https://www.raspberrypi.com/documentation/accessories/ai-kit.html) or the even more powerful Raspberry Pi AI HAT+ [released](https://www.raspberrypi.com/news/raspberry-pi-ai-hat/) last month, which is exclusively for the Raspberry Pi 5. For those using a Pi 5 they can now offload AI processing, like object or person detection, to this efficient add-on.

## Conclusion

We're incredibly proud that, all this time later, the Home Assistant Yellow continues to be one of the best options for power users. We are excited to see how our users take advantage of CM5, and it's great to see CM4 continue to be a great option with long-term support.

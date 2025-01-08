---
layout: post
title: "Expected support for Home Assistant OS on the Raspberry Pi 5"
description: "Stable support for Home Assistant OS on Raspberry Pi 5 expected end 2023/early 2024"
date: 2023-10-17 00:00:00
date_formatted: "October 17, 2023"
author: Stefan Agner
comments: true
categories:
  - Announcements
---
On September 28, Raspberry Pi surprised the world (and, truthfully, us) by announcing the [Raspberry Pi 5](https://www.raspberrypi.com/news/introducing-raspberry-pi-5/). This new board promises more than twice the speed of the Raspberry Pi 4 and is already available for pre-order. Raspberry Pi expects to ship them to customers by the end of October.

According to our [analytics](https://analytics.home-assistant.io/), a third of all Home Assistant users currently use the Raspberry Pi 4 as their dedicated Home Assistant system. In fact, Home Assistant OS is the [third-most installed OS](https://rpi-imager-stats.raspberrypi.com/) on Raspberry Pi boards in general. So, we suspect many of you eagerly await the new Raspberry Pi 5 to upgrade your Home Assistant installation. We’re just as excited about this new release as you are, and we will start development for it as soon as we receive our pre-release boards from Raspberry Pi!

As we have not been part of Raspberry Pi’s beta program, adding support for the Raspberry Pi 5 to Home Assistant OS has not started yet. At this point, it is still hard to estimate how much work it will be, but we want to stress that this is a major task that we want to get right. While beta versions will be released early, we currently do not expect a stable release to come out until the end of this year or early 2024.

That means you cannot run Home Assistant OS on the Raspberry Pi 5 at launch. [Alternative installation methods](/installation/) that do not use Home Assistant OS are available, but we only recommend those for advanced users. If you currently use Home Assistant OS and have pre-ordered a Raspberry Pi 5, we recommend waiting for a stable release for the Raspberry Pi 5 to come out before moving your installation.

For owners of Home Assistant Yellow, Raspberry Pi has yet to make any statement about a potential Compute Module 5 based on the Raspberry Pi 5. We can only indicate compatibility with Home Assistant Yellow once they provide information about a new Compute Module and its specifications. We also want to point out that there were 16 months between the release of the Raspberry Pi 4 and the release of the Compute Module 4. For those currently looking for Compute Module 4 to complete their Home Assistant Yellow kits, we are happy to report that Compute Module 4 has become more widely available again, as seen on [rpilocator](https://rpilocator.com/?cat=CM4).

**Update (Oct 19th)**: We received Raspberry Pi 5 boards earlier this week and are investigating support options for Home Assistant OS now. Thank you to the folks at Raspberry Pi! For those interested in technical discussions about Raspberry Pi 5 support or just would like to follow the progress, we've started a [Raspberry Pi 5 specific thread on GitHub Discussions](https://github.com/home-assistant/operating-system/discussions/2844).

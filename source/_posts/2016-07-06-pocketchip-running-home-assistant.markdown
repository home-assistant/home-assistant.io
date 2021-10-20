---
title: "PocketCHIP running Home Assistant"
description: "Taking Home Assistant for a spin on a PocketCHIP."
date: 2016-07-06 05:00:00 +0000
date_formatted: "July 06, 2016"
author: Fabian Affolter
author_twitter: fabaff
categories: How-To
og_image: /images/blog/2016-07-pocketchip/social.png
---

<img src='/images/blog/2016-07-pocketchip/pocketchip-logo.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 12px;' width='200' />
Over a year ago I participated in the [kickstarter campaign](https://www.kickstarter.com/projects/1598272670/chip-the-worlds-first-9-computer/description) for "CHIP - The World's First Nine Dollar Computer" by [Next Thing Co.](https://www.nextthing.co/). I went for the PocketCHIP because of the idea. Display, built-in storage (thus no need for SD cards), battery-powered, and a keyboard are pretty nice features. Last week a package arrives...

<!--more-->

Thanks to [Next Thing Co.](https://www.nextthing.co/) and their CHIP which is actually 9 USD the space requirement for a single board computer has decreased. No Ethernet and HDMI output helped with that. But I guess that the next development cycle will allow us to put those boards in a matchbox including wired networking and a SATA interface.

<p class='img'>
  <img src='/images/blog/2016-07-pocketchip/size.png' />
  Size comparison of a Cubieboard, OrangePi One, and CHIP.
</p>

If you start using a PocketCHIP you will definitely look like a Blackberry or a Game Boy user. Typing is done with your thumbs :-)

First a couple of tweaks like setting up `sudo`, upgrading the existing installation, change passwords, enabling ssh, and removal of the annoying stuff then installation of Home Assistant. There is not much to tell...it's straight-forward. For the sake of completeness below the notes about what I did.

A Debian installation is available by default. This means that some dependencies for Home Assistant are missing. I haven't checked if a new build for the PocketCHIP would include them. So, after a `$ sudo apt-get update` installing those dependencies take a minute or two.

```bash
sudo apt-get install python3-dev python3-pip python3-venv
```

As usual I run Python applications in a [venv](https://docs.python.org/3/library/venv.html).

```bash
pvenv ha
```

Let's activate the created environment.

```bash
cd ha
source bin/activate
```

If you haven't seen the next two commands already then you should visit our [frontsite](/).

```bash
pip3 install homeassistant
hass --open-ui
```

With `surf` the browsing experience on the low-resolution display is not that great. Most smartphones, even very cheap ones, have touchscreens with higher resolutions. Nevermind, [`midori`](https://twitter.com/fabaff/status/748852317047418880) is not better.

<p class='img'>
  <img src='/images/blog/2016-07-pocketchip/pocketchip.png' />
  PocketCHIP with Home Assistant frontend
</p>

Well, with PocketCHIP and Home Assistant you could run your home automation on a 49 USD device with a touchscreen, an integrated USP, and a keyboard. With the GPIO available on top of the display you could even connect your PocketCHIP directly to sensors and actuators.

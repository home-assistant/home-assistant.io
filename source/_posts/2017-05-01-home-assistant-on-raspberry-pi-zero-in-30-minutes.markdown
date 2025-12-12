---
title: "Home Assistant on a Pi Zero W in 30 minutes"
description: "Installing Home Assistant (Hassbian) on a Pi Zero W"
date: 2017-05-01 09:00:00
date_formatted: "May 1, 2017"
author: Avraham David Gelbfish
author_twitter: adgelbfish
categories: How-To
og_image: /images/blog/2017-05-hassbian-pi-zero/home_assistant_plus_rpi_600x315.png
---

<p class="img">
  <img src="/images/blog/2017-05-hassbian-pi-zero/home_assistant_plus_rpi_600x315.png" />
</p>

{% warning %}

  ***This article is very outdated*** guide. If you follow it you will be installing a very outdated version of Hassbian, on a hardware platform only suitable for testing.  ***We strongly recommend you do not follow this article***.

{% endwarning %}

Saw the [announcement](/blog/2017/04/30/hassbian-1.21-its-about-time/) yesterday for HASSbian 1.21 and got super excited?

Today we'll flash the latest HASSbian to a [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero/).
**With an added bonus** that besides for an USB cable for power, there's no need for any cables!

What you'll need:
- a Raspberry Pi Zero W (an amazing tiny computer with built-in wifi)
- a microSD card
- some source of USB power
- Wifi
- a desktop or laptop

Let's get to it!

First, download the HASSbian 1.21 image from [here](https://github.com/home-assistant/pi-gen/releases/tag/v1.21).

Unzip it.

Flash it to the microSD card. If you need a flash tool, try [balenaEtcher](https://www.balena.io/etcher)

When the flashing finishes, remove it and plug it back in. You should see a drive called "boot".

Right in there, not in any folders, create a file called `wpa_supplicant.conf`.

The contents of the configuration file should be something like this:
(You may have to adjust for your configuration, hints [here](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md) )

```txt
network={
    ssid="YOUR_WIFI_NETWORK_NAME_HERE"
    psk="YOUR_WIFI_PASSWORD_HERE"
    key_mgmt=WPA-PSK
}
```

Next stick your SD card into the Raspberry Pi Zero W, and plug it in.

After about a minute, use your SSH client to connect to HASSbian (or `hassbian.local` from a Mac), with the username `pi`. The default password is `raspberry`.

It's a good idea to change the password. To do so, use the `passwd` command.

Next, type the following two commands into the SSH console:

```bash
sudo systemctl enable install_homeassistant.service
sudo systemctl start install_homeassistant.service
```

Wait about 15-20 minutes and voilà you have your Home Assistant on your Raspberry Pi Zero W in 30 minutes.

To try it out, go to `http://hassbian:8123` or `http://hassbian.local:8123` if you're using Mac.

For further details about HASSbian, take a look at the documentation.


---
layout: post
title: "Home Assistant on a Pi Zero W in 30 minutes"
description: "Installing Home Assistant (Hassbian) on a Pi Zero W"
date: 2017-05-01 09:00:00 -0500
date_formatted: "May 1, 2017"
author: Avraham David Gelbfish
author_twitter: adgelbfish
comments: true
categories: tutorial
og_image: /images/blog/2017-05-hassbian-pi-zero/home_assistant_plus_rpi_600x315.png
---
<p class="img">
  <img src="/images/blog/2017-05-hassbian-pi-zero/home_assistant_plus_rpi_600x315.png" />
</p>

Saw the announcement yesterday for Hassbian 1.2.1 and got super excited? 

Today we'll flash the latest Hassbian to a Raspbery Pi Zero W.
**With an added bonus** that besides for a usb cable for power, there's no need for any cables!

What you'll need:
- a Raspberry Pi Zero W (an amazing tiny computer with built-in wifi)
- a microSD card
- some source of USB power
- wifi
- a desktop or laptop

Let's get to it!

First, download the Hassbian 1.21 image from [here](https://github.com/home-assistant/pi-gen/releases/tag/v1.21).

Unzip it.

Flash it to the microSD card. (if you need a flash tool, try [Etcher](https://etcher.io/))

When the flashing finishes, remove it and plug it back in. 
You should see a drive called "boot". 

Right in there, not in any folders, create a file called wpa_supplicant.conf.

The contents of the config file should be something like this:
(You may have to adjust for your config, hints [here](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md) )

```
network={
    ssid="YOUR_WIFI_NETWORK_NAME_HERE"
    psk="YOUR_WIFI_PASSWORD_HERE"
    key_mgmt=WPA-PSK
}
```


Next stick your card into the Raspberry Pi Zero W, and plug it in.

After about a minute, use your ssh client to connect to hassbian (or hassbian.local from a mac), with the username pi. The default password is raspberry.

It's a good idea to change the password. To do so, use the `passwd` command.

Next, type the following two commands into the ssh console:

```
sudo systemctl enable install_homeassistant.service
sudo systemctl start install_homeassistant.service
```

Wait about 15 - 20 minutes and Viola! you have your home assistant on your pi in 30 minutes.

To try it out, go to [http://hassbian:8123](http://hassbian:8123) or [http://hassbian.local:8123](http://hassbian.local:8123) if you're using Mac


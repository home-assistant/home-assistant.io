---
layout: post
title: "New Hass.io images"
description: "We release our new images."
date: 2018-07-11 00:00:00
date_formatted: "April 22, 2018"
author: Pascal Vizeli
author_twitter: pvizeli
comments: true
categories: Announcements
og_image: /images/blog/2018-07-hassio-images/blogpost.png
---

After 4 month we are happy to announce our new images for Hass.io, based on HassOS.

Note that the descriptions of new System can be get quite technical. Feel free to jump to the [migration steps].

## {% linkable_title What is new %}

We build HassOS on top of the [Buildroot] framework. The focus of the system is to be a very small and high efficent operating system to run Docker like a hypervisor. It have exactly that software installed is need to run a supervisor. We have the focus also on security, there are no default passwords and we use [AppArmor] to protect application and containers on HassOS.

Key features:
- Safe and Secure updating with [Rauc] over USB or internet (OTA)

## {% linkable_title Migration %}

The design of HassOS is diferent to ResinOS. That is the reason why we can't provide a OTA update from old too new System.

1. Make a snapshot of current system. You should remove the bluetooth add-on before, that is not need anymore.
2. Download the latest [HassOS stable] version.
3. Flash the images with [Etcher] to SD card.
5. On Raspberry: if you modify the `config.txt`, you need applay this also on boot partition of HassOS, but __don't__ copy this file!
4. If you used custom network configuration or ssh development access, we can use a [USB stick]. You can simple copy the resin-sample into `network` folder on USB stick.
5. Take SD card into device slot and boot your system like before.
6. Copy the snapshot into host with SSH or samba add-on.
7. Restore it over the Hass.io panel

## {% linkable_title Future %}

We have now a wounderful base system and can now work to integrate all this features into Hass.io and to UI. So we plan to integrate the Network configuration and bluetooth into UI. The goal is a full featured hub system they allow anybody to use Home Assistant.

We would also adapt more Hass.io API function into Home Assistant i.e. to monitor the system usage of a Add-on or Home Assistant container.

Thanks a lot for all the hardware donations. We start now to porting HassOS to all this hardware and try to support an new device ever 7-14 days until we support all IoT devices they we reached.

Feel free to jump into project and help us to improve the documentation or other task around that all.

[Rauc]: Safe and Secure Updating
[Buildroot]: https://buildroot.org/
[AppArmor]: https://gitlab.com/apparmor/apparmor/wikis/home/
[USB stick]: https://github.com/home-assistant/hassos/blob/rel-1/Documentation/configuration.md#automatic
[HassOS stable]: https://www.home-assistant.io/hassio/installation/
[migration steps]: #migration
[Etcher]: https://etcher.io/

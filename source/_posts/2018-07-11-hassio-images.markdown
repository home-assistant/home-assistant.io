---
title: "New Hass.io images, based on HassOS"
description: "We have released HassOS, a brand new operating system for the purpose of running Hass.io"
date: 2018-07-11 00:00:00
date_formatted: "July 11, 2018"
author: Pascal Vizeli
author_twitter: pvizeli
categories: Announcements
og_image: /images/blog/2018-07-hassio-images/blogpost.png
---

After 4 months of hard work, we are happy to announce our new images for Hass.io, based on HassOS. HassOS is a brand new operating system that we have created specifically for the purpose of running Hass.io. And yes, this supports the Raspberry Pi 3 B+!

## What is new

We have built HassOS on top of the [Buildroot] framework. The focus of the system is to be a very small and highly efficient operating system to run Docker like a hypervisor. It has just enough software installed, to run a supervisor. We have also focused on security, there are, for example, no default passwords and we use [AppArmor] to protect the applications and containers on HassOS.

Key features:

- Safe and secure updating with [Rauc] over USB or internet (OTA)
- Uses an LZ4 compressed root filesystem and parts of the memory
- Read-only root filesystem, designed to run on embedded systems
- Dbus connected hosts services
- Latest LT Linux kernel
- Latest Docker-ce version
- Fully supported NetworkManager
- Bluetooth support using Bluez
- Supports lot different hardware

## Migration

The design of HassOS is different from ResinOS. Because of this, we can't provide an OTA update from the old ResinOS system to the new HassOS based system.

You need to perform the following steps to upgrade:

1. If you have installed the Bluetooth add-on, please remove it, since it is no longer required.
2. Make a Hass.io snapshot of your current system and download it to your computer.
3. Download the latest [Hass.io stable][installation] version.
4. Flash the downloaded Hass.io image with [balenaEtcher] to your SD card.
5. Raspberry Pi: In case you have modified the `config.txt` (in the boot partition), you will also need to apply these changes to HassOS. Do **NOT** simply copy the file from your old setup into HassOS! Apply those changes manually!
6. If you use a custom network configuration or have configured SSH development access, you need to create a configuration [USB stick]. Copy the resin-sample into the `network` folder on a USB stick and insert it into your device.
7. Take the freshly flashed SD card with HassOS and place it into your device, and boot it by turning it on.
8. Copy the snapshot into the host with the SSH or Samba add-on.
9. Restore your snapshot via the Hass.io panel.
10. Done!

## Future

HassOS is a wonderful base system and allows us to start working on integrating all kinds of amazing features into Hass.io (and bring them to the UI as well). For example, we are planning on bringing network and Bluetooth configuration possibilities into the UI. The goal is a full featured hub system that allows anybody to use Home Assistant.

The Hass.io API is extensive, and we are going to adopt more of its features into Home Assistant as well. For example, sensors that allows you to monitor the system usage of an add-on or even Home Assistant itself.

A big shout out to all people who donated money for us to buy hardware! Thank you! We have already started on making HassOS compatible with all kinds of hardware and are currently aiming to release support for new devices every 7-14 days and keeping this up until we support all major IoT boards.

Feel free to jump into the project and help us to improve the documentation or other tasks that are going to help us moving forward.

[Rauc]: Safe and Secure Updating
[Buildroot]: https://buildroot.org/
[AppArmor]: https://gitlab.com/apparmor/apparmor/wikis/home/
[USB stick]: https://github.com/home-assistant/hassos/blob/rel-1/Documentation/configuration.md#automatic
[installation]: /hassio/installation/
[balenaEtcher]: https://www.balena.io/etcher

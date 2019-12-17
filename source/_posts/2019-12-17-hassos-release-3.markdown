---
title: "HassOS 3 released! Raspberry Pi 4 support"
description: "HassOS update: Raspberry Pi 4 now officially supported!"
date: 2019-12-17 00:00:00
date_formatted: "December 17, 2019"
author: Pascal Vizeli
author_twitter: pvizeli
categories: Announcements
og_image: /images/blog/2019-12-hassos-release-3/blogpost.png
---


A bit behind the original timeline, but we happy to announce, we've released version 3 of Hass.io Operating System: HassOS. Just in time for Christmas!

TL;DR; A quick summary of the changes:

    - Official RPi4 support
    - Linux LT 4.19
    - Buildroot LT 2019
    - USB-boot capabilities for the RPi3
    - SMS integrations with USB/GSM modem
    - Qemu Agent support
    - Optimized kernel for virtual appliances
    - Improved automatic disk expansion
    - Initial foundation for offloading the data partition

## Raspberry Pi

We support now officially the Raspberry Pi 4 on this stable version of HassOS! The Raspberry Pi 4 is a great and powerful device to get you started on Hass.io and Home Assistant.

[@rbray89](https://github.com/rbray89) worked hard on this release to add the very often requested USB-boot support! Please note, this is currently limited to RPi3 devices. carefully read how the USB boot [works](https://github.com/home-assistant/hassos/blob/rel-3/Documentation/boards/raspberrypi.md#usb-boot) and be aware of the limited [supported hardware](https://community.home-assistant.io/t/hass-io-transfer-from-sd-card-to-ssd-or-usb/97452/19)

## Hypervisors / Running HassOS on a Virtual Machine

The HassOS image for virtual appliances did get some beautiful updates as well. We have optimized the Linux kernel to support more virtual hardware.

We have now included the Qemu Agent in HassOS. So if you are running on a Hypervisor that is Qemu based (e.g., Proxmox), you now have a lot more information in your Hypervisor control panel, proper shutdown support and improved support for backing up/snapshotting your virtual machine.

Finally, the automated disk expansion got some updates. So if you need more disk space in your virtual appliance, add it in your Hypervisor and HassOS automatically pick it up at the next boot.

We want to emphasize that running Hass.io as a virtual machine is the **only** supported method to run Hass.io on a virtualized system. We've lately seen some funky tutorials on how to run Hass.io inside a container like Docker or LXC, which we **DO NOT** recommend, you will end up having issues.

## How to update to HassOS 3

If you are already running HassOS, you have the full flavor of Hass.io, and thus, all the comfort it has to offer, making this upgrade a breeze!

To update via the user interface, go to the Home Assistant frontend, click on **Hass.io** in the sidebar to go into the Hass.io Panel. Next, click on the System tab and press the **UPDATE** button in the "Host system" panel. In case the update isn't showing up yet, push the **RELOAD** button on the "Hass.io supervisor" box first, which makes your system look for updates instantly.

Another option is to our powerful CLI that is shipped with the SSH add-on. Run the following command to trigger the upgrade: `hassio os update --version 3.7`.

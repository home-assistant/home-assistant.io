---
layout: post
title: "Home Assistant OS Release 8"
description: ""
date: 2022-05-16 00:00:00
date_formatted: "Mai 16, 2022"
author: Stefan Agner
author_twitter: falstaff_ch
comments: true
categories: Release-Notes
og_image: /images/blog/2022-05-16-os8/social.png
---

<a href='https://github.com/home-assistant/operating-system/releases/tag/8.0'>
<img title='Home Assistant OS Release 8' alt='Home Assistant OS Release 8 Logo'
     src='/images/blog/2022-05-16-os8/social.png' style='border: 0;box-shadow: none;'>
</a>

Home Assistant OS 8.0 stable is available now!

**Highlights**:

- Use of GRUB2 for UEFI based systems
- Support for additional Wi-Fi and Bluetooth devices
- New image: Generic AArch64 for UEFI based AArch64 VMs and boards
- New image: Home Assistant Yellow

## Table of contents

- [Table of contents](#table-of-contents)
- [Operating System Changes](#operating-system-changes)
  - [GRUB2 for UEFI based systems](#grub2-for-uefi-based-systems)
  - [Under the Hood](#under-the-hood)
  - [Other Changes](#other-changes)
- [Device Support](#device-support)
  - [Raspberry Pi](#raspberry-pi)
  - [Home Assistant Yellow](#home-assistant-yellow)
  - [Generic x86-64](#generic-x86-64)
  - [Generic AArch64 support](#generic-aarch64-support)

## Operating System Changes

### GRUB2 for UEFI based systems

For Generic x86-64, OVA and the new Generic AArch64 Home Assistant uses GRUB2
as boot loader now. GRUB2 (GRand Unified Bootloader) is the de-facto standard
boot loader used by most Linux distributions. The main reason switching from
Barebox to GRUB2 was the missing AArch64 UEFI boot support in Barebox. We also
expect GRUB2 to be more stable especially on Desktop style x86-64 systems as
it gets used by much more users since generic Linux distributions use GRUB2.
Although, we actually hit a bug in GRUB2 during the RC phase, but let's hope
this was a one-off. 🤞

<img src='/images/blog/2022-05-16-os8/haos-grub2-menu.png' alt='Screenshot showing GRUB2 menu of Home Assistant OS'>

The boot menu shows the two boot slot. Typically you don't have to change
selection here, unless you intentionally want to boot the previously installed
Home Assistant OS version.

Note: From OS 8.0 onwards it is only safe to downgrade to 7.6! Automatic
fallback in case 8.0 does not boot does work with older versions, but 7.6
is the recommended release to upgrade from.

### Under the Hood

Under the hood, the OS was updated to the latest upstream Linux 5.15 kernel
as well as Buildroot 2022.02.1. The latest Buildroot release brings new
versions of various core components like systemd 250, NetworkManager 1.34.0
and Docker 20.10.14.

Additional networking drivers and settings prepare Home Assistant OS to
host the OpenThread Border Router Add-on.

### Other Changes

- IP set support for advanced firewalling (also used by the OTBR add-on)
- Support for NTP configuration via DHCP
- Google Coral support is now using Google's latest driver. This enables
  additional Coral device support such as PCI Dual Edge TPU.
- Legacy wext backend for wpa_suppilcant is now enabled to support more WiFi
  devices.

## Device Support

### Raspberry Pi

All Raspberry Pi versions use the latest LTS Linux Kernel 5.15 and firmware
(tag 1.20220331) from the Raspberry Pi team. These are the same versions as
the Raspberry Pi OS is using currently.

### Home Assistant Yellow

This is the first release which supports Home Assistant Yellow. Since Home
Assistant Yellow uses the Raspberry Pi Compute Module 4, the support is
based of the regular Raspberry Pi support currently. The Yellow image is
using the same kernel and firmware version. The Yellow board also supports
booting directly off of a NVMe device for those using a CM4 Lite (without
eMMC storage).

### Generic x86-64

Besides the move to GRUB2 Generic x86-64 received quite some additional device
support. The WiFi devices 3945ABG/BG/4965AGN and 22000 series are now supported.

Other Changes:

- Support 32-bit UEFI boot. This is required by older Intel Atom systems. Note
  that only the boot loader is 32-bit, everything else uses the same 64-bit
  binaries as 64-bit UEFI boot.
- Driver and firmware for Broadcom BNX2/BNX2X network interfaces are included.

### Generic AArch64 support

[@Doridian] contributed support for generic AArch64 systems which use the UEFI
boot flow. It should support real boards as well as virtual machines. So far
it has been successfully tested on KVM Virtual Machines.

[@Doridian]: https://github.com/Doridian

---
layout: post
title: "Home Assistant OS Release 6"
description: ""
date: 2021-06-11 00:00:00
date_formatted: "June 11, 2021"
author: Stefan Agner
author_twitter: falstaff_ch
comments: true
categories: Release-Notes
og_image: /images/blog/2021-06-11-os6/social.png
---

<a href='https://github.com/home-assistant/operating-system/releases/tag/6.0'>
<img title='Home Assistant OS Release 6' alt='Home Assistant OS Release 6 Logo'
     src='/images/blog/2021-06-11-os6/social.png' style='border: 0;box-shadow: none;'>
</a>

Home Assistant OS 6.0 stable is available now!

**Highlights**:

- OS Agent for better OS integration with Supervisor
- Support for additional Wi-Fi and Bluetooth devices
- Smaller virtual machine disk images

- Improved: Generic x86-64 system support

## Table of contents

- [Operating System Changes](#operating-system-changes)
  - [OS Agent](#os-agent)
  - [Under the Hood](#under-the-hood)
- [Device Support](#device-support)
  - [Raspberry Pi](#raspberry-pi)
  - [Generic x86-64](#generic-x86-64)
  - [Open Virtualization Appliance](#open-virtualization-appliance)
  - [Additional Wi-Fi and Bluetooth device support](#additional-wifi-and-bluetooth-device-support)
  - [Homematic IP Support](#homematic-ip-support)
  - [Google Coral PCIe AI Accelerator Support](#google-coral-pcie-ai-accelerator-support)
- [Other Changes](#other-changes)

## Operating System Changes

### OS Agent

Operating System release 6 comes with a new, Go written daemon called OS Agent.
This allows the Supervisor to access more aspects of the OS. One such aspect is
to move the data to an external data disk or wipe data to start over without
reinstalling. Note however that at this point, the required logic in the
Supervisor and Frontend is still being developed.

### Under the Hood

Under the hood, the OS was updated to the latest upstream Linux 5.10 kernel
as well as Buildroot 2021.02.1. The latest Buildroot release brings tons of
new software versions along with bug and security fixes. Some key components
which received an update were systemd 247 and the Docker Container Engine
20.10.6.

### Other Changes

- The short name of the OS used throughout the software stack was renamed to
  "haos". From a users perspective not much changes, but it leads to new file
  names.
- The Home Assistant CLI is now started on tty1 instead of the login prompt. The
  HA CLI banner shows the IP and other device information without the need
  to attach a keyboard to login.
- The default shell of the root user is now the Busybox ash. This allows to use
  scp and similar tools using SSH.
- The system start is now delayed until the system time has been synchronized
  with an NTP server. This avoids connection issues to SSL/TLS enabled servers
  when the system time is off. In practice, the delay should only be a few
  seconds. The system proceeds with startup after 90s in case the NTP server was
  not reachable (e.g. if no Internet connectivity is available).

## Device Support

### Raspberry Pi

All Raspberry Pi versions were updated to use the Linux Kernel 5.10 from the
Raspberry Pi team, just like Raspberry Pi OS. The latest Bluetooth firmware for
CYW43455 (Raspberry Pi 3 B+/4) with security fixes is now part of the Raspberry
Pi images.

### Generic x86-64

In Home Assistant OS 6 the board/image "Intel NUC" was renamed to "Generic
x86-64". Existing "Intel NUC" installation will automatically migrate to the
"Generic x86-64" image on update.

Already with OS 5 the "Intel NUC" image was usable for most UEFI capable x86-64
systems. With the rename that fact is emphasized. Home Assistant OS is open
to changes to add drivers to extend support for other x86-64 platforms. However,
keep in mind that we don't have access to all x86-64 hardware, so support for
devices is on a best effort basis.

Other Changes:

- The Intel IGC network driver supports Intel network cards such as I225-LM/I225-V
  used on some newer Intel NUC devices.

- With Home Assistant OS 6 the latest version of the Barebox bootloader 2021.05.0
  which fixes boot from hard disks larger than 2TB.

- The ACPI kernel driver for Thinkpad devices is enabled.

### Open Virtualization Appliance

The virtual disk images are now built from a sparse file as source, which leads
to smaller effective disk image sizes. Disk images are now also distributed in
the more common zip file format (except the qcow2 images which are mostly used on
Linux, they continue to be in the xz compression format).

By default, the image now has a serial console enabled which is useful to access
Home Assistant OS on headless host systems.

### Additional Wi-Fi and Bluetooth Device Support

Ralink rt27xx/rt28xx/rt30xx, as well as Realtek 87xx/88xx devices, are now
supported on boards that don't have onboard Wi-Fi/Bluetooth. This is also
true for the OVA image for virtualized environments (when using hardware
passthrough functionality). For the OVA image, also Intel firmwares are now
part of the image so that Intel Wi-Fi/Bluetooth devices can be used in
passthrough mode as well.

### Homematic IP Support

[@jens-maus] contributed OS support for Homematic/Homematic IP dual-stack support
for RPI-RF-MOD or HM-MOD-RPI-PCB devices. This together with the
[RaspberryMatic CCU Add-On](https://github.com/jens-maus/RaspberryMatic/wiki/Installation-HomeAssistant)
offers the full functionality of RaspberryMatic embedded in Home Assistant.

### Google Coral PCIe AI Accelerator Support

[@ryddler] enabled the driver for Google Coral PCIe TPU devices. This allows to
use Google Coral Mini PCIe Accelerator or M.2 Accelerator on all boards
supporting PCIe.


That's all Folks! Now go out and update!

[@jens-maus]: https://github.com/jens-maus
[@ryddler]: https://github.com/ryddler

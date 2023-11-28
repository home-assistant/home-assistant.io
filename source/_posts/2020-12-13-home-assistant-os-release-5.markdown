---
layout: post
title: "Home Assistant OS Release 5"
description: "Improved name resolution, external data disk, more reliability and supporting 3 new devices!"
date: 2020-12-13 00:00:00
date_formatted: "December 13, 2020"
author: Stefan Agner
author_twitter: falstaff_ch
comments: true
categories: Release-Notes
og_image: /images/blog/2020-12-13-os5/social.png
---

<img src='/images/blog/2020-12-13-os5/social.png' style='border: 0;box-shadow: none;'>

Today we also release Home Assistant OS 5.8, the first stable version of the 5.x
release series.

**Highlights**:

- Improved Multicast Name Resolution on OS level
- External Data Disk Feature
- Improved Reliability against Container corruption

- New support: Raspberry Pi 4 – 8GB
- New support: ASUS Tinker Board S
- New support: ODROID-C4
- Improved: OVA Virtual image includes more drivers

## Table of contents

- [Table of contents](#table-of-contents)
- [Operating System Changes](#operating-system-changes)
  - [Multicast Name Resolution](#multicast-name-resolution)
  - [External Data Disk](#external-data-disk)
  - [Improved Reliability](#improved-reliability)
  - [Under the Hood](#under-the-hood)
- [Board Support](#board-support)
  - [Raspberry Pi](#raspberry-pi)
  - [ODROID](#odroid)
  - [Open Virtualization Appliance/Intel NUC](#open-virtualization-appliance-intel-nuc)
  - [New Board Support](#new-board-suport)
- [Other Changes](#other-changes)

## Operating System Changes

### Multicast Name Resolution

Release 5 uses systemd-resolved to provide DNS services on the operating system
level and acts as a multicast name resolution responder. Besides, mDNS
systemd-resolved also supports the LLMNR hostname resolution protocol. In
practice, this makes discovering a new installation of Home Assistant OS working
in most situations, either using `http://homeassistant.local:8123` or
`http://homeassistant:8123`.

### External Data Disk

In release 4 we introduced external data disk support. The command `datactl`
allows moving the main data partition to any disk connected to the system. The
boot partition and main operating system partitions stay on the boot medium
(typically the SD card). Using this approach is more reliable than booting the
system from USB. Booting from USB requires several parts of the software stack
to rediscover the external storage. In release 5 we made the external data disk
feature more robust and the initial moving process much faster. We plan to
improve that feature even more and are happy to get your feedback!

### Improved Reliability

The main system service to start Home Assistant Supervisor is now more reliable.
Home Assistant OS is now able to detect a corrupted supervisor container in most
situations and automatically downloads a new version of it. File system checks
have also been expanded to the boot partition, which makes sure that all file
systems are being checked now.

### Under the Hood

Under the hood, we updated to Buildroot 2020.11, which brings tons of new software
versions  along with bug and security fixes. Some key components which received
an update were systemd 246 and AppArmor version 3.0.

## Board Support

### Raspberry Pi

All Raspberry Pi versions now use Linux Kernel 5.4, just like Raspberry Pi OS.
With the move to U-Boot 2020.10, we are now also supporting Raspberry Pi with 8GB
of memory. With the new kernel and U-Boot Home Assistant OS can now also run on
the Compute Module 4 as well as the Pi 400 (the keyboard). A keyboard is
probably not the ideal form factor for a headless system such as Home Assistant
OS, but it comes with good cooling, which makes it not the worst choice :-). We
recently tested the 64-bit variant of Home Assistant OS much more and feel
comfortable to recommend the 64-bit version for Raspberry Pi 4.

### ODROID

The ODROID platforms now use Linux 5.9, which brings improved support for all
ODROID platforms such as the ODROID N2(+). For the N2(+) the Real-Time Clock is
now supported as well.

### Open Virtualization Appliance/Intel NUC

The x86 platforms (Intel NUC, OVA - Open Virtualization Appliance) now use
Linux 5.9. The kernel for OVA images has new drivers enabled for Intel Network
devices with Virtual Function, PCIe passthrough for Hyper-V, or support for
Audio (HDA audio devices).

### New Board Support

Besides the ASUS Tinker Board, we now also support the Tinker Board S, a variant
with fast on-board eMMC storage. Thanks to [@ubergeek801] we now also have support
for ODROID-C4, a cost-effective alternative to Raspberry Pi in a similar form
factor.

## Other Changes

The build pipeline is now using GitHub Actions and we compress the images using
the xz compression algorithm instead of gz. The flashing process will stay the
same: Etcher supports flashing from gz as well as xz.

This is all I can think of for now. The release 5.8 will be on the stable
channel today, so watch out for the update notification in the Supervisor
section. Images are available in the release section over on
[GitHub](https://github.com/home-assistant/operating-system/releases).

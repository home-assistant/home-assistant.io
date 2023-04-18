---
layout: post
title: "Home Assistant OS 10: Better memory management and new board support"
description: "Home Assistant OS 10 released with better memory management and Hardkernel ODROID-M1 board support!"
date: 2023-04-18 00:00:00
date_formatted: "April 18, 2023"
author: Stefan Agner
comments: true
categories:
  - Announcements
og_image: /images/blog/2022-05-16-os8/social.png
---

<a href='https://github.com/home-assistant/operating-system/releases/tag/10.0'>
<img title='Home Assistant OS Release 10' alt='Home Assistant OS Release 10 Logo'
     src='/images/blog/2022-05-16-os8/social.png' style='border: 0;box-shadow: none;'>
</a>

**Highlights**:

- Support for Hardkernel ODROID-M1
- Improved datadisk feature:
  - Improved reliability
  - Move from one datadisk to a new datadisk is now supported
- Improved memory management to improve overall device performance, especially under low memory situations
- Updated software packages: Linux, Docker, BlueZ, NetworkManager

For existing installations, no manual intervention is needed! You can safely
update without reading these rather technical release notes.

## Table of contents

- [Table of contents](#table-of-contents)
- [New board support: Hardkernel ODROID-M1](#new-board-support-hardkernel-odroid-m1)
- [Improved datadisk feature](#improved-datadisk-feature)
- [Advanced memory management](#advanced-memory-management)
- [Updated software packages](#updated-software-packages)

## New board support: Hardkernel ODROID-M1

Home Assistant OS 10 supports the Hardkernel ODROID-M1 single board computer!
Most notably the ODROID-M1 supports NVMe SSD storage natively, which makes it
another great choice to run Home Assistant on. With its quad-core CPU with up
to 2 GHz and up to 8 GB of memory it is suitable even for demanding Home
Assistant installations.

Currently, Home Assistant can be booted off an SD-card or an eMMC. Note however
that a new boot firmware (Petitboot) is required to boot from eMMC (see
the board-specific documentation). NVMe SSD boot is currently not supported
by the boot firmware. However, an NVMe SSD can be used through the datadisk
feature.

<img src='/images/blog/2023-04-18-os10/hardkernel-odroid-m1.jpg' alt='Hardkernel ODROID-M1 single board computer with NVMe SSD plugged in'>

## Improved datadisk feature

The datadisk feature allows extending storage by adding an external disk.
When using the datadisk feature, all commonly read and written data is moved
to that storage, just Home Assistant OS itself remains on the existing storage
(e.g. SD-card or eMMC). Home Assistant OS is a read-only operating system - the
OS partitions are only written to when updating the operating system. This makes
sure that there is minimal wear on the existing storage.

In this OS release, together with the latest version of the Supervisor, the
datadisk feature got more user-friendly: The datadisk choice lists the actual
model of available data disks. In situations where previously an attached disk
would not show up, the disk will now be reliably detected and available as the
new datadisk. Now it is also possible to move from one data disk to another:
Simply connect another disk, and go to the Move datadisk dialog again. On
reboot the data will be moved, and the old data disk can be detached.

You can find the move datadisk feature under Settings > System > Storage in
the top right overflow menu.

<img src='/images/blog/2023-04-18-os10/datadisk-new.png' alt='Screenshot showing the new datadisk selection dialog'>

## Advanced memory management

With Home Assistant OS 10 low memory, devices will generally perform better.
Firstly, we moved from zram to zswap, which allows us to use the storage as an
actual swap space. We’ve tuned the memory management to minimize the amount of
writes to storage (to prevent unnecessary wear on SD-cards and other flash
memory based storage).

We’ve also improved reliability and responsiveness in low-memory situations:
Home Assistant OS uses a new memory management mechanism named Multi-Gen LRU
along with thrashing prevention. This makes Home Assistant OS recover quickly
from a low-memory situation and remain responsive.

In general, we recommend to use a board with at least 1 GB of memory and make
sure to stay well below 80% memory utilization. You can monitor the overall
memory utilization under Settings > System > Hardware.

## Updated software packages

Home Assistant OS is built using the latest release of Buildroot 2023.02. It
comes with the latest Linux kernel with long-term support (6.1). This means
updated drivers and better device support. It uses the latest version of
Docker 23.0.3, our container engine powering the Supervisor and our add-ons.
The latest version of the Bluetooth package BlueZ 5.66 comes with various bug
fixes for improved communication with Bluetooth devices. Network Manager
1.40.16 has proven to work more reliably with third party Thread border routers,
specifically with Apple border routers. We also improved the IPv6 Neighbor
Discovery support on Home Assistant OS specifically for Thread: Home Assistant
OS will now quickly discover when border routers disappear from the network and
use alternative border routers, if available.

We hope you enjoy Home Assistant OS 10.0! If you have any questions or feedback,
please let us know.

---
layout: post
title: "Home Assistant OS 11: Low-latency scheduler and VM snapshot improvements"
description: "Home Assistant OS 11 released with low-latency scheduler enabled and VM snapshot improvements on KVM/Proxmox."
date: 2023-10-14 00:00:00
date_formatted: "October 14, 2023"
author: Stefan Agner
comments: true
categories:
  - Announcements
---
With Home Assistant OS 11, there is no big or flashy feature to highlight. Rather, there are a lot of small improvements and little gems. The increased use of Bluetooth has uncovered quite some issues on Home Assistant OS; some of which we are still working on. One of the main issues in Home Assistant OS 10 was caused by a bug in the processing of Bluetooth advertisements in the Linux kernel’s Bluetooth stack itself. With the help of our community, we managed to reproduce, pinpoint, and provide the necessary hints to the Bluetooth developers. This led to a fix in the Bluetooth stack not only for Home Assistant OS and Supervised users but for the Linux community in general 🎉 (see issue https://github.com/home-assistant/operating-system/issues/2535 for details).

We’ve also worked on the landing page which is bundled with Home Assistant OS 11. The landing page is visible to the user when starting a fresh installation of Home Assistant OS for the first time. It features the same new look as the Home Assistant Core onboarding flow, and tracks issues during the bootstrapping phase, automatically displaying errors if they occur during that critical setup phase.

<img src='/images/blog/2023-10-14-home-assistant-os-11/home-assistant-os-11-landing-page.png' alt='Screenshot of the new Home Assistant landing page'>

The new landing page shipped with Home Assistant OS 11

This month we at Nabu Casa got a new addition to the Home Assistant OS team: With [Jan Čermák](https://github.com/sairon) joining, we will have more bandwidth to implement new features as well as to tackle issues reported by our community. Welcome Jan!

And finally: Home Assistant OS 11 will be pre-installed in the next batch of Home Assistant Green 🎉

Enjoy the latest version of Home Assistant OS!

Stefan

<!--more-->

- [Linux' preemptible kernel configuration](#linux-preemptible-kernel-configuration)
- [VM filesystem freeze is being relayed to Home Assistant](#vm-filesystem-freeze-is-being-relayed-to-home-assistant)
- [Docker and containerd upgrades](#docker-and-containerd-upgrades)
- [More Highlights in Home Assistant OS 11](#more-highlights-in-home-assistant-os-11)


## Linux' preemptible kernel configuration
We've applied Linux's preemptible kernel configuration across the board. The result is lower latencies even on busy systems (for example due to slow I/O operations), making your smart home even more responsive.

## VM filesystem freeze is being relayed to Home Assistant
VM filesystem freeze (as triggered by VM snapshots) is a neat feature for more advanced setups based on Proxmox (or other KVM based VMs).
Today, Home Assistant's recorder integration uses a database underneath (by default this is SQLite). When  Home Assistant takes a backup, the Supervisor notifies the database engine before copying the database files (currently, this is implemented for SQLite and MariaDB). So far, this didn't work for VM filesystem freezes With that notification, the database engine can take the necessary steps to ensure that the database files are in a consistent state before the backup takes place.
However, when creating a snapshot using the VM snapshot feature, the database doesn’t know about this, and the snapshot can end up with an inconsistent state of the database. On snapshot restore, the database may or may not be able to recover from that inconsistent state. This can lead to partial or even complete data loss of the recorder data.
With Home Assistant OS 11, on Proxmox/KVM-based VMs, when using the snapshot feature, the file system freeze is now relayed to Home Assistant. Home Assistant then uses the same notification mechanism as backups are using. This ensures that VM snapshots are always coherent, making sure rollbacks of your smart home systems are reliable.

## Docker and containerd Upgrades

In this release, Home Assistant OS has adopted the latest versions of Docker (v24.0.6) and containerd (v1.7.6), ensuring better performance and container management. We’ve also improved the containerd configuration to drop unnecessary components. With this, containerd uses less CPU and memory resources, ensuring better overall performance.

## More Highlights in Home Assistant OS 11

- **Consistent network interface naming**: On Arm-based boards, network names are now enumerated based on the device tree. This means that the first Ethernet device will no longer be named eth0 but end0. The same network configuration used previously is automatically applied to the network interface with the new name.
**This can be a breaking change ⚠️**: If you use the name of the Ethernet interface in custom scripts or automation, you'll have to adjust to the new name (as shown in the network settings)!
- **Bluetooth improvements**: Updating to a newer version of BlueZ, fix for the Bluetooth LE advertisement stall bug, and optimizing Bluetooth device cache management.
- **Improved kernel configuration**: Our improved kernel configuration aims to improve Docker's overlayfs performance, making container operations smoother.
- **Support for LED control on Home Assistant Green**: The three LEDs on the front of Home Assistant Green can now be controlled through hardware settings.
- **Adjusted development workflow** (my personal favorite, but I might be biased 😉): Our adjusted development workflow allows for more incremental changes and incorporates more automations. This will make it easier for developers to work on and improve Home Assistant OS.

---
layout: post
title: "Raspberry Pi 5 support and more in Home Assistant OS release 12 & Supervisor update"
description: "HAOS 12 adds support for Raspberry Pi 5 and ODROID-M1S boards, with the Linux kernel updated to 6.6. Additionally, backups have become faster, and add-ons can now signal when they should not be auto-updated."
date: 2024-02-26 00:00:00
date_formatted: "February 26, 2024"
author: Stefan Agner
comments: true
categories: HAOS
og_image: /images/blog/2024-02-haos12/haos12.png
---

**TL;DR:** Home Assistant OS 12 adds support for Raspberry Pi 5 and ODROID-M1S boards, with the Linux kernel updated to 6.6. Additionally, backups have become faster, and add-ons can now signal when they should not be auto-updated.

<p><img src='/images/blog/2024-02-haos12/haos12.png' class='no-shadow' /></p>

## Raspberry Pi 5

With the release of Home Assistant OS 12, we officially announce Raspberry Pi 5 support! Many Home Assistant OS users have extensively tested the preview releases during the last few months, and after some initial hiccups with the Raspberry Pi 5-specific update mechanism, things are stable and solid today. As a third of all Home Assistant users currently use a Raspberry Pi board as their dedicated Home Assistant system, we are sure this support will make many users very happy!

Compared to other Raspberry Pi boards, HAOS does not use U-Boot as an extra bootloader. Instead, the Raspberry Pi's built-in “tryboot” functionality is used to automatically fall back to a previous release in case of an update failure. This new update mechanism integration required us to have a longer testing phase.

In our testing, the higher CPU clock of the Raspberry Pi 5 (up to 2.4GHz) makes Home Assistant feel noticeably snappier compared to previous Raspberry Pi boards. Additionally, a Raspberry Pi HAT that provides NVMe SSD support allows you to extend your Raspberry Pi with fast, reliable, and cost-effective storage. We do recommend using an SD card as the boot medium and using the [data disk feature](/common-tasks/os/#using-external-data-disk) to move most of the Home Assistant installation onto the NVMe. This is easy to set up and guarantees a reliable boot.

## ODROID-M1S

The Raspberry Pi 5 is not the only new board that is supported with this release. We are happy to announce that the family of supported ODROID devices from the Korean manufacturer Hardkernel has become bigger thanks to a community contribution from Tim Lunn (darkxst), who implemented board support for the ODROID-M1S. The ODROID-M1S is the newest single-board computer from Hardkernel, which is similar to the already supported ODROID-M1, which was added in Home Assistant OS 10. This new board offers a slimmer form factor, 4 or 8 GB of RAM on board, and an embedded 64 GB eMMC storage. Home Assistant OS can be booted either from an SD card or the system can be flashed to the eMMC card using the procedure described in the [documentation](https://github.com/home-assistant/operating-system/blob/dev/Documentation/boards/hardkernel/odroid-m1s.md). While the board also has an NVMe slot for a solid-state drive, it is not supported as a boot device. However, just like on the Raspberry Pi 5, it can still be used as the data disk.

Just like its larger brother, the ODROID-M1S is powered by a quad-core ARM Cortex-A55, but while ODROID-M1 has (very slightly) beefier Rockchip RK3568 SoC, this board sports the RK3566. Some of our more curious readers may notice this is the same processor that is found on our Home Assistant Green! While there are some similarities between those two boards, Home Assistant Green can offer you a seamless out-of-box experience, allowing you to set up your smart home in a matter of minutes. But Home Assistant is also about the freedom of choice, so if you are looking for a more DIY approach, ODROID-M1S might be the right choice for you.

## Linux 6.6

Home Assistant OS 12 now comes with Linux kernel 6.6! This is good news for those who want to run their Home Assistant on newer hardware that lacked support in the previous 6.1 kernel. This version update also allows us to extend the list of supported Wi-Fi and Bluetooth cards, including ones you may find in new mini-PCs, a popular platform for Home Assistant OS. Those who run their installations on a Raspberry Pi (including the CM4 in Home Assistant Yellow) may notice their kernel version still starts with 6.1. This is because we are not using the upstream kernel but the downstream one maintained by the Raspberry Pi developers. But this kernel was also updated to the latest stable version, which we hope will resolve some sporadic bugs.

Home Assistant OS sticks to the LTS (long-term support) kernels, which are usually released once per year - just like Buildroot, the base system we use for Home Assistant OS. This time, we are slightly ahead of schedule, because usually the kernel update is done alongside the bump of the Buildroot version. But don't worry, the Buildroot update is coming soon as well, and we expect to include its update in one of the next minor Home Assistant OS releases coming in the following weeks. This will conclude this year's spring cleaning of Home Assistant OS, and we will be ready to focus on new features and improvements again!

## Faster Backups

Home Assistant Supervisor and Core’s built-in backup functionality has become much faster. Thanks to contributions from bdraco, the backup feature gained faster compression speeds due to a library named isal, which provides optimized low-level functions for compression and decompression. More importantly, the backup feature now avoids intermediate copies, making it faster on slower storage media especially. If you used uncompressed backups before because the backup used to be too slow for you, now is the time to give compressed backups a try again! 😀

<p><img src='/images/blog/2024-02-haos12/supervisor-backup-speed-improvements.png' class='no-shadow' alt='Comparison of the speed of a 100MB backup on a Home Assistant Yellow, between Supervisor 2023.12.1 and 2024.02.0.' /></p>

Home Assistant OS users’ backup functionality is part of Supervisor. You’ll have received the improvements incrementally over the releases of the past few weeks. At the time of writing, your installation should run on Home Assistant Supervisor 2024.02.0 with all these improvements built in.

## Safer add-on auto-updates

Last, but not least, the Supervisor features an auto-update flag for add-ons. However, depending on the nature of an update to the add-on, the new version might need user intervention or have breaking changes. Add-on developers now have the option to prevent auto-updates to such versions. Users of the auto-update feature might see an update notification despite auto-updates being enabled. This means that the author of the add-on decided that this particular update should not be auto-updated and instead be manually approved by the user.

Note: We generally don’t recommend auto-updates for add-ons, as even safe updates might interfere with regular operation. For example, during the automatic update of an add-on like Z-Wave JS, your Z-Wave devices would unexpectedly become unavailable for a short time. The better approach for such add-ons is to plan some time to maintain your Home Assistant system every once in a while and update your add-ons in a batch.

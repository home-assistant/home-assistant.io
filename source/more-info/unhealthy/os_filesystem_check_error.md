---
title: "Filesystem check failed on an OS partition"
description: "More information on what to do when a filesystem check fails on a Home Assistant OS partition."
---

## The issue

At every boot, Home Assistant checks the integrity of its storage partitions. This check failed on one of the OS partitions, which means the filesystem is corrupted — files may be missing, unreadable, or in an inconsistent state.

This is most commonly caused by an unexpected power loss or a failing storage device (SD card, USB drive, or eMMC).

Your data partition — which stores your configuration, automations, and add-ons — is on a separate partition and is not affected by this issue.

## The solution

Try rebooting your system first. Home Assistant OS uses two OS slots, so the system may switch to a healthy slot automatically, and the check may pass on the next boot.

{% my hardware badge title="**Settings** > **System** > **Hardware**" %}

If the issue persists and the storage device holding the OS is failing, you can replace it without losing your data:

1. Install Home Assistant OS on the new device.
2. Connect the device holding your data partition to the new installation.
3. Home Assistant OS will detect the existing data and offer to adopt it, letting you pick up right where you left off.

If your data partition is on the same physical device as the OS, make sure you have a recent backup downloaded to another device before replacing the storage.

{% my supervisor_backups badge title="**Settings** > **System** > **Backups**" %}

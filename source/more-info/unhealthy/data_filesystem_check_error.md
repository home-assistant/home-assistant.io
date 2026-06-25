---
title: "Filesystem check failed on the data partition"
description: "More information on what to do when a filesystem check fails on the Home Assistant data partition."
---

## The issue

At every boot, Home Assistant checks the integrity of its storage partitions. This check failed on the data partition, which means the filesystem is corrupted — files may be missing, unreadable, or in an inconsistent state.

The data partition stores your configuration, automations, add-ons, and backups. This is most commonly caused by an unexpected power loss or a failing storage device (SD card, USB drive, or eMMC).

## The solution

Try rebooting your system first. The filesystem check may be able to repair minor corruption automatically on the next boot attempt. You can reboot by going to {% my hardware title="**Settings** > **System** > **Hardware**" %}, opening the menu in the top right corner, and selecting **Reboot system**.

If the system is still accessible after rebooting, create a full [backup][backups] immediately and download it to another device before doing anything else.

{% my supervisor_backups badge %}

If the issue persists, you can wipe and reformat the data disk from the local terminal (a monitor and keyboard connected to your Home Assistant device) by running the command below. Note that this deletes all user data, automatically reboots your system, and reinstalls the Home Assistant components, so you will need to restore from a backup afterwards. If the underlying cause is a failing storage device, this may not resolve the issue permanently.

```bash
ha os datadisk wipe
```

If the data partition is on a failing physical device, move it to a new one before restoring your backup. You can do this from {% my storage title="**Settings** > **System** > **Storage**" %}.

Once the data partition is ready, restore from your backup.

[backups]: /common-tasks/general/#backups

To reduce the risk of this happening in the future, always shut down Home Assistant cleanly rather than cutting power, and keep regular backups stored on a separate device.

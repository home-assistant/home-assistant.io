---
title: "Clear up storage"
description: "More information on how to clear up storage in Home Assistant."
related:
  - docs: /integrations/recorder/#service-purge
    title: purge the contents of the database
  - docs: /common-tasks/os/#network-storage
    title: Add network storage
  - docs: /common-tasks/os/#using-external-data-disk
    title: Using an external data disk
  - URL: https://yellow.home-assistant.io/guides/add-ssd-existing-installation/
    title: Adding an SSD to Home Assistant Yellow
---

Reaching your storage limit, this page will help you when that happens.

There are several things you can do to free up some space:

- [Clean the database](#cleaning-the-database)
- [Reduce space used for backups](#reducing-space-used-for-backups)
- [Uninstall unused add-ons](#uninstalling-unused-add-ons)
- [Expand storage](#expanding-storage)

## Cleaning the database

The Home Assistant database can get huge!

Luckily, there is a tool you can use to [purge the contents of the database](/integrations/recorder/#service-purge)

You can [filter](/integrations/recorder/#configure-filter) what you send to
the database, and even change how long it stores the data
[with the `purge_keep_days` setting](/integrations/recorder/#purge_keep_days)

## Reducing space used for backups

### Deleting obsolete backups

Previous backups are not included when you create a new one. But they do take up space. To delete old backups, follow these steps:

1. Go to {% my backup title="**Settings** > **System** > **Backups**" %}.
2. From the list of backups, select all the ones you want to delete, then select **Delete selected backups**.
   - This clears up space in Home Assistant.

### Storing backups outside of Home Assistant

Storing backups outside of Home Assistant makes sure they don't use space on Home Assistant to begin with. It also makes sure you can [restore Home Assistant from backup](/common-tasks/os/#restoring-a-backup) in case you have an issue with your current installation.

1. Go to {% my backup title="**Settings** > **System** > **Backups**" %}, and from the list of backups, select the backup you want to keep.
2. In the dialog, select the checkbox for each component, in the three-dots menu, select **Download backup**.
3. Store the backup somewhere safe.
   - For example, [add network storage](/common-tasks/os/#network-storage), and then [change your default backup location](/common-tasks/os/#change-default-backup-location).

## Uninstalling unused add-ons

Add-ons can take a lot of space, not just the add-on itself but also their data.

1. Go to {% my supervisor title="**Settings** > **Add-ons**" %}.
2. Look at your installed add-ons and identify the ones you no longer use.
3. To remove the add-on, select the add-on and select **Uninstall**.

## Expanding storage

If the above steps to free up space did not help, you need to expand your storage.

### Expanding storage: Home Assistant Operating System

When you are running {% term "Home Assistant Operating System" %}, you can use the following options to expand your storage:

- Replace your current storage medium, for example, the SD card, with a bigger one. Use a backup to [restore Home Assistant from backup](/common-tasks/os/#restoring-a-backup) on the new SD card.
- [Use an external data disk](/common-tasks/os/#using-external-data-disk)

### Expanding storage on VM

If you are running Home Assistant as a VM, look at the
documentation for your hypervisor on how to expand disks for virtual machines.
Home Assistant will auto-expand to use the newly added space.

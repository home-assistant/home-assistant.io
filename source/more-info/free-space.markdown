---
title: "Clear up storage"
description: "More information on how to clear up storage in Home Assistant."
related:
  - docs: /integrations/recorder/#action-purge
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

## Viewing the available disk space

Follow these steps to check the available free disk space.

1. Go to **{% my storage title="Settings > System > Storage" %}**.
2. Under disk metrics, hover over the status bar to view the details.
   - {% icon "mdi:information-outline" %} The **Network storage** section only shows if you have [added network storage](/common-tasks/os/#network-storage).

   ![Screenshot of the "Move datadisk" feature](/images/screenshots/storage_view_free-diskspace.png)

## Cleaning the database

The Home Assistant database can become very large. Follow these steps to reduce the size of the database.

1. To view the size of the current database, go to {% my system_health title="**Settings** > **System** > **Repairs**" %}.
   - Select the three dots {% icon "mdi:dots-vertical" %} menu and select **System information**.
   - Scroll down to the **Recorder**, and check the **Estimated database size (MiB)**.
2. [Purge the contents of the database](/integrations/recorder/#service-purge).
3. To slow down the growth of the database, [filter](/integrations/recorder/#configure-filter) what you send to
the database.
4. Change how long it stores the data, using the [`purge_keep_days` setting](/integrations/recorder/#purge_keep_days).

## Reducing space used for backups

### Deleting obsolete backups

Previous backups are not included when you create a new one. But they do take up space.

1. To delete old backups, follow the steps on [deleting obsolete backups](/common-tasks/general/#deleting-obsolete-backups).
2. Ideally, backups don't pile up on the system to begin with.
   - To define how long automatic backups should be kept on the system, follow the steps on [setting up an automatic backup process](/common-tasks/os/#setting-up-an-automatic-backup-process).

### Storing backups outside of Home Assistant

Storing backups outside of Home Assistant makes sure they don't use space on Home Assistant to begin with. It also makes sure you can [restore Home Assistant from backup](/common-tasks/general/#restoring-a-backup) in case you have an issue with your current installation. Follow the steps on [defining backup locations](/common-tasks/general/#defining-backup-locations).

## Uninstalling unused add-ons

Add-ons can take a lot of space, not just the add-on itself but also their data.

1. Go to {% my supervisor title="**Settings** > **Add-ons**" %}.
2. Look at your installed add-ons and identify the ones you no longer use.
3. To remove the add-on, select the add-on and select **Uninstall**.

## Expanding storage

If the above steps to free up space did not help, you need to expand your storage.

### Expanding storage: Home Assistant Operating System

When you are running {% term "Home Assistant Operating System" %}, you can use the following options to expand your storage:

- Replace your current storage medium, for example, the SD card, with a bigger one. Use a backup to [restore Home Assistant from backup](/common-tasks/general/#restoring-a-backup) on the new SD card.
- [Use an external data disk](/common-tasks/os/#using-external-data-disk)

### Expanding storage on VM

If you are running Home Assistant as a VM, look at the
documentation for your hypervisor on how to expand disks for virtual machines.
Home Assistant will auto-expand to use the newly added space.

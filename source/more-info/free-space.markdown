---
title: "Clear up storage"
description: "More information on how to clear up storage in Home Assistant."
---

Reaching your storage limit, this page will help you when that happens.

There are several things you can do to free up some space:

- [Clean the database](#clean-the-database)
- [Delete old snapshots](#delete-old-snapshots)
- [Uninstall unused add-ons](#uninstall-unused-add-ons)
- [Last resort](#last-resort)

## Clean the database

The Home Assistant database can get huge!

Luckily there is a tool you can use to [purge the contents of the database](/integrations/recorder/#service-purge)

You can [filter](/integrations/recorder/#configure-filter) what you send to
the database, and even change how long it stores the data
[with the `purge_keep_days` setting](/integrations/recorder/#purge_keep_days)

## Delete old snapshots

Open the Home Assistant UI and go to "Supervisor" in the sidebar, and then to
the "Snapshots" tab, here you will see all your snapshots, these can be
downloaded and placed somewhere safe. When you have done that, you can delete
them in the UI and it will free up some space for you.

## Uninstall unused add-ons

Add-ons can take a lot of space, not just the add-on itself but also their data.

Open the Home Assistant UI and go to "Supervisor" in the sidebar, you will be
on the "Dashboard" tab when you click on the "Supervisor", here you will see
all your installed add-ons, maybe you have some that you no longer use, if
you do those can be uninstalled to free up some space.

## Last resort

If all else fails, you need to expand your storage.

If you are running Home Assistant as a VM, look at the
documentation for your hypervisor on how to expand disks for virtual machines.
Home Assistant will auto-expand to use the newly added space.

If you are not running a VM, you need to replace your storage medium
(typically, this will be an SD card). You can use [snapshots](/hassio/haos_common_tasks/#home-assistant-os-snapshots) to quickly restore your Home Assistant
installation on a new storage medium.

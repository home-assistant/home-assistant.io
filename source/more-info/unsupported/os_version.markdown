---
title: "Home Assistant Operating System version"
description: "More information on why Home Assistant Operating System version marks the installation as unsupported."
---

## The issue

Supervisor considers Home Assistant Operating System older than the last 4 major
releases as unsupported. We generally recommend to always update to the latest
Home Assistant Operating System.

On an unsupported Home Assistant OS, Supervisor stops refreshing its update
information. This means you will no longer receive updates for any component,
including Home Assistant Core or Add-on updates.

## The solution

Since you've not updated your system in a while, we recommend to [create a backup](/common-tasks/general/#backups)
before updating your system. Make sure to download the backup or store it at
a remote location.

To resolve this issue, update your Home Assistant Operating System version. Go
to {% my updates title="**System** > **Updates**" %} to update the operating
system. If you don't see the update you may have skipped it in the past. To see
previously skipped updates, select the three dots {% icon "mdi:dots-vertical" %}
enabling skipped updates no new OS updates appear, you may need to use [the CLI to update to the latest OS version {{site.data.version_data.hassos['ova']}}](/common-tasks/os/#to-update-the-home-assistant-operating-system).

If your system is significantly out of date you may need to update multiple times
to get to the latest version.

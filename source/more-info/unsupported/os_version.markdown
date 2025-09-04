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

To resolve this issue, update your Home Assistant Operating System version. Go
to {% my updates title="**System** > **Updates**" %} to update the operating
system. If you don't see the update you may have skipped it in the past. To see
previously skipped updates, select the three dots {% icon "mdi:dots-vertical" %}
menu and select **Show skipped updates**.

If your system is significantly out of date you may need to update multiple times
to get to the latest version. The next one will appear in the UI after the prior
one is complete.

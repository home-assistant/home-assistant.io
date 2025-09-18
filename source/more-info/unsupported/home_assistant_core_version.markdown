---
title: "Home Assistant Core version"
description: "More information on why Home Assistant Core version marks the installation as unsupported."
---

## The issue

Supervisor considers Home Assistant Core older than two years as unsupported.
We generally recommend to always update to the latest Home Assistant Core, or
at least update within 6 months to the latest release to not miss out on
automatic migration of YAML integration (the migration code to migrate YAML
integration to regular config entry based integration is available for 6
months, today this is for 6 Home Assistant Core releases).

On installations using an unsupported Home Assistant Core release, the
Supervisor stops refreshing its update information. This means you will no
longer receive updates for any component, including Home Assistant Core or
Add-on updates.

## The solution

Since you've not updated your system in a while, we recommend to [create a backup](/common-tasks/general/#backups)
before updating your system. Make sure to download the backup or store it at
a remote location.

To resolve this issue, update your Home Assistant Core version. Go to
{% my updates title="**System** > **Updates**" %} to update Home Assistant Core.
If you don't see the update you may have skipped it in the past. To see
previously skipped updates, select the three dots {% icon "mdi:dots-vertical" %}
enabling skipped updates.

If you would like to take advantage of YAML integration migration, update 6
releases at a time (e.g. from Home Assistant Core 2024.2 to 2024.8). You can
use the HA CLI to update to a specific version.
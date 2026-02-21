---
title: "Home Assistant Core version"
description: "More information on why Home Assistant Core version marks the installation as unsupported."
---

## The issue

Supervisor considers Home Assistant Core versions older than 24 months (approximately 24 releases) as unsupported.
It is strongly recommend to keeping Home Assistant Core updated to the latest version.
At a minimum, update within 6 months (6 release cycles) to ensure you don't miss
automatic YAML integration migrations. Migration code that converts YAML-based
integrations to modern UI-based configuration is only available for 6 months
after deprecation, which corresponds to 6 Home Assistant Core releases.

On installations using an unsupported Home Assistant Core release, the
Supervisor stops refreshing its update information. This means you will no
longer receive updates for any component, including Home Assistant Core or
Add-on updates.

## The solution

1. Since you've not updated your system in a while, it is recommended to
   [create a backup](/common-tasks/general/#backups) before updating your system.
    - Make sure to download the backup or store it in a remote location.

2. Update your Home Assistant Core version.
    - Go to {% my updates title="**System** > **Updates**" %} to update Home Assistant Core.
    - If you don't see the update, you may have skipped it in the past. To see
      previously skipped updates, select the three dots {% icon "mdi:dots-vertical" %}
      and enable skipped updates.

    - If you're significantly behind and have YAML-based integrations that need
      migration, update in increments of no more than 6 releases at a time
      (for example, from Home Assistant Core 2024.2 to 2024.8, then to 2025.2).
      - This ensures automatic migrations can run properly during each update.
      - You can use the Home Assistant CLI to update to a [specific Home Assistant Core version](/common-tasks/os/#home-assistant-versions).

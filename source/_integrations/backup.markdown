---
title: Backup
description: System Health allow you to create backups on Core and Container installations.
ha_category:
  - Other
ha_release: 2022.3
ha_quality_scale: internal
ha_domain: backup
---

The Backup integration allow you to create and download backups for your Home Assistant Core and Home Assistant Container installation, this backup file can be used if you migrate to Home Assistant Operating System.

<div class="note">

If you use Home Assistant Operating System or Home Assistant Supervised, this integration is not for you, you already have [Backup functionaloty with the Supervisor](/common-tasks/os/#backups).

</div>

## Configuration

```yaml
# Example configuration.yaml entry
backup:
```

You need to restart Home Assistant after you add this configuration.
When it has started up again you will find a new "Backup" entry in the main menu (**Configuration** -> **Backup**).

The backup files are stored in a new "backups" directory in the root of your configuration directory.

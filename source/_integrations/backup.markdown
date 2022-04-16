---
title: Backup
description: Allow creating backups of container and core installations.
ha_category:
  - Other
ha_release: 2022.4
ha_quality_scale: internal
ha_domain: backup
ha_codeowners:
  - '@home-assistant/core'
ha_iot_class: Calculated
ha_integration_type: integration
---

The Backup integration allow you to create and download backups for your Home Assistant Core and Home Assistant Container installations. This backup file can be used if you migrate to Home Assistant Operating System.

<div class="note">

If you use Home Assistant Operating System or Home Assistant Supervised, [back up functionality is already built-in](/common-tasks/os/#backups).

</div>

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry
backup:
```

You need to restart Home Assistant after you add this configuration.
When it has started up again you will find a new "Backup" entry in the main menu (**Configuration** -> **Backup**).

The backup files are stored in a new "backups" subdirectory in the root of your configuration directory.

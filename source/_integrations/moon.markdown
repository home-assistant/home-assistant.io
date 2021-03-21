---
title: Moon
description: Instructions on how to integrate the moon sensor into Home Assistant.
ha_category:
  - Environment
ha_iot_class: Local Polling
ha_release: 0.38
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
ha_domain: moon
ha_platforms:
  - sensor
---

The `moon` integration tracks the phases of the moon.

## Configuration

To enable the moon sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: moon
```

This sensor will return one of the following values:
`new_moon`, `waxing_crescent`, `first_quarter`, `waxing_gibbous`, `full_moon`, `waning_gibbous`, `last_quarter` or `waning_crescent` .

<p class='img'>
<img src='/images/screenshots/more-info-dialog-moon.png' />
</p>

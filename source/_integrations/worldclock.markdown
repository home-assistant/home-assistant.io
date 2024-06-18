---
title: Worldclock
description: Instructions on how to integrate a Worldclock within Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Local Push
ha_release: pre 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
ha_domain: worldclock
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `worldclock` {% term integration %} simply displays the current time in a different time zone.

## Configuration

To enable this {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: worldclock
    time_zone: America/New_York
```

{% configuration %}
time_zone:
  description: The resource or endpoint that contains the value.
  required: true
  type: string
name:
  description: The name of the sensor, e.g., the city.
  required: false
  type: string
  default: Worldclock Sensor
time_format:
  description: The time format.
  required: false
  type: string
  default: "%H:%M"
{% endconfiguration %}

For valid time zones, check the **TZ** column in the [Wikipedia overview](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), or get the full list from the [pytz](https://pypi.python.org/pypi/pytz) module.

```shell
python3 -c "import pytz;print(pytz.all_timezones)"
```

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
---

The `worldclock` sensor platform simply displays the current time in a different time zone.

## Configuration

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

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

For valid time zones check the **TZ** column in the [Wikipedia overview](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Or get the full list from the [pytz](https://pypi.python.org/pypi/pytz) module.

```shell
python3 -c "import pytz;print(pytz.all_timezones)"
```

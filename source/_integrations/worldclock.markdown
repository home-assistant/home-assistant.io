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
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `worldclock` {% term integration %} simply displays the current time in a different time zone.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Timezone:
  description: Select a valid timezone from the list.
Name:
  description: The name of the sensor, e.g., the city.
Time format:
  description: The time format, defaults to "%H:%M" which represents hour and minute.
{% endconfiguration_basic %}

For valid time zones, check the **TZ** column in the [Wikipedia overview](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

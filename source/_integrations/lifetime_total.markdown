---
title: Lifetime Total
description: Instructions on how to integrate lifetime_total sensor into Home Assistant.
ha_category:
  - Helper
  - Sensor
  - Utility
ha_iot_class: Calculated
ha_release: 2023.4
ha_quality_scale: internal
ha_codeowners:
  - '@avee87'
ha_domain: lifetime_total
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: helper
---

Lifetime Total helper converts periodically resetting measurement (i.e., utility meter reading) into always-increasing total value.
For example, if your electricity meter goes from 0 to 10kWh every day, corresponding lifetime total will keep going up by 10kWh every day. This behavior is similar to how [total_increasing](https://developers.home-assistant.io/docs/core/entity/sensor#state-class-total_increasing) sensors are treated for long-term statistics.

If input sensor state is unavailable or unknown, it will be ignored until the next correct value.

{% include integrations/config_flow.md %}
{% configuration_basic %}
Name:
  description: The name the sensor should have. You can change it again later.
Input entity:
  description: The sensor to convert to lifetime total. Should ideally be an entity with `total_increasing` state type.
{% endconfiguration_basic %}

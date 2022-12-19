---
title: PurpleAir
description: Instructions on how to integrate PurpleAir sensors with Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2023.1
ha_codeowners:
  - '@bachya'
ha_domain: purpleair
ha_platforms:
  - sensor
ha_integration_type: device
ha_config_flow: true
---

[PurpleAir](https://www2.purpleair.com/) makes sensors that measure hyper-local air quality data and share it with the public.

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Add Sensor:
  description: Track an additional sensor.
Remove Sensor:
  description: Untrack a sensor.
{% endconfiguration_basic %}

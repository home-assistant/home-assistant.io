---
title: Uptime Kuma
description: Instructions on how to integrate Upttime Kuma monitors into Home Assistant.
ha_category:
  - Binary Sensor
ha_iot_class: Cloud Polling
ha_release: 2021.12
ha_domain: uptime_kuma
ha_config_flow: true
ha_codeowners:
  - '@meichthys'
ha_platforms:
  - binary_sensor
---

The Uptime Kuma integration exposes the Uptime Kuma `/metrics` endpoint information in Home Assistant.

![](/images/screenshots/uptime_kuma_sensor_history.png)

{% include integrations/config_flow.md %}

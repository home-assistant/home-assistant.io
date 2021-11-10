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

Uptime Kuma is a self-hosted monitoring tool like "[UptimeRobot](/integrations/uptimerobot)" that is used to monitor the status of almost any network-connected service.

For information about how to setup your own Uptime Kuma instance, visit the [GitHub page](https://github.com/louislam/uptime-kuma).

![](/images/screenshots/uptime_kuma_sensor_history.png)

{% include integrations/config_flow.md %}

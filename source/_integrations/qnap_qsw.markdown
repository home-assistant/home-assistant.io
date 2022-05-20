---
title: QNAP QSW
description: Instructions on how to integrate QNAP QSW within Home Assistant.
ha_release: 2022.5
ha_category:
  - Binary Sensor
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: qnap_qsw
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_codeowners:
  - '@Noltari'
ha_integration_type: integration
---

This integration interacts with the local API of [QNAP QSW managed switches](https://www.qnap.com/en/product/series/qsw-managed-switches).

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "Device URL (usually http://IP)"
Username:
  description: "Username (usually admin)"
Password:
  description: "Password"
{% endconfiguration_basic %}

## Binary Sensors

The following *binary sensors* are created:

| Condition           | Description                        |
| :------------------ | :--------------------------------- |
| anomaly             | Device anomaly.                    |

## Sensors

The following *sensors* are created:

| Condition           | Description                        |
| :------------------ | :--------------------------------- |
| fan_1_speed         | Fan 1 Speed.                       |
| fan_2_speed         | Fan 2 Speed.                       |
| temperature         | Switch temperature.                |
| uptime              | Uptime seconds.                    |

---
title: QNAP QSW
description: Instructions on how to integrate QNAP QSW switches within Home Assistant.
ha_release: 2021.11
ha_category:
  - Binary Sensor
  - Sensor
  - System Monitor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@noltari'
ha_domain: qnap_qsw
ha_platforms:
  - binary_sensor
  - sensor
---

This `qnap_qsw` integration allows getting various statistics from your [QNAP QSW switch](https://www.qnap.com/en-us/product/series/switches).

## Configuration

To add QNAP QSW integration go to **Configuration** >> **Integrations** and find the integration in the list.

{% configuration_basic %}
Host:
  description: "Host or IP address of the QNAP QSW switch"
Username:
  description: "Username of the QNAP QSW switch (usually `admin`)"
Password:
  description: "Password of the QNAP QSW switch"
{% endconfiguration_basic %}

The following binary sensors are created:

| Binary sensor       | Description                          |
| :------------------ | :----------------------------------- |
| condition_anomaly   | Indicates anomalies.                 |
| firmware_update     | Firmware update available.           |

The following sensors are created:

| Sensor                  | Description                          |
| :------------------     | :----------------------------------- |
| condition_message       | Anomaly message.                     |
| fan_1_speed             | Fan #1 speed (if present).           |
| fan_2_speed             | Fan #2 speed (if present).           |
| firmware_update_version | Firmware update version.             |
| mac_address             | MAC address.                         |
| maximum_temperature     | Maximum HW temperature.              |
| temperature             | Current HW temperature.              |
| uptime                  | Current HW uptime.                   |

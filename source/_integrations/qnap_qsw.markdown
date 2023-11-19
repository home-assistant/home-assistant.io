---
title: QNAP QSW
description: Instructions on how to integrate QNAP QSW within Home Assistant.
ha_release: 2022.5
ha_category:
  - Binary sensor
  - Button
  - Sensor
  - Update
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: qnap_qsw
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - sensor
  - update
ha_codeowners:
  - '@Noltari'
ha_integration_type: integration
ha_dhcp: true
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

## Binary sensors

The following *binary sensors* are created:

| Binary sensor       | Description                        |
| :------------------ | :--------------------------------- |
| anomaly             | Device anomaly.                    |

The following *binary sensors* are created for each port (or LACP):

| Binary sensor       | Description                        |
| :------------------ | :--------------------------------- |
| link                | Link status.                       |

## Buttons

The following *buttons* are created:

| Button              | Description                        |
| :------------------ | :--------------------------------- |
| reboot              | Reboot device.                     |

## Sensors

The following *sensors* are created:

| Sensors             | Description                        |
| :------------------ | :--------------------------------- |
| fan_1_speed         | Fan 1 Speed.                       |
| fan_2_speed         | Fan 2 Speed.                       |
| ports               | Number of used ports.              |
| rx                  | Total RX bytes.                    |
| rx_errors           | Total number of RX errors.         |
| rx_speed            | Total RX speed.                    |
| temperature         | Switch temperature.                |
| tx                  | Total TX bytes.                    |
| tx_speed            | Total TX speed.                    |
| uptime              | Uptime seconds.                    |

The following *sensors* are created for each port (or LACP):

| Sensors             | Description                        |
| :------------------ | :--------------------------------- |
| link_speed          | Link speed.                        |
| rx                  | RX bytes.                          |
| rx_errors           | Number of RX errors.               |
| rx_speed            | RX speed.                          |
| tx                  | TX bytes.                          |
| tx_speed            | TX speed.                          |

## Update

| Update              | Description                        |
| :------------------ | :--------------------------------- |
| firmware_update     | Firmware update status.            |

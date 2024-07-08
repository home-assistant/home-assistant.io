---
title: Lupus Electronics LUPUSEC
description: Instructions on integrating Lupusec home security with Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
  - Hub
  - Switch
ha_release: 0.83
ha_iot_class: Local Polling
ha_codeowners:
  - '@majuss'
  - '@suaveolent'
ha_domain: lupusec
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - switch
ha_integration_type: integration
ha_config_flow: true
---

The `lupusec` integration allows the user to integrate their Lupusec alarm control panel and ultimately all connected sensors and other devices. For more information about the LUPUS-Electronics security system please visit their [website](https://www.lupus-electronics.de).

Supported units:

- Lupusec XT1
- Lupusec XT2 Plus
- Lupusec XT3

The following devices are supported by the underlying `lupupy` Python library and integrated into Home Assistant.

- **Alarm control panel**: Displays the alarm status and controls arming, disarming and home modus.
- **Binary sensor**: Displays the status of binary sensors. Door, window, water, and smoke sensors are supported.
- **Switch**: Turn off and on your Lupus power switches.

{% include integrations/config_flow.md %}

---
title: IntelliFire
description: Instructions on the IntelliFire Fireplace integration for Home Assistant.
ha_category:
  - Binary Sensor
ha_iot_class: Local Polling
ha_release: 2022.2
ha_codeowners:
  - '@jeeftor'
ha_domain: intellifire
ha_config_flow: true
---

IntelliFire Wi-Fi fireplace modules provide app-based and Alexa control to various fireplaces. The modules do expose an unencrypted HTTP endpoint on the network that provides status information. This integration will read that URL and create a set of sensors displaying the current fireplace state.

{% include integrations/config_flow.md %}


### Sensor Types


The following sensors are available as either a **Binary Sensor** when dealing with on/off.

### Binary Sensors

- **Power Sensor**: Whether the fire is on.
- **Pilot Light Sensor**: Whether the pilot light is turned on.
- **Timer Sensor**: Whether the sleep timer is turned on.
- **Thermostat Sensor**: Whether the thermostat is turned on.

### Sensors

- **Flame Height**: Numerical indicator of flame height.
- **Temperature**: Current ambient temperature as read by the fireplace remote.
- **Target Temperature**: If the thermostat is engaged this is the target temperature the fireplace will try to reach, as measured by the remote.
- **Fan Speed**: Numerical indicator of fan speed.
- **Timer Time Remaining**: If the sleep timer is enabled, this is an indicator of how many minutes remain.

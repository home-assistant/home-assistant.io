---
title: IntelliFire
description: Instructions on the IntelliFire Fireplace integration for Home Assistant.
ha_category:
  - Binary Sensor
ha_iot_class: Local Polling
ha_release: 0.47
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

- `pilot_light`: Pilot light status.
- `fan_on`: Whether the fan is on/off.
- `timer_on`: Whether timer-mode is engaged.
- `thermostat_on`: Whether the thermostat is turned on.

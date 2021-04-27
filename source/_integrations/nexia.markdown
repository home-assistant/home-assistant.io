---
title: Nexia
description: Instructions on how to integrate Nexia Thermostats (Trane/American Standard) into Home Assistant.
ha_category:
  - Binary Sensor
  - Sensor
  - Climate
  - Scene
ha_release: 0.108
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
ha_domain: nexia
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - climate
  - scene
  - sensor
---

The `nexia` integration allows you to integrate your [Nexia](https://mynexia.com/) thermostats into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Climate](#climate)
- [Sensor](#sensor)
- [Scene](#scene)

{% include integrations/config_flow.md %}

### Binary Sensor

The following binary sensors are added for each thermostat:

- Blower Active

### Sensor

The following binary sensors are added for each thermostat:

- Air Cleaner Mode
- Current Compressor Speed
- Requested Compressor Speed
- Outdoor Temperature
- Relative Humidity
- System Status

The following binary sensors are added for each thermostat zone:

- Zone Temperature
- Zone Setpoint Status
- Zone Status

### Climate

The `nexia` climate platform lets you control a thermostat.

The following thermostats are supported: `XL1050`, `XL850`, `XL824`

The following thermostats are not supported: `XL624`

Other thermostats may work, but they have not been tested.

### Scene

The `nexia` scene platform lets you activate a nexia automation.

### Service `nexia.set_aircleaner_mode`

Sets the air cleaner mode. Options include 'auto', 'quick', and 
'allergy'. This setting will affect all zones on the same thermostat.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of climate devices to control.
| `aircleaner_mode` | no | 'auto', 'quick', or 'allergy'

### Service `nexia.set_humidify_setpoint`

Sets the humidify setpoint. This setting will affect all zones on the same thermostat.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of climate devices to control.
| `humidity` | no | Humidify setpoint level, from 35 to 65.

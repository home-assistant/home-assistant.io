---
title: Nexia/American Standard/Trane
description: Instructions on how to integrate Trane and American Standard thermostats into Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Scene
  - Sensor
  - Switch
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
  - diagnostics
  - number
  - scene
  - sensor
  - switch
ha_integration_type: integration
---

The `nexia` integration allows you to integrate your [Nexia](https://mynexia.com/) (Trane) thermostats or [American Standard](https://asairhome.com/) thermostats into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Climate](#climate)
- [Sensor](#sensor)
- [Scene](#scene)
- [Switch](#switch)

{% include integrations/config_flow.md %}

### Binary sensor

The following binary sensors are added for each thermostat:

- Blower Active

### Sensor

The following sensors are added for each thermostat:

- Air Cleaner Mode
- Current Compressor Speed
- Requested Compressor Speed
- Outdoor Temperature
- Relative Humidity
- System Status

The following sensors are added for each thermostat zone:

- Zone Temperature
- Zone Setpoint Status
- Zone Status

### Climate

The climate platform lets you control a thermostat.

The following Trane thermostats are supported: `XL1050`, `XL850`, `XL824`

The following American Standard thermostats have been reported to work: `AZONE1050`, `AZONE850`, `ACONT824`

The following thermostats are not supported: `XL624`, `XL950`, `AZONE950`, `AZEMT500`, `AZEMT400B`

Other thermostats may work, but they have not been tested.

### Number

The number platform lets you adjust the fan speed on systems with variable-speed fan support.

### Scene

The scene platform lets you activate a nexia automation.

### Switch

The switch platform lets you enable or disable hold mode for each thermostat.

### Action `nexia.set_aircleaner_mode`

Sets the air cleaner mode. Options include 'auto', 'quick', and 
'allergy'. This setting will affect all zones on the same thermostat.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of climate devices to control.
| `aircleaner_mode` | no | 'auto', 'quick', or 'allergy'

### Action `nexia.set_humidify_setpoint`

Sets the humidify setpoint. This setting will affect all zones on the same thermostat.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of climate devices to control.
| `humidity` | no | Humidify setpoint level, from 35 to 65.

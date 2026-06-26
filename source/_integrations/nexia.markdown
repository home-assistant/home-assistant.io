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
ha_integration_type: hub
---

The **Nexia/American Standard/Trane** {% term integration %} allows you to integrate your [Nexia](https://mynexia.com/) (Trane) thermostats or [American Standard](https://asairhome.com/) thermostats into Home Assistant.

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

The following sensors are added for each RoomIQ sensor (if the device supports
[RoomIQ](https://support.asairhome.com/hc/en-us/articles/360045784651-RoomIQ-Overview-and-Usage)).
These sensors are added when more than one RoomIQ sensor is present in a zone. When enabled, each nexia data refresh also fetches current RoomIQ sensor states, adding 5–40 seconds of latency and additional network traffic. To avoid silently doing so, these sensors are disabled by default. You enable them in their settings.

- temperature
- humidity
- battery level, if the RoomIQ sensor has a battery

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

The following enable/disable switches are added for each thermostat:

- Emergency heat (if the device supports it)

The following enable/disable switches are added for each thermostat zone:

- Hold mode

The following include/exclude {% term switch %} is added for each RoomIQ sensor (if the device supports
[RoomIQ](https://support.asairhome.com/hc/en-us/articles/360045784651-RoomIQ-Overview-and-Usage)).

- Include `YOUR_SENSOR_NAME` (with your sensor name)

These switches allow you to select which RoomIQ sensors to include in a zone's average temperature.
To change your selected sensors, set each switch to represent your choice.
Several seconds after the last such change, the selection is sent to the manufacturer's web service.
It usually takes 10–15 seconds to complete, depending on the web service.
At least one sensor must be selected.
If you exclude all sensors, the switches will revert to show the zone's settings.

{% include integrations/actions.md %}

---
title: WiZ
description: Instructions on setting up WiZ within Home Assistant.
ha_category:
  - Binary Sensor
  - Light
  - Switch
ha_iot_class: Local Push
ha_release: "2022.3"
ha_dhcp: true
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - "@sbidy"
ha_domain: wiz
ha_platforms:
  - binary_sensor
  - light
  - switch
---

The WiZ integration allows you to control your WiZ lights and smart sockets.

The integration can report the state of occupancy sensors that have been linked to a device.

{% include integrations/config_flow.md %}

### Occupancy Sensors

The occupancy sensors will only be added once a motion event is detected. Home Assistant can detect the sensors if they turn on at least one device when the room is occupied, and turn off at least one device when the room is not occupied. Sensors that are not linked to a device cannot be detected.

When a device is linked to an occupancy sensor, by default, the sensor will be disabled for 30 minutes after manual control.

Devices linked to the occupancy sensor that was last controlled manually will show an unknown at startup. The state will be known the next time the light is controlled by the sensor.

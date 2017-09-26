---
layout: page
title: "MQTT HVAC"
description: "Instructions how to integrate MQTT HVAC into Home Assistant."
date: 2017-07-31 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: heat-control.png
ha_category: Climate
ha_release: 0.55
ha_iot_class: "Local Polling"
---

The `mqtt` climate platform let you control your MQTT enabled HVAC devices.

The platform currently works in optimistic mode, which means it does not obtain states from MQTT topics, but it sends and remembers control commands.

It uses a sensor under the hood to obtain the current temperature.

```yaml
# Example configuration.yaml entry
climate:
  - platform: mqtt
    name: Study
    target_sensor: sensor.study_temperature
```

Configuration variables:

- **name** (*Required*): Name of MQTT HVAC.
- **target_sensor** (*Optional*): `entity_id` for a temperature sensor, target_sensor.state must be temperature.
- **current_temperature_topic** (*Optional*): The MQTT topic on which to listen for the current temperature
- **power_command_topic** (*Optional*): The MQTT topic to publish commands to change the power state. This is useful if your device has a separate power toggle in addition to mode.
- **mode_command_topic** (*Required*): The MQTT topic to publish commands to change the HVAC operation mode.
- **temperature_command_topic** (*Required*): The MQTT topic to publish commands to change the target temperature.
- **fan_mode_command_topic** (*Required*): The MQTT topic to publish commands to change the fan mode.
- **swing_mode_command_topic** (*Required*): he MQTT topic to publish commands to change the swing mode.
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is `0` and will also be used to publishing messages.
- **retain** (*Optional*): If the published message should have the retain flag on or not.
- **send_if_off** (*Optional*): Set to `false` to suppress sending of all MQTT messages when the current mode is `Off`. Defaults to `true`.
- **initial** (*Optional*): Set the initial target temperature. Defaults to 21 degrees.

**Note**: Event though `target_sensor` as well as `current_temperature_topic` are both technically optional, you need to specify at least one of both.

### {% linkable_title Example %}

A full configuration example looks like the one below.

```yaml
# Full example configuration.yaml entry
climate:
  - platform: mqtt
    name: Study
    target_sensor: sensor.study_temperature
    modes:
      - off
      - cool
      - fan_only
    swing_modes:
      - on
      - off
    fan_modes:
      - high
      - medium
      - low
    power_command_topic: "study/ac/power/set"
    mode_command_topic: "study/ac/mode/set"
    temperature_command_topic: "study/ac/temperature/set"
    fan_mode_command_topic: "study/ac/fan/set"
    swing_mode_command_topic: "study/ac/swing/set"
```

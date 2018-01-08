---
layout: page
title: "MQTT HVAC"
description: "Instructions how to integrate MQTT HVAC into Home Assistant."
date: 2017-07-31 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Climate
ha_release: 0.55
ha_iot_class: "Local Polling"
---

The `mqtt` climate platform lets you control your MQTT enabled HVAC devices.

The platform currently works in optimistic mode, which means it does not obtain states from MQTT topics, but it sends and remembers control commands.

It uses a sensor under the hood to obtain the current temperature.

```yaml
# Example configuration.yaml entry
climate:
  - platform: mqtt
    name: Study
    current_temperature_topic: /sensors/hvac_study/current_temp
    temperature_command_topic: /sensors/hvac_study/target_temp
```

Configuration variables *except* for MQTT topics:

- **name** (*Required*): Name of MQTT HVAC.
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is `0` and will also be used to publishing messages.
- **retain** (*Optional*): If the published message should have the retain flag on or not.
- **send_if_off** (*Optional*): Set to `false` to suppress sending of all MQTT messages when the current mode is `Off`. Defaults to `true`.
- **initial** (*Optional*): Set the initial target temperature. Defaults to 21 degrees.
- **payload_on** (*Optional*): For MQTT topics that control an `on` / `off` value (e.g., `aux_command_topic`), set the value that should be sent for `on`. Defaults to 'ON'.
- **payload_off** (*Optional*): For MQTT topics that control an `on` / `off` value (e.g., `aux_command_topic`), set the value that should be sent for `off`. Defaults to 'OFF'.

Configuration of the MQTT topics:

- **current_temperature_topic** (*Optional*): The MQTT topic on which to listen for the current temperature
- **power_command_topic** (*Optional*): The MQTT topic to publish commands to change the power state. This is useful if your device has a separate power toggle in addition to mode.
- **mode_command_topic** (*Optional*): The MQTT topic to publish commands to change the HVAC operation mode.
- **mode_state_topic** (*Optional*): The MQTT topic to subscribe for changes of the HVAC operation mode. If this is not set, the operation mode works in optimistic mode (see below).
- **temperature_command_topic** (*Optional*): The MQTT topic to publish commands to change the target temperature.
- **temperature_state_topic** (*Optional*): The MQTT topic to subscribe for changes in the target temperature. If this is not set, the target temperature works in optimistic mode (see below).
- **fan_mode_command_topic** (*Optional*): The MQTT topic to publish commands to change the fan mode.
- **fan_mode_state_topic** (*Optional*): The MQTT topic to subscribe for changes of the HVAC fan mode. If this is not set, the fan mode works in optimistic mode (see below).
- **swing_mode_command_topic** (*Optional*): The MQTT topic to publish commands to change the swing mode.
- **swing_mode_state_topic** (*Optional*): The MQTT topic to subscribe for changes of the HVAC swing mode. If this is not set, the swing mode works in optimistic mode (see below).
- **away_mode_command_topic** (*Optional*): The MQTT topic to publish commands to change the away mode.
- **away_mode_state_topic** (*Optional*): The MQTT topic to subscribe for changes of the HVAC away mode. If this is not set, the away mode works in optimistic mode (see below).
- **hold_command_topic** (*Optional*): The MQTT topic to publish commands to change the hold mode.
- **hold_state_topic** (*Optional*): The MQTT topic to subscribe for changes of the HVAC hold mode. If this is not set, the hold mode works in optimistic mode (see below).
- **aux_command_topic** (*Optional*): The MQTT topic to publish commands to switch auxiliary heat.
- **aux_state_topic** (*Optional*): The MQTT topic to subscribe for changes of the auxiliary heat mode. If this is not set, the auxiliary heat mode works in optimistic mode (see below).

#### Optimistic mode

If a property works in *optimistic mode* (when the corresponding state topic is not set), home assistant will assume that any state changes published to the command topics did work and change the internal state of the entity immediately after publishing to the command topic. If it does not work in optimistic mode, the internal state of the entity is only updated when the requested update is confirmed by the device through the state topic.

### {% linkable_title Example %}

A full configuration example looks like the one below.

```yaml
# Full example configuration.yaml entry
climate:
  - platform: mqtt
    name: Study
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

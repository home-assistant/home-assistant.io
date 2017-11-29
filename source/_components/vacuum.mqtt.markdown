---
layout: page
title: "MQTT Vacuum"
description: "Instructions how to integrate your MQTT enabled Vacuum within Home Assistant."
date: 2017-09-11 20:26
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Vacuum
ha_release: 0.54
---

The `mqtt` vacuum component allows you to control your MQTT-enabled vacuum.

To add your MQTT vacuum to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
vacuum:
  - platform: mqtt
    name: "MQTT Vacuum"
    supported_features:
      - turn_on
      - turn_off
      - pause
      - stop
      - return_home
      - battery
      - status
      - locate
      - clean_spot
      - fan_speed
      - send_command
    command_topic: "vacuum/command"
    battery_level_topic: "vacuum/state"
    battery_level_template: "{{ value_json.battery_level }}"
    charging_topic: "vacuum/state"
    charging_template: "{{ value_json.charging }}"
    cleaning_topic: "vacuum/state"
    cleaning_template: "{{ value_json.cleaning }}"
    docked_topic: "vacuum/state"
    docked_template: "{{ value_json.docked }}"
    fan_speed_topic: "vacuum/state"
    fan_speed_template: "{{ value_json.fan_speed }}"
    set_fan_speed_topic: "vacuum/set_fan_speed"
    fan_speed_list:
      - min
      - medium
      - high
      - max
    send_command_topic: 'vacuum/send_command'
```

Basic Configuration variables:

- **name** (*Optional*): The name of the vacuum. Defaults to `MQTT Vacuum`.
- **supported_features** (*Optional*): List of features that the vacuum supports (possible values are `turn_on`, `turn_off`, `pause`, `stop`, `return_home`, `battery`, `status`, `locate`, `clean_spot`, `fan_speed`, `send_command`). Defaults to `turn_on`, `turn_off`, `stop`, `return_home`, `status`, `battery`, `clean_spot`.
- **command_topic** (*Optional*): The MQTT topic to publish commands to control the vacuum.

Advanced Configuration variables:

- **qos** (*Optional*): The maximum QoS level of the state topic. Defaults to `0`. Will also be used when publishing messages.
- **retain** (*Optional*): If the published message should have the retain flag on or not. Defaults to `false`.
- **payload_turn_on** (*Optional*): The payload to send to the `command_topic` to begin the cleaning cycle. Defaults to `turn_on`.
- **payload_turn_off** (*Optional*): The payload to send to the `command_topic` to turn the vacuum off. Defaults to `turn_off`.
- **payload_return_to_base** (*Optional*): The payload to send to the `command_topic` to tell the vacuum to return to base. Defaults to `return_to_base`.
- **payload_stop** (*Optional*): The payload to send to the `command_topic` to stop the vacuum. Defaults to `stop`.
- **payload_clean_spot** (*Optional*): The payload to send to the `command_topic` to begin a spot cleaning cycle. Defaults to `clean_spot`.
- **payload_locate** (*Optional*): The payload to send to the `command_topic` to locate the vacuum (typically plays a song). Defaults to `locate`.
- **payload_start_pause** (*Optional*): The payload to send to the `command_topic` to start or pause the vacuum. Defaults to `start_pause`.
- **battery_level_topic** (*Optional*): The MQTT topic subscribed to receive battery level values from the vacuum.
- **battery_level_template** (*Optional*): Defines a [template](/topics/templating/) to define the battery level of the vacuum.
- **charging_topic** (*Optional*): The MQTT topic subscribed to receive charging state values from the vacuum.
- **charging_template** (*Optional*): Defines a [template](/topics/templating/) to define the charging state of the vacuum.
- **cleaning_topic** (*Optional*): The MQTT topic subscribed to receive cleaning state values from the vacuum.
- **cleaning_template** (*Optional*): Defines a [template](/topics/templating/) to define the cleaning state of the vacuum.
- **docked_topic** (*Optional*): The MQTT topic subscribed to receive docked state values from the vacuum.
- **docked_template** (*Optional*): Defines a [template](/topics/templating/) to define the docked state of the vacuum.
- **fan_speed_topic** (*Optional*): The MQTT topic subscribed to receive fan speed values from the vacuum.
- **fan_speed_template** (*Optional*): Defines a [template](/topics/templating/) to define the fan speed of the vacuum.
- **set_fan_speed_topic** (*Optional*): The MQTT topic to publish commands to control the vacuum's fan speed.
- **fan_speed_list** (*Optional*): List of possible fan speeds for the vacuum.
- **send_command_topic** (*Optional*): The MQTT topic to publish custom commands to the vacuum.

### {% linkable_title Default MQTT Protocol %}

The above configuration for this component expects an MQTT protocol like the following.

#### Basic Commands

MQTT topic: `vacuum/command`

Possible MQTT payloads:
- `turn_on` - Begin cleaning
- `turn_off` - Turn the Vacuum off
- `return_to_base` - Return to base/dock
- `stop` - Stop the Vacuum
- `clean_spot` - Initialize a spot cleaning cycle
- `locate` - Locate the vacuum (typically by playing a song)
- `start_pause` - Toggle the vacuum between cleaning and stopping

#### Set Fan Speed

MQTT topic: `vacuum/set_fan_speed`

Possible MQTT payloads:
- `min` - Minimum fan speed
- `medium` - Medium fan speed
- `high` - High fan speed
- `max` - Max fan speed

#### Send Custom Command

MQTT topic: `vacuum/send_command`

MQTT payload for `send_command` can be an arbitrary value handled by the vacuum's MQTT-enabled firmware.

#### Status/Sensor Updates

MQTT topic: `vacuum/state`

MQTT payload:
```json
{
    "battery_level": 61,
    "docked": true,
    "cleaning": false,
    "charging": true,
    "fan_speed": "off"
}
```

### {% linkable_title Retrofitting a non-wifi Roomba with an ESP8266 %}

- [This repo](https://github.com/johnboiles/esp-roomba-mqtt) has MQTT client firmware for retrofitting your old Roomba.

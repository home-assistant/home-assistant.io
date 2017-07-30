---
layout: page
title: "Manual Alarm Control Panel with MQTT Support"
description: "Instructions how to integrate manual alarms into Home Assistant with MQTT support."
date: 2017-07-02 9:10
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Alarm
ha_release: 0.50
---

This platform extends the [manual alarm](/components/alarm_control_panel.manual/) by adding support for MQTT control of the alarm by a remote device. It can be used to create external keypads which simply change the state of the manual alarm in Home Assistant.

It's essentially the opposite of the [MQTT Alarm Panel](/components/alarm_control_panel.mqtt/) which allows Home Assistant to observe an existing, fully-featured alarm where all of the alarm logic is embedded in that physical device.

The component will accept the following commands from your Alarm Panel via the `command_topic`:

- `DISARM`
- `ARM_HOME`
- `ARM_AWAY`

When the state of the manual alarm changes, Home Assistant will publish one of the following states to the `state_topic`:

- 'disarmed'
- 'armed_home'
- 'armed_away'
- 'pending'
- 'triggered'

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: manual_mqtt
    state_topic: home/alarm
    command_topic: home/alarm/set
```

Configuration variables:

All configuration variables from the base manual alarm platform are available:

- **name** (*Optional*): The name of the alarm. Default is "HA Alarm".
- **code** (*Optional*): If defined, specifies a code to enable or disable the alarm in the frontend. This code is not required for MQTT interactions.
- **pending_time** (*Optional*): The time in seconds of the pending time before arming the alarm. Default is 60 seconds.
- **trigger_time** (*Optional*): The time in seconds of the trigger time in which the alarm is firing. Default is 120 seconds.
- **disarm_after_trigger** (*Optional*): If true, the alarm will automatically disarm after it has been triggered instead of returning to the previous state.

Additionally, the following MQTT configuration variables are also available:

- **state_topic** (*Required*): The MQTT topic HA will publish state updates to.
- **command_topic** (*Required*): The MQTT topic HA will subscribe to to receive commands from a remote device to change the alarm state.
- **qos** (*Optional*): The maximum QoS level for subscribing and publishing to MQTT messages. Default is 0.
- **payload_disarm** (*Optional*): The payload to disarm this Alarm Panel. Default is "DISARM".
- **payload_arm_home** (*Optional*): The payload to set armed-home mode on this Alarm Panel. Default is "ARM_HOME".
- **payload_arm_away** (*Optional*): The payload to set armed-away mode on this Alarm Panel. Default is "ARM_AWAY".

## {% linkable_title Examples %}

Refer to the [Manual Alarm Control page](/components/alarm_control_panel.manual/#examples) for some real life examples of how to use this panel.

## {% linkable_title MQTT Control %}

The state of this alarm can be controlled using [MQTT](/components/mqtt/). Ensure you've configured that before adding this component.

To change the state of the alarm, publish one of the following messages to the `command_topic`:

 - `DISARM`
 - `ARM_HOME`
 - `ARM_AWAY`

To receive state updates from HA, subscribe to the `state_topic`. Home Assistant will publish a new message whenever the state changes:

 - `disarmed`
 - `armed_home`
 - `armed_away`
 - `pending`
 - `triggered`

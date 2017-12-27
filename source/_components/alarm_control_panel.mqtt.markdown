---
layout: page
title: "MQTT Alarm Control Panel"
description: "Instructions how to integrate MQTT capable Alarm Panels into Home Assistant."
date: 2015-09-14 19:10
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Alarm
ha_release: 0.7.4
ha_iot_class: depends
requirement: hardware
---

The `mqtt` alarm panel platform enables the possibility to control MQTT capable alarm panels. The Alarm icon will change state after receiving a new state from `state_topic`. If these messages are published with *RETAIN* flag, the MQTT alarm panel will receive an instant state update after subscription and will start with the correct state. Otherwise, the initial state will be `unknown`.

The component will accept the following states from your Alarm Panel (in lower case):

- 'disarmed'
- 'armed_home'
- 'armed_away'
- 'pending'
- 'triggered'

The component can control your Alarm Panel by publishing to the `command_topic` when a user interacts with the Home Assistant frontend.

To enable this platform, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: mqtt
    state_topic: "home/alarm"
    command_topic: "home/alarm/set"
```

Configuration variables:

- **state_topic** (*Required*): The MQTT topic subscribed to receive state updates.
- **command_topic** (*Required*): The MQTT topic to publish commands to change the alarm state.
- **name** (*Optional*): The name of the alarm. Default is 'MQTT Alarm'.
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is 0. This QoS will also be used to publishing messages.
- **payload_disarm** (*Optional*): The payload to disarm your Alarm Panel. Default is "DISARM".
- **payload_arm_home** (*Optional*): The payload to set armed-home mode on your Alarm Panel. Default is "ARM_HOME".
- **payload_arm_away** (*Optional*): The payload to set armed-away mode on your Alarm Panel. Default is "ARM_AWAY".
- **code** (*Optional*): If defined, specifies a code to enable or disable the alarm in the frontend.


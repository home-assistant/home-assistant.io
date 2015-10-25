---
layout: page
title: "MQTT alarm support"
description: "Instructions how to integrate MQTT alarms into Home Assistant."
date: 2015-09-14 19:10
sidebar: false
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: "Alarm Control Panel"
---

<img src='/images/supported_brands/mqtt.png' class='brand pull-right' />
This platform enables the possibility to control an MQTT alarm. The alarm will only change state after
receiving the a new state from `state_topic`. If these messages are published with RETAIN flag, the MQTT
alarm will receive an instant state update after subscription and will start with correct state. Otherwise,
the initial state will be `unknown`.

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  platform: mqtt
  state_topic: "home/alarm"
  command_topic: "home/alarm/set"
  name: "MQTT Alarm"
  qos: 0
  payload_disarm: "DISARM"
  payload_arm_home: "ARM_HOME"
  payload_arm_away: "ARM_AWAY"
  code: "mySecretCode"
```

Configuration variables:

- **state_topic** (*Required*): The MQTT topic subscribed to receive state updates.
- **command_topic** (*Required*): The MQTT topic to publish commands to change the alarm state.

- **name** (*Optional*): The name of the alarm. Default is 'MQTT Alarm'.
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is 0. This QoS will also be used to publishing messages.
- **payload_disarm** (*Optional*): The payload do disarm alarm. Default is "DISARM".
- **payload_arm_home** (*Optional*): The payload to set armed-home mode. Default is "ARM_HOME".
- **payload_arm_away** (*Optional*): The payload to set armed-away mode. Default is "ARM_AWAY".
- **code** (*Optional*): If defined, specifies a code to enable or disable the alarm in the frontend.


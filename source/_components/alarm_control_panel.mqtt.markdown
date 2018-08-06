---
layout: page
title: "MQTT Alarm Control Panel"
description: "Instructions on how to integrate MQTT capable Alarm Panels into Home Assistant."
date: 2015-09-14 19:10
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Alarm
ha_release: 0.7.4
ha_iot_class: depends
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

{% configuration %}
name:
  description: The name of the alarm.
  required: false
  type: string
  default: MQTT Alarm
state_topic:
  description: The MQTT topic subscribed to receive state updates.
  required: true
  type: string
command_topic:
  description: The MQTT topic to publish commands to change the alarm state.
  required: true
  type: string
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
payload_disarm:
  description: The payload to disarm your Alarm Panel.
  required: false
  type: string
  default: DISARM
payload_arm_home:
  description: The payload to set armed-home mode on your Alarm Panel.
  required: false
  type: string
  default: ARM_HOME
payload_arm_away:
  description: The payload to set armed-away mode on your Alarm Panel.
  required: false
  type: string
  default: ARM_AWAY
code:
  description: If defined, specifies a code to enable or disable the alarm in the frontend.
  required: false
  type: string
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates.
  required: false
  type: string
payload_available:
  description: The payload that represents the available state.
  required: false
  type: string
  default: online
payload_not_available:
  description: The payload that represents the unavailable state.
  required: false
  type: string
  default: offline
{% endconfiguration %}

---
layout: page
title: "MQTT Template Switch"
description: "Instructions on how to integrate MQTT Template switches into Home Assistant."
date: 2018-04-09 23:38
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Switch
ha_release: 0.68
ha_iot_class: depends
---

The `mqtt_template` switch platform lets you control your MQTT enabled switches.

This platform is similar to the [switch.mqtt](/components/switch.mqtt) platform, only it allows the usage of a template as the on/off payload.

To enable this switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
switch:
  - platform: mqtt_template
    command_topic: "home/bedroom/switch1/set"
    payload_on_template: "on"
    payload_off_template: "off"
```

{% configuration %}
name:
  description: The name to use when displaying this switch.
  required: false
  type: string
  default: MQTT Switch
icon:
  description: Icon for the switch (e.g. `mdi:radiator`).
  required: false
  type: string
state_topic:
  description: The MQTT topic subscribed to receive state updates.
  required: false
  type: string
command_topic:
  description: The MQTT topic to publish commands to change the switch state.
  required: false
  type: string
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates.
  required: false
  type: string
payload_on_template:
  description: "The [template](/docs/configuration/templating/#processing-incoming-data) for on state changes."
  required: true
  type: string
payload_off_template:
  description: "The [template](/docs/configuration/templating/#processing-incoming-data) for off state changes."
  required: true
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
optimistic:
  description: Flag that defines if switch works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if no `state_topic` defined, else `false`."
qos:
  description: The maximum QoS level of the state topic. Default is 0 and will also be used to publishing messages.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload."
  required: false
  type: string
{% endconfiguration %}

<p class='note warning'>
Make sure that your topic matches exactly. `some-topic/` and `some-topic` are different topics.
</p>

## {% linkable_title Examples %}

In this section, you will find some real-life examples of how to use this sensor.

### {% linkable_title Full configuration %}

The example below shows a full configuration for a switch.

```yaml
# Example configuration.yml entry
switch:
  - platform: mqtt_template
    name: "Garden Valve 1 Switch"
    state_topic: "home/garden/valve1"
    command_topic: "home/garden/valve1/set"
    availability_topic: "home/garden/valve1/available"
    payload_on: "on,{{ states.sensor.valve1_duration }}"
    payload_off: "off"
    optimistic: false
    qos: 0
    retain: true
```

---
layout: page
title: "mochad"
description: "Instructions on how to integrate mochad into Home Assistant."
date: 2016-10-20 17:09
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Hub
ha_release: 0.32
---

The `mochad` component integrates all X10 platforms being controlled by [mochad](https://sourceforge.net/projects/mochad/). Besides this component, you will have to set up your X10 devices separately. From 0.85 version, Home Assistant has added support for X10 sensors. X10 messages are received by the mochad service and published to MQTT topics. Automations can be created using events in the MQTT component of Home Assistant. You need to have a properly configured MQTT broker to receive and publish events from X10 sensors.

## {% linkable_title Configuration %}

To integrate your Mochad units with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mochad:
```

{% configuration %}
host:
  description: The host that mochad is running on.
  required: false
  type: string
  default: localhost
port:
  description: The port that mochad is running on.
  required: false
  type: integer
  default: 1099
{% endconfiguration %}

## {% linkable_title Example %}

A full configuration sample could look like the one below:

```yaml
# Example configuration.yaml entry
mochad:
  host: localhost
  port: 1099
```

## {% linkable_title Events %}

There are a number of events that can be triggered from mochad X10 sensors. Starting with simple
motion detectors and window/door sensors, to remote controls and buttons. Run home-assisstant in a debug mode or without a confugured mqtt broker. All events received by mochad controller will be logged. For example:

```
2018-11-29 21:23:44 DEBUG (Thread-25) [pymochad_mqtt.controller] Publish X10/button/F8 : on to mqtt
2018-11-29 21:23:44 DEBUG (Thread-25) [pymochad_mqtt.controller] Publish X10/button/B8 : off to mqtt
2018-11-29 21:23:52 DEBUG (Thread-25) [pymochad_mqtt.controller] Publish X10/security/010500 : normal to mqtt
2018-11-29 21:25:48 DEBUG (Thread-25) [pymochad_mqtt.controller] Publish X10/security/D70E81 : normal to mqtt
2018-11-29 21:28:25 DEBUG (Thread-25) [pymochad_mqtt.controller] Publish X10/button/M3 : on to mqtt
2018-11-29 21:28:25 DEBUG (Thread-25) [pymochad_mqtt.controller] Publish X10/button/M3 : off to mqtt

```

Once sensor IDs are identified, sensor events can be configured and used in automation.

```yaml
# Example of sensor.yaml entries
sensor:
 - platform: mqtt
   state_topic: "X10/security/F7F310"
   name: "Bedroom Door"
   value_template: '{{ value_json.event_state }}'
   payload_on: "alert"
   payload_off: "normal"
 - platform: mqtt
   state_topic: "X10/button/C3"
   name: "C3 Remote Keychain"
   value_template: '{{ value_json.func }}'
   payload_on: "on"
   payload_off: "off"
```
```yaml
# Example of automation.yaml entries
automation:
- alias: "Increment event counter"
  trigger:
    - platform: state
      entity_id: sensor.bedroom_door
      to: 'alert'
    - platform: state
      entity_id: sensor.c3_remote_keychain
      to: 'on'
  action:
    - service: input_number.set_value
      data_template:
        entity_id: input_number.event_counter
        value: '{{ (states.input_number.event_counter.state | int) + 1 }}'
```

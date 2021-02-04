---
title: "MQTT Scene"
description: "Instructions on how to integrate MQTT scenes into Home Assistant."
ha_category:
  - Scene
ha_release: 2020.12
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` scene platform lets you control your MQTT enabled scenes.

## Configuration

To enable a MQTT scene in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
scene:
  - platform: mqtt
    command_topic: zigbee2mqtt/living_room_group/set
```

{% configuration %}
availability:
  description: A list of MQTT topics subscribed to receive availability (online/offline) updates. Must not be used together with `availability_topic`.
  required: false
  type: list
  keys:
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
    topic:
      description: An MQTT topic subscribed to receive availability (online/offline) updates.
      required: true
      type: string
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
command_topic:
  description: The MQTT topic to publish commands to change the switch state.
  required: false
  type: string
icon:
  description: Icon for the switch.
  required: false
  type: icon
name:
  description: The name to use when displaying this switch.
  required: false
  type: string
  default: MQTT Switch
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
payload_on:
  description: The payload that represents `on` state. If specified, will be used for both comparing to the value in the `state_topic` (see `value_template` and `state_on`  for details) and sending as `on` command to the `command_topic`.
  required: false
  type: string
  default: "ON"
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
unique_id:
  description: An ID that uniquely identifies this switch device. If two switches have the same unique ID, Home Assistant will raise an exception.
  required: false
  type: string
{% endconfiguration %}

<div class='note warning'>

Make sure that your topic matches exactly. `some-topic/` and `some-topic` are different topics.

</div>

## Examples

In this section, you will find some real-life examples of how to use this sensor.

### Full configuration

The example below shows a full configuration for a switch.

```yaml
# Example configuration.yaml entry
switch:
  - platform: mqtt
    unique_id: living_room_party_scene
    name: "Living Room Party Scene"
    command_topic: "home/living_room/party_scene/set"
    availability:
      - topic: "home/living_room/party_scene/available"
    payload_on: "ON"
    qos: 0
    retain: true
```

### Use with a JSON Payload

The example below shows a configuration using a JSON payload.

```yaml
# Example configuration.yaml entry
scene:
  - platform: mqtt
    name: Living Room Blue Scene
    unique_id: living_room_blue_scene
    command_topic: "home/living_room/set"
    payload_on: '{"activate_scene": "Blue Scene"}'
```

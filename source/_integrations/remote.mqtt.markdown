---
title: "MQTT Remote"
description: "Instructions on how to setup MQTT remotes intoHome Assistant."
logo: mqtt.png
ha_category:
  - Remote
ha_release: 0.101
ha_iot_class: Configurable
---

The `mqtt` remote platform lets you control your MQTT enabled remotes.

## Configuring the Platform

To add a MQTT Remote to your installation, add the following to your configuration.yaml file:
```yaml
remote:
  - platform: mqtt
    name: "mqtt-remote"
    command_topic: "/LivingRoom/ir/send"
```

{% configuration %}
name:
  description: The name of your remote.
  required: false
  type: string
payload_on:
  description: The payload that represents on state.
  required: false
  type: string
  default: ON
payload_on:
  description: The payload that represents off state.
  required: false
  type: string
  default: OFF
optimistic:
  description: Flag that defines if remote works in optimistic mode.
  required: false
  type: string
  default:  false
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
commands:
  description: A list of commands
  required: false
  type: map
  keys:
    command:
      description: A list of commands as strings.
      required: true
      type: list

{% endconfiguration %}

## Examples

In this section you find some real-life examples of how to use this remote.

### Full Configuration

```yaml
remote:
  - platform: mqtt
    name: "mqtt-remote"
    optimistic: true
    command_topic: "/LivingRoom/ir/send"
    payload_on: "ON"
    payload_off: "OFF"
    commands:
      vol_up:
        command: "volume_up"
      vol_down:
        command: "volume_down"
```

### `remote.turn_on`

Allows sending `on` command defined by payload_on.

### `remote.turn_off`

Allows sending `off` command defined by payload_off.

### `remote.send_command`

Allows sending named commands using an identifier defined in the configuration.

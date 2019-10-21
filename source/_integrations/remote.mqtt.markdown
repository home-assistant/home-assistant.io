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

## Full Configuration

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

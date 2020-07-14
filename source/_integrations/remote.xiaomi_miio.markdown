---
title: "Xiaomi IR Remote"
description: "Instructions for how to integrate the Xiaomi IR Remote within Home Assistant."
ha_category:
  - Remote
ha_release: 0.63
ha_iot_class: Local Polling
ha_domain: xiaomi_miio
---

The `xiaomi miio` remote platform allows you to send IR commands from your Xiaomi IR Remote (ChuangmiIr).

## Setup

Please follow the instructions on [Retrieving the Access Token](/integrations/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token to use in the `configuration.yaml` file.

## Configuring the Platform

To add a Xiaomi IR Remote to your installation, add the following to your `configuration.yaml` file:
```yaml
remote:
  - platform: xiaomi_miio
    host: 192.168.42.42
    token: YOUR_TOKEN
```

{% configuration %}
host:
  description: The IP of your remote.
  required: true
  type: string
token:
  description: The API token of your remote.
  required: true
  type: string
name:
  description: The name of your remote.
  required: false
  type: string
slot:
  description: The slot used to save learned command.
  required: false
  type: integer
  default: 1
timeout:
  description: Timeout for learning a new command.
  required: false
  type: integer
  default: 30
commands:
  description: A list of commands
  required: false
  type: map
  keys:
    command:
      description: A list of commands as [raw (learned command)](/integrations/remote.xiaomi_miio/#raw) or [pronto hex code](/integrations/remote.xiaomi_miio/#pronto-hex-code).
      required: true
      type: list

{% endconfiguration %}

## Full Configuration

```yaml
remote:
  - platform: xiaomi_miio
    name: "bathroom remote"
    host: 192.168.42.42
    token: YOUR_TOKEN
    slot: 1
    timeout: 30
    commands:
      activate_towel_heater:
        command:
          - raw:base64:[optional_frequency]
      read_bad_poem:
        command:
          - raw:base64:[optional_frequency]
          - pronto:pronto_hex:[optional_repeat]
```

## Add command as entity button in Lovelace UI

```yaml
type: entity-button
tap_action:
  action: call-service
  service: remote.send_command
  service_data:
    command: activate_towel_heater
    entity_id: remote.xiaomi_miio_ir
hold_action:
  action: more-info
show_icon: true
show_name: true
entity: remote.xiaomi_miio_ir
icon: 'mdi:radiator'
name: Activate Towel Heater
```

## Use named commands to create UI buttons

```yaml
script:
  towel_heater:
    sequence:
      - service: remote.send_command
        entity_id: 'remote.bathroom_remote'
        data:
          command:
            - 'activate_towel_heater'
  please_cover_your_ears:
    sequence:
      - service: remote.send_command
        entity_id: 'remote.bathroom_remote'
        data:
          command:
            - 'read_bad_poem'
```

## Command Types

The Xiaomi IR Remote Platform currently supports two different formats for IR codes.

### Raw

A raw command is a command learned from [`xiaomi_miio.remote_learn_command`](/integrations/remote.xiaomi_miio/#xiaomi_miioremote_learn_command).

A raw command is defined as in the following example:

```bash
raw:Z6UFANEAAAAjAQAAAwkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQIAE=
```

with an optional last parameter of frequency:

```bash
raw:Z6UFANEAAAAjAQAAAwkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQIAE=:38400
```

### Pronto Hex Code

A pronto hex code is a hex code often supplied by the device manufacturer.

A pronto hex code is defined as in the following example:

```bash
pronto:0000 006C 0022 0002 015B 00AD 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0623 015B 0057 0016 0E6E
```

with an optional last parameter of repeats (required by some devices):

```bash
pronto:0000 006C 0022 0002 015B 00AD 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0623 015B 0057 0016 0E6E:2
```

Note there are at least 4 versions of the Xiaomi IR Remote (ChuangmiIr) which can be recognized by their default hostname:

* `chuangmi.ir.v2`
* `chuangmi.remote.h102a03`
* `chuangmi.remote.v2`
* `chuangmi.remote.h102c01`

For now, pronto hex codes only work on the first version (`chuangmi.ir.v2`).

## Platform Services

The Xiaomi IR Remote Platform registers four services.

### `remote.send_command`

Allows sending either named commands using an identifier or sending commands as one of the two types defined in [Command Types](/integrations/remote.xiaomi_miio/#command-types).

### `xiaomi_miio.remote_learn_command`

Used to learn new commands.

Use the entity_id of the Xiaomi IR Remote to start a learning process.

`slot` and `timeout` can be specified, but multiple commands learned to the same slot can still be sent using [`remote.send_command`](/integrations/remote.xiaomi_miio/#remotesend_command) even if they are overwritten.

After learning the command the base64 string can be found as a notification in Overview, the string can be copied by left clicking on the string and choose the copy option.

### `xiaomi_miio.remote_set_led_on`

Used to turn remote's blue LED on.

### `xiaomi_miio.remote_set_led_off`

Used to turn remote's blue LED off.

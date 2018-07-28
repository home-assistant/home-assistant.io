---
layout: page
title: "Xiaomi IR Remote"
description: "Instructions for how to integrate the Xiaomi IR Remote within Home Assistant."
date: 2017-01-25 17:08
sidebar: true
comments: false
sharing: true
footer: true
logo: xiaomi.png
ha_category: Remote
ha_release: 0.63
ha_iot_class: "Local Polling"
---

The `xiaomi miio` remote platform allows you to send IR commands from your Xiaomi IR Remote (ChuangmiIr).

Please follow the instructions on [Retrieving the Access Token](/components/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token to use in the `configuration.yaml` file.

## {% linkable_title Configuring the Platform %}

To add a Xiaomi IR Remote to your installation, add the following to your configuration.yaml file:
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
  type: int
  default: 1
timeout:
  description: Timeout for learning a new command.
  required: false
  type: int
  default: 30
hidden:
  description: Hide the entity from UI. There is currently no reason to show the entity in UI as turning it off or on does nothing.
  required: false
  type: boolean
  default: true
commands:
  required: false
  type: map
  keys:
    command:
      description: A list of commands as [raw (learned command)](/components/remote.xiaomi_miio/#raw) or [pronto hex code](/components/remote.xiaomi_miio/#pronto-hex-code).
      required: true
      type: list

{% endconfiguration %}

## {% linkable_title Full Configuration %}

```yaml
remote:
  - platform: xiaomi_miio
    name: "bathroom remote"
    host: 192.168.42.42
    token: YOUR_TOKEN
    slot: 1
    timeout: 30
    hidden: false
    commands:
      activate_towel_heater:
        command:
          - raw:base64:[optional_frequency]
      read_bad_poem:
        command:
          - raw:base64:[optional_frequency]
          - pronto:pronto_hex:[optional_repeat]
```

## {% linkable_title Use named commands to create UI buttons %}

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

## {% linkable_title Command Types %}

The Xiaomi IR Remote Platform currently supports two different formats for IR codes.

### {% linkable_title Raw %}

A raw command is a command learned from [`remote.xiaomi_miio_learn_command`](/components/remote.xiaomi_miio/#remotexiaomi_miio_learn_command).

A raw command is defined as in the following example:
`raw:Z6UFANEAAAAjAQAAAwkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQIAE=`
with an optional last parameter of frequency:
`raw:Z6UFANEAAAAjAQAAAwkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQIAE=:38400`

### {% linkable_title Pronto Hex Code %}

A pronto hex code is a hex code often supplied by the device manufacturer.

A pronto hex code is defined as in the following example:
`pronto:0000 006C 0022 0002 015B 00AD 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0623 015B 0057 0016 0E6E`
with an optional last parameter of repeats (required by some devices):
`pronto:0000 006C 0022 0002 015B 00AD 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0623 015B 0057 0016 0E6E:2`

## {% linkable_title Platform Services %}

The Xiaomi IR Remote Platform registers two services.

### {% linkable_title `remote.send_command` %}

Allows sending either named commands using an identifier or sending commands as one of the two types defined in [Command Types](/components/remote.xiaomi_miio/#command-types).

### {% linkable_title `remote.xiaomi_miio_learn_command` %}

Used to learn new commands.

Use the entity_id of the Xiaomi IR Remote to start a learning process.

`slot` and `timeout` can be specified, but multiple commands learned to the same slot can still be sent using [`remote.send_command`](/components/remote.xiaomi_miio/#remotesend_command) even if they are overwritten.

After learning the command the base64 string can be found as a notification in Overview, the string can be copied by left clicking on the string and choose the copy option.

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
ha_release: 0.62
ha_iot_class: "Local Polling"
---

The `xiaomi miio` remote platform allows you to send IR commands from your Xiaomi IR Remote (ChuangmiIr).

Please follow the instructions on [Retrieving the Access Token](/components/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token to use in the `configuration.yaml` file.

## {% linkable_title Configuring the Platform %}

To add a Xiaomi IR Remote to your installation, add the following to your configuration.yaml file:
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
          - base64 encoded string learned from remote
      read_bad_poem:
        command:
          - base64 encoded string learned from remote
          - base64 encoded string learned from remote
```

Configuration variables:
- **host** (*Required*): The IP of your remote.
- **token** (*Required*): The API token of your remote.
- **name** (*Optional*): The name of your remote.
- **slot** (*Optional*): The slot used to save learned command. (Default: 1)
- **timeout** (*Optional*): Timeout for learning new command. (Default: 10)
- **hidden** (*Optional*): Hide the entity from UI. There is currently no reason to show the entity in UI as turning it off or on does nothing. (Default: True)
- **commands** (*Optional*): Commands callable by name.
  - **identifier** (*Required*): Name of the command switch as slug. Multiple entries are possible.
    - **command** (*Required*): The base64 encoded command to send as a list. (At least 1 required, multiple possible.)


You can then create an actual UI button in this way:
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

## {% linkable_title Platform Services %}

The Xiaomi IR Remote Platform registers two services.

### {% linkable_title `remote.send_command` %}

Allows to send either named commands using identifer or sending commands as base64 encoded strings.

### {% linkable_title `remote.xiaomi_miio_learn_command` %}

Used to learn new commands.

Use the entity_id of the Xiaomi IR Remote to start a learning process.

`slot` and `timeout` can be specified, but multiple commands learned to the same slot can still be sent using [`remote.send_command`](/components/remote.xiaomi_miio/#remote.send_command) even if they are overwritten.

After learning the command the base64 string can be found as a notification in Overview, the string can be copied by left clicking on the string and choosing the copy option.

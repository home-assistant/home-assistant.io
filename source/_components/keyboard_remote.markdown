---
layout: page
title: "Keyboard"
description: "Instructions how to use a keyboard to remote control Home Assistant."
date: 2016-09-28 14:39
sidebar: true
comments: false
sharing: true
footer: true
logo: keyboard.png
ha_category: Other
ha_release: 0.29
ha_iot_class: "Local Push"
---

Receive signals from a keyboard and use it as a remote control.

This component allows you to use a keyboard as remote control. It will fire `keyboard_remote_command_received` events which can then be used in automation rules. 

The `evdev` package is used to interface with the keyboard and thus this is Linux only. It also means you can't use your normal keyboard for this because `evdev` will block it.


```yaml
# Example configuration.yaml entry
keyboard_remote:
  device_descriptor: '/dev/input/by-id/foo'
  type: 'key_up'
```

Configuration variables:

- **device_descriptor** (*Required*): List of URLS for your feeds.
- **type** (*Required*): Possible values are `key_up`, `key_down`, and `key_hold`. Be careful, `key_hold` will fire a lot of events.

And an automation rule to breathe life into it:

```yaml
automation:
  alias: Keyboard all lights on
  trigger:
    platform: event
    event_type: keyboard_remote_command_received
    event_data:
      key_code: 107 # inspect log to obtain desired keycode
  action:
    service: light.turn_on
    entity_id: light.all
```

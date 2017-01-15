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
  device_descriptor: '/dev/input/event12'
  type: 'key_up'
```

Configuration variables:

- **device_descriptor** (*Required*): Path to the local event input device file that corresponds to the keyboard.
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

This component manages disconnections and re-connections of the keyboard, for example in the case of a bluetooth device that turns off automatically to preserve battery.

If the keyboard disconnects, the component will fire an event `keyboard_remote_disconnected`.
When the keyboard reconnects an event `keyboard_remote_connected` will be fired.

Here's an automation example that plays a sound through a media player whenever the keyboard connects/disconnects:
```yaml
automation:
  - alias: Keyboard Connected
    trigger:
      platform: event
      event_type: keyboard_remote_connected
    action:
      - service: media_player.play_media
        data:
          entity_id: media_player.speaker
          media_content_id: keyboard_connected.wav
          media_content_type: music
  - alias: Keyboard Disconnected
    trigger:
      platform: event
      event_type: keyboard_remote_disconnected
    action:
      - service: media_player.play_media
        data:
          entity_id: media_player.speaker
          media_content_id: keyboard_disconnected.wav
          media_content_type: music
```


There might be permissions problems with the event input device file. If this is the case, the user that hass runs as must be allowed read and write permissions with:
```
sudo setfacl -m u:HASS_USER:rw /dev/input/event*
```
where `HASS_USER` is the user hass runs as and `event*` is the event input device file your keyboard is connected to.

If you want to make this permanent, you can use a udev rule that sets it for your event input device. Add a file `/etc/udev/rules.d/99-userdev-input.rules` containing:
```
KERNEL=="event*", SUBSYSTEM=="input", RUN+="/usr/bin/setfacl -m u:HASS_USER:rw $env{DEVNAME}"
```

You can check the ACLs permission with
```
getfacl /dev/input/event*
```

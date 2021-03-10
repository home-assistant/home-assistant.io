---
title: Apple TV
description: Instructions on how to integrate Apple TV devices into Home Assistant.
ha_category:
  - Multimedia
  - Media Player
  - Remote
ha_iot_class: Local Push
ha_release: 0.49
ha_domain: apple_tv
ha_codeowners:
  - '@postlund'
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - remote
---

The Apple TV integration allows you to control an Apple TV (any generation).

There is currently support for the following entities within the Apple TV device:

- [Media Player](#media_player)
- [Remote](#remote)

{% include integrations/config_flow.md %}
## Media Player

The Apple TV media player platform will create a Media Player entity for each
Apple TV discovered on your network.
This entity will display the active app and playback controls.

## Remote

The Apple TV remote platform will automatically create a Remote entity for each Apple TV
configured on to your Home Assistant instance.
These entities allow you to turn the device on/off and to send control commands.

The following commands are currently available:

- `wakeup`
- `home`
- `home_hold`
- `top_menu`
- `menu`
- `select`
- `up`
- `down`
- `left`
- `right`
- `volume_up`
- `volume_down`

**NOTE:** Not all commands are supported by all Apple TV versions

### Service `send_command`

| Service data<br>attribute | Optional | Description  |
| ------------------------- | -------- | ------------ |
| `entity_id`               | no       | `entity_id` of the Apple TV |
| `command`                 | no       | Command, or list of commands to be sent |
| `num_repeats`             | yes      | Number of times to repeat the commands |
| `delay_secs`              | yes      | Interval in seconds between one send and another <br> This is a `float` value e.g. 1, 1.2 etc. |

**Examples**

Create a script to invoke the Netflix application based on the application icon
being in a fixed place on the home screen:

```yaml
lounge_appletv_netflix:
  alias: "Select Netflix"
  sequence:
    - service: remote.send_command
      target:
        entity_id: remote.lounge_appletv
      data:
        delay_secs: 1.5
        command:
          - top_menu
          - home
          - right
          - select
```

Script using the `home_hold` command to send your Apple TV to sleep and turn off
the Media Player:

```yaml
apple_tv_sleep:
  alias: "Make the Apple TV sleep"
  sequence:
    - service: remote.send_command
      target:
        entity_id: remote.lounge_appletv
      data:
        delay_secs: 1
        command:
          - home_hold
          - select
    - service: media_player.turn_off
      target:
        entity_id: media_player.lounge_appletv
```

Send 3 `left` commands with delay between each:

```yaml
service: remote.send_command
target:
  entity_id: remote.apple_tv
data:
  num_repeats: 3
  delay_secs: 2.5
  command:
    - left
```

## FAQ

### My Apple TV does not turn on/off when I press on/off in the frontend

That is correct; it only toggles the power state in Home Assistant. See the
example above to use the `home_hold` command. This can be used on Apple TVs
running tvOS 14.0 or later.

### Is it possible to see if a device is on without interacting with it

No

### When adding a new device, a PIN code is requested, but none is shown on the screen

This can happen when pairing the AirPlay protocol in case the access settings are wrong. On your
Apple TV, navigate to Settings, find the AirPlay menu and make sure that the access setting
is set to "Everyone on the same network" and try again.

### The buttons (play, pause, etc.) do not work

The tvOS apps themselves decide what commands they support and when they support
them. Likely, the app you are using does not support the action you are trying
to perform. Before writing an issue about this, verify if the same action is possible with the
Remote app in iOS. If that is the case, please write a bug in
[pyatv](https://github.com/postlund/pyatv/issues/new?assignees=&labels=bug&template=bug_report.md&title=)
and include logs (see Debugging below).

### I'm trying to play a stream via AirPlay, but it doesn't work

The Apple TV is quite picky when it comes to which formats it plays. The best bet is MP4. If it doesn't
work, it's likely because of the media format.

## Debugging

If you have any problems and intend to write an issue, make sure you have the
relevant logs included. For this integration, you can enable them like this:

```yaml
logger:
  logs:
    pyatv: debug
    homeassistant.components.apple_tv: debug
```

By providing logs directly when creating the issue, you will likely get help
much faster.

---
title: Apple TV
description: Instructions on how to integrate Apple TV devices into Home Assistant.
ha_category:
  - Media player
  - Multimedia
  - Remote
ha_iot_class: Local Push
ha_release: 0.49
ha_domain: apple_tv
ha_codeowners:
  - '@postlund'
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - media_player
  - remote
ha_integration_type: integration
---

The Apple TV integration allows you to control an Apple TV (any generation).

There is currently support for the following entities within the Apple TV device:

- [Media Player](#media-player)
- [Remote](#remote)

{% include integrations/config_flow.md %}

## Media player

The Apple TV media player platform will create a Media Player entity for each
Apple TV discovered on your network.
This entity will display the active app and playback controls.

### Launching apps

You can launch apps using the `media_player.select_source` action, or using the
“Apps” folder in the media browser.

Using the `media_player.play_media` action, you can also use `Deep Links` to
launch specific content in applications.

Examples of some `Deep Links` for popular applications:

| App       | URL                                                                   |
| --------- | --------------------------------------------------------------------- |
| YouTube   | youtube://www.youtube.com/watch?v=dQw4w9WgXcQ                         |
| Netflix   | https://www.netflix.com/title/80234304                                |
| Disney+   | https://www.disneyplus.com/series/the-beatles-get-back/7DcWEeWVqrkE   |
| Apple TV+ | https://tv.apple.com/show/severance/umc.cmc.1srk2goyh2q2zdxcx605w8vtx |

The simplest way to find useful `Deep Links` is to use the “Share” feature in iOS
or macOS versions of the App. Share sheets will often have a “Copy” or
“Copy link” feature. For apps that have a web-accessible version, links copied
from the browser usually work too. Such links may not work if a developer
maintains separate iOS and tvOS apps. More methods of discovering links
supported by apps can be found in the
[pyatv documentation](https://pyatv.dev/development/apps/#app-deep-links).

Examples:

```yaml
# Open the Netflix app at a specific title
action: media_player.play_media
data:
  media_content_type: url
  media_content_id: https://www.netflix.com/title/80234304
target:
  entity_id: media_player.living_room_apple_tv
```

```yaml
# Open a specific YouTube video:
action: media_player.play_media
data:
  media_content_type: url
  media_content_id: youtube://www.youtube.com/watch?v=dQw4w9WgXcQ
target:
  entity_id: media_player.living_room_apple_tv
```

## Remote

The Apple TV remote platform will automatically create a Remote entity for each Apple TV
configured on your Home Assistant instance.
These entities allow you to turn the device on/off and to send control commands.

The following commands are currently available:

- `wakeup`
- `suspend`
- `home`
- `top_menu`
- `menu`
- `select`
- `play`
- `pause`
- `up`
- `down`
- `left`
- `right`
- `volume_up`
- `volume_down`
- `previous`
- `next`
- `skip_backward`
- `skip_forward`

**NOTE:** Not all commands are supported by all Apple TV versions.

### Action `send_command`

| Service data<br>attribute | Optional | Description                                                                                                                   |
| ------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`               | no       | `entity_id` of the Apple TV                                                                                                   |
| `command`                 | no       | Command, or list of commands to be sent                                                                                       |
| `num_repeats`             | yes      | Number of times to repeat the commands                                                                                        |
| `delay_secs`              | yes      | Interval in seconds between one send and another <br> This is a `float` value e.g. 1, 1.2 etc.                                |
| `hold_secs`               | yes      | Number of seconds to hold the button. <br> This is a `float` value but please use 0 for not hold and 1 for holding the button |

### Examples

Create a script to invoke the Netflix application based on the application icon
being in a fixed place on the home screen:

```yaml
lounge_appletv_netflix:
  alias: "Select Netflix"
  sequence:
    - action: remote.send_command
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

Script using the quick action menu to send your Apple TV to sleep and turn off
the Media Player:

```yaml
apple_tv_sleep:
  alias: "Make the Apple TV sleep"
  sequence:
    - action: remote.send_command
      target:
        entity_id: remote.lounge_appletv
      data:
        hold_secs: 1
        delay_secs: 1
        command:
          - home
    - action: remote.send_command
      target:
        entity_id: remote.lounge_appletv
      data:
        delay_secs: 1
        command:
          - select
    - action: media_player.turn_off
      target:
        entity_id: media_player.lounge_appletv
```

Send 3 `left` commands with delay between each:

```yaml
action: remote.send_command
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
example above to use the quick action menu. This can be used on Apple TVs
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
[pyatv](https://github.com/postlund/pyatv/issues/new?assignees=&labels=bug&template=bug_report.yml)
and include logs (see Debugging below).

### Setting volume doesn't work on my Apple TV

Volume control functionality depends on how the Apple TV is set up. 
All volume controls should work if the Apple TV is connected to a 
HomePod or HomePod stereo pair. If the Apple TV is connected to 
TV speakers and with volume control
over HDMI CEC (Settings -> Remotes and Devices -> Volume Control) only volume
up/down controls will work. If volume control is over IR then volume cannot be
controlled remotely through the Apple TV, but you can integrate your
TV or soundbar directly.

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

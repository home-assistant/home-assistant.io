---
title: Android TV Remote
description: Instructions on how to integrate Android TV Remote into Home Assistant.
ha_category:
  - Media Player
  - Remote
ha_release: 2023.5
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@tronikos'
  - '@Drafteed'
ha_quality_scale: platinum
ha_domain: androidtv_remote
ha_zeroconf: true
ha_platforms:
  - diagnostics
  - media_player
  - remote
ha_integration_type: device
---

The Android TV Remote integration allows you to control an Android TV and launching apps. For this to work the Android TV device needs to have [Android TV Remote Service](https://play.google.com/store/apps/details?id=com.google.android.tv.remote.service) which is pre-installed on most devices.

{% include integrations/config_flow.md %}

## Media player

This integration adds a `media_player` with basic playback and volume controls. The media player provides volume information and display name of current active app on the Android TV. Due to API limitations, the integration will not display the playback status. It is recommended to use this integration together with [Google Cast integration](https://www.home-assistant.io/integrations/cast/). Two media players can be combined into one using the [Universal Media Player](https://www.home-assistant.io/integrations/universal/) integration.

Using the `media_player.play_media` service, you can launch applications via `Deep Links` and switch channels.

### Launching apps

You can pass any URL to the device to open it in the built-in browser. Using `Deep Links` you can launch some applications.

Examples of some `Deep Links` for popular applications:

| App | URL |
| --- | --- |
| YouTube | https://www.youtube.com
| Netflix | https://www.netflix.com/title
| Prime Video | https://app.primevideo.com
| Disney+ | https://www.disneyplus.com

Examples:

```yaml
# Launch the Netflix app
service: media_player.play_media
data:
  media_content_type: url
  media_content_id: https://www.netflix.com/title
target:
  entity_id: media_player.living_room_tv
```

```yaml
# Open a specific YouTube video:
service: media_player.play_media
data:
  media_content_type: url
  media_content_id: https://www.youtube.com/watch?v=dQw4w9WgXcQ
target:
  entity_id: media_player.living_room_tv
```

### Switch channels

You can pass the channel number to switch the channel. The channel number must be an integer.

Example:

```yaml
# Change channel to number 15:
service: media_player.play_media
data:
  media_content_type: channel
  media_content_id: 15
target:
  entity_id: media_player.living_room_tv
```

## Remote

The remote allows you to send key commands to your Android TV device with the `remote.send_command` service.
The entity has the `current_activity` attribute that shows the current foreground app on the Android TV.

{% details "List of the most common commands" %}

Navigation:
- DPAD_UP
- DPAD_DOWN
- DPAD_LEFT
- DPAD_RIGHT
- DPAD_CENTER
- BUTTON_A
- BUTTON_B
- BUTTON_X
- BUTTON_Y

Volume Control:
- VOLUME_DOWN
- VOLUME_UP
- VOLUME_MUTE
- MUTE

Media Control:
- MEDIA_PLAY_PAUSE
- MEDIA_PLAY
- MEDIA_PAUSE
- MEDIA_NEXT
- MEDIA_PREVIOUS
- MEDIA_STOP
- MEDIA_RECORD
- MEDIA_REWIND
- MEDIA_FAST_FORWARD

TV Control:
- 0
- 1
- 2
- 3
- 4
- 5
- 6
- 7
- 8
- 9
- DEL
- ENTER
- CHANNEL_UP
- CHANNEL_DOWN
- F1
- F2
- F3
- F4
- F5
- F6
- F7
- F8
- F9
- F10
- F11
- F12
- TV
- PROG_RED
- PROG_GREEN
- PROG_YELLOW
- PROG_BLUE

Other:
- BUTTON_MODE
- EXPLORER
- MENU
- INFO
- GUIDE
- TV_TELETEXT
- CAPTIONS
- DVR
- MEDIA_AUDIO_TRACK
- SETTINGS
- SEARCH
- ASSIST

{% enddetails %}

For a full list see [here](https://github.com/tronikos/androidtvremote2/blob/main/src/androidtvremote2/remotemessage.proto#L90).

If `activity` is specified in `remote.turn_on` it will open the specified URL in the associated app. See [Launching apps section](#launching-apps).

Examples of service calls:

```yaml
# Open the currently selected item on the Android TV
service: remote.send_command
data:
  command: DPAD_CENTER
target:
  entity_id: remote.living_room_tv
```

```yaml
# Long press on the currently selected item on the Android TV
service: remote.send_command
data:
  command: DPAD_CENTER
  hold_secs: 0.5
target:
  entity_id: remote.living_room_tv
```

```yaml
# Launch YouTube
service: remote.turn_on
data:
  activity: https://www.youtube.com
target:
  entity_id: remote.living_room_tv
```

```yaml
# Open a specific YouTube video:
service: remote.turn_on
data:
  activity: https://www.youtube.com/watch?v=dQw4w9WgXcQ
target:
  entity_id: remote.living_room_tv
```

### Dashboard example

You have to manually create buttons in Lovelace to send commands to the Android TV device or launch apps on it.

Below is an example for you to start with. Many of the buttons support long press.

![Screenshot Android TV Remote example](/images/integrations/androidtv_remote/lovelace_example.png)

{% details "Lovelace example" %}

Replace all instances of `living_room_tv` with your entity ID.

```yaml
type: vertical-stack
cards:
  - type: entities
    entities:
      - entity: remote.living_room_tv
  - square: true
    columns: 3
    type: grid
    cards:
      - type: button
        show_icon: false
        tap_action:
          action: none
        hold_action:
          action: none
      - type: button
        icon: mdi:arrow-up-bold
        tap_action:
          action: call-service
          service: remote.send_command
          data:
            command: DPAD_UP
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: button
        show_icon: false
        tap_action:
          action: none
        hold_action:
          action: none
      - type: button
        icon: mdi:arrow-left-bold
        tap_action:
          action: call-service
          service: remote.send_command
          data:
            command: DPAD_LEFT
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: button
        icon: mdi:circle
        tap_action:
          action: call-service
          service: remote.send_command
          data:
            command: DPAD_CENTER
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: call-service
          service: remote.send_command
          data:
            command: DPAD_CENTER
            hold_secs: 0.5
          target:
            entity_id: remote.living_room_tv
      - type: button
        icon: mdi:arrow-right-bold
        tap_action:
          action: call-service
          service: remote.send_command
          data:
            command: DPAD_RIGHT
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: button
        icon: mdi:arrow-left
        tap_action:
          action: call-service
          service: remote.send_command
          data:
            command: BACK
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: call-service
          service: remote.send_command
          data:
            command: BACK
            hold_secs: 0.5
          target:
            entity_id: remote.living_room_tv
      - type: button
        icon: mdi:arrow-down-bold
        tap_action:
          action: call-service
          service: remote.send_command
          data:
            command: DPAD_DOWN
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: button
        icon: mdi:home-outline
        tap_action:
          action: call-service
          service: remote.send_command
          data:
            command: HOME
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: call-service
          service: remote.send_command
          data:
            command: HOME
            hold_secs: 0.5
          target:
            entity_id: remote.living_room_tv
  - square: false
    columns: 3
    type: grid
    cards:
      - type: button
        icon: mdi:skip-previous
        tap_action:
          action: call-service
          service: remote.send_command
          data:
            command: MEDIA_PREVIOUS
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: call-service
          service: remote.send_command
          data:
            command: MEDIA_REWIND
          target:
            entity_id: remote.living_room_tv
      - type: button
        icon: mdi:play-pause
        tap_action:
          action: call-service
          service: remote.send_command
          data:
            command: MEDIA_PLAY_PAUSE
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: call-service
          service: remote.send_command
          data:
            command: MEDIA_STOP
          target:
            entity_id: remote.living_room_tv
      - type: button
        icon: mdi:skip-next
        tap_action:
          action: call-service
          service: remote.send_command
          data:
            command: MEDIA_NEXT
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: call-service
          service: remote.send_command
          data:
            command: MEDIA_FAST_FORWARD
          target:
            entity_id: remote.living_room_tv
      - type: button
        icon: mdi:volume-off
        tap_action:
          action: call-service
          service: remote.send_command
          data:
            command: MUTE
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: button
        icon: mdi:volume-medium
        tap_action:
          action: call-service
          service: remote.send_command
          data:
            command: VOLUME_DOWN
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: button
        icon: mdi:volume-high
        tap_action:
          action: call-service
          service: remote.send_command
          data:
            command: VOLUME_UP
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
  - square: false
    columns: 4
    type: grid
    cards:
      - type: button
        icon: mdi:youtube
        tap_action:
          action: call-service
          service: remote.turn_on
          data:
            activity: https://www.youtube.com
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: button
        icon: mdi:netflix
        tap_action:
          action: call-service
          service: remote.turn_on
          data:
            activity: https://www.netflix.com/title
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: picture
        image: >-
          https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Amazon_Prime_Video_logo.svg/450px-Amazon_Prime_Video_logo.svg.png
        tap_action:
          action: call-service
          service: remote.turn_on
          data:
            activity: https://app.primevideo.com
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: picture
        image: >-
          https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/440px-Disney%2B_logo.svg.png
        tap_action:
          action: call-service
          service: remote.turn_on
          data:
            activity: https://www.disneyplus.com
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
  - type: entity
    entity: remote.living_room_tv
    attribute: current_activity
  - type: media-control
    entity: media_player.living_room_tv
```

{% enddetails %}

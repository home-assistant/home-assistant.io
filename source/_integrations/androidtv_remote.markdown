---
title: Android TV Remote
description: Instructions on how to integrate Android TV remotes into Home Assistant.
ha_category:
  - Remote
ha_release: 2023.5
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@tronikos'
ha_quality_scale: platinum
ha_domain: androidtv_remote
ha_zeroconf: true
ha_platforms:
  - diagnostics
  - remote
ha_integration_type: device
---

The Android TV Remote integration allows you to control an Android TV device by sending [commands](https://github.com/tronikos/androidtvremote2/blob/main/TvKeys.txt) and launching apps. For this to work the Android TV device needs to have [Android TV Remote Service](https://play.google.com/store/apps/details?id=com.google.android.tv.remote.service) which is pre-installed on most devices.

{% include integrations/config_flow.md %}

## Entity

This integration adds a `remote` entity which turns on/off the Android TV device.
The entity has the `current_activity` attribute that shows the current foreground app on the Android TV.

## Services

You can use the `remote.turn_off`, `remote.turn_on`, `remote.toggle`,  and `remote.send_command` services from the [remote](/integrations/remote/) platform.

### Service `remote.turn_off`

Turn off the Android TV.

Example:

```yaml
# Turn off Living Room TV
service: remote.turn_off
target:
  entity_id: remote.living_room_tv
```

### Service `remote.turn_on`

Turn on the Android TV. If `activity` is specified it will open the specified URL in the associated app.

Examples:

```yaml
# Turn on Living Room TV
service: remote.turn_on
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

Examples of URLs to pass as activity for some popular apps:

| App | URL |
| --- | --- |
| YouTube | https://www.youtube.com
| Netflix | https://www.netflix.com/title
| Prime Video | https://app.primevideo.com
| Disney+ | https://www.disneyplus.com


### Service `remote.send_command`

Send a single command or a set of commands to the Android TV.
You can optionally specify the number of times you wish to repeat the command(s), delay you want between repeated command(s), and hold.

For a list of the most common commands you can send to the Android TV see: [TvKeys](https://github.com/tronikos/androidtvremote2/blob/main/TvKeys.txt).
For a full list see [here](https://github.com/tronikos/androidtvremote2/blob/main/src/androidtvremote2/remotemessage.proto#L90).

Examples:

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

## Dashboard

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

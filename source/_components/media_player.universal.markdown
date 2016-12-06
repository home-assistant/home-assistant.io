---
layout: page
title: "Universal"
description: "Instructions how to create a universal media player in Home Assistant."
date: 2016-01-12 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Media Player
featured: false
---

Universal Media Players combine multiple existing entities in Home Assistant into one media player entity. This is used for creating a single entity that controls an entire media center.

Multiple Media Player entities can be controlled from a Universal Media Player. Additionally, the Universal Media Player allows volume and power commands to be re-routed to other entities in Home Assistant. This allows the power and volume to control external devices like a television or audio receiver.

A Universal Media Player is created in `configuration.yaml` as follows.

```yaml
# Example configuration.yaml entry
media_player:
  - platform: universal
    name: MEDIA_PLAYER_NAME
    children:
      - media_player.CHILD_1_ID
      - media_player.CHILD_2_ID
    commands:
      turn_on:
        service: SERVICE
        data: SERVICE_DATA
      turn_off:
        service: SERVICE
        data: SERVICE_DATA
      volume_up:
        service: SERVICE
        data: SERVICE_DATA
      volume_down:
        service: SERVICE
        data: SERVICE_DATA
      volume_mute:
        service: SERVICE
        data: SERVICE_DATA
    attributes:
      is_volume_muted: ENTITY_ID|ATTRIBUTE
      state: ENTITY_ID|ATTRIBUTE
```

Configuration variables:

- **name** (*Required*): The name to assign the player
- **children** (*Required*): Ordered list of child media players this entity will control
- **commands** (*Optional*): Commands to be overwritten. Possible entries are *turn_on*, *turn_off*, *select_source*, *volume_set*, *volume_up*, *volume_down*, and *volume_mute*.
- **attributes** (*Optional*): Attributes that can be overwritten. Possible entries are *is_volume_muted*, *state*, *source*, *source_list, and *volume_level*. The values should be an entity id and state attribute separated by a bar (\|). If the entity id's state should be used, then only the entity id should be provided.

The universal media player will primarily imitate one of its *children*. The first child in the list that is active (not idle/off) will be controlled the universal media player. The universal media player will also inherit its state from the first active child. Entities in the *children* list must be media players.

It is recommended that the command *turn_on*, the command *turn_off*, and the attribute *state* all be provided together. The *state* attribute indicates if the Media Player is on or off. If *state* indicates the media player is off, this status will take precedent over the states of the children. If all the children are idle/off and *state* is on, the universal media player's state will be on.

It is also recommended that the command *volume_up*, the command *volume_down*, the command *volume_mute*, and the attribute *is_volume_muted* all be provided together. The attribute *is_volume_muted* should return either True or the on state when the volume is muted. The *volume_mute* service should toggle the mute setting.

When providing *select_source* as a command, it is recomended to also provide the attributes *source*, and *source_list*. The *source* attribute is the currently select source, while the *source_list* attribute is a list of all available sources.

Below is an example configuration.

```yaml
media_player:
  platform: universal
  name: Test Universal
  children:
    - media_player.living_room_cast
    - media_player.living_room_kodi
  commands:
    turn_on:
      service: switch.turn_on
      data:
        entity_id: switch.living_room_tv
    turn_off:
      service: switch.turn_off
      data:
        entity_id: switch.living_room_tv
    volume_up:
      service: switch.turn_on
      data:
        entity_id: switch.living_room_volume_up
    volume_down:
      service: switch.turn_on
      data:
        entity_id: switch.living_room_volume_down
    volume_mute:
      service: switch.turn_on
      data:
        entity_id: switch.living_room_mute
    select_source:
      service: media_player.select_source
      data_template:
        entity_id: media_player.receiver
        source: '{{ source }}'
    volume_set:
      service: media_player.volume_set
      data_template:
        entity_id: media_player.receiver
        volume_level: '{{ volume_level }}'

  attributes:
    state: switch.living_room_tv
    is_volume_muted: switch.living_room_mute
    volume_level: media_player.receiver|volume_level
    source: media_player.receiver|source
    source_list: media_player.receiver|source_list

```

In this example, a switch is available to control the power of the television. Switches are also available to turn the volume up, turn the volume down, and mute the audio. These could be command line switches or any other entity in Home Assistant. The *turn_on* and *turn_off* commands will be redirected to the television and the volume commands will be redirected to an audio receiver. The *select_source* command will be passed directly to an A/V receiver.

The children are a Chromecast and a Kodi player. If the Chromecast is playing, the Universal Media Player will reflect its status. If the Chromecast is idle and Kodi is playing, the Universal Media player will change to reflect its status.

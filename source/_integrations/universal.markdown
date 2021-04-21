---
title: Universal Media Player
description: Instructions on how to create a universal media player in Home Assistant.
ha_category:
  - Media Player
ha_iot_class: Calculated
ha_release: 0.11
ha_quality_scale: internal
ha_domain: universal
---

Universal Media Players combine multiple existing entities in Home Assistant into one media player entity. This is used for creating a single entity that controls an entire media center.

Multiple media player entities can be controlled from an universal media player. Additionally, the universal media player allows volume and power commands to be re-routed to other entities in Home Assistant. This allows the power and volume to control external devices like a television or audio receiver.

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
      media_play:
        service: SERVICE
        data: SERVICE_DATA
      media_pause:
        service: SERVICE
        data: SERVICE_DATA       
      media_previous_track:
        service: SERVICE
        data: SERVICE_DATA
      media_next_track:
        service: SERVICE
        data: SERVICE_DATA 
    attributes:
      is_volume_muted: ENTITY_ID|ATTRIBUTE
      state: ENTITY_ID|ATTRIBUTE
    device_class: tv
```

{% configuration %}
name:
  description: The name to assign the player.
  required: true
  type: string
children:
  description: Ordered list of child media players this entity will control.
  required: false
  type: list
state_template:
  description: "A [template](/topics/templating/) can be specified to render the state of the media player. This way, the state could depend on entities different from media players, like switches or input booleans."
  required: false
  type: template
commands:
  description: "Commands to be overwritten. Almost all media player service commands can be overwritten. Example entries are `turn_on`, `turn_off`, `select_source`, `volume_set`, `volume_up`, `volume_down`, `volume_mute`, `media_play`, `media_pause`, `media_stop`, `media_previous_track`, `media_next_track` and `play_media` (refer to the [`media_player` documentation](/integrations/media_player/) to see the full list)."
  required: false
  type: string
attributes:
  description: "Attributes that can be overwritten. Most, if not all, media player attributes can be overwritten. Example entries are `is_volume_muted`, `state`, `source`, `source_list` and `volume_level`. The values should be an entity ID and state attribute separated by a pipe character (|). If the entity ID's state should be used, then only the entity id should be provided."
  required: false
  type: string
device_class:
  description: The device class that this entity represents. Can be `tv`, `speaker`, or `receiver`.
  required: false
  type: string
{% endconfiguration %}

The Universal Media Player will primarily imitate one of its `children`. The Universal Media Player will control the first child on the list that is active (not idle/off). The Universal Media Player will also inherit its state from the first active child if a `state_template` is not provided. Entities in the `children:` list must be media players, but the state template can contain any entity.

It is recommended that the command `turn_on`, the command `turn_off`, and the attribute `state` all be provided together. The `state` attribute indicates if the media player is on or off. If `state` indicates the media player is off, this status will take precedence over the states of the children. If all the children are idle/off and `state` is on, the Universal Media Player's state will be on.

It is also recommended that the command `volume_up`, the command `volume_down`, the command `volume_mute`, and the attribute `is_volume_muted` all be provided together. The attribute `is_volume_muted` should return either True or the on state when the volume is muted. The `volume_mute` service should toggle the mute setting.

When providing `select_source` as a command, it is recommended to also provide the attributes `source`, and `source_list`. The `source` attribute is the currently select source, while the `source_list` attribute is a list of all available sources.

When using `state_template`, if you use a template that depends on the current time or some other non-deterministic result not sourced from entities, the template won't repeatedly update but will only update when the state of a referenced entity updates. For ways to deal with this issue, see the [example](/integrations/binary_sensor.template/#working-without-entities) in the template binary_sensor.

## Usage examples

### Chromecast & Kodi control with switches

In this example, a switch is available to control the power of the television. Switches are also available to turn the volume up, turn the volume down, and mute the audio. These could be command line switches or any other entity in Home Assistant. The `turn_on` and `turn_off` commands will be redirected to the television, and the volume commands will be redirected to an audio receiver. The `select_source` command will be passed directly to an A/V receiver.

The children are a Chromecast and a Kodi player. If the Chromecast is playing, the Universal Media Player will reflect its status. If the Chromecast is idle and Kodi is playing, the universal media player will change to reflect its status.

{% raw %}

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
      target:
        entity_id: switch.living_room_tv
    turn_off:
      service: switch.turn_off
      target:
        entity_id: switch.living_room_tv
    volume_up:
      service: switch.turn_on
      target:
        entity_id: switch.living_room_volume_up
    volume_down:
      service: switch.turn_on
      target:
        entity_id: switch.living_room_volume_down
    volume_mute:
      service: switch.turn_on
      target:
        entity_id: switch.living_room_mute
    select_source:
      service: media_player.select_source
      target:
        entity_id: media_player.receiver
      data:
        source: "{{ source }}"
    volume_set:
      service: media_player.volume_set
      target:
        entity_id: media_player.receiver
      data:
        volume_level: "{{ volume_level }}"

  attributes:
    state: switch.living_room_tv
    is_volume_muted: switch.living_room_mute
    volume_level: media_player.receiver|volume_level
    source: media_player.receiver|source
    source_list: media_player.receiver|source_list
```

{% endraw %}

#### Kodi CEC-TV control

In this example, a [Kodi Media Player](/integrations/kodi) runs in a CEC capable device (OSMC/OpenElec running in a Raspberry Pi 24/7, for example), and, with the JSON-CEC Kodi add-on installed, it can turn on and off the attached TV.

We store the state of the attached TV in a [input boolean](/integrations/input_boolean/), so we can differentiate the TV being on or off, while Kodi is always 'idle', and use the universal media player to render its state with a template. We now can differentiate between the 'idle' and the 'off' state (being the second when it is idle and the TV is off).

Because the input boolean used to store the TV state is only changing when using the Home Assistant `turn_on` and `turn_off` actions, and Kodi could be controlled by so many ways, we also define some automations to update this Input Boolean when needed.

The complete configuration is:

{% raw %}

```yaml
homeassistant:
  customize:
    media_player.kodi_tv:
      friendly_name: Kodi

input_boolean:
  kodi_tv_state:

media_player:
- platform: universal
  name: Kodi TV
  state_template: >
    {% if is_state('media_player.kodi', 'idle') and is_state('input_boolean.kodi_tv_state', 'off') %}
    off
    {% else %}
    {{ states('media_player.kodi') }}
    {% endif %}
  children:
    - media_player.kodi
  commands:
    turn_on:
      service: media_player.turn_on
      target:
        entity_id: media_player.kodi
    turn_off:
      service: media_player.turn_off
      target:
        entity_id: media_player.kodi
  attributes:
    is_volume_muted: media_player.kodi|is_volume_muted
    volume_level: media_player.kodi|volume_level

- platform: kodi
  name: Kodi
  host: 192.168.1.10
  turn_on_action:
  - service: input_boolean.turn_on
    target:
      entity_id: input_boolean.kodi_tv_state
  - service: media_player.kodi_call_method
    target:
      entity_id: media_player.kodi
    data:
      method: Addons.ExecuteAddon
      addonid: script.json-cec
      params:
        command: activate
  turn_off_action:
  - service: input_boolean.turn_off
    target:
      entity_id: input_boolean.kodi_tv_state
  - service: media_player.media_stop
    target:
      entity_id: media_player.kodi
  - service: media_player.kodi_call_method
    target:
      entity_id: media_player.kodi
    data:
      method: Addons.ExecuteAddon
      addonid: script.json-cec
      params:
        command: standby

automation:
- alias: "Turn on the TV when Kodi is activated"
  trigger:
    platform: state
    entity_id: media_player.kodi_tv
    from: "off"
    to: "playing"
  action:
  - service: media_player.turn_on
    target:
      entity_id: media_player.kodi_tv

- alias: "Turn off the TV when Kodi is in idle > 15 min"
  trigger:
    platform: state
    entity_id: media_player.kodi_tv
    to: "idle"
    for:
      minutes: 15
  action:
  - service: media_player.turn_off
    target:
      entity_id: media_player.kodi_tv
```

{% endraw %}

#### Harmony Remote Example

The complete configuration is:

{% raw %}

```yaml
media_player:
  - platform: universal
    name: Media Room TV
    attributes:
      state: remote.alexander_down_guest
      source_list: remote.alexander_down_guest|activity_list
      source: remote.alexander_down_guest|current_activity
    commands:
      turn_on:
        service: remote.turn_on
        target:
          entity_id: remote.alexander_down_guest
      turn_off:
        service: remote.turn_off
        target:
          entity_id: remote.alexander_down_guest
      volume_up:
        service: remote.send_command
        target:
          entity_id: remote.alexander_down_guest
        data:
          device: Receiver
          command: VolumeUp
      volume_down:
        service: remote.send_command
        target:
          entity_id: remote.alexander_down_guest
        data:
          device: Receiver
          command: VolumeDown
      select_source:
        service: remote.turn_on
        target:
          entity_id: remote.alexander_down_guest
        data:
          activity: "{{ source }}"
    device_class: tv
```

{% endraw %}

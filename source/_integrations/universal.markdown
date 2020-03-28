---
title: Universal Media Player
description: Instructions on how to create a universal media player in Home Assistant.
ha_category:
  - Media Player
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
    attributes:
      is_volume_muted: ENTITY_ID|ATTRIBUTE
      state: ENTITY_ID|ATTRIBUTE
```

{% configuration %}
name:
  description: The name to assign the player.
  required: true
  type: string
children:
  description: Ordered list of child media players this entity will control.
  required: true
  type: list
state_template:
  description: "A [template](/topics/templating/) can be specified to render the state of the media player. This way, the state could depend on entities different from media players, like switches or input booleans."
  required: false
  type: template
commands:
  description: "Commands to be overwritten. Possible entries are `turn_on`, `turn_off`, `select_source`, `volume_set`, `volume_up`, `volume_down` and `volume_mute`."
  required: false
  type: string
attributes:
  description: "Attributes that can be overwritten. Possible entries are `is_volume_muted`, `state`, `source`, `source_list` and `volume_level`. The values should be an entity ID and state attribute separated by a pipe character (|). If the entity ID's state should be used, then only the entity id should be provided."
  required: false
  type: string
{% endconfiguration %}

The Universal Media Player will primarily imitate one of its `children`. The Universal Media Player will control the first child on the list that is active (not idle/off). The Universal Media Player will also inherit its state from the first active child if a `state_template` is not provided. Entities in the `children:` list must be media players, but the state template can contain any entity.

It is recommended that the command `turn_on`, the command `turn_off`, and the attribute `state` all be provided together. The `state` attribute indicates if the media player is on or off. If `state` indicates the media player is off, this status will take precedence over the states of the children. If all the children are idle/off and `state` is on, the Universal Media Player's state will be on.

It is also recommended that the command `volume_up`, the command `volume_down`, the command `volume_mute`, and the attribute `is_volume_muted` all be provided together. The attribute `is_volume_muted` should return either True or the on state when the volume is muted. The `volume_mute` service should toggle the mute setting.

When providing `select_source` as a command, it is recommended to also provide the attributes `source`, and `source_list`. The `source` attribute is the currently select source, while the `source_list` attribute is a list of all available sources.

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

{% endraw %}

#### Kodi CEC-TV control

In this example, a [Kodi Media Player](/integrations/kodi) runs in a CEC capable device (OSMC/OpenElec running in a Raspberry Pi 24/7, for example), and, with the JSON-CEC Kodi add-on installed, it can turn on and off the attached TV.

We store the state of the attached TV in a hidden [input boolean](/integrations/input_boolean/), so we can differentiate the TV being on or off, while Kodi is always 'idle', and use the universal media player to render its state with a template. We can hide the Kodi Media Player too, and only show the universal one, which now can differentiate between the 'idle' and the 'off' state (being the second when it is idle and the TV is off).

Because the input boolean used to store the TV state is only changing when using the Home Assistant `turn_on` and `turn_off` actions, and Kodi could be controlled by so many ways, we also define some automations to update this Input Boolean when needed.

The complete configuration is:

{% raw %}

```yaml
homeassistant:
  customize:
    input_boolean.kodi_tv_state:
      hidden: true
    media_player.kodi:
      hidden: true
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
      data:
        entity_id: media_player.kodi
    turn_off:
      service: media_player.turn_off
      data:
        entity_id: media_player.kodi
  attributes:
    is_volume_muted: media_player.kodi|is_volume_muted
    volume_level: media_player.kodi|volume_level

- platform: kodi
  name: Kodi
  host: 192.168.1.10
  turn_on_action:
  - service: input_boolean.turn_on
    data:
      entity_id: input_boolean.kodi_tv_state
  - service: media_player.kodi_call_method
    data:
      entity_id: media_player.kodi
      method: Addons.ExecuteAddon
      addonid: script.json-cec
      params:
        command: activate
  turn_off_action:
  - service: input_boolean.turn_off
    data:
      entity_id: input_boolean.kodi_tv_state
  - service: media_player.media_stop
    data:
      entity_id: media_player.kodi
  - service: media_player.kodi_call_method
    data:
      entity_id: media_player.kodi
      method: Addons.ExecuteAddon
      addonid: script.json-cec
      params:
        command: standby

automation:
- alias: Turn on the TV when Kodi is activated
  trigger:
    platform: state
    entity_id: media_player.kodi_tv
    from: 'off'
    to: 'playing'
  action:
  - service: media_player.turn_on
    entity_id: media_player.kodi_tv

- alias: Turn off the TV when Kodi is in idle > 15 min
  trigger:
    platform: state
    entity_id: media_player.kodi_tv
    to: 'idle'
    for:
      minutes: 15
  action:
  - service: media_player.turn_off
    entity_id: media_player.kodi_tv
```

{% endraw %}

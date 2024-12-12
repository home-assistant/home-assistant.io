---
title: Universal media player
description: Instructions on how to create a universal media player in Home Assistant.
ha_category:
  - Media player
ha_iot_class: Calculated
ha_release: 0.11
ha_quality_scale: internal
ha_domain: universal
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

A universal media player can combine multiple existing entities in Home Assistant into a single media player {% term entity %}. This is used to create a single media player {% term entity %} that can control an entire media center.

Multiple media player entities may be controlled from a universal media player. Additionally, the universal media player can enable volume and power commands to be directed to other Home Assistant entities. This enables the media player power and volume commands to control devices like a television, amplifier or audio receiver, for example.

To use a universal media player add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
        action: SERVICE
        data: SERVICE_DATA
      turn_off:
        action: SERVICE
        data: SERVICE_DATA
      volume_up:
        action: SERVICE
        data: SERVICE_DATA
      volume_down:
        action: SERVICE
        data: SERVICE_DATA
      volume_mute:
        action: SERVICE
        data: SERVICE_DATA
      media_play:
        action: SERVICE
        data: SERVICE_DATA
      media_pause:
        action: SERVICE
        data: SERVICE_DATA
      media_previous_track:
        action: SERVICE
        data: SERVICE_DATA
      media_next_track:
        action: SERVICE
        data: SERVICE_DATA 
    attributes:
      is_volume_muted: ENTITY_ID|ATTRIBUTE
      state: ENTITY_ID|ATTRIBUTE
    browse_media_entity: media_player.CHILD_2_ID
    device_class: tv
    unique_id: a_unique_string
```

{% configuration %}
name:
  description: The name to assign to the player.
  required: true
  type: string
children:
  description: Ordered list of child media players that this entity will control.
  required: false
  type: list
active_child_template:
  description: "A [template](/docs/configuration/templating/) that will allow to select (override) active child. Must return the `entity_id` of the child selected as active, or `None` to use the default behavior."
  required: false
  type: template
state_template:
  description: "A [template](/docs/configuration/templating/) can be specified to render the state of the media player. In this way, the state may depend on entities that are not themselves media players, like switches or input booleans."
  required: false
  type: template
commands:
  description: "Media player commands to be overridden. Almost all media player action commands may be overridden. Example entries are `turn_on`, `turn_off`, `select_source`, `volume_set`, `volume_up`, `volume_down`, `volume_mute`, `media_play`, `media_pause`, `media_stop`, `media_previous_track`, `media_next_track` and `play_media` (refer to the [`media_player` documentation](/integrations/media_player/) to see the full list)."
  required: false
  type: string
attributes:
  description: "Attributes that can be overridden. Most, if not all, media player attributes can be overridden. Example entries are `is_volume_muted`, `state`, `source`, `source_list` and `volume_level`. The values should be an entity ID and state attribute separated by a pipe character (|). If the entity ID's state should be used, then only the entity id needs to be provided."
  required: false
  type: string
browse_media_entity:
  description: Allows override the browse media entity to desired media player.
  required: false
  type: string
device_class:
  description: The device class that this entity represents. Can be `tv`, `speaker`, or `receiver`.
  required: false
  type: string
unique_id:
  description: A unique identifier for this entity. Needs to be unique within the `media_player` platform.
  required: false
  type: string
{% endconfiguration %}

The universal media player will primarily imitate one of its `children`. The universal media player will control the first child on the list that is active (not idle/off). The universal media player will also inherit its state from the first active child if a `state_template` is not provided. Entities in the `children:` list must be media players, but the state template can contain any {% term entity %}.

Using `active_child_template` will allow you to specify an active {% term entity %} if the default behavior is unsuitable for your task. The template must return the `entity_id` of the child that will be selected as active or `None` to return the default behavior.

It is recommended that the command `turn_on`, the command `turn_off`, and the attribute `state` all be provided together. The `state` attribute indicates if the media player is on or off. If `state` indicates the media player is off, this status will take precedence over the states of the children. If all the children are idle/off and `state` is on, the Universal Media Player's state will be on. If not provided, the `toggle` command will delegate to `turn_on` or `turn_off` based on the `state`.

It is also recommended that the command `volume_up`, the command `volume_down`, the command `volume_mute`, and the attribute `is_volume_muted` all be provided together. The attribute `is_volume_muted` should return either True or the on state when the volume is muted. The `volume_mute` {% term action %} should toggle the mute setting.

When providing `select_source` as a command, it is recommended to also provide the attributes `source`, and `source_list`. The `source` attribute is the currently select source, while the `source_list` attribute is a list of all available sources.

When using `state_template`, if you use a template that depends on the current time it is recommended to use `now()`. Using `now()` will cause templates to be refreshed at the start of every new minute. For more information see the [time](/docs/configuration/templating/#time) section in the template documentation.

The `browse_media_entity` parameter allows you to specify which media player will be used in media browser.

## Usage examples

### Chromecast & Kodi control with switches

In this example, a switch is available to control the power to the television. Switches are also available to turn the volume up, turn the volume down, and mute the audio. These could be command line switches or any other {% term entity %} in Home Assistant. The `turn_on` and `turn_off` commands will be redirected to the television, and the volume commands will be redirected to an audio receiver. The `select_source` command will be passed directly to an A/V receiver.

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
      action: switch.turn_on
      target:
        entity_id: switch.living_room_tv
    turn_off:
      action: switch.turn_off
      target:
        entity_id: switch.living_room_tv
    volume_up:
      action: switch.turn_on
      target:
        entity_id: switch.living_room_volume_up
    volume_down:
      action: switch.turn_on
      target:
        entity_id: switch.living_room_volume_down
    volume_mute:
      action: switch.turn_on
      target:
        entity_id: switch.living_room_mute
    select_source:
      action: media_player.select_source
      target:
        entity_id: media_player.receiver
      data:
        source: "{{ source }}"
    volume_set:
      action: media_player.volume_set
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

### Kodi CEC-TV control

In this example, a [Kodi Media Player](/integrations/kodi) runs in a CEC capable device (OSMC/OpenElec running in a Raspberry Pi 24/7, for example), and, with the JSON-CEC Kodi add-on installed, it can turn on and off the attached TV.

We store the state of the attached TV in an [input boolean](/integrations/input_boolean/), so we can differentiate the TV being on or off, while Kodi is always 'idle', and use the universal media player to render its state with a template. We now can differentiate between the 'idle' and the 'off' state (being the second when it is idle and the TV is off).

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
        action: media_player.turn_on
        target:
          entity_id: media_player.kodi
      turn_off:
        action: media_player.turn_off
        target:
          entity_id: media_player.kodi
    attributes:
      is_volume_muted: media_player.kodi|is_volume_muted
      volume_level: media_player.kodi|volume_level

  - platform: kodi
    name: "Kodi"
    host: 192.168.1.10
    turn_on_action:
      - action: input_boolean.turn_on
        target:
          entity_id: input_boolean.kodi_tv_state
      - action: media_player.kodi_call_method
        target:
          entity_id: media_player.kodi
        data:
          method: Addons.ExecuteAddon
          addonid: script.json-cec
          params:
            command: activate

    turn_off_action:
      - action: input_boolean.turn_off
        target:
          entity_id: input_boolean.kodi_tv_state
      - action: media_player.media_stop
        target:
          entity_id: media_player.kodi
      - action: media_player.kodi_call_method
        target:
          entity_id: media_player.kodi
        data:
          method: Addons.ExecuteAddon
          addonid: script.json-cec
          params:
            command: standby

automation:
  - alias: "Turn on the TV when Kodi is activated"
    triggers:
      - trigger: state
        entity_id: media_player.kodi_tv
        from: "off"
        to: "playing"
    actions:
      - action: media_player.turn_on
        target:
          entity_id: media_player.kodi_tv

  - alias: "Turn off the TV when Kodi is in idle > 15 min"
    triggers:
      - trigger: state
        entity_id: media_player.kodi_tv
        to: "idle"
        for:
          minutes: 15
    actions:
      - action: media_player.turn_off
        target:
          entity_id: media_player.kodi_tv
```

{% endraw %}

### Harmony remote example

The complete configuration is:

{% raw %}

```yaml
media_player:
  - platform: universal
    name: Media Room TV
    attributes:
      state: remote.harmony_hub
      source_list: remote.harmony_hub|activity_list
      source: remote.harmony_hub|current_activity
    commands:
      turn_on:
        action: remote.turn_on
        target:
          entity_id: remote.harmony_hub
      turn_off:
        action: remote.turn_off
        target:
          entity_id: remote.harmony_hub
      volume_up:
        action: remote.send_command
        target:
          entity_id: remote.harmony_hub
        data:
          device: Receiver
          command: VolumeUp
      volume_down:
        action: remote.send_command
        target:
          entity_id: remote.harmony_hub
        data:
          device: Receiver
          command: VolumeDown
      select_source:
        action: remote.turn_on
        target:
          entity_id: remote.harmony_hub
        data:
          activity: "{{ source }}"
    device_class: tv
    unique_id: media_room_harmony_hub
```

{% endraw %}

### Denon AVR & HEOS

This media player combines the media players provided by the [Denon AVR](/integrations/denonavr/) and [HEOS](/integrations/heos/) integrations. 

Features:
- Volume control via Denon entity (might be more fine-granular than HEOS volume control)
- ON/OFF button via Denon entity (not provided by HEOS media player)
- Sound mode selector via Denon entity (not provided by HEOS media player)
- Album art & Metadata via HEOS entity (not provided by Denon media player)

The complete configuration is:

{% raw %}

```yaml
media_player:
  - platform: universal
    name: Denon
    unique_id: denon_universal_remote
    device_class: receiver
    children:
      - media_player.denon_avr_x2700h       # Denon AVR Integration entity
      - media_player.denon_avr_x2700h_heos  # Denon HEOS Integration entity
    browse_media_entity: media_player.denon_avr_x2700h_heos
    commands:
      turn_off:
        action: media_player.turn_off
        data:
          entity_id: media_player.denon_avr_x2700h
      turn_on:
        action: media_player.turn_on
        data:
          entity_id: media_player.denon_avr_x2700h
      volume_up:
        action: media_player.volume_up
        data:
          entity_id: media_player.denon_avr_x2700h
      volume_down:
        action: media_player.volume_down
        data:
          entity_id: media_player.denon_avr_x2700h
      select_sound_mode:
        action: media_player.select_sound_mode
        target:
          entity_id: media_player.denon_avr_x2700h
        data:
          sound_mode: "{{ sound_mode }}"
    attributes:
      sound_mode: media_player.denon_avr_x2700h|sound_mode
      sound_mode_raw: media_player.denon_avr_x2700h|sound_mode_raw
      sound_mode_list: media_player.denon_avr_x2700h|sound_mode_list
```

{% endraw %}

### Override active children

This example shows how you can use `active_child_template`:

{% raw %}

```yaml
media_player:
  - platform: universal
    name: sony_tv
    unique_id: sony_tv
    children:
      - media_player.sony_tv_cast
      - media_player.sony_tv_psk
    active_child_template: >
      {% if is_state_attr('media_player.sony_tv_cast', 'app_name', 'TV') %}
         media_player.sony_tv_psk
      {% else %}
         media_player.sony_tv_cast
      {% endif %}
```

{% endraw %}

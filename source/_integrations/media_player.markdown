---
title: Media player
description: Instructions on how to set up your media players with Home Assistant.
ha_category:
  - Media player
ha_release: 0.7
ha_quality_scale: internal
ha_domain: media_player
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
related:
  - docs: /docs/configuration/customizing-devices/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---

Interacts with media players on your network.

{% include integrations/building_block_integration.md %}

## Media player states

A media player can have the following states. Each item shows the label you see in the Home Assistant interface, followed by the state as Home Assistant stores it. If you write templates or edit automations in YAML, use the stored state.

- **Off** (`off`): The media player is turned off and is not accepting commands until turned on.
- **On** (`on`): The media player is turned on, but no details on its state are currently known.
- **Idle** (`idle`): The media player is turned on and accepting commands, but not playing any media. For example, it might show a home screen.
- **Playing** (`playing`): The media player is currently playing media.
- **Paused** (`paused`): The media player has media loaded and is paused.
- **Buffering** (`buffering`): The media player is preparing to start playback of media.
- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

{% include integrations/actions.md %}

## Media player automation examples

Here are a few examples of how you can use Media player triggers and conditions in automations.

{% include docs/paste_yaml_tip.md %}

### Automation: dim the room when a movie starts

When the living room TV starts playing, dim the lights so the room is ready for watching.

- **Trigger**: Media player started playing
  - **Target**: Living room TV
- **Action**: Turn on light
  - **Target**: Living room lights

{% details "YAML example for dimming the room when a movie starts" %}

{% example %}
automation: |
  alias: "Dim the room when the TV starts playing"
  triggers:
    - trigger: media_player.started_playing
      target:
        entity_id: media_player.living_room_tv
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room_lights
      data:
        brightness_pct: 25
{% endexample %}

{% enddetails %}

### Automation: send a bedtime reminder if audio is still playing

At bedtime, check whether the bedroom speaker is still playing, and send a notification if it is.

- **Trigger**: Time: 23:00
- **Condition**: Media player is playing
  - **Target**: Bedroom speaker
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a bedtime playback reminder" %}

{% example %}
automation: |
  alias: "Remind me when audio is still playing at bedtime"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: media_player.is_playing
      target:
        entity_id: media_player.bedroom_speaker
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Bedroom audio is still playing.
{% endexample %}

{% enddetails %}

## Device class

The device class tells Home Assistant what kind of media player an entity is, such as a TV or a speaker. Home Assistant uses the device class to choose the icon. Google Assistant, Alexa, and Apple Home use the device class to decide what kind of device to show.

The integration that provides the media player sets the device class.

### Device classes in automations and templates

- Automations: The device class doesn't change how a media player works in automations.
- Templates: The device class is the `device_class` attribute of the entity. Use the stored value, such as `tv`. For example, you can [find entities by device class](/docs/templating/patterns/#finding-entities-by-device-class).

### List of available device classes

A media player without a device class is a generic media player and shows {% icon "mdi:cast" %}.

Each item shows the name you see in the Home Assistant interface, followed by the device class as Home Assistant stores it.

- {% icon "mdi:television" %} **TV** (`tv`): A television.
- {% icon "mdi:speaker" %} **Speaker** (`speaker`): A speaker.
- {% icon "mdi:audio-video" %} **Receiver** (`receiver`): A device that takes audio and video input and outputs it to speakers and displays.
- {% icon "mdi:projector" %} **Projector** (`projector`): A projector.


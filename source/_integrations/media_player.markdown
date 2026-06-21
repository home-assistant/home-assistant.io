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

## The state of a media player

A media player can have the following states:

- **Off**: The media player is turned off and is not accepting commands until turned on.
- **On**: The media player is turned on, but no details on its state are currently known.
- **Idle**: The media player is turned on and accepting commands, but currently not playing any media. Possibly at some idle home screen.
- **Playing**: The media player is currently playing media.
- **Paused**: The media player has an active media and is currently paused
- **Buffering**: The media player is preparing to start playback of media.
- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

{% include integrations/actions.md %}

## Media player automation examples

Here are a few examples of how you can use Media player triggers and conditions in automations.

{% include integrations/labs_entity_triggers_note.md %}

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

{% include integrations/device_class_intro.md %}

The media player entity will be represented by one of the following icons in the frontend, depending on the device class of the media player:

- {% icon "mdi:cast" %} `None`
- {% icon "mdi:television" %} `tv`
- {% icon "mdi:speaker" %} `speaker`
- {% icon "mdi:audio-video" %} `receiver` (device that takes audio and video input and outputs to speakers and displays)
- {% icon "mdi:projector" %} `projector`

Some device classes also support additional icons based on their state:

- Off: {% icon "mdi:cast-off" %} {% icon "mdi:television-off" %} {% icon "mdi:speaker-off" %} {% icon "mdi:audio-video-off" %} {% icon "mdi:projector-off" %}
- Playing: {% icon "mdi:cast-connected" %} {% icon "mdi:television-play" %} {% icon "mdi:speaker-play" %}
- Paused: {% icon "mdi:cast-connected" %} {% icon "mdi:television-pause" %} {% icon "mdi:speaker-pause" %}

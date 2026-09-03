---
title: "Media player started playing"
trigger: media_player.started_playing
domain: media_player
description: "Triggers when one or more media players start playing."
related_triggers:
  - media_player.paused_playing
  - media_player.stopped_playing
---

The **Media player started playing** trigger fires when a media player starts playback. Use it when you want Home Assistant to react as soon as music, video, or radio begins.

Use **Media player started playing** to dim lights, close blinds, or start another device that should run while audio or video is playing.

{% include triggers/ui_header.md %}

To use **Media player started playing** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the media player you want to watch. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Media player started playing**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted media players should behave. The default is **Each**.
7. Under **For at least**, enter how long playback must continue before the trigger fires. The default is `0`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple media players are targeted, controls how the trigger fires:

    - **Each**: Fires every time any targeted media player starts playing (default).
    - **First**: Fires when the first targeted media player starts playing.
    - **All**: Fires when every targeted media player starts playing.
  required: false
  default: Each
For at least:
  description: How long playback must continue before the trigger fires. The default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, this trigger is referred to as `media_player.started_playing`. A basic example looks like this:

{% example %}
trigger: |
  trigger: media_player.started_playing
  target:
    entity_id: media_player.living_room_tv
{% endexample %}

This fires when the living room TV starts playing.

To wait until all targeted speakers have played for 30 seconds:

{% example %}
trigger: |
  trigger: media_player.started_playing
  target:
    area_id: downstairs
  options:
    behavior: all
    for: "00:00:30"
{% endexample %}

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple media players are targeted, controls how the trigger fires:

    - `each` (**Each** in the UI, default): fires every time any targeted media player starts playing.
    - `first` (**First** in the UI): fires when the first targeted media player starts playing.
    - `all` (**All** in the UI): fires when every targeted media player starts playing.
  required: false
  type: string
  default: each
for:
  description: How long playback must continue before the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires when playback starts. If you only want to react after a change in volume, use [Media player volume changed](/triggers/media_player.volume_changed/) instead.
- Media players that are `unavailable` or `unknown` do not count as playing until they report a supported playback state again.
- If you want to react when playback pauses, use [Media player paused playing](/triggers/media_player.paused_playing/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: dim the room when the TV starts playing

When the living room TV starts a movie, dim the lights for more comfortable viewing.

- **Trigger**: Media player started playing
  - **Target**: Living room TV
- **Action**: Turn on light
  - **Target**: Living room lights

{% details "YAML example for dimming the room when the TV starts playing" %}

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

### Automation: close the blinds when audio starts in the den

When the den media player starts playing during the afternoon, close the blinds to reduce glare.

- **Trigger**: Media player started playing
  - **Target**: Den media player
- **Action**: Close cover
  - **Target**: Den blinds

{% details "YAML example for closing blinds when playback starts" %}

{% example %}
automation: |
  alias: "Close the den blinds when playback starts"
  triggers:
    - trigger: media_player.started_playing
      target:
        entity_id: media_player.den_receiver
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.den_blinds
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

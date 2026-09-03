---
title: "Media player stopped playing"
trigger: media_player.stopped_playing
domain: media_player
description: "Triggers when one or more media players stop playing."
related_triggers:
  - media_player.paused_playing
  - media_player.started_playing
---

The **Media player stopped playing** trigger fires when playback stops on a media player. Use it when you want Home Assistant to react after listening or watching ends.

Use **Media player stopped playing** to turn off lights, return a room to its normal state, or start another routine only when playback is fully finished.

{% include triggers/ui_header.md %}

To use **Media player stopped playing** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the media player you want to watch. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Media player stopped playing**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted media players should behave. The default is **Each**.
7. Under **For at least**, enter how long playback must stay stopped before the trigger fires. The default is `0`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple media players are targeted, controls how the trigger fires:

    - **Each**: Fires every time any targeted media player stops playing (default).
    - **First**: Fires when the first targeted media player stops playing.
    - **All**: Fires when every targeted media player stops playing.
  required: false
  default: Each
For at least:
  description: How long playback must stay stopped before the trigger fires. The default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, this trigger is referred to as `media_player.stopped_playing`. A basic example looks like this:

{% example %}
trigger: |
  trigger: media_player.stopped_playing
  target:
    entity_id: media_player.living_room_tv
{% endexample %}

This fires when playback stops on the living room TV.

To wait until all targeted media players have stayed stopped for 5 minutes:

{% example %}
trigger: |
  trigger: media_player.stopped_playing
  target:
    area_id: media_room
  options:
    behavior: all
    for: "00:05:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple media players are targeted, controls how the trigger fires:

    - `each` (**Each** in the UI, default): fires every time any targeted media player stops playing.
    - `first` (**First** in the UI): fires when the first targeted media player stops playing.
    - `all` (**All** in the UI): fires when every targeted media player stops playing.
  required: false
  type: string
  default: each
for:
  description: How long playback must stay stopped before the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger is for playback stopping. If playback is only paused, use [Media player paused playing](/triggers/media_player.paused_playing/) instead.
- Media players that are `unavailable` or `unknown` do not count as stopped until they report a supported playback state again.
- If you want to react as soon as playback begins, use [Media player started playing](/triggers/media_player.started_playing/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off a bias light when the TV stops

When the living room TV stops playing, turn off the bias light behind it.

- **Trigger**: Media player stopped playing
  - **Target**: Living room TV
- **Action**: Turn off light
  - **Target**: TV bias light

{% details "YAML example for turning off a bias light when playback stops" %}

{% example %}
automation: |
  alias: "Turn off the bias light when the TV stops"
  triggers:
    - trigger: media_player.stopped_playing
      target:
        entity_id: media_player.living_room_tv
  actions:
    - action: light.turn_off
      target:
        entity_id: light.tv_bias_light
{% endexample %}

{% enddetails %}

### Automation: restore the thermostat after music ends

When the patio speakers stop playing, set the patio climate back to a more comfortable temperature.

- **Trigger**: Media player stopped playing
  - **Target**: Patio speakers
- **Action**: Set temperature
  - **Target**: Patio thermostat

{% details "YAML example for restoring temperature after playback stops" %}

{% example %}
automation: |
  alias: "Restore the patio temperature when music ends"
  triggers:
    - trigger: media_player.stopped_playing
      target:
        entity_id: media_player.patio_speakers
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.patio
      data:
        temperature: 22
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

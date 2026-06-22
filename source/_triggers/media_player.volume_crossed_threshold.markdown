---
title: "Media player volume crossed threshold"
trigger: media_player.volume_crossed_threshold
domain: media_player
description: "Triggers after the volume of one or more media players crosses a threshold."
related_triggers:
  - media_player.volume_changed
  - media_player.muted
---

The **Media player volume crossed threshold** trigger fires when volume crosses a threshold you define. Use it when you care about the crossing itself, like moving above a limit or dropping below one, instead of every volume update.

Use **Media player volume crossed threshold** to react when listening gets too loud, when background music becomes too quiet, or when volume moves into or out of a range.

{% include triggers/ui_header.md %}

To use **Media player volume crossed threshold** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the media player you want to watch. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Media player volume crossed threshold**.
6. Under **Threshold**, set the volume level or range that must be crossed.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted media players should behave. The default is **Each**.
8. Under **For at least**, enter how long the crossed state must remain true before the trigger fires. The default is `0`.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold:
  description: |
    The volume level or range that must be crossed. You can use a fixed percentage from 0 to 100, or use an `input_number`, `number`, or `sensor` entity with `%` as the unit.
Trigger when:
  description: |
    When multiple media players are targeted, controls how the trigger fires:

    - **Each**: Fires every time any targeted media player crosses the threshold (default).
    - **First**: Fires when the first targeted media player crosses the threshold.
    - **All**: Fires when every targeted media player crosses the threshold.
For at least:
  description: How long the crossed state must remain true before the trigger fires. The default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, this trigger is referred to as `media_player.volume_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: media_player.volume_crossed_threshold
  target:
    entity_id: media_player.living_room_receiver
  options:
    threshold:
      type: above
      value:
        number: 65
{% endexample %}

This fires when the receiver volume crosses above 65%.

To use a {% term helper %} you created separately as a dynamic threshold:

{% example %}
trigger: |
  trigger: media_player.volume_crossed_threshold
  target:
    entity_id: media_player.living_room_receiver
  options:
    threshold:
      type: above
      value:
        entity: input_number.media_volume_limit
    for: "00:00:30"
{% endexample %}

### Options in YAML

{% options_yaml %}
threshold:
  description: |
    A mapping that defines which threshold crossing fires the trigger:

    - `type: above`: fires when the volume crosses above `value`.
    - `type: below`: fires when the volume crosses below `value`.
    - `type: between`: fires when the volume crosses into the range between `value_min` and `value_max`.
    - `type: outside`: fires when the volume crosses out of the range and moves to or beyond `value_min` or `value_max`.

    For a fixed threshold, use `number` with a percentage from 0 to 100. For a dynamic threshold, use `entity` with an `input_number`, `number`, or `sensor` entity that uses `%` as the unit.
  required: true
  type: map
behavior:
  description: |
    When multiple media players are targeted, controls how the trigger fires:

    - `any` (**Each** in the UI, default): fires every time any targeted media player crosses the threshold.
    - `first` (**First** in the UI): fires when the first targeted media player crosses the threshold.
    - `last` (**All** in the UI): fires when every targeted media player crosses the threshold.
  required: false
  type: string
  default: any
for:
  description: How long the crossed state must remain true before the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires only when the volume crosses the threshold. If volume changes again without crossing it, the trigger does not fire.
- Threshold helper entities must use `%` as the unit. If you want to adjust the limit from the UI, create a {% term helper %} separately first.
- Media players that are `unavailable` or `unknown` do not provide usable volume values until they report a supported state again.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: lower the lights when volume crosses above 65%

When the receiver volume crosses above 65%, dim the room for a theater-like scene.

- **Trigger**: Media player volume crossed threshold
  - **Target**: Living room receiver
  - **Threshold**: Above 65%
- **Action**: Turn on light
  - **Target**: Living room lights

{% details "YAML example for dimming lights when volume crosses a limit" %}

{% example %}
automation: |
  alias: "Dim the lights when receiver volume crosses 65%"
  triggers:
    - trigger: media_player.volume_crossed_threshold
      target:
        entity_id: media_player.living_room_receiver
      options:
        threshold:
          type: above
          value:
            number: 65
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room_lights
      data:
        brightness_pct: 15
{% endexample %}

{% enddetails %}

### Automation: send a notification when nursery audio drops below 20%

When the nursery speaker volume crosses below 20%, send a notification so you can turn it back up if needed.

- **Trigger**: Media player volume crossed threshold
  - **Target**: Nursery speaker
  - **Threshold**: Below 20%
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a low-volume nursery notification" %}

{% example %}
automation: |
  alias: "Notify me when nursery audio drops below 20%"
  triggers:
    - trigger: media_player.volume_crossed_threshold
      target:
        entity_id: media_player.nursery_speaker
      options:
        threshold:
          type: below
          value:
            number: 20
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Nursery audio dropped below 20% volume.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

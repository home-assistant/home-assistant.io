---
title: "Media player volume changed"
trigger: media_player.volume_changed
domain: media_player
description: "Triggers when the volume of one or more media players changes."
related_triggers:
  - media_player.volume_crossed_threshold
  - media_player.started_playing
---

The **Media player volume changed** trigger fires when a media player's volume changes and the new value matches the threshold rule you set. Use it when you want to react to a new volume level, not just to playback starting or stopping.

Use **Media player volume changed** to adjust lights when volume gets high, send a notification when volume drops too low, or react to any change for logging and other routines.

{% include triggers/ui_header.md %}

To use **Media player volume changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the media player you want to watch. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Media player volume changed**.
6. Under **Threshold**, set what kind of volume change should fire the trigger:
   - Select **Any change** to fire on any volume change.
   - Select **Above** or **Below** to fire when the new volume is above or below a threshold.
   - Select **In range** or **Outside range** to fire when the new volume lands inside or outside a range.
   - For each option, you can enter a fixed percentage from 0 to 100, or use an `input_number`, `number`, or `sensor` entity with `%` as the unit.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold:
  description: |
    Controls which volume changes fire the trigger:

    - **Any change**: fires on any volume change.
    - **Above** or **Below** (exclusive): fires only when the new volume is strictly above or below the threshold.
    - **In range** (exclusive): fires only when the new volume is strictly between the lower and upper bounds.
    - **Outside range** (inclusive): fires when the new volume is at or beyond either bound.

    Use a fixed percentage from 0 to 100, or use an `input_number`, `number`, or `sensor` entity with `%` as the unit.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, this trigger is referred to as `media_player.volume_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: media_player.volume_changed
  target:
    entity_id: media_player.living_room_receiver
  options:
    threshold:
      type: above
      value:
        number: 60
{% endexample %}

This fires when the receiver volume changes to a value above 60%.

To use a {% term helper %} you created separately as a dynamic threshold:

{% example %}
trigger: |
  trigger: media_player.volume_changed
  target:
    entity_id: media_player.living_room_receiver
  options:
    threshold:
      type: above
      value:
        entity: input_number.media_volume_limit
{% endexample %}

### Options in YAML

{% options_yaml %}
threshold:
  description: |
    A mapping that defines which volume changes fire the trigger:

    - `type: any`: fires on any volume change.
    - `type: above` (exclusive): fires when the new volume is strictly above `value`.
    - `type: below` (exclusive): fires when the new volume is strictly below `value`.
    - `type: between` (exclusive): fires when the new volume is strictly between `value_min` and `value_max`.
    - `type: outside` (inclusive): fires when the new volume is at or beyond `value_min` or `value_max`.

    For a fixed threshold, use `number` with a percentage from 0 to 100. For a dynamic threshold, use `entity` with an `input_number`, `number`, or `sensor` entity that uses `%` as the unit.
  required: true
  type: map
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- This trigger fires when the new volume matches the threshold rule. If you only want to react when volume crosses a level, use [Media player volume crossed threshold](/triggers/media_player.volume_crossed_threshold/).
- Threshold helper entities must use `%` as the unit. If you want to adjust the limit from the UI, create a {% term helper %} separately first.
- Media players that are `unavailable` or `unknown` do not provide usable volume values until they report a supported state again.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: lower the lights when movie volume goes high

When the receiver volume changes above 60%, dim the room a little more.

- **Trigger**: Media player volume changed
  - **Target**: Living room receiver
  - **Threshold**: Above 60%
- **Action**: Turn on light
  - **Target**: Living room lights

{% details "YAML example for dimming lights when volume gets high" %}

{% example %}
automation: |
  alias: "Dim the lights when volume goes high"
  triggers:
    - trigger: media_player.volume_changed
      target:
        entity_id: media_player.living_room_receiver
      options:
        threshold:
          type: above
          value:
            number: 60
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room_lights
      data:
        brightness_pct: 20
{% endexample %}

{% enddetails %}

### Automation: remind you when music volume drops too low

When the kitchen speaker volume changes below 15%, send a notification so you know why it sounds quiet.

- **Trigger**: Media player volume changed
  - **Target**: Kitchen speaker
  - **Threshold**: Below 15%
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a low-volume reminder" %}

{% example %}
automation: |
  alias: "Remind me when the kitchen speaker volume is low"
  triggers:
    - trigger: media_player.volume_changed
      target:
        entity_id: media_player.kitchen_speaker
      options:
        threshold:
          type: below
          value:
            number: 15
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The kitchen speaker volume is below 15%.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

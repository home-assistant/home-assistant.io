---
title: "Media player volume"
condition: media_player.is_volume
domain: media_player
description: "Tests the volume of one or more media players."
related_conditions:
  - media_player.is_muted
  - media_player.is_playing
---

The **Media player volume** condition passes when a media player's volume matches the threshold rule you define. Use it when an automation should continue only if volume is above, below, within, or outside a range.

Use **Media player volume** to protect quiet hours, to allow a routine only when the room is already loud enough, or to branch based on the current listening level.

{% include conditions/ui_header.md %}

To use **Media player volume** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the media player you want to evaluate. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Media player volume**.
6. Under **Threshold**, set the volume level or range the condition should check.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted media players should behave. The default is **Any**.
8. Under **For at least**, enter how long the volume must meet the threshold before the condition passes. The default is `0`.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold:
  description: |
    The volume level or range the condition checks. You can use a fixed percentage from 0 to 100, or use an `input_number`, `number`, or `sensor` entity with `%` as the unit.
Condition passes if:
  description: |
    When multiple media players are targeted, controls how results combine:

    - **Any**: Passes if at least one targeted media player meets the threshold (default).
    - **All**: Passes only when every targeted media player meets the threshold.
For at least:
  description: How long the volume must meet the threshold before the condition passes. The default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `media_player.is_volume`. A basic example looks like this:

{% example %}
condition: |
  condition: media_player.is_volume
  target:
    entity_id: media_player.living_room_receiver
  options:
    threshold:
      type: below
      value:
        number: 35
{% endexample %}

This passes when the receiver volume is below 35%.

To use a {% term helper %} you created separately as a dynamic threshold:

{% example %}
condition: |
  condition: media_player.is_volume
  target:
    entity_id: media_player.living_room_receiver
  options:
    threshold:
      type: below
      value:
        entity: input_number.quiet_hours_volume
{% endexample %}

### Options in YAML

{% options_yaml %}
threshold:
  description: |
    The volume level or range the condition checks:

    - `type: above` (exclusive): passes when the volume is strictly above `value`.
    - `type: below` (exclusive): passes when the volume is strictly below `value`.
    - `type: between` (exclusive): passes when the volume is strictly between `value_min` and `value_max`.
    - `type: outside` (inclusive): passes when the volume is at or beyond `value_min` or `value_max`.

    For a fixed threshold, use `number` with a percentage from 0 to 100. For a dynamic threshold, use `entity` with an `input_number`, `number`, or `sensor` entity that uses `%` as the unit.
  required: true
  type: map
behavior:
  description: |
    When multiple media players are targeted, controls how results combine:

    - `any` (**Any** in the UI, default): passes if at least one targeted media player meets the threshold.
    - `all` (**All** in the UI): passes only when every targeted media player meets the threshold.
  required: false
  type: string
  default: any
for:
  description: How long the volume must meet the threshold before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Threshold helper entities must use `%` as the unit. If you want to adjust the limit from the UI, create a {% term helper %} separately first.
- Media players that are `unavailable` or `unknown` are skipped for **Any** and fail for **All**.
- If you want to react to the moment volume crosses a limit, use [Media player volume crossed threshold](/triggers/media_player.volume_crossed_threshold/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only send a voice message when the receiver is quiet enough

When the washer finishes, send a spoken announcement only if the receiver volume is below 35%.

- **Trigger**: Washer finished
- **Condition**: Media player volume
  - **Target**: Living room receiver
  - **Threshold**: Below 35%
- **Action**: Play media
  - **Target**: Living room receiver

{% details "YAML example for a quiet-hours voice announcement" %}

{% example %}
automation: |
  alias: "Send a voice message only when the receiver is quiet enough"
  triggers:
    - trigger: state
      entity_id: binary_sensor.washer_finished
      to: "on"
  conditions:
    - condition: media_player.is_volume
      target:
        entity_id: media_player.living_room_receiver
      options:
        threshold:
          type: below
          value:
            number: 35
  actions:
    - action: media_player.play_media
      target:
        entity_id: media_player.living_room_receiver
      data:
        media_content_id: "media-source://tts/washer-finished"
        media_content_type: "music"
{% endexample %}

{% enddetails %}

### Automation: only start the cleaning robot when every player is below a volume limit

When everyone leaves home, start the robot vacuum only if every targeted media player downstairs is below 20% volume.

- **Trigger**: Person leaves home
- **Condition**: Media player volume
  - **Target**: Downstairs
  - **Threshold**: Below 20%
  - **Condition passes if**: All
- **Action**: Start vacuuming
  - **Target**: Robot vacuum

{% details "YAML example for checking room volume before starting the robot vacuum" %}

{% example %}
automation: |
  alias: "Start the vacuum only when every player is quiet"
  triggers:
    - trigger: zone
      entity_id: person.alex
      zone: zone.home
      event: leave
  conditions:
    - condition: media_player.is_volume
      target:
        area_id: downstairs
      options:
        threshold:
          type: below
          value:
            number: 20
        behavior: all
  actions:
    - action: vacuum.start
      target:
        entity_id: vacuum.main_floor
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

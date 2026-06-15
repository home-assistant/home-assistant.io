---
title: "Media player is not muted"
condition: media_player.is_unmuted
domain: media_player
description: "Tests if one or more media players are not muted."
related_conditions:
  - media_player.is_muted
  - media_player.is_playing
---

The **Media player is not muted** condition passes when the selected media player is not muted. Use it when an automation should continue only if audio is available.

Use **Media player is not muted** to send spoken announcements, start audio-related routines, or avoid relying on a speaker that is currently muted.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Media player is not muted** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the media player you want to evaluate. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Media player is not muted**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted media players should behave. The default is **Any**.
7. Under **For at least**, enter how long the media player must stay unmuted before the condition passes. The default is `0`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: |
    When multiple media players are targeted, controls how results combine:

    - **Any**: Passes if at least one targeted media player is not muted (default).
    - **All**: Passes only when every targeted media player is not muted.
For at least:
  description: How long the media player must stay unmuted before the condition passes. The default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `media_player.is_unmuted`. A basic example looks like this:

{% example %}
condition: |
  condition: media_player.is_unmuted
  target:
    entity_id: media_player.kitchen_speaker
{% endexample %}

This passes when the kitchen speaker is not muted.

To require all targeted media players to stay unmuted for 1 minute:

{% example %}
condition: |
  condition: media_player.is_unmuted
  target:
    area_id: downstairs
  options:
    behavior: all
    for: "00:01:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple media players are targeted, controls how results combine:

    - `any` (**Any** in the UI, default): passes if at least one targeted media player is not muted.
    - `all` (**All** in the UI): passes only when every targeted media player is not muted.
  required: false
  type: string
  default: any
for:
  description: How long the media player must stay unmuted before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition depends on the media player reporting that it is not muted.
- Media players that are `unavailable` or `unknown` are skipped for **Any** and fail for **All**.
- If you need the opposite test, use [Media player is muted](/conditions/media_player.is_muted/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: announce the washer only when the kitchen speaker is not muted

When the washer finishes, send a spoken message only if the kitchen speaker is not muted.

- **Trigger**: Washer finished
- **Condition**: Media player is not muted
  - **Target**: Kitchen speaker
- **Action**: Play media
  - **Target**: Kitchen speaker

{% details "YAML example for a spoken washer announcement" %}

{% example %}
automation: |
  alias: "Announce the washer only when the speaker is not muted"
  triggers:
    - trigger: state
      entity_id: binary_sensor.washer_finished
      to: "on"
  conditions:
    - condition: media_player.is_unmuted
      target:
        entity_id: media_player.kitchen_speaker
  actions:
    - action: media_player.play_media
      target:
        entity_id: media_player.kitchen_speaker
      data:
        media_content_id: "media-source://tts/washer-finished"
        media_content_type: "music"
{% endexample %}

{% enddetails %}

### Automation: start a morning playlist only when every room speaker is not muted

At 07:00, start a script only if every targeted speaker downstairs is not muted.

- **Trigger**: Time: 07:00
- **Condition**: Media player is not muted
  - **Target**: Downstairs
  - **Condition passes if**: All
- **Action**: Run script
  - **Target**: Morning playlist

{% details "YAML example for starting a playlist only when speakers are ready" %}

{% example %}
automation: |
  alias: "Start the morning playlist only when speakers are not muted"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: media_player.is_unmuted
      target:
        area_id: downstairs
      options:
        behavior: all
  actions:
    - action: script.turn_on
      target:
        entity_id: script.morning_playlist
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

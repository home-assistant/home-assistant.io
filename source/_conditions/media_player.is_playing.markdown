---
title: "Media player is playing"
condition: media_player.is_playing
domain: media_player
description: "Tests if one or more media players are playing."
related_conditions:
  - media_player.is_not_playing
  - media_player.is_paused
---

The **Media player is playing** condition passes when the selected media player is actively playing media. Use it when an automation should continue only during active audio or video playback.

Use **Media player is playing** to send reminders only while something is on, to adjust lighting for movie watching, or to stop another routine from interrupting playback.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Media player is playing** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the media player you want to evaluate. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Media player is playing**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted media players should behave. The default is **Any**.
7. Under **For at least**, enter how long playback must stay active before the condition passes. The default is `0`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: |
    When multiple media players are targeted, controls how results combine:

    - **Any**: Passes if at least one targeted media player is playing (default).
    - **All**: Passes only when every targeted media player is playing.
For at least:
  description: How long playback must stay active before the condition passes. The default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `media_player.is_playing`. A basic example looks like this:

{% example %}
condition: |
  condition: media_player.is_playing
  target:
    entity_id: media_player.bedroom_speaker
{% endexample %}

This passes when the bedroom speaker is playing.

To require all targeted media players to stay in a playing state for 2 minutes:

{% example %}
condition: |
  condition: media_player.is_playing
  target:
    area_id: downstairs
  options:
    behavior: all
    for: "00:02:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple media players are targeted, controls how results combine:

    - `any` (**Any** in the UI, default): passes if at least one targeted media player is playing.
    - `all` (**All** in the UI): passes only when every targeted media player is playing.
  required: false
  type: string
  default: any
for:
  description: How long playback must stay active before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition checks for active playback. If the device is on but idle, the condition does not pass.
- Media players that are `unavailable` or `unknown` are skipped for **Any** and fail for **All**.
- If you want the opposite test, use [Media player is not playing](/conditions/media_player.is_not_playing/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: send a bedtime reminder if the bedroom speaker is still playing

At bedtime, send a notification only if the bedroom speaker is still playing.

- **Trigger**: Time: 23:00
- **Condition**: Media player is playing
  - **Target**: Bedroom speaker
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a bedtime playback reminder" %}

{% example %}
automation: |
  alias: "Remind me when bedroom audio is still playing at bedtime"
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

### Automation: dim the room only when every media player in it is playing

When the movie scene starts, dim the room only if every targeted media player in the media room is already playing.

- **Trigger**: Button pressed
- **Condition**: Media player is playing
  - **Target**: Media room
  - **Condition passes if**: All
- **Action**: Turn on light
  - **Target**: Media room lights

{% details "YAML example for dimming the room only when playback is active" %}

{% example %}
automation: |
  alias: "Dim the room only when all media room players are playing"
  triggers:
    - trigger: state
      entity_id: input_button.movie_scene
  conditions:
    - condition: media_player.is_playing
      target:
        area_id: media_room
      options:
        behavior: all
  actions:
    - action: light.turn_on
      target:
        entity_id: light.media_room_lights
      data:
        brightness_pct: 20
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

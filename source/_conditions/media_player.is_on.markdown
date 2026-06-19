---
title: "Media player is on"
condition: media_player.is_on
domain: media_player
description: "Tests if one or more media players are on."
related_conditions:
  - media_player.is_off
  - media_player.is_playing
---

The **Media player is on** condition passes when the selected media player is turned on. Use it when an automation should continue only if the device is powered and ready.

Use **Media player is on** to send follow-up commands only to active devices, to decide whether a room is in use, or to guard actions that only make sense when a TV, speaker, or receiver is already on.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Media player is on** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the media player you want to evaluate. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Media player is on**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted media players should behave. The default is **Any**.
7. Under **For at least**, enter how long the media player must stay on before the condition passes. The default is `0`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: |
    When multiple media players are targeted, controls how results combine:

    - **Any**: Passes if at least one targeted media player is on (default).
    - **All**: Passes only when every targeted media player is on.
For at least:
  description: How long the media player must stay on before the condition passes. The default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `media_player.is_on`. A basic example looks like this:

{% example %}
condition: |
  condition: media_player.is_on
  target:
    entity_id: media_player.receiver
{% endexample %}

This passes when the receiver is on.

To require all targeted media players to stay on for 1 minute:

{% example %}
condition: |
  condition: media_player.is_on
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

    - `any` (**Any** in the UI, default): passes if at least one targeted media player is on.
    - `all` (**All** in the UI): passes only when every targeted media player is on.
  required: false
  type: string
  default: any
for:
  description: How long the media player must stay on before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition checks whether the device is on, even if nothing is playing yet.
- Media players that are `unavailable` or `unknown` are skipped for **Any** and fail for **All**.
- If you need to make sure playback has actually started, use [Media player is playing](/conditions/media_player.is_playing/) instead.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only set the source when the receiver is already on

When you press a dashboard button, change the receiver source only if it is already on.

- **Trigger**: Button pressed
- **Condition**: Media player is on
  - **Target**: Receiver
- **Action**: Select media player source
  - **Target**: Receiver

{% details "YAML example for setting a source only when the receiver is on" %}

{% example %}
automation: |
  alias: "Set the receiver source only when it is on"
  triggers:
    - trigger: state
      entity_id: input_button.receiver_source_button
  conditions:
    - condition: media_player.is_on
      target:
        entity_id: media_player.receiver
  actions:
    - action: media_player.select_source
      target:
        entity_id: media_player.receiver
      data:
        source: "TV"
{% endexample %}

{% enddetails %}

### Automation: start a movie scene only when all room devices are on

When the movie scene button is pressed, close the blinds only if every targeted media player in the room is already on.

- **Trigger**: Button pressed
- **Condition**: Media player is on
  - **Target**: Media room
  - **Condition passes if**: All
- **Action**: Close cover
  - **Target**: Media room blinds

{% details "YAML example for starting a scene only when room devices are on" %}

{% example %}
automation: |
  alias: "Close the blinds only when all room devices are on"
  triggers:
    - trigger: state
      entity_id: input_button.movie_scene
  conditions:
    - condition: media_player.is_on
      target:
        area_id: media_room
      options:
        behavior: all
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.media_room_blinds
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

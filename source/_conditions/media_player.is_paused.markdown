---
title: "Media player is paused"
condition: media_player.is_paused
domain: media_player
description: "Tests if one or more media players are paused."
related_conditions:
  - media_player.is_playing
  - media_player.is_not_playing
---

The **Media player is paused** condition passes when the selected media player is paused. Use it when an automation should continue only during a playback break.

Use **Media player is paused** to raise lights during a pause, show a reminder on a dashboard, or run an action only when media is ready to resume.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Media player is paused** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the media player you want to evaluate. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Media player is paused**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted media players should behave. The default is **Any**.
7. Under **For at least**, enter how long playback must stay paused before the condition passes. The default is `0`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: |
    When multiple media players are targeted, controls how results combine:

    - **Any**: Passes if at least one targeted media player is paused (default).
    - **All**: Passes only when every targeted media player is paused.
For at least:
  description: How long playback must stay paused before the condition passes. The default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `media_player.is_paused`. A basic example looks like this:

{% example %}
condition: |
  condition: media_player.is_paused
  target:
    entity_id: media_player.living_room_tv
{% endexample %}

This passes when playback is paused on the living room TV.

To require all targeted media players to stay paused for 5 minutes:

{% example %}
condition: |
  condition: media_player.is_paused
  target:
    area_id: downstairs
  options:
    behavior: all
    for: "00:05:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple media players are targeted, controls how results combine:

    - `any` (**Any** in the UI, default): passes if at least one targeted media player is paused.
    - `all` (**All** in the UI): passes only when every targeted media player is paused.
  required: false
  type: string
  default: any
for:
  description: How long playback must stay paused before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition checks for paused playback specifically. If the device has stopped or is idle, use [Media player is not playing](/conditions/media_player.is_not_playing/) instead.
- Media players that are `unavailable` or `unknown` are skipped for **Any** and fail for **All**.
- If you want the opposite test, use [Media player is playing](/conditions/media_player.is_playing/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: brighten the room only when the TV is paused

When you press a remote shortcut, brighten the living room only if the TV is paused.

- **Trigger**: Button pressed
- **Condition**: Media player is paused
  - **Target**: Living room TV
- **Action**: Turn on light
  - **Target**: Living room lights

{% details "YAML example for brightening the room during a pause" %}

{% example %}
automation: |
  alias: "Brighten the room only when the TV is paused"
  triggers:
    - trigger: state
      entity_id: input_button.pause_lights
  conditions:
    - condition: media_player.is_paused
      target:
        entity_id: media_player.living_room_tv
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room_lights
      data:
        brightness_pct: 75
{% endexample %}

{% enddetails %}

### Automation: show a reminder only when all room players are paused

At bedtime, show a dashboard reminder only if every targeted media player in the media room is paused.

- **Trigger**: Time: 22:00
- **Condition**: Media player is paused
  - **Target**: Media room
  - **Condition passes if**: All
- **Action**: Turn on switch
  - **Target**: Reminder indicator

{% details "YAML example for a paused playback reminder" %}

{% example %}
automation: |
  alias: "Show a reminder only when all media room players are paused"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: media_player.is_paused
      target:
        area_id: media_room
      options:
        behavior: all
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.media_room_reminder
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

---
title: "Media player is muted"
condition: media_player.is_muted
domain: media_player
description: "Tests if one or more media players are muted."
related_conditions:
  - media_player.is_unmuted
  - media_player.is_volume
---

The **Media player is muted** condition passes when the selected media player is muted. Use it when an automation should continue only if sound is currently silenced.

Use **Media player is muted** to avoid sending spoken announcements over a muted speaker, to change lighting only during quiet listening, or to branch into a different action when a TV is muted.

## Prerequisites

- The target media player must expose a mute state or volume level.

{% include conditions/ui_header.md %}

To use **Media player is muted** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the media player you want to evaluate. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Media player is muted**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted media players should behave. The default is **Any**.
7. Under **For at least**, enter how long the media player must stay muted before the condition passes. The default is `0`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: |
    When multiple media players are targeted, controls how results combine:

    - **Any**: Passes if at least one targeted media player is muted (default).
    - **All**: Passes only when every targeted media player is muted.
For at least:
  description: How long the media player must stay muted before the condition passes. The default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `media_player.is_muted`. A basic example looks like this:

{% example %}
condition: |
  condition: media_player.is_muted
  target:
    entity_id: media_player.office_speaker
{% endexample %}

This passes when the office speaker is muted.

To require all targeted media players to stay muted for 5 minutes:

{% example %}
condition: |
  condition: media_player.is_muted
  target:
    area_id: upstairs
  options:
    behavior: all
    for: "00:05:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple media players are targeted, controls how results combine:

    - `any` (**Any** in the UI, default): passes if at least one targeted media player is muted.
    - `all` (**All** in the UI): passes only when every targeted media player is muted.
  required: false
  type: string
  default: any
for:
  description: How long the media player must stay muted before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Media players that are `unavailable` or `unknown` are skipped for **Any** and fail for **All**.
- If you want the opposite test, use [Media player is not muted](/conditions/media_player.is_unmuted/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: send a text alert only when the TV is muted

When the doorbell rings, send a mobile notification only if the living room TV is muted.

- **Trigger**: Doorbell pressed
- **Condition**: Media player is muted
  - **Target**: Living room TV
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification that checks whether the TV is muted" %}

{% example %}
automation: |
  alias: "Notify me when the doorbell rings and the TV is muted"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_doorbell
      to: "on"
  conditions:
    - condition: media_player.is_muted
      target:
        entity_id: media_player.living_room_tv
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Someone is at the front door.
{% endexample %}

{% enddetails %}

### Automation: set a quiet scene only when every bedroom speaker is muted

At bedtime, turn off a reading light only if all bedroom speakers are already muted.

- **Trigger**: Time: 22:30
- **Condition**: Media player is muted
  - **Target**: Bedroom area
  - **Condition passes if**: All
- **Action**: Turn off light
  - **Target**: Reading light

{% details "YAML example for a quiet bedtime scene" %}

{% example %}
automation: |
  alias: "Turn off the reading light when all bedroom speakers are muted"
  triggers:
    - trigger: time
      at: "22:30:00"
  conditions:
    - condition: media_player.is_muted
      target:
        area_id: bedroom
      options:
        behavior: all
  actions:
    - action: light.turn_off
      target:
        entity_id: light.reading_light
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

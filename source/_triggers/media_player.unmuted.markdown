---
title: "Media player unmuted"
trigger: media_player.unmuted
domain: media_player
description: "Triggers after one or more media players are unmuted."
related_triggers:
  - media_player.muted
  - media_player.started_playing
---

The **Media player unmuted** trigger fires when a media player stops being muted. Use it when you want Home Assistant to react as soon as sound is available again.

Use **Media player unmuted** to restore lighting, resume a routine that depends on audio, or send a notification when a shared media player is ready to play sound again.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Media player unmuted** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the media player you want to watch. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Media player unmuted**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted media players should behave. The default is **Each**.
7. Under **For at least**, enter how long the media player must stay unmuted before the trigger fires. The default is `0`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple media players are targeted, controls how the trigger fires:

    - **Each**: Fires every time any targeted media player is unmuted (default).
    - **First**: Fires when the first targeted media player is unmuted.
    - **All**: Fires when every targeted media player is unmuted.
For at least:
  description: How long the media player must stay unmuted before the trigger fires. The default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, this trigger is referred to as `media_player.unmuted`. A basic example looks like this:

{% example %}
trigger: |
  trigger: media_player.unmuted
  target:
    entity_id: media_player.office_speaker
{% endexample %}

This fires when the office speaker becomes unmuted.

To wait until all targeted media players have stayed unmuted for 1 minute:

{% example %}
trigger: |
  trigger: media_player.unmuted
  target:
    area_id: downstairs
  options:
    behavior: last
    for: "00:01:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple media players are targeted, controls how the trigger fires:

    - `any` (**Each** in the UI, default): fires every time any targeted media player is unmuted.
    - `first` (**First** in the UI): fires when the first targeted media player is unmuted.
    - `last` (**All** in the UI): fires when every targeted media player is unmuted.
  required: false
  type: string
  default: any
for:
  description: How long the media player must stay unmuted before the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger works when the media player reports that it is no longer muted.
- Media players that are `unavailable` or `unknown` do not count as unmuted until they report a supported state again.
- If you want to react when sound is silenced, use [Media player muted](/triggers/media_player.muted/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off a status light when sound returns

When the office speaker is unmuted, turn off the desk light that shows a muted status.

- **Trigger**: Media player unmuted
  - **Target**: Office speaker
- **Action**: Turn off light
  - **Target**: Desk light

{% details "YAML example for clearing a mute status light" %}

{% example %}
automation: |
  alias: "Turn off the mute status light"
  triggers:
    - trigger: media_player.unmuted
      target:
        entity_id: media_player.office_speaker
  actions:
    - action: light.turn_off
      target:
        entity_id: light.office_desk
{% endexample %}

{% enddetails %}

### Automation: resume a fan when the TV is no longer muted

When the living room TV is unmuted again, turn the fan plug back on.

- **Trigger**: Media player unmuted
  - **Target**: Living room TV
- **Action**: Turn on switch
  - **Target**: Fan plug

{% details "YAML example for restoring a fan when sound returns" %}

{% example %}
automation: |
  alias: "Turn the fan back on when the TV is unmuted"
  triggers:
    - trigger: media_player.unmuted
      target:
        entity_id: media_player.living_room_tv
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.fan_plug
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

---
title: "Media player muted"
trigger: media_player.muted
domain: media_player
description: "Triggers when one or more media players are muted."
related_triggers:
  - media_player.unmuted
  - media_player.volume_changed
---

The **Media player muted** trigger fires when a media player becomes muted. Use it when you want Home Assistant to react when someone silences a TV, speaker, or receiver.

Use **Media player muted** to adjust nearby lighting for quiet listening, pause another routine that depends on audio, or send a notification when a shared media player is muted.

{% include triggers/ui_header.md %}

To use **Media player muted** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the media player you want to watch. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Media player muted**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted media players should behave. The default is **Each**.
7. Under **For at least**, enter how long the media player must stay muted before the trigger fires. The default is `0`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple media players are targeted, controls how the trigger fires:

    - **Each**: Fires every time any targeted media player is muted (default).
    - **First**: Fires when the first targeted media player is muted.
    - **All**: Fires when every targeted media player is muted.
For at least:
  description: How long the media player must stay muted before the trigger fires. The default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, this trigger is referred to as `media_player.muted`. A basic example looks like this:

{% example %}
trigger: |
  trigger: media_player.muted
  target:
    entity_id: media_player.office_speaker
{% endexample %}

This fires when the office speaker becomes muted.

To wait until all targeted media players have stayed muted for 2 minutes:

{% example %}
trigger: |
  trigger: media_player.muted
  target:
    area_id: living_room
  options:
    behavior: last
    for: "00:02:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple media players are targeted, controls how the trigger fires:

    - `any` (**Each** in the UI, default): fires every time any targeted media player is muted.
    - `first` (**First** in the UI): fires when the first targeted media player is muted.
    - `last` (**All** in the UI): fires when every targeted media player is muted.
  required: false
  type: string
  default: any
for:
  description: How long the media player must stay muted before the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger works when the media player reports that it is muted. If the integration does not expose mute state changes, this trigger will not fire.
- Media players that are `unavailable` or `unknown` do not count as muted until they report a supported state again.
- If you want to react when sound returns, use [Media player unmuted](/triggers/media_player.unmuted/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on a status light when a speaker is muted

When the office speaker is muted during a call, turn on a desk light so the room still has a visual cue.

- **Trigger**: Media player muted
  - **Target**: Office speaker
- **Action**: Turn on light
  - **Target**: Desk light

{% details "YAML example for a mute status light" %}

{% example %}
automation: |
  alias: "Show a mute status light"
  triggers:
    - trigger: media_player.muted
      target:
        entity_id: media_player.office_speaker
  actions:
    - action: light.turn_on
      target:
        entity_id: light.office_desk
      data:
        color_name: "red"
        brightness_pct: 50
{% endexample %}

{% enddetails %}

### Automation: pause a fan routine when the TV is muted for a while

If the living room TV stays muted for 10 minutes, turn off a noisy fan so the room stays quiet.

- **Trigger**: Media player muted
  - **Target**: Living room TV
  - **For at least**: 00:10:00
- **Action**: Turn off switch
  - **Target**: Fan plug

{% details "YAML example for turning off a fan after the TV is muted" %}

{% example %}
automation: |
  alias: "Turn off the fan when the TV stays muted"
  triggers:
    - trigger: media_player.muted
      target:
        entity_id: media_player.living_room_tv
      options:
        for: "00:10:00"
  actions:
    - action: switch.turn_off
      target:
        entity_id: switch.fan_plug
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

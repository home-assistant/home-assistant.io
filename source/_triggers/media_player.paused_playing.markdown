---
title: "Media player paused playing"
trigger: media_player.paused_playing
domain: media_player
description: "Triggers after one or more media players pause playing."
related_triggers:
  - media_player.started_playing
  - media_player.stopped_playing
---

The **Media player paused playing** trigger fires when playback pauses on a media player. Use it when you want Home Assistant to react during a break without waiting for playback to stop completely.

Use **Media player paused playing** to raise the lights, lower background noise, or send a reminder when something has been left paused for a while.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Media player paused playing** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the media player you want to watch. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Media player paused playing**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted media players should behave. The default is **Each**.
7. Under **For at least**, enter how long playback must stay paused before the trigger fires. The default is `0`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple media players are targeted, controls how the trigger fires:

    - **Each**: Fires every time any targeted media player pauses (default).
    - **First**: Fires when the first targeted media player pauses.
    - **All**: Fires when every targeted media player pauses.
For at least:
  description: How long playback must stay paused before the trigger fires. The default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, this trigger is referred to as `media_player.paused_playing`. A basic example looks like this:

{% example %}
trigger: |
  trigger: media_player.paused_playing
  target:
    entity_id: media_player.living_room_tv
{% endexample %}

This fires when playback pauses on the living room TV.

To wait until playback has stayed paused for 15 minutes:

{% example %}
trigger: |
  trigger: media_player.paused_playing
  target:
    entity_id: media_player.kitchen_speaker
  options:
    for: "00:15:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple media players are targeted, controls how the trigger fires:

    - `any` (**Each** in the UI, default): fires every time any targeted media player pauses.
    - `first` (**First** in the UI): fires when the first targeted media player pauses.
    - `last` (**All** in the UI): fires when every targeted media player pauses.
  required: false
  type: string
  default: any
for:
  description: How long playback must stay paused before the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires for a paused state. If playback stops completely, use [Media player stopped playing](/triggers/media_player.stopped_playing/) instead.
- Media players that are `unavailable` or `unknown` do not count as paused until they report a supported playback state again.
- If you want to react when playback starts again, use [Media player started playing](/triggers/media_player.started_playing/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: raise the lights when the TV is paused

When the living room TV is paused, brighten the room so it is easier to move around.

- **Trigger**: Media player paused playing
  - **Target**: Living room TV
- **Action**: Turn on light
  - **Target**: Living room lights

{% details "YAML example for brightening the room when playback pauses" %}

{% example %}
automation: |
  alias: "Raise the lights when the TV is paused"
  triggers:
    - trigger: media_player.paused_playing
      target:
        entity_id: media_player.living_room_tv
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room_lights
      data:
        brightness_pct: 70
{% endexample %}

{% enddetails %}

### Automation: remind you about paused audio after 15 minutes

If the kitchen speaker stays paused for 15 minutes, send a reminder so you can decide whether to resume it.

- **Trigger**: Media player paused playing
  - **Target**: Kitchen speaker
  - **For at least**: 00:15:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a paused audio reminder" %}

{% example %}
automation: |
  alias: "Remind me about paused kitchen audio"
  triggers:
    - trigger: media_player.paused_playing
      target:
        entity_id: media_player.kitchen_speaker
      options:
        for: "00:15:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Kitchen audio has been paused for 15 minutes.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

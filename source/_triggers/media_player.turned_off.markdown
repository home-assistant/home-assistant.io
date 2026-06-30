---
title: "Media player turned off"
trigger: media_player.turned_off
domain: media_player
description: "Triggers when one or more media players turn off."
related_triggers:
  - media_player.turned_on
  - media_player.stopped_playing
---

The **Media player turned off** trigger fires when a media player turns off. Use it when you want Home Assistant to react when the device itself powers down, not only when playback stops.

Use **Media player turned off** to switch off related lights, lock up a room after a projector is shut down, or end routines that only make sense while a media player is on.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Media player turned off** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the media player you want to watch. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Media player turned off**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted media players should behave. The default is **Each**.
7. Under **For at least**, enter how long the media player must stay off before the trigger fires. The default is `0`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple media players are targeted, controls how the trigger fires:

    - **Each**: Fires every time any targeted media player turns off (default).
    - **First**: Fires when the first targeted media player turns off.
    - **All**: Fires when every targeted media player turns off.
For at least:
  description: How long the media player must stay off before the trigger fires. The default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, this trigger is referred to as `media_player.turned_off`. A basic example looks like this:

{% example %}
trigger: |
  trigger: media_player.turned_off
  target:
    entity_id: media_player.bedroom_tv
{% endexample %}

This fires when the bedroom TV turns off.

To wait until all targeted media players have stayed off for 2 minutes:

{% example %}
trigger: |
  trigger: media_player.turned_off
  target:
    area_id: upstairs
  options:
    behavior: last
    for: "00:02:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple media players are targeted, controls how the trigger fires:

    - `any` (**Each** in the UI, default): fires every time any targeted media player turns off.
    - `first` (**First** in the UI): fires when the first targeted media player turns off.
    - `last` (**All** in the UI): fires when every targeted media player turns off.
  required: false
  type: string
  default: any
for:
  description: How long the media player must stay off before the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger reacts to the power state. If the device stays on but playback ends, use [Media player stopped playing](/triggers/media_player.stopped_playing/) instead.
- Media players that are `unavailable` or `unknown` do not count as off until they report a supported power state again.
- If you want to react when the device powers on, use [Media player turned on](/triggers/media_player.turned_on/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off the bias light when the TV powers down

When the bedroom TV turns off, also turn off the light behind it.

- **Trigger**: Media player turned off
  - **Target**: Bedroom TV
- **Action**: Turn off light
  - **Target**: TV bias light

{% details "YAML example for turning off a bias light when the TV powers down" %}

{% example %}
automation: |
  alias: "Turn off the TV bias light when the TV turns off"
  triggers:
    - trigger: media_player.turned_off
      target:
        entity_id: media_player.bedroom_tv
  actions:
    - action: light.turn_off
      target:
        entity_id: light.bedroom_tv_bias_light
{% endexample %}

{% enddetails %}

### Automation: lock the media room when the projector turns off

When the projector turns off at the end of the night, lock the door to the media room.

- **Trigger**: Media player turned off
  - **Target**: Projector
- **Action**: Lock lock
  - **Target**: Media room door

{% details "YAML example for locking a room after the projector turns off" %}

{% example %}
automation: |
  alias: "Lock the media room when the projector turns off"
  triggers:
    - trigger: media_player.turned_off
      target:
        entity_id: media_player.projector
  actions:
    - action: lock.lock
      target:
        entity_id: lock.media_room_door
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

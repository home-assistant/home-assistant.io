---
title: "Media player turned on"
trigger: media_player.turned_on
domain: media_player
description: "Triggers when one or more media players turn on."
related_triggers:
  - media_player.turned_off
  - media_player.started_playing
---

The **Media player turned on** trigger fires when a media player powers on. Use it when you want Home Assistant to react as soon as the device becomes available for use, even before playback starts.

Use **Media player turned on** to prepare the room, set a source, or turn on supporting devices whenever a TV, speaker, or receiver powers up.

{% include triggers/ui_header.md %}

To use **Media player turned on** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the media player you want to watch. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Media player turned on**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted media players should behave. The default is **Each**.
7. Under **For at least**, enter how long the media player must stay on before the trigger fires. The default is `0`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple media players are targeted, controls how the trigger fires:

    - **Each**: Fires every time any targeted media player turns on (default).
    - **First**: Fires when the first targeted media player turns on.
    - **All**: Fires when every targeted media player turns on.
For at least:
  description: How long the media player must stay on before the trigger fires. The default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, this trigger is referred to as `media_player.turned_on`. A basic example looks like this:

{% example %}
trigger: |
  trigger: media_player.turned_on
  target:
    entity_id: media_player.family_room_tv
{% endexample %}

This fires when the family room TV turns on.

To wait until all targeted media players have stayed on for 30 seconds:

{% example %}
trigger: |
  trigger: media_player.turned_on
  target:
    area_id: downstairs
  options:
    behavior: last
    for: "00:00:30"
{% endexample %}

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple media players are targeted, controls how the trigger fires:

    - `any` (**Each** in the UI, default): fires every time any targeted media player turns on.
    - `first` (**First** in the UI): fires when the first targeted media player turns on.
    - `last` (**All** in the UI): fires when every targeted media player turns on.
  required: false
  type: string
  default: any
for:
  description: How long the media player must stay on before the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger reacts to the power state. If the media player was already on and only playback starts, use [Media player started playing](/triggers/media_player.started_playing/) instead.
- Media players that are `unavailable` or `unknown` do not count as on until they report a supported power state again.
- If you want to react when the device powers off, use [Media player turned off](/triggers/media_player.turned_off/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on a bias light when the TV powers on

When the family room TV turns on, also turn on the light behind it.

- **Trigger**: Media player turned on
  - **Target**: Family room TV
- **Action**: Turn on light
  - **Target**: TV bias light

{% details "YAML example for turning on a bias light when the TV powers on" %}

{% example %}
automation: |
  alias: "Turn on the TV bias light when the TV turns on"
  triggers:
    - trigger: media_player.turned_on
      target:
        entity_id: media_player.family_room_tv
  actions:
    - action: light.turn_on
      target:
        entity_id: light.family_room_tv_bias_light
{% endexample %}

{% enddetails %}

### Automation: set the receiver source when it turns on

When the receiver powers on, switch it to the TV source automatically.

- **Trigger**: Media player turned on
  - **Target**: Receiver
- **Action**: Select media player source
  - **Target**: Receiver

{% details "YAML example for selecting a source when the receiver powers on" %}

{% example %}
automation: |
  alias: "Set the receiver source when it turns on"
  triggers:
    - trigger: media_player.turned_on
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

{% include triggers/stuck.md %}

{% include triggers/related.md %}

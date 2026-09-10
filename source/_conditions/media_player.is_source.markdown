---
title: "Media player source"
condition: media_player.is_source
domain: media_player
description: "Tests if one or more media players are set to a specific source."
related_conditions:
  - media_player.is_on
  - media_player.is_playing
  - media_player.is_volume
---

The **Media player source** condition passes when a media player {% term entity %} is set to one of the sources you select. Sources are the inputs a device can switch between, and they are device-specific: a TV might offer **HDMI 1**, **HDMI 2**, and **TV**, while an amplifier might offer **Phono**, **Stream**, or **Coax1**. Use **Media player source** when you want an automation to run only while a media player is on a particular input, for example to dim the lights only when the receiver is switched to your Blu-ray player.

When you target more than one media player, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted media player to be on the selected source, or demand that all of them are.

{% include conditions/ui_header.md %}

To use **Media player source** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your media player is in, or select a device, a specific entity, a floor, or a label.
5. From the conditions shown for that target, select **Media player source**.
6. Under **Source**, select one or more sources to check for. Only the sources reported by the targeted media player are shown.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Under **For at least**, enter how long the media player must stay on the selected source before the condition passes.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Source:
  description: The source or sources to check for. Only the sources reported by the targeted media player are shown. Sources are device-specific and typically include inputs like **HDMI 1**, **TV**, **Bluetooth**, or **Phono**.
Condition passes if:
  description: When multiple media players are targeted, controls how results combine. Pick **Any** to pass if at least one targeted media player is on the selected source, or **All** to pass only when every targeted media player is on it. Default is **Any**.
For at least:
  description: How long the media player must stay on the selected source before the condition passes. Default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Media player source** is referred to as `media_player.is_source`. A basic example looks like this:

{% example %}
condition: |
  condition: media_player.is_source
  target:
    entity_id: media_player.amplifier
  options:
    source: "Phono"
{% endexample %}

This passes when the amplifier is currently set to the `Phono` source.

To check for any one of several sources:

{% example %}
condition: |
  condition: media_player.is_source
  target:
    entity_id: media_player.living_room_tv
  options:
    source:
      - "HDMI 1"
      - "HDMI 2"
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
source:
  description: >
    The source or sources to check for. Accepts a single source string or a list of source strings. Only sources reported by the targeted media player are valid.
  required: true
  type: [string, list]
behavior:
  description: >
    When multiple media players are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the media player must stay on the selected source before the condition passes. Accepts a duration string in `HH:MM:SS` format. For example, `00:05:00` waits 5 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The available sources depend entirely on the device. Home Assistant only shows the sources the targeted media player reports.
- Media players that do not support selecting a source are ignored by this condition and will never pass it. To check whether a player is simply on, use [Media player is on](/conditions/media_player.is_on/).
- Some media players only report their source list while they are powered on. If the device is off when you build the automation, the **Source** dropdown may be empty. Turn the device on to pick a source.
- A media player that is off or is not reporting a source does not match. With **Any**, such players are skipped; with **All**, they make the condition fail.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: activate the cinema scene only for the Blu-ray source

When you press the movie night button, activate the cinema {% term scene %}, but only if the living room receiver is already switched to the **HDMI 1** (Blu-ray) source.

- **Trigger**: State: Movie night button pressed
- **Condition**: Media player source
  - **Target**: Living room receiver
  - **Source**: HDMI 1
- **Action**: Scene: Activate cinema scene

{% details "YAML example for the cinema scene" %}

{% example %}
automation: |
  alias: "Activate cinema scene for Blu-ray"
  triggers:
    - trigger: state
      entity_id: input_button.movie_night
  conditions:
    - condition: media_player.is_source
      target:
        entity_id: media_player.living_room_receiver
      options:
        source: "HDMI 1"
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.cinema
{% endexample %}

{% enddetails %}

### Automation: send a reminder when the amplifier is on an external input

Every evening, if the amplifier is on one of its external inputs, send a reminder to switch back to streaming.

- **Trigger**: Time: 22:00:00
- **Condition**: Media player source
  - **Target**: Amplifier
  - **Source**: Coax1, Opt1
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an external-input reminder" %}

{% example %}
automation: |
  alias: "Remind me the amplifier is on an external input"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: media_player.is_source
      target:
        entity_id: media_player.amplifier
      options:
        source:
          - "Coax1"
          - "Opt1"
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The amplifier is still on an external input."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

---
title: Satellite started responding
trigger: assist_satellite.started_responding
domain: assist_satellite
description: Triggers after one or more Assist satellites start playing back a response.
related_triggers:
  - assist_satellite.started_listening
  - assist_satellite.started_processing
  - assist_satellite.idle
---

The **Satellite started responding** trigger fires when one or more Assist satellite {% term entities %} transition to the responding state. This happens as soon as the satellite begins playing back the text-to-speech response.

Use it to automate actions that should happen while the satellite is speaking. For example, create an automation to dim lights slightly to create a clear audio focus in the room, to pause background music during the response so the spoken answer is easy to hear, or to activate an LED ring that signals the household that the assistant is currently speaking.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Satellite started responding**.
5. Select **Add target** and pick the Assist satellite you want to watch. You can also select an area, a floor, a device, or a label, as described in [Targets](#targets).
6. Under **Trigger when**, pick **Each**, **First**, or **All** to control how the trigger behaves when multiple satellites are targeted, as described in [Behavior](#behavior-with-multiple-targets).
7. Under **For at least**, you can set how long the satellite must keep reporting the responding state before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple Assist satellites are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted satellite starts responding.
    - **First**: fires only when the first satellite in the group starts responding.
    - **All**: fires only after every targeted satellite is in the responding state.
  required: false
For at least:
  description: How long the satellite or satellites must keep reporting the responding state before the trigger fires. The default is zero (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `assist_satellite.started_responding`. A basic example looks like this:

{% example %}
trigger: |
  trigger: assist_satellite.started_responding
  target:
    entity_id: assist_satellite.living_room
{% endexample %}

This fires every time `assist_satellite.living_room` starts playing back a response.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple Assist satellites are targeted, controls when the trigger fires:

    - `each`: fires every time any targeted satellite starts responding.
    - `first`: fires only when the first satellite starts responding.
    - `all`: fires only after every targeted satellite is in the responding state.
  required: false
  type: string
  default: each
for:
  description: |
    How long the satellite or satellites must keep reporting the responding state before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires as soon as text-to-speech playback begins. When the playback is complete, the entity returns to the idle state.
- If a satellite gets stuck in the **Responding** state, which can happen after a network glitch or a TTS error, this trigger combined with the **For at least** option and a follow-up notification can help you detect it early.
- For local TTS engines such as Piper, the **Responding** state is typically very short (under two seconds for brief replies). Cloud TTS may take longer depending on network conditions. Prefer local TTS to minimize response latency and reduce unnecessary cloud energy use.
- Satellites that have the **Unavailable** or **Unknown** state are skipped in the evaluation of multi-target behavior.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: lower music volume while the satellite responds to save listening energy

When a satellite starts responding, this automation lowers the volume of any music playing in the same area to avoid having to run the TTS at a higher volume. When the satellite goes back to idle, the music returns to its original volume. This avoids the noisy pattern of raising TTS volume to compete with background audio.

- **Trigger**: Satellite started responding
  - **Target**: Living room Assist satellite
- **Action**: Set media player volume (to 20%)
  - **Target**: Living room speaker

{% details "YAML example for lowering music volume while the satellite responds" %}

{% example %}
automation: |
  alias: "Lower music volume while satellite responds"
  triggers:
    - trigger: assist_satellite.started_responding
      target:
        entity_id: assist_satellite.living_room
  actions:
    - action: media_player.volume_set
      target:
        entity_id: media_player.living_room_speaker
      data:
        volume_level: 0.2
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

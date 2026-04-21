---
title: "Light brightness crossed threshold"
trigger: light.brightness_crossed_threshold
domain: light
description: "Triggers after the brightness of one or more lights crosses a threshold."
related_triggers:
  - light.brightness_changed
  - light.turned_on
---

The **Light brightness crossed threshold** trigger fires when a light {% term entity %} crosses a specific brightness level. Use it to react to a light passing a particular value in either direction, like starting an automation only once brightness passes 50%.

Unlike [Light brightness changed](/triggers/light.brightness_changed/), which fires on any sizable change, this trigger only fires when the brightness moves across the exact threshold you pick. It fires once per crossing, in whichever direction.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Light: Light brightness crossed threshold**.
5. Under **Targets**, select the light entity, an area, a floor, or a label.
6. Under **Threshold type**, set the brightness percentage you want the trigger to watch for.
7. Under **Trigger when**, pick **Any**, **First**, or **Last** to control how multiple targets interact.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The brightness level the light has to cross for the trigger to fire. Expressed as a percentage of full brightness.
  required: true
Trigger when:
  description: When multiple lights are targeted, controls when the trigger fires. Pick **Any** to fire every time any targeted light crosses the threshold, **First** to fire only on the first crossing, or **Last** to fire only after the last crossing.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `light.brightness_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: light.brightness_crossed_threshold
  target:
    entity_id: light.living_room
  options:
    threshold: 50
    behavior: any
{% endexample %}

This fires whenever the living room light crosses 50% brightness in either direction.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The brightness percentage the light has to cross for the trigger to fire. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
behavior:
  description: >
    When multiple lights are targeted, controls when the trigger fires. Accepts `any`, `first`, or `last`.
  required: true
  type: string
  default: any
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- The trigger fires on any crossing, up or down. If you only want one direction, gate the automation with a numeric condition that checks whether the light's brightness is above or below the threshold.
- The threshold is measured against the light's brightness percentage. A light at 0% (off) and the same light at 1% are both below a 50% threshold.
- Pair this trigger with [Light is brightness](/conditions/light.is_brightness/) in follow-up conditions to double-check the final state.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: start mood lighting when the ceiling light dims below 40%

When you dim the ceiling light below 40% in the evening, turn on the accent lighting so the room feels layered instead of dim.

- **Trigger**: Light brightness crossed threshold
- **Target**: Living room ceiling light
- **Threshold type**: 40
- **Trigger when**: Any
- **Condition**: Sun is below horizon
- **Condition**: Ceiling light brightness is below 40%
- **Action**: Light: Turn on (accent lights)

{% details "YAML example for mood lighting on dim" %}

{% example %}
automation: |
  alias: "Mood lighting on dim"
  triggers:
    - trigger: light.brightness_crossed_threshold
      target:
        entity_id: light.living_room_ceiling
      options:
        threshold: 40
        behavior: any
  conditions:
    - condition: sun
      after: sunset
    - condition: light.is_brightness
      target:
        entity_id: light.living_room_ceiling
      options:
        threshold: 40
        behavior: any
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room_accent
      data:
        brightness_pct: 60
        color_name: warm_white
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

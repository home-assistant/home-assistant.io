---
title: "Light brightness crossed threshold"
trigger: light.brightness_crossed_threshold
domain: light
description: "Triggers when the brightness of one or more lights crosses a threshold."
related_triggers:
  - light.brightness_changed
  - light.turned_on
---

The **Light brightness crossed threshold** trigger fires when the brightness of a light {% term entity %} crosses into a zone you define. Use it to react to a light rising above a level, dropping below a level, entering a range, or leaving a range, like starting an automation only once brightness rises above 50%. Brightness is measured as a percentage of full brightness, from 0 to 100.

Unlike [Light brightness changed](/triggers/light.brightness_changed/), which fires on every change that matches the threshold, this trigger only fires at the moment the brightness crosses into the zone. It does not fire again until the brightness leaves the zone and crosses into it again.

When you target more than one light, the trigger's **Trigger when** option controls when it fires.

{% include triggers/ui_header.md %}

{% include triggers/threshold_crossed_steps.md
   title="Light brightness crossed threshold"
   sensor="light"
   areas="living room or bedroom"
   unit_phrase_ui="a fixed percentage (0–100%)" %}

### Options in the UI

{% include triggers/threshold_crossed_options_ui.md
   unit_phrase_ui="a fixed percentage (0–100%)" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `light.brightness_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: light.brightness_crossed_threshold
  target:
    entity_id: light.living_room
  options:
    threshold:
      type: above
      value:
        number: 50
{% endexample %}

This fires when the living room light's brightness rises above 50%.

### Options in YAML

{% include triggers/threshold_crossed_options_yaml.md
   unit_phrase_yaml="literal percentage 0–100"
   example_value="50" %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The threshold type sets the direction. With **Above**, the trigger fires when the brightness rises above the threshold. With **Below**, it fires when the brightness drops below it.
- A light that is off has no brightness value. Turning a light off does not fire the trigger, not even with **Below**. Turning a light on fires the trigger if the new brightness is inside the zone, for example, turning a light on at 70% fires an **Above** 50% trigger.
- If you use an entity as the threshold, it must report its value in percent (`%`). An entity with a different unit, or no unit, is ignored and the trigger does not fire.
- Pair this trigger with [Light brightness](/conditions/light.is_brightness/) in follow-up conditions to double-check the final state.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: start mood lighting when the ceiling light dims below 40%

When you dim the ceiling light below 40% in the evening, turn on the accent lighting so the room feels layered instead of dim.

- **Trigger**: Light brightness crossed threshold
  - **Target**: Living room ceiling light
  - **Threshold type**: Below 40%
  - **Trigger when**: Each
- **Condition**: Sun is below horizon
- **Condition**: Light brightness
  - **Target**: Living room ceiling light
  - **Threshold type**: Below 40%
- **Action**: Turn on light (accent lights)

{% details "YAML example for mood lighting on dim" %}

{% example %}
automation: |
  alias: "Mood lighting on dim"
  triggers:
    - trigger: light.brightness_crossed_threshold
      target:
        entity_id: light.living_room_ceiling
      options:
        threshold:
          type: below
          value:
            number: 40
  conditions:
    - condition: sun
      after: sunset
    - condition: light.is_brightness
      target:
        entity_id: light.living_room_ceiling
      options:
        threshold:
          type: below
          value:
            number: 40
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

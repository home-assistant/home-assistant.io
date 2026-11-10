---
title: "Light brightness"
condition: light.is_brightness
domain: light
description: "Tests the brightness of one or more lights."
related_conditions:
  - light.is_on
  - light.is_off
---

The **Light brightness** condition passes when a light {% term entity %}'s brightness meets a threshold you set. You can check that the brightness is above, below, or within a specific range. Brightness is measured as a percentage of full brightness, from 0 to 100. Use it to gate an automation based on how bright the light currently is, not just whether it's on or off.

When you target more than one light, the condition's **Condition passes if** option controls how the check combines. You can require any targeted light's brightness to match, or demand that all of them do.

{% include conditions/ui_header.md %}

{% include conditions/threshold_value_steps.md
   title="Light brightness"
   sensor="light"
   areas="living room or bedroom"
   value_long="a fixed percentage directly, for example `50` for 50%" %}

### Options in the UI

{% include conditions/threshold_value_options_ui.md
   value_short="a fixed percentage (0–100)" %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `light.is_brightness`. A basic example looks like this:

{% example %}
condition: |
  condition: light.is_brightness
  target:
    entity_id: light.living_room
  options:
    threshold:
      type: above
      value:
        number: 50
    behavior: any
{% endexample %}

This passes when the living room light's brightness is above 50%.

### Options in YAML

{% include conditions/threshold_value_options_yaml.md
   range_note="0–100"
   number_final="a percentage value (0–100)"
   threshold_required="true" %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- A light that is off has no brightness value, so it never passes this condition, not even with **Below**. To check whether a light is off, use [Light is off](/conditions/light.is_off/) instead.
- If you use an entity as the threshold, it must report its value in percent (`%`). An entity with a different unit, or no unit, is ignored and the condition does not pass.
{% include conditions/unavailable_targets.md entities="lights" %}
- Pair with [Light brightness crossed threshold](/triggers/light.brightness_crossed_threshold/) as a matching trigger when you need the automation to run the moment the brightness crosses that line.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only start the movie scene if the room is dim enough

When the movie-night button is pressed, only start the movie scene if the living room light is dimmer than 40%. If the room is still bright, prompt for manual dimming first.

- **Trigger**: State changed: Movie night button pressed
- **Condition**: Light brightness
  - **Target**: Living room light
  - **Threshold type**: Below 40%
  - **Condition passes if**: Any
- **Action**: Activate scene
  - **Target**: Movie night

{% details "YAML example for a dim-gated movie scene" %}

{% example %}
automation: |
  alias: "Movie scene only if dim"
  triggers:
    - trigger: state
      entity_id: input_button.movie_night
  conditions:
    - condition: light.is_brightness
      target:
        entity_id: light.living_room
      options:
        threshold:
          type: below
          value:
            number: 40
        behavior: any
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.movie_night
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

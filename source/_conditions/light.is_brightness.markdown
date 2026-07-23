---
title: "Light brightness"
condition: light.is_brightness
domain: light
description: "Tests the brightness of one or more lights."
related_conditions:
  - light.is_on
  - light.is_off
---

The **Light brightness** condition passes when a light {% term entity %}'s brightness meets a threshold you set. Use it to gate an automation based on how bright the light currently is, not just whether it's on or off.

When you target more than one light, the condition's **behavior** option controls how the check combines. You can require any targeted light's brightness to match, or demand that all of them do.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Light brightness**.
5. Under **Targets**, select the light entity, an area, a floor, or a label.
6. Under **Threshold type**, set the brightness percentage the condition checks against.
7. Under **Condition passes if**, pick **Any** or **All**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The brightness level the light has to meet or exceed. Expressed as a percentage of full brightness.
  required: true
Condition passes if:
  description: When multiple lights are targeted, controls how results combine. Pick **Any** to pass if at least one light meets the threshold, or **All** to pass only when every targeted light does.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `light.is_brightness`. A basic example looks like this:

{% example %}
condition: |
  condition: light.is_brightness
  target:
    entity_id: light.living_room
  options:
    threshold: 50
    behavior: any
{% endexample %}

This passes when the living room light's brightness is at or above 50%.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The brightness percentage the light has to meet or exceed for the condition to pass. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
  required: false
  type: any
behavior:
  description: >
    When multiple lights are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
{% endoptions_yaml %}

{% include conditions/targets.md %}

## Good to know

- A light that is off has brightness zero, so it never meets a positive threshold. Combine with [Light is on](/conditions/light.is_on/) if you want to check both.
- Lights that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped for **Any** and fail for **All**.
- Pair with [Light brightness crossed threshold](/triggers/light.brightness_crossed_threshold/) as a matching trigger when you need the automation to run the moment the brightness crosses that line.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only start the movie scene if the room is dim enough

When the movie-night button is pressed, only start the movie scene if the living room light is dimmer than 40%. If the room is still bright, prompt for manual dimming first.

- **Trigger**: State: Movie night button pressed
- **Condition**: Light brightness
- **Target**: Living room light
- **Threshold type**: 40
- **Condition passes if**: Any
- **Action**: Scene: Movie night

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
        threshold: 40
        behavior: any
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.movie_night
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

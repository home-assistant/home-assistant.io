---
title: "Light brightness changed"
trigger: light.brightness_changed
domain: light
description: "Triggers when the brightness of one or more lights changes."
related_triggers:
  - light.brightness_crossed_threshold
  - light.turned_on
---

The **Light brightness changed** trigger fires after the brightness of a light {% term entity %} changes. Use it to react to dimming, like adjusting a fan speed as you brighten the room, or logging changes to a dashboard graph. Brightness is measured as a percentage of full brightness, from 0 to 100.

The threshold type controls where the new brightness must land for the trigger to fire. You can require the new brightness to be above a level, below a level, within a range, or outside a range. You can also select **Any change** to fire on every change.

{% include triggers/ui_header.md %}

{% include triggers/threshold_changed_steps.md
   title="Light brightness changed"
   sensor="light"
   areas="living room or bedroom"
   unit_phrase_ui="a fixed percentage (0–100%)" %}

### Options in the UI

{% include triggers/threshold_changed_options_ui.md
   unit_phrase_ui="a fixed percentage (0–100%)" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `light.brightness_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: light.brightness_changed
  target:
    entity_id: light.living_room
  options:
    threshold:
      type: above
      value:
        number: 10
{% endexample %}

This fires whenever the living room light's brightness changes to a value above 10%. To fire on any change, use `type: any` and leave out `value`.

### Options in YAML

{% include triggers/threshold_changed_options_yaml.md
   unit_phrase_yaml="literal percentage 0–100" %}

{% include triggers/targets.md %}

## Good to know

- The threshold type controls which changes fire the trigger. Use **Above** or **Below** to fire only when the new brightness is above or below a value, **In range** to fire only when it's inside a range, and **Outside range** to fire only when it's outside a range. Use **Any change** to fire on every change.
- To react only when brightness first crosses a specific level, use [Light brightness crossed threshold](/triggers/light.brightness_crossed_threshold/) instead.
- A light that is off has no brightness value, so turning a light off does not fire the trigger. Turning a light on does fire the trigger if the new brightness matches the threshold.
- If you use an entity as the threshold, it must report its value in percent (`%`). An entity with a different unit, or no unit, is ignored and the trigger does not fire.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: sync a ceiling fan speed to the ceiling light

When you dim the ceiling light below 10%, slow the fan down too. A classic "scene mood" automation that keeps the room coordinated.

- **Trigger**: Light brightness changed
  - **Target**: Living room ceiling light
  - **Threshold type**: Below 10%
- **Action**: Set fan speed
  - **Target**: Living room fan
  - **Percentage**: `20`%

{% details "YAML example for a ceiling-light-linked fan" %}

{% example %}
automation: |
  alias: "Match fan to ceiling light"
  triggers:
    - trigger: light.brightness_changed
      target:
        entity_id: light.living_room_ceiling
      options:
        threshold:
          type: below
          value:
            number: 10
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.living_room
      data:
        percentage: 20
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

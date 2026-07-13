---
title: "Light brightness changed"
trigger: light.brightness_changed
domain: light
description: "Triggers when the brightness of one or more lights changes."
related_triggers:
  - light.brightness_crossed_threshold
  - light.turned_on
---

The **Light brightness changed** trigger fires after the brightness of a light {% term entity %} changes by a meaningful amount. Use it to react to fine-grained dimming, like adjusting a fan speed as you brighten the room, or logging changes to a dashboard graph.

The **threshold** field tells Home Assistant how big a change counts. The trigger only fires when the light's brightness moves by at least that much, which keeps it from firing on every tiny tick from a smooth fade.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Light: Light brightness changed**.
5. Under **Targets**, select the light entity, an area, a floor, or a label.
6. Under **Threshold type**, set how much the brightness has to change before the trigger fires.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: How much the brightness has to change before the trigger fires, as a percentage of full brightness. Can be a fixed number, or reference a helper entity that provides the value.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `light.brightness_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: light.brightness_changed
  target:
    entity_id: light.living_room
  options:
    threshold: 10
{% endexample %}

This fires whenever the living room light's brightness changes by at least ten percent.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The minimum amount (in percent) the brightness must change before the trigger fires. Accepts a number, or a reference to an `input_number`, `number`, or `sensor` entity with a percent unit.
  required: false
  type: any
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- The trigger uses absolute percentage change, so a jump from 20% to 30% is the same size as a drop from 80% to 70%.
- To react only when brightness crosses a fixed line in one direction, use [Light brightness crossed threshold](/triggers/light.brightness_crossed_threshold/) instead.
- The trigger only fires when the light is on. It does not fire when the light transitions from off to on.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: sync a ceiling fan speed to the ceiling light

When you dim the ceiling light down, slow the fan down too. A classic "scene mood" automation that keeps the room coordinated.

- **Trigger**: Light brightness changed
- **Target**: Living room ceiling light
- **Threshold type**: 10
- **Action**: Fan: Set speed

{% details "YAML example for a ceiling-light-linked fan" %}

{% example %}
automation: |
  alias: "Match fan to ceiling light"
  triggers:
    - trigger: light.brightness_changed
      target:
        entity_id: light.living_room_ceiling
      options:
        threshold: 10
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.living_room
      data:
        percentage: "{{ state_attr('light.living_room_ceiling', 'brightness_pct') | int }}"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

---
title: "Thermostat target humidity changed"
trigger: climate.target_humidity_changed
domain: climate
description: "Triggers after the humidity setpoint of one or more thermostats changes."
related_triggers:
  - climate.target_humidity_crossed_threshold
  - climate.target_temperature_changed
---

The **Thermostat target humidity changed** trigger fires after the target humidity (setpoint) of a thermostat {% term entity %} changes. The target humidity is what you want the thermostat to maintain, not the current room humidity. Some thermostats support humidity control and allow you to set a target humidity level in addition to temperature. Use this trigger when you want to react to adjustments in the desired humidity, whether they're made through the UI, an {% term automation %}, a voice command, or directly on the device.

Use the threshold type to filter which changes matter to your automation. You can fire on any change, or only when the new setpoint is above, below, inside, or outside a specific range.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Thermostat target humidity changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Thermostat target humidity changed**.
6. Under **Threshold type**, configure what kind of change fires the trigger:
   - Select **Any change** to fire on any change, regardless of direction or new value.
   - Select **Above** or **Below** and enter a value (in %) to fire only when the new setpoint is above or below that value.
   - Select **In range** and enter a lower and upper bound to fire only when the new setpoint falls inside the range.
   - Select **Outside range** and enter a lower and upper bound to fire only when the new setpoint is outside the range.
   - For each option, you can enter a fixed percentage or pick a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold.
     - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls which changes fire the trigger:

    - **Any change**: fires on any change, regardless of direction or new value.
    - **Above** or **Below**: enter a value (in %) to fire only when the new setpoint is above or below that value.
    - **In range**: enter a lower and upper bound to fire only when the new setpoint falls between them.
    - **Outside range**: enter a lower and upper bound to fire only when the new setpoint is below the lower bound or above the upper bound.

    For each mode you can enter a fixed percentage or reference a sensor entity or a [number helper](/integrations/input_number/) entity.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Thermostat target humidity changed** is referred to as `climate.target_humidity_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: climate.target_humidity_changed
  target:
    entity_id: climate.bedroom
  options:
    threshold:
      type: above
      value:
        number: 50
{% endexample %}

This fires whenever the target humidity of `climate.bedroom` changes to a value above 50%. To fire on any change regardless of direction or value, use `type: any` and omit `value`.

To fire only when the new setpoint is within a comfortable range:

{% example %}
trigger: |
  trigger: climate.target_humidity_changed
  target:
    entity_id: climate.bedroom
  options:
    threshold:
      type: between
      value_min:
        number: 40
      value_max:
        number: 60
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    A map that defines when the trigger should fire based on how the target humidity changes. The threshold contains two keys: `type` and `value` (or `value_min` and `value_max` for range-based types).

    The `type` key determines the kind of threshold:

    - `any` fires on any target humidity change, regardless of the new value. When using `any`, you don't need to include `value`.
    - `above` fires only when the new target humidity is above a specific value (in %).
    - `below` fires only when the new target humidity is below a specific value (in %).
    - `between` fires only when the new target humidity is inside a range (between `value_min` and `value_max`).
    - `outside` fires only when the new target humidity is outside a range (below `value_min` or above `value_max`).

    The `value` key is a map specifying the threshold humidity. You can use either:

    - A `number` key with a numerical value (percentage 0-100), or
    - An `entity` key with the entity ID of a humidity sensor or a [number helper](/integrations/input_number/) whose value represents the threshold percentage.

    For example:

    ```yaml
    threshold:
      type: outside
      value_min:
        entity: input_number.comfortable_humidity_min
      value_max:
        number: 60
    ```

    A `sensor` or `number` entity's current value is used as the threshold, which lets you compare two humidity setpoints dynamically.
  required: true
  type: map
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- The threshold type controls both the direction and the landing zone of the change. Use **Above** or **Below** to filter by direction, **In range** to fire only when the new value is inside a range, and **Outside range** to fire only when it escapes a range.
- Use **Any change** to fire on every change regardless of direction or where the new value lands.
- To react only when the target humidity first crosses a specific level, use [Thermostat target humidity crossed threshold](/triggers/climate.target_humidity_crossed_threshold/) instead.
- The trigger only works with [climate](/integrations/climate/) entities that expose a target humidity attribute. Not all thermostats support humidity control.
- Humidity values are expressed as percentages (0-100%).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: adjust humidifiers when first thermostat humidity setpoint changes

When the first thermostat in the bedroom area changes its target humidity to a value above 50%, turn on all standalone humidifiers to supplement the climate systems. Firing on the first change prevents multiple humidifier activations.

- **Trigger**: Thermostat target humidity changed
  - **Target**: Bedroom area
  - **Threshold type**: Above (50%)
  - **Trigger when**: First
- **Action**: Turn on humidifier

{% details "YAML example for supplemental humidifier control" %}

{% example %}
automation: |
  alias: "Turn on humidifiers for high humidity targets"
  triggers:
    - trigger: climate.target_humidity_changed
      target:
        area_id: bedroom
      options:
        threshold:
          type: above
          value:
            number: 50
        behavior: first
  actions:
    - action: humidifier.turn_on
      target:
        entity_id: humidifier.bedroom
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

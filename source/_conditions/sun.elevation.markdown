---
title: "Sun elevation"
condition: sun.elevation
domain: sun
description: "Tests the sun's elevation against a threshold you set."
related_conditions:
  - sun.is_up
  - sun.is_set
  - sun.is_night
---

The **Sun elevation** condition passes when the sun's elevation meets a threshold you set. Elevation is the angle between the sun and the horizon: 0° is right at the horizon, positive values are above it, and negative values are below it. Home Assistant works this out from your [home location](/docs/configuration/basic/).

Because elevation tracks the real position of the sun, it adapts to the seasons in a way a fixed clock time cannot. Use it to gate an automation on how high or low the sun actually is, like only closing the blinds while the sun sits low enough to cause glare.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Sun: Sun elevation**.
5. Under **Threshold type**, choose how the elevation is compared:
   - Select **Above** or **Below** and enter an angle in degrees.
   - Select **In range** and enter a lower and upper angle.
   - Select **Outside range** and enter a lower and upper angle.
   - For each option, you can enter a fixed angle in degrees, or reference a sensor entity or a [number helper](/integrations/input_number/) entity that holds the angle.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    How the sun's elevation is compared. Angles are in degrees, where 0° is the horizon, positive is above, and negative is below.

    - **Above** (exclusive): passes when the elevation is strictly above the angle.
    - **Below** (exclusive): passes when the elevation is strictly below the angle.
    - **In range** (exclusive): passes when the elevation is strictly between the two angles.
    - **Outside range** (inclusive): passes when the elevation is at or beyond either angle.

    For each mode you can enter a fixed angle in degrees, or reference a sensor entity or a [number helper](/integrations/input_number/) entity.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `sun.elevation`. A basic example looks like this:

{% example %}
condition: |
  condition: sun.elevation
  options:
    threshold:
      type: below
      value:
        number: 4
{% endexample %}

This passes while the sun is below 4° of elevation, a common stand-in for "it is getting dark."

### Options in YAML

{% options_yaml %}
threshold:
  description: |
    How the sun's elevation is compared. Angles are in degrees.

    - `type: above` (exclusive): Passes when the elevation is strictly above `value`. Provide `value` with a `number` key (a fixed angle in degrees) or an `entity` key (an `input_number`, `number`, or `sensor` entity).
    - `type: below` (exclusive): Passes when the elevation is strictly below `value`. Provide `value` with a `number` key (a fixed angle in degrees) or an `entity` key (an `input_number`, `number`, or `sensor` entity).
    - `type: between` (exclusive): Passes when the elevation is strictly between `value_min` and `value_max`. Provide both, each with a `number` key (a fixed angle in degrees) or an `entity` key.
    - `type: outside` (inclusive): Passes when the elevation is at or beyond `value_min` or `value_max`. Provide both, each with a `number` key (a fixed angle in degrees) or an `entity` key.
  required: true
  type: map
{% endoptions_yaml %}

## Good to know

- This condition does not use a target. It always checks the sun at your configured home location.
- A threshold around 0° corresponds roughly to sunrise and sunset. For those, [Sun is up](/conditions/sun.is_up/) and [Sun is set](/conditions/sun.is_set/) are simpler. Reach for **Sun elevation** when you need a specific angle.
- The maximum elevation the sun reaches depends on your latitude and the time of year, so pick angles the sun actually reaches at your location.
- When you use an entity as the threshold, its value is read at the moment the condition runs. It is not tracked continuously; it is re-evaluated each time the automation fires.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: close blinds only while the sun is low

When the patio is occupied, close the west-facing blinds, but only while the sun sits low in the sky (below 15° of elevation), where it causes the most glare.

- **Trigger**: Patio occupancy detected
- **Condition**: Sun elevation (below 15°)
- **Action**: Close the west-facing blinds

{% details "YAML example for glare-based blinds" %}

{% example %}
automation: |
  alias: "Close blinds against low sun"
  triggers:
    - trigger: state
      entity_id: binary_sensor.patio_occupancy
      to: "on"
  conditions:
    - condition: sun.elevation
      options:
        threshold:
          type: below
          value:
            number: 15
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.west_blinds
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

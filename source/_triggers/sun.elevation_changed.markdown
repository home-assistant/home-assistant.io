---
title: "Sun elevation changed"
trigger: sun.elevation_changed
domain: sun
description: "Triggers whenever the sun's elevation changes, optionally limited to a threshold or range you set."
related_triggers:
  - sun.elevation_crossed_threshold
  - sun.solar_noon
  - sun.solar_midnight
---

The **Sun elevation changed** trigger fires when the sun's elevation changes. Elevation is the angle between the sun and the horizon: 0° is right at the horizon, positive values are above it, and negative values are below it. Home Assistant recalculates the elevation continuously as the sun moves through the sky.

Use the threshold type to filter which changes matter. You can react to any change, or only to changes that land above an angle, below an angle, inside a range, or outside a range. This is handy for logging the sun's path or for automations that should respond while the sun stays in a particular part of the sky.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Sun: Sun elevation changed**.
5. Under **Threshold type**, configure which changes fire the trigger:
   - Select **Any change** to fire on every elevation change, regardless of value.
   - Select **Above** or **Below** and enter an angle in degrees to fire only when the new elevation is above or below that angle.
   - Select **In range** and enter a lower and upper angle to fire only when the new elevation falls inside the range.
   - Select **Outside range** and enter a lower and upper angle to fire only when the new elevation is outside the range.
   - For each option except **Any change**, you can enter a fixed angle in degrees, or reference a sensor entity or a [number helper](/integrations/input_number/) entity that holds the angle.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls which changes fire the trigger. Angles are in degrees, where 0° is the horizon, positive is above, and negative is below.

    - **Any change**: fires on any elevation change, regardless of value.
    - **Above** or **Below** (exclusive): fires only when the new elevation is strictly above or below the angle.
    - **In range** (exclusive): fires only when the new elevation is strictly between the two angles.
    - **Outside range** (inclusive): fires when the new elevation is at or below the lower angle, or at or above the upper angle.

    For each mode except **Any change** you can enter a fixed angle in degrees, or reference a sensor entity or a [number helper](/integrations/input_number/) entity.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `sun.elevation_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: sun.elevation_changed
  options:
    threshold:
      type: any
{% endexample %}

This fires on every elevation change. To fire only while the new elevation is above an angle, use `type: above` with a value:

{% example %}
trigger: |
  trigger: sun.elevation_changed
  options:
    threshold:
      type: above
      value:
        number: 30
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    A mapping that defines which kind of change fires the trigger. Angles are in degrees.

    - `type: any`: Fires on any change (no additional keys needed).
    - `type: above` (exclusive): Fires when the new elevation is strictly above `value`. Provide `value` with a `number` key (a fixed angle in degrees) or an `entity` key (an `input_number`, `number`, or `sensor` entity).
    - `type: below` (exclusive): Fires when the new elevation is strictly below `value`. Provide `value` with a `number` key (a fixed angle in degrees) or an `entity` key (an `input_number`, `number`, or `sensor` entity).
    - `type: between` (exclusive): Fires when the new elevation is strictly between `value_min` and `value_max`. Provide both, each with a `number` key (a fixed angle in degrees) or an `entity` key.
    - `type: outside` (inclusive): Fires when the new elevation is at or below `value_min`, or at or above `value_max`. Provide both, each with a `number` key (a fixed angle in degrees) or an `entity` key.
  required: true
  type: map
{% endoptions_yaml %}

## Good to know

- This trigger does not use a target. It always watches the sun at your configured home location.
- Elevation updates often, so **Any change** and the threshold types fire repeatedly while the sun is moving. If you want to react only to a single crossing of an angle, use [Sun elevation crossed threshold](/triggers/sun.elevation_crossed_threshold/) instead.
- The maximum elevation the sun reaches depends on your latitude and the time of year, so pick threshold angles that the sun actually reaches at your location.
- To work with named twilight phases rather than raw angles, use [Dawn](/triggers/sun.dawn/) and [Dusk](/triggers/sun.dusk/).

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, wait for the sun to move, or temporarily set a threshold the sun is about to pass.

{% include triggers/more_examples.md %}

### Automation: dim the lights while the sun is high

While the sun's elevation stays above 30°, keep the living room lights dimmed to save energy when there is plenty of daylight.

- **Trigger**: Sun elevation changed
  - **Threshold type**: Above (30°)
- **Action**: Turn on light (brightness 30%)
  - **Target**: Living room lights

{% details "YAML example for dimming lights while the sun is high" %}

{% example %}
automation: |
  alias: "Dim lights while the sun is high"
  triggers:
    - trigger: sun.elevation_changed
      options:
        threshold:
          type: above
          value:
            number: 30
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room
      data:
        brightness_pct: 30
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

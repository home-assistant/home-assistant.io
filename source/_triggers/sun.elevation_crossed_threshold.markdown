---
title: "Sun elevation crossed threshold"
trigger: sun.elevation_crossed_threshold
domain: sun
description: "Triggers when the sun's elevation crosses a threshold you set."
related_triggers:
  - sun.elevation_changed
  - sun.sunrise
  - sun.sunset
---

The **Sun elevation crossed threshold** trigger fires when the sun's elevation crosses an angle you define. Elevation is the angle between the sun and the horizon: 0° is right at the horizon, positive values are above it, and negative values are below it. The sun climbs to its highest elevation at solar noon and reaches its lowest below the horizon at solar midnight.

Because elevation tracks the real position of the sun, it adapts to the seasons in a way a fixed sunset offset cannot. Use it to turn on lights as the sun gets low, close blinds against a low winter sun, or run solar-aware automations that respond to how high the sun actually is.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Sun elevation crossed threshold**.
5. Under **Threshold type**, configure which crossing fires the trigger:
   - Select **Above** or **Below** and enter an angle in degrees to fire when the elevation crosses that angle.
   - Select **In range** and enter a lower and upper angle to fire when the elevation crosses into that range.
   - Select **Outside range** and enter a lower and upper angle to fire when the elevation crosses out of that range.
   - For each option, you can enter a fixed angle in degrees, or reference a sensor entity or a [number helper](/integrations/input_number/) entity that holds the angle.
6. Optionally, under **For at least**, enter how long the elevation must stay past the threshold before the trigger fires.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls which threshold crossing fires the trigger. Angles are in degrees, where 0° is the horizon, positive is above, and negative is below.

    - **Above** (exclusive): fires when the elevation crosses to strictly above the angle.
    - **Below** (exclusive): fires when the elevation crosses to strictly below the angle.
    - **In range** (exclusive): fires when the elevation crosses into the range.
    - **Outside range** (inclusive): fires when the elevation crosses out of the range.

    For each mode you can enter a fixed angle in degrees, or reference a sensor entity or a [number helper](/integrations/input_number/) entity.
For at least:
  description: How long the elevation must stay past the threshold before the trigger fires. Useful to avoid firing on brief fluctuations. For example, set it to `0:05:00` to fire only after the elevation has stayed past the threshold for 5 minutes. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `sun.elevation_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: sun.elevation_crossed_threshold
  options:
    threshold:
      type: below
      value:
        number: 4
{% endexample %}

This fires when the sun drops below 4° of elevation, a common stand-in for "it's getting dark." To fire when the sun climbs above an angle instead, use `type: above`.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    A mapping that defines the elevation crossing that fires the trigger. Angles are in degrees.

    - `type: above` (exclusive): Fires when the elevation crosses to strictly above `value`. Provide `value` with a `number` key (a fixed angle in degrees) or an `entity` key (an `input_number`, `number`, or `sensor` entity).
    - `type: below` (exclusive): Fires when the elevation crosses to strictly below `value`. Provide `value` with a `number` key (a fixed angle in degrees) or an `entity` key (an `input_number`, `number`, or `sensor` entity).
    - `type: between` (exclusive): Fires when the elevation crosses into the range. Provide `value_min` and `value_max`, each with a `number` key (a fixed angle in degrees) or an `entity` key.
    - `type: outside` (inclusive): Fires when the elevation crosses out of the range. Provide `value_min` and `value_max`, each with a `number` key (a fixed angle in degrees) or an `entity` key.
  required: true
  type: map
for:
  description: >
    How long the elevation must stay past the threshold before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:05:00` fires only after the elevation has stayed past the threshold for 5 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

## Good to know

- This trigger does not use a target. It always watches the sun at your configured home location.
- The trigger fires only on the crossing moment. Once the elevation is above your threshold, it does not fire again until the elevation drops back below it and then crosses up again.
- A threshold around 0° corresponds roughly to sunrise and sunset. Negative angles like -6° correspond to civil twilight. Use [Dawn](/triggers/sun.dawn/) and [Dusk](/triggers/sun.dusk/) if you prefer to work with named twilight phases instead of raw angles.
- The maximum elevation the sun reaches depends on your latitude and the time of year, so pick threshold angles that the sun actually reaches at your location.
- To react to every elevation change rather than a single crossing, use [Sun elevation changed](/triggers/sun.elevation_changed/).

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, wait for the sun to cross your threshold, or temporarily set the threshold to an angle the sun is about to pass.

{% include triggers/more_examples.md %}

### Automation: turn on lights when the sun gets low

When the sun drops below 4° of elevation, turn on the living room lights. This tracks the real position of the sun, so it stays sensible through every season.

- **Trigger**: Sun elevation crossed threshold
  - **Threshold type**: Below (4°)
- **Action**: Turn on light
  - **Target**: Living room lights

{% details "YAML example for turning on lights when the sun is low" %}

{% example %}
automation: |
  alias: "Lights on when the sun is low"
  triggers:
    - trigger: sun.elevation_crossed_threshold
      options:
        threshold:
          type: below
          value:
            number: 4
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room
{% endexample %}

{% enddetails %}

### Automation: close blinds against a low winter sun

When the sun sits low in the sky, between 0° and 15° of elevation, close the west-facing blinds to keep the low glare out. The **For at least** delay avoids reacting to brief readings.

- **Trigger**: Sun elevation crossed threshold
  - **Threshold type**: In range (0-15°)
  - **For at least**: 2 minutes
- **Action**: Close cover
  - **Target**: West-facing blinds

{% details "YAML example for blinds against a low sun" %}

{% example %}
automation: |
  alias: "Close blinds against low sun"
  triggers:
    - trigger: sun.elevation_crossed_threshold
      options:
        threshold:
          type: between
          value_min:
            number: 0
          value_max:
            number: 15
        for: "00:02:00"
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.west_blinds
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

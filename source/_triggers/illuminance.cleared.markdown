---
title: "Light level cleared"
trigger: illuminance.cleared
domain: illuminance
description: "Triggers when one or more light sensors stop detecting light."
related_triggers:
  - illuminance.detected
  - illuminance.changed
  - illuminance.crossed_threshold
---

The **Light level cleared** trigger fires when one or more light sensors stop detecting light.

Use it to automate actions when an area becomes dark, like turning on hallway lights at dusk when an outdoor sensor reports no more daylight, or sending a notification when a room sensor stops detecting light.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Light level cleared**.
5. Select **Add target** (see [Targets](#targets)) and pick the light sensor that you want to watch. You can also select an area, a floor, a device, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, you can set how long the sensor must remain dark before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple light sensors are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted sensor stops detecting light.
    - **First**: fires only when the first sensor stops detecting light.
    - **All**: fires only after every targeted sensor stops detecting light.
  required: false
  default: Each
For at least:
  description: How long the sensor or sensors must remain dark before the trigger fires. The default is `0` (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `illuminance.cleared`. A basic example looks like this:

{% example %}
trigger: |
  trigger: illuminance.cleared
  target:
    entity_id: binary_sensor.outdoor_light_sensor
  options:
    for:
      minutes: 2
{% endexample %}

This fires 2 minutes after the outdoor light sensor stops detecting light.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple light sensors are targeted, controls when the trigger fires:

    - `each`: fires every time any targeted sensor stops detecting light.
    - `first`: fires only when the first sensor stops detecting light.
    - `all`: fires only after every targeted sensor stops detecting light.
  required: false
  type: string
  default: each
for:
  description: |
    How long the sensor or sensors must remain dark before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Use a binary sensor with the light device class.
- The sensor's threshold for what counts as "light cleared" is set on the device itself.
- For numeric illuminance readings (in lux), use [Illuminance changed](/triggers/illuminance.changed/) or [Illuminance crossed threshold](/triggers/illuminance.crossed_threshold/) instead.
- Add a small **For at least** delay to avoid firing when a cloud briefly passes over an outdoor sensor.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on hallway lights at dusk

When the outdoor light sensor reports no more daylight for at least 5 minutes, turn on the hallway lights.

- **Trigger**: Light level cleared
  - **Target**: Outdoor light sensor
  - **For at least**: 00:05:00
- **Action**: Turn on light
  - **Target**: light.hallway

{% details "YAML example for turning hallway lights on at dusk" %}

{% example %}
automation: |
  alias: "Turn on hallway lights at dusk"
  triggers:
    - trigger: illuminance.cleared
      target:
        entity_id: binary_sensor.outdoor_light_sensor
      options:
        for: "00:05:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

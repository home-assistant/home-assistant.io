---
title: "Motion cleared"
trigger: motion.cleared
domain: motion
description: "Triggers when one or more motion sensors stop detecting motion."
related_triggers:
  - motion.detected
---

The **Motion cleared** trigger fires when one or more motion sensors stop detecting motion.

Use it to automate actions, such as turning devices on or off, or sending notifications, based on inactivity in an area of the house. Use a single sensor to detect motion in specific spots and a group of sensors for larger areas.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Motion cleared**.
5. Select **Add target** (see [Targets](#targets)) and pick the motion sensor that you want to watch. You can also select an area, a floor, a device, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, you can set how long the sensor must remain without detecting motion before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple motion sensors are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted sensor stops detecting motion.
    - **First**: fires only when the first sensor stops detecting motion.
    - **All**: fires only after every targeted sensor stops detecting motion.
  required: false
For at least:
  description: How long the sensor or sensors must remain without detecting motion before the trigger fires. The default is `0` hours, `00` minutes and `00` seconds (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `motion.cleared`. A basic example looks like this:

{% example %}
trigger: |
  trigger: motion.cleared
  target:
    entity_id: binary_sensor.movement_backyard
  options:
    for:
      hours: 1
      minutes: 5
      seconds: 2
{% endexample %}

This fires 1 hour, 5 minutes and 2 seconds after the sensor entity `binary_sensor.movement_backyard` stops detecting motion.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple motion sensors are targeted, controls when the trigger fires:

    - `each`: fires every time any targeted sensor stops detecting motion.
    - `first`: fires only when the first sensor stops detecting motion.
    - `all`: fires only after every targeted sensor stops detecting motion.
  required: false
  type: string
  default: each
for:
  description: |
    How long the sensor or sensors must remain without detecting motion before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

<!-- Keep the "include" below if your integration supports targets -->
{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Use single sensors for motion detection in areas of passage, such as hallways or entrances, or very specific spots like an office desk.
- Add the **For at least** option to your automation to avoid turning off devices too quickly if someone is still in the room.
- For reliable motion detection in larger areas, you can use grouped motion sensors and [input boolean](/integrations/input_boolean/) helpers.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off HVAC when there is no motion in the office for 15 minutes

When no movement is detected at the office for 15 minutes, this automation turns off the office HVAC (Heating, Ventilating, and Air Conditioning) entities.

- **Trigger**: Motion cleared
  - **Target**: Office motion sensors (by label)
- **Action**: Turn off HVAC (in the office)

{% details "YAML example for turning off office HVAC after inactivity" %}

{% example %}
automation: |
  alias: "Turn off office HVAC after inactivity"
  triggers:
    - trigger: motion.cleared
      target:
        label_id: motion_sensors_office
      options:
        for:
          minutes: 15
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.hvac_office
      data:
        hvac_mode: "off"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

---
title: "Motion detected"
trigger: motion.detected
domain: motion
description: "Triggers after one or more motion sensors start detecting motion."
related_triggers:
  - motion.cleared
---

The **Motion detected** trigger fires when one or more motion sensors start detecting motion.

Use it to automate actions, such as turning devices on or off, or sending notifications, based on motion detection in an area of the house. Use a single motion sensor to detect motion in specific spots and a group of sensors for larger areas.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Motion detected**.
5. Select **Add target** (see [Targets](#targets)) and pick the motion sensor that you want to watch. You can also select an area, a floor, a device, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, you can set how long the sensor must remain detecting motion before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple sensors are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted sensor starts detecting motion.
    - **First** : fires only when the first sensor starts detecting motion.
    - **All**: fires only after every targeted sensors starts detecting motion.
  required: false
For at least:
  description: How long the sensor or sensors must remain detecting motion before the trigger fires. The default is `0` hours, `00` minutes and `00` seconds (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `motion.detected`. A basic example looks like this:

{% example %}
trigger: |
  trigger: motion.detected
  target:
    entity_id: binary_sensor.movement_backyard
  options:
    for:
      hours: 1
      minutes: 5
      seconds: 2
{% endexample %}

This fires 1 hour, 5 minutes and 2 seconds after the sensor entity `binary_sensor.movement_backyard` starts detecting motion.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple humidifiers are targeted, controls when the trigger fires:

    - `any`: fires every time any targeted sensor starts detecting motion.
    - `first`: fires only when the first sensor starts detecting motion.
    - `last`: fires only after every targeted sensors start detecting motion.
  required: false
  type: string
  default: any
for:
  description: |
    How long the sensor or sensors must remain detecting motion before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
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
- For a reliable motion detection in larger areas, you can use grouped motion sensors and [input boolean](/integrations/input_boolean/) helpers.
- When automating lights turn on, combine motion with ambient light sensors, or time conditions, and only turn on lights if the room is dark enough. This avoids unnecessary activations.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on light when motion is detected and it is dark

When motion is detected at the entrance of the hallway and if it is dark, this automation turns on the light there.

- **Trigger**: Motion detected
  - **Target**: Entrance binary sensor
- **Condition**: Time (after 21:30:00 and before 07:00:00)
- **Action**: Turn on light (in hallway)

{% details "YAML example for turning hallway light if it is dark and motion is detected" %}

{% example %}
automation: |
  alias: "Turn on light in hallway if dark and motion is detected"
  triggers:
    - trigger: motion.detected
      target:
        entity_id: binary_sensor.movement_hallway
  conditions:
    - condition: time
      after: "21:30:00"
      before: "07:00:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway_entrance_light
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
---
title: "Vibration detected"
trigger: vibration.detected
domain: vibration
description: "Triggers when one or more vibration sensors start detecting vibration."
related_triggers:
  - vibration.cleared
---

The **Vibration detected** trigger fires when one or more vibration sensors start detecting vibration.

Use it to automate actions, such as turning devices on or off, or sending notifications, when something starts to shake or move. For example, react to a knock on a door, an appliance that starts running, or a package being moved. Use a single sensor for one object and a group of sensors to cover several at once.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Vibration detected**.
5. Select **Add target** (see [Targets](#targets)) and pick the vibration sensor that you want to watch. You can also select an area, a floor, a device, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, you can set how long the sensor must keep detecting vibration before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple vibration sensors are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted sensor starts detecting vibration.
    - **First**: fires only when the first sensor starts detecting vibration.
    - **All**: fires only after every targeted sensor starts detecting vibration.
  required: false
For at least:
  description: How long the sensor or sensors must keep detecting vibration before the trigger fires. The default is `0` hours, `00` minutes and `00` seconds (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `vibration.detected`. A basic example looks like this:

{% example %}
trigger: |
  trigger: vibration.detected
  target:
    entity_id: binary_sensor.washing_machine_vibration
  options:
    for:
      minutes: 1
{% endexample %}

This fires 1 minute after the sensor entity `binary_sensor.washing_machine_vibration` starts detecting vibration.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple vibration sensors are targeted, controls when the trigger fires:

    - `each`: fires every time any targeted sensor starts detecting vibration.
    - `first`: fires only when the first sensor starts detecting vibration.
    - `all`: fires only after every targeted sensor starts detecting vibration.
  required: false
  type: string
  default: each
for:
  description: |
    How long the sensor or sensors must keep detecting vibration before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Vibration sensors are well suited to detecting when an appliance starts running, a knock on a door, or an object being moved or tampered with.
- Add the **For at least** option to avoid firing on brief, one-off vibrations, such as a passing truck or a nearby door closing.
- To cover several machines or a large object at once, target multiple vibration sensors and use the **Trigger when** option to decide whether the trigger fires for each sensor or only once they all detect vibration.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the porch light when someone knocks at night

When the vibration sensor on the front door detects a knock late in the evening, this automation turns on the porch light.

- **Trigger**: Vibration detected
  - **Target**: Front door vibration sensor
- **Condition**: Time (after 22:00:00 and before 06:00:00)
- **Action**: Turn on light
  - **Target**: Porch light

{% details "YAML example for turning on the porch light on a knock at night" %}

{% example %}
automation: |
  alias: "Porch light on a knock at night"
  triggers:
    - trigger: vibration.detected
      target:
        entity_id: binary_sensor.front_door_vibration
  conditions:
    - condition: time
      after: "22:00:00"
      before: "06:00:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

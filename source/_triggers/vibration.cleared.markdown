---
title: "Vibration cleared"
trigger: vibration.cleared
domain: vibration
description: "Triggers when one or more vibration sensors stop detecting vibration."
related_triggers:
  - vibration.detected
---

The **Vibration cleared** trigger fires when one or more vibration sensors stop detecting vibration.

Use it to automate actions when something stops shaking or moving, such as sending a notification when a washing machine finishes its cycle, or when a running appliance goes quiet. Use a single sensor for one object and a group of sensors to cover several at once.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Vibration cleared**.
5. Select **Add target** (see [Targets](#targets)) and pick the vibration sensor that you want to watch. You can also select an area, a floor, a device, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, you can set how long the sensor must stay without detecting vibration before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple vibration sensors are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted sensor stops detecting vibration.
    - **First**: fires only when the first sensor stops detecting vibration.
    - **All**: fires only after every targeted sensor stops detecting vibration.
  required: false
For at least:
  description: How long the sensor or sensors must stay without detecting vibration before the trigger fires. The default is `0` hours, `00` minutes and `00` seconds (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `vibration.cleared`. A basic example looks like this:

{% example %}
trigger: |
  trigger: vibration.cleared
  target:
    entity_id: binary_sensor.washing_machine_vibration
  options:
    for:
      minutes: 5
{% endexample %}

This fires 5 minutes after the sensor entity `binary_sensor.washing_machine_vibration` stops detecting vibration.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple vibration sensors are targeted, controls when the trigger fires:

    - `each`: fires every time any targeted sensor stops detecting vibration.
    - `first`: fires only when the first sensor stops detecting vibration.
    - `all`: fires only after every targeted sensor stops detecting vibration.
  required: false
  type: string
  default: each
for:
  description: |
    How long the sensor or sensors must stay without detecting vibration before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- A washing machine or dryer often pauses between stages of its cycle. Set **For at least** to a few minutes to avoid a false "finished" notification during those pauses.
- Pair this trigger with [Vibration detected](/triggers/vibration.detected/) to track both when a machine starts and when it stops.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify when the washing machine finishes

When the washing machine's vibration sensor stops detecting vibration for 5 minutes, this automation sends a notification that the laundry is done.

- **Trigger**: Vibration cleared
  - **Target**: Washing machine vibration sensor
  - **For at least**: 00:05:00
- **Action**: Send a notification message
  - **Target**: My device (`notify.my_device`)

{% details "YAML example for a laundry-done notification" %}

{% example %}
automation: |
  alias: "Notify when the washing machine finishes"
  triggers:
    - trigger: vibration.cleared
      target:
        entity_id: binary_sensor.washing_machine_vibration
      options:
        for:
          minutes: 5
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The washing machine has finished. Time to hang the laundry.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

---
title: "Moisture detected"
trigger: moisture.detected
domain: moisture
description: "Triggers after one or more moisture sensors start detecting moisture."
related_triggers:
  - moisture.cleared
  - moisture.changed
  - moisture.crossed_threshold
---

The **Moisture detected** trigger fires when one or more moisture binary sensors start detecting water. Use it with leak sensors under a sink, behind a dishwasher, next to a washing machine, or in a basement to react the moment water is present.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Moisture detected**.
5. Select **Add target** (see [Targets](#targets)) and pick the leak sensor you want to watch. You can also select an area, a floor, a device, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, you can set how long the sensor must keep detecting moisture before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple moisture sensors are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted sensor starts detecting moisture.
    - **First**: fires only when the first sensor starts detecting moisture.
    - **All**: fires only after every targeted sensor starts detecting moisture.
  required: false
For at least:
  description: How long the sensor or sensors must keep detecting moisture before the trigger fires. The default is `0` (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `moisture.detected`. A basic example looks like this:

{% example %}
trigger: |
  trigger: moisture.detected
  target:
    entity_id: binary_sensor.kitchen_sink_leak
{% endexample %}

This fires when the leak sensor under the kitchen sink detects water.

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple moisture sensors are targeted, controls when the trigger fires:

    - `each` (default): fires every time any targeted sensor starts detecting moisture.
    - `first`: fires only when the first sensor starts detecting moisture.
    - `all`: fires only after every targeted sensor starts detecting moisture.
  required: false
  type: string
  default: each
for:
  description: How long the sensor or sensors must keep detecting moisture before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger works with binary sensors that have the **moisture** device class, such as water leak sensors.
- A sensor in the `unknown` or `unavailable` state does not count as detecting moisture.
- To react when a leak clears instead, use [Moisture cleared](/triggers/moisture.cleared/).
- For percentage-based moisture sensors (such as soil moisture probes), use [Moisture content changed](/triggers/moisture.changed/) or [Moisture content crossed threshold](/triggers/moisture.crossed_threshold/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: shut off the water main when a leak is detected

When any leak sensor in the house detects water, close the smart water shutoff valve and send a critical notification.

- **Trigger**: Moisture detected
  - **Target**: All leak sensors (by label)
  - **Trigger when**: Each
- **Action 1**: Close valve
  - **Target**: Water main valve
- **Action 2**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a leak shutoff automation" %}

{% example %}
automation: |
  alias: "Shut off water on leak detection"
  triggers:
    - trigger: moisture.detected
      target:
        label_id: leak_sensors
  actions:
    - action: valve.close_valve
      target:
        entity_id: valve.water_main
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Leak detected! The water main has been closed."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

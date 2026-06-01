---
title: "Moisture cleared"
trigger: moisture.cleared
domain: moisture
description: "Triggers after one or more moisture sensors stop detecting moisture."
related_triggers:
  - moisture.detected
  - moisture.changed
  - moisture.crossed_threshold
---

The **Moisture cleared** trigger fires when one or more moisture binary sensors stop detecting water. Use it to know when a leak has dried up, when a freshly mopped floor is dry again, or to reset a warning after a wet area returns to normal.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Moisture cleared**.
5. Select **Add target** (see [Targets](#targets)) and pick the leak sensor you want to watch. You can also select an area, a floor, a device, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, you can set how long the sensor must stay dry before the trigger fires. Use this to avoid reacting on a brief recovery between drips.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple moisture sensors are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted sensor stops detecting moisture.
    - **First**: fires only when the first sensor stops detecting moisture.
    - **All**: fires only after every targeted sensor stops detecting moisture.
  required: false
For at least:
  description: How long the sensor or sensors must stay dry before the trigger fires. The default is `0` hours, `00` minutes and `00` seconds (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `moisture.cleared`. A basic example looks like this:

{% example %}
trigger: |
  trigger: moisture.cleared
  target:
    entity_id: binary_sensor.basement_leak
  options:
    for: "00:10:00"
{% endexample %}

This fires after the basement leak sensor has been dry for 10 minutes.

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple moisture sensors are targeted, controls when the trigger fires:

    - `any` (**Each** in the UI, default): fires every time any targeted sensor stops detecting moisture.
    - `first` (**First** in the UI): fires only when the first sensor stops detecting moisture.
    - `last` (**All** in the UI): fires only after every targeted sensor stops detecting moisture.
  required: false
  type: string
  default: any
for:
  description: How long the sensor or sensors must stay dry before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger works with binary sensors that have the **moisture** device class, such as water leak sensors.
- A sensor in the `unknown` or `unavailable` state does not count as dry.
- Using **For at least** with a few minutes helps avoid reacting on a momentary recovery while the area is still wet.
- To react when moisture is first detected, use [Moisture detected](/triggers/moisture.detected/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: clear the leak warning once the area is dry

After a leak sensor has been dry for 15 minutes, send a notification so you know the situation has stabilized and the alert can be acknowledged.

- **Trigger**: Moisture cleared
  - **Target**: Basement leak sensor
  - **Trigger when**: Each
  - **For at least**: 00:15:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a leak-cleared notification" %}

{% example %}
automation: |
  alias: "Notify when basement leak is cleared"
  triggers:
    - trigger: moisture.cleared
      target:
        entity_id: binary_sensor.basement_leak
      options:
        for: "00:15:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The basement leak sensor has been dry for 15 minutes."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

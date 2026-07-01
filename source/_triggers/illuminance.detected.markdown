---
title: "Light level detected"
trigger: illuminance.detected
domain: illuminance
description: "Triggers when one or more light sensors start detecting light."
related_triggers:
  - illuminance.cleared
  - illuminance.changed
  - illuminance.crossed_threshold
---

The **Light level detected** trigger fires when one or more light sensors start detecting light.

Use it to automate actions when a dark area becomes lit, like sending a notification when a closet light is accidentally left on, or turning off a night light at dawn when an outdoor sensor first picks up daylight.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Light level detected**.
5. Select **Add target** (see [Targets](#targets)) and pick the light sensor that you want to watch. You can also select an area, a floor, a device, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, you can set how long the sensor must keep detecting light before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple light sensors are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted sensor starts detecting light.
    - **First**: fires only when the first sensor starts detecting light.
    - **All**: fires only after every targeted sensor starts detecting light.
  required: false
For at least:
  description: How long the sensor or sensors must keep detecting light before the trigger fires. The default is `0` (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `illuminance.detected`. A basic example looks like this:

{% example %}
trigger: |
  trigger: illuminance.detected
  target:
    entity_id: binary_sensor.closet_light_sensor
  options:
    for:
      minutes: 5
{% endexample %}

This fires 5 minutes after the closet light sensor starts detecting light.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple light sensors are targeted, controls when the trigger fires:

    - `each`: fires every time any targeted sensor starts detecting light.
    - `first`: fires only when the first sensor starts detecting light.
    - `all`: fires only after every targeted sensor starts detecting light.
  required: false
  type: string
  default: each
for:
  description: |
    How long the sensor or sensors must keep detecting light before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger works with binary sensors that have the **light** device class. The sensor's threshold for what counts as "light detected" is set on the device itself.
- For numeric illuminance readings (in lux), use [Illuminance changed](/triggers/illuminance.changed/) or [Illuminance crossed threshold](/triggers/illuminance.crossed_threshold/) instead.
- Combine **For at least** with a small duration to avoid false triggers from brief light flickers, such as headlights passing a window.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify when the closet light is left on

When the closet light sensor detects light for more than 10 minutes, send a notification so a light left on by mistake doesn't go unnoticed.

- **Trigger**: Light level detected
  - **Target**: Closet light sensor
  - **For at least**: 00:10:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a closet light reminder" %}

{% example %}
automation: |
  alias: "Notify if closet light is left on"
  triggers:
    - trigger: illuminance.detected
      target:
        entity_id: binary_sensor.closet_light_sensor
      options:
        for: "00:10:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The closet light has been on for over 10 minutes."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

---
title: "Humidifier current humidity changed"
trigger: humidifier.current_humidity_changed
domain: humidifier
description: "Triggers after the humidity measured by one or more humidifiers changes."
related_triggers:
  - humidifier.current_humidity_crossed_threshold
  - humidifier.started_humidifying
  - humidifier.started_drying
---

The **Humidifier current humidity changed** trigger fires when the current humidity reading reported by a humidifier {% term entity %} changes. The current humidity is the actual measurement the device reads from its built-in sensor, not the target humidity you set as a goal. Use **Humidifier current humidity changed** to react to the environment shifting in real time, for example to send a notification when the room becomes too dry, keep a dehumidifier running while conditions call for it, or coordinate other devices as humidity levels change.

You can optionally filter the trigger to only fire when the new reading is above or below a specific value. Leave both options empty to fire on every change.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Humidifier current humidity changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your humidifier is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Humidifier current humidity changed**.
6. Optionally, under **Above**, enter a value to only fire when the humidity changes to a reading above that level. Under **Below**, enter a value to only fire when the humidity changes to a reading below that level. Leave both empty to fire on any change.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Above:
  description: Only fire when the humidity changes to a value above this level. Can be a fixed number or a reference to an `input_number`, `number`, or `sensor` helper entity. Default is empty (no lower bound filter).
  required: false
Below:
  description: Only fire when the humidity changes to a value below this level. Can be a fixed number or a reference to an `input_number`, `number`, or `sensor` helper entity. Default is empty (no upper bound filter).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Humidifier current humidity changed** is referred to as `humidifier.current_humidity_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: humidifier.current_humidity_changed
  target:
    entity_id: humidifier.bedroom
{% endexample %}

This fires every time the bedroom humidifier reports a new humidity reading.

To fire only when humidity drops below a specific value:

{% example %}
trigger: |
  trigger: humidifier.current_humidity_changed
  target:
    entity_id: humidifier.bedroom
  options:
    below: 40
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
above:
  description: >
    Only fire when the humidity changes to a value above this level. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
  required: false
  type: any
  default: (empty, no lower bound filter)
below:
  description: >
    Only fire when the humidity changes to a value below this level. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
  required: false
  type: any
  default: (empty, no upper bound filter)
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- Leave both **Above** and **Below** empty to fire on every humidity change, regardless of the current value.
- Set both `above` and `below` to only fire when the humidity is within a specific range. For example, `above: 35` and `below: 60` fires only when the reading changes and the new value is between 35% and 60%.
- This trigger fires every time the reading changes while it satisfies the filter, which is useful for keeping an action running continuously. If you only want to react once when the humidity _crosses_ a specific level, use [Humidifier current humidity crossed threshold](/triggers/humidifier.current_humidity_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: alert when the bedroom air gets too dry

When the bedroom humidifier reports that humidity has dropped below 35%, send a notification so you can check whether the humidifier is keeping up with the room.

- **Trigger**: Humidifier current humidity changed
- **Target**: Bedroom humidifier
- **Below**: 35
- **Action**: Notify mobile app

{% details "YAML example for a dry-air alert" %}

{% example %}
automation: |
  alias: "Alert when bedroom air is too dry"
  triggers:
    - trigger: humidifier.current_humidity_changed
      target:
        entity_id: humidifier.bedroom
      options:
        below: 35
  actions:
    - action: notify.mobile_app_phone
      data:
        title: "Low humidity"
        message: "Bedroom humidity has dropped below 35%."
{% endexample %}

{% enddetails %}

### Automation: keep a basement dehumidifier running while humidity is high

When the basement humidity reading changes and the new value is above 65%, ensure the dehumidifier is on. Calling `humidifier.turn_on` on a device that is already running has no effect, so this is safe to trigger repeatedly.

- **Trigger**: Humidifier current humidity changed
- **Target**: Basement dehumidifier
- **Above**: 65
- **Action**: Humidifier: Turn on

{% details "YAML example for keeping a dehumidifier running" %}

{% example %}
automation: |
  alias: "Keep dehumidifier on while humidity is high"
  triggers:
    - trigger: humidifier.current_humidity_changed
      target:
        entity_id: humidifier.basement
      options:
        above: 65
  actions:
    - action: humidifier.turn_on
      target:
        entity_id: humidifier.basement
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

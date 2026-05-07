---
title: "Relative humidity changed"
trigger: humidity.changed
domain: humidity
description: "Triggers after one or more relative humidity readings change."
related_triggers:
  - humidity.crossed_threshold
---

The **Relative humidity changed** trigger fires after a humidity reading changes. Humidity creeps up slowly in a bathroom after a shower, climbs in a greenhouse overnight, or drops when the sun beats down on a dry afternoon. Use the threshold type to filter which changes matter to your automation.

The threshold type controls where the new reading must land for the trigger to fire. You can require the new value to be above a level, below a level, within a range, or outside a range. You can also select **Any change** to fire on any change at all.

Use **Relative humidity changed** to log humidity trends, trigger a fan when the air in a room becomes noticeably more humid, or alert you when a sensor reading shifts in a way that might signal a problem.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Relative humidity changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your humidity sensor is in (like your bathroom or bedroom). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Relative humidity changed**.
6. Under **Threshold type**, configure what kind of change fires the trigger:
   - Select **Any change** to fire on any change, regardless of direction or new value.
   - Select **Above** or **Below** and enter a value to fire only when the new reading is above or below that value.
   - Select **In range** and enter a lower and upper bound to fire only when the new reading falls inside the range.
   - Select **Outside range** and enter a lower and upper bound to fire only when the new reading is outside the range.
   For each option, you can enter a fixed percentage or use an `input_number`, `number`, or `sensor` entity as the threshold.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls which changes fire the trigger:

    - **Any change**: fire on any change, regardless of direction or new value.
    - **Above** or **Below**: enter a value to fire only when the new reading is above or below that value.
    - **In range**: enter a lower and upper bound to fire only when the new reading falls between them.
    - **Outside range**: enter a lower and upper bound to fire only when the new reading is below the lower bound or above the upper bound.

    For each mode you can enter a fixed percentage or reference an `input_number`, `number`, or `sensor` entity.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Relative humidity changed** is referred to as `humidity.changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: humidity.changed
  target:
    entity_id: sensor.bedroom_humidity
  options:
    threshold:
      type: above
      value:
        number: 5
{% endexample %}

This fires whenever the bedroom humidity sensor reading moves to a value above 5%. To fire on any change regardless of direction or value, use `type: any` and omit `value`.

To fire only when the new reading is within a comfort range:

{% example %}
trigger: |
  trigger: humidity.changed
  target:
    entity_id: sensor.bedroom_humidity
  options:
    threshold:
      type: between
      value_min:
        number: 40
      value_max:
        number: 60
{% endexample %}

To fire only when the new reading is outside a comfort range:

{% example %}
trigger: |
  trigger: humidity.changed
  target:
    entity_id: sensor.bedroom_humidity
  options:
    threshold:
      type: outside
      value_min:
        number: 40
      value_max:
        number: 60
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    A mapping that defines which kind of change fires the trigger. Set `type` to one of `any`, `above`, `below`, `between`, or `outside`. For `above` and `below`, provide `value` with a `number` key or an `entity` key. For `between` and `outside`, provide `value_min` and `value_max`, each with a `number` key or an `entity` key. For `any`, no additional keys are needed.
  required: true
  type: map
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- The threshold type controls both the direction and the landing zone of the change. Use **Above** or **Below** to filter by direction, **In range** to fire only when the new value is inside a range, and **Outside range** to fire only when it escapes a range.
- Use **Any change** to fire on every change regardless of direction or where the new value lands.
- To react only when humidity first crosses a specific level, use [Relative humidity crossed threshold](/triggers/humidity.crossed_threshold/) instead.
- Pair this trigger with [Relative humidity](/conditions/humidity.is_value/) in follow-up conditions to verify the reading meets a threshold before continuing the automation.
- The trigger works with climate entities, humidifier entities, weather entities, and sensors with the humidity device class.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: run the bathroom fan after a shower

After a shower, humidity in a bathroom can spike quickly. This automation turns on the bathroom fan whenever the humidity reading rises above 70%, keeping the room from getting damp.

- **Trigger**: Relative humidity changed
- **Target**: Bathroom humidity sensor
- **Threshold type**: Above 70%
- **Action**: Fan: Turn on

{% details "YAML example for a post-shower bathroom fan" %}

{% example %}
automation: |
  alias: "Run bathroom fan on humidity spike"
  triggers:
    - trigger: humidity.changed
      target:
        entity_id: sensor.bathroom_humidity
      options:
        threshold:
          type: above
          value:
            number: 70
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bathroom
{% endexample %}

{% enddetails %}

### Automation: log humidity changes in the greenhouse

Track how much the humidity in your greenhouse shifts throughout the day by sending a notification whenever the reading changes.

- **Trigger**: Relative humidity changed
- **Target**: Greenhouse humidity sensor
- **Threshold type**: Any change
- **Action**: Notifications: Send a notification via mobile_app_phone

{% details "YAML example for greenhouse humidity logging" %}

{% example %}
automation: |
  alias: "Log greenhouse humidity changes"
  triggers:
    - trigger: humidity.changed
      target:
        entity_id: sensor.greenhouse_humidity
      options:
        threshold:
          type: any
  actions:
    - action: notify.mobile_app_phone
      data:
        message: "Greenhouse humidity changed significantly."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

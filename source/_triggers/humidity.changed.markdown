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
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your humidity sensor is in (like your bathroom or bedroom). You can also select a device, a specific entity, or a label. When you target multiple entities (via area, label, or multiple entity selections), the trigger fires whenever any of them changes.
5. From the triggers shown for that target, select **Relative humidity changed**.
6. Under **Threshold type**, configure what kind of change fires the trigger:
   - Select **Any change** to fire on any change, regardless of direction or new value.
   - Select **Above** or **Below** and enter a value to fire only when the new reading is above or below that value.
   - Select **In range** and enter a lower and upper bound to fire only when the new reading falls inside the range.
   - Select **Outside range** and enter a lower and upper bound to fire only when the new reading is outside the range.
   - For each option, you can enter a fixed percentage (0-100%), pick a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold.
     - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls which changes fire the trigger:

    - **Any change**: fires on any change, regardless of direction or new value.
    - **Above** or **Below**: enter a value to fire only when the new reading is above or below that value.
    - **In range**: enter a lower and upper bound to fire only when the new reading falls between them.
    - **Outside range**: enter a lower and upper bound to fire only when the new reading is below the lower bound or above the upper bound.

    For each mode you can enter a fixed percentage (0-100%), reference a sensor entity or a [number helper](/integrations/input_number/) entity.
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
    entity_id:
      - sensor.bedroom_humidity
      - sensor.bathroom_humidity
  options:
    threshold:
      type: between
      value_min:
        number: 40
      value_max:
        number: 60
{% endexample %}

This fires whenever any of the humidity sensors changes to a value within the comfort range (40-60%).

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

To use a number helper as a dynamic threshold that you can adjust without editing the automation:

{% example %}
trigger: |
  trigger: humidity.changed
  target:
    entity_id: sensor.bedroom_humidity
  options:
    threshold:
      type: above
      value:
        entity: input_number.humidity_alert_threshold
{% endexample %}

To monitor all humidity sensors in an area and trigger when any changes outside the comfort range:

{% example %}
trigger: |
  trigger: humidity.changed
  target:
    area_id: basement
  options:
    threshold:
      type: outside
      value_min:
        number: 40
      value_max:
        number: 60
{% endexample %}

This fires whenever any humidity sensor in the basement area changes to a value outside the 40-60% range.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    A mapping that defines which kind of change fires the trigger:

    - `type: any`: Fires on any change (no additional keys needed).
    - `type: above` or `type: below`: Provide `value` with a `number` key (for a literal number) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: between` or `type: outside`: Provide `value_min` and `value_max`, each with a `number` key (for a literal number) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
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

After a shower, humidity in a bathroom can spike quickly. This automation turns on the bathroom fan whenever either bathroom humidity sensor rises above 70%, keeping the room from getting damp.

- **Trigger**: Relative humidity changed
  - **Target**: Bathroom and shower humidity sensors
  - **Threshold type**: Above 70%
- **Action**: Turn on fan
  - **Target**: fan.bathroom

{% details "YAML example for a post-shower bathroom fan" %}

{% example %}
automation: |
  alias: "Run bathroom fan on humidity spike"
  triggers:
    - trigger: humidity.changed
      target:
        entity_id:
          - sensor.bathroom_humidity
          - sensor.shower_humidity
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
- **Action**: Send a notification
  - **Target**: My Device (`mobile.my_device`)

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
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Greenhouse humidity changed significantly."
{% endexample %}

{% enddetails %}

### Automation: alert when humidity changes above comfort level

Send a notification whenever the bedroom humidity changes to a level above your personal comfort threshold. Use a number helper as the threshold so you can easily adjust your preferred level through the UI.

- **Trigger**: Relative humidity changed
  - **Target**: Bedroom humidity sensor
  - **Threshold type**: Above (entity: comfort humidity threshold)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for using a number helper as threshold" %}

{% example %}
automation: |
  alias: "Alert when humidity changes above comfort level"
  triggers:
    - trigger: humidity.changed
      target:
        entity_id: sensor.bedroom_humidity
      options:
        threshold:
          type: above
          value:
            entity: input_number.comfort_humidity_threshold
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >-
          Bedroom humidity is now {{ trigger.to_state.state }}%, above
          your comfort threshold.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

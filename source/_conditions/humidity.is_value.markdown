---
title: "Relative humidity"
condition: humidity.is_value
domain: humidity
description: "Tests if a relative humidity value is above a threshold, below a threshold, or in a range of values."
---

The **Relative humidity** condition passes when a humidity reading meets a threshold you define. You can check that humidity is above, below, or within a specific range. The condition works with humidity sensors, climate devices, humidifiers, and weather entities. Use it to run an automation only when the bedroom feels too damp, or only when the air is dry enough to need attention.

When you target more than one entity, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted entity to meet the threshold, or demand that all of them do.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Relative humidity** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your humidity sensor is in (like your bedroom or bathroom). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Relative humidity**.
6. Under **Threshold type**, set the humidity level the condition checks against:
   1. Pick whether the reading must be **Above**, **Below**, **In range**, or **Outside range** of the threshold.
   2. Select **Number** or **Entity**:
      - **Number**: Enter a fixed percentage directly, for example `65` for 65%. For **In range** or **Outside range**, enter both a lower and upper bound.
      - **Entity**: Use a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold:
        - Number helper: You can adjust the threshold value without editing the automation. The sensor reading is compared against the number helper's current value.
        - Sensor: Its current reading becomes the threshold and updates automatically as the sensor changes. This is useful for comparing two humidity readings, for example to check whether indoor humidity is higher than outdoor humidity.
        - For **In range** or **Outside range**, you need two entities: one for the lower bound and one for the upper bound (for example, two separate number helpers).
        - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Each** or **All**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    The humidity level the entity has to meet for the condition to pass. **Above** and **Below** are exclusive: a reading equal to the threshold does not pass. **In range** is exclusive at both bounds. **Outside range** is inclusive: a reading equal to either bound passes. Choose **Number** to enter a fixed percentage (0–100), or **Entity** to use a sensor or number helper as a dynamic threshold.
Condition passes if:
  description: |
    When multiple entities are targeted, controls how results combine:

    - **Each**: The condition passes if at least one targeted entity meets the threshold (default).
    - **All**: The condition passes only when every targeted entity meets the threshold.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `humidity.is_value`. A basic example looks like this:

{% example %}
condition: |
  condition: humidity.is_value
  target:
    entity_id: sensor.bedroom_humidity
  options:
    threshold:
      type: above
      value:
        number: 60
    behavior: each
{% endexample %}

This passes when the bedroom humidity sensor reads above 60%.

To check that humidity stays below a certain level:

{% example %}
condition: |
  condition: humidity.is_value
  target:
    area_id: basement
  options:
    threshold:
      type: below
      value:
        number: 40
    behavior: all
{% endexample %}

This passes when all humidity sensors in the basement area read below 40%.

To check that humidity stays within a comfortable range:

{% example %}
condition: |
  condition: humidity.is_value
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
    behavior: each
{% endexample %}

This passes when at least one of the humidity sensors reads between 40% and 60%.

To check that humidity stays outside a range:

{% example %}
condition: |
  condition: humidity.is_value
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

This passes when the bedroom humidity sensor reads below 40% or above 60%.

To use a number helper as a dynamic threshold that you can adjust without editing the automation:

{% example %}
condition: |
  condition: humidity.is_value
  target:
    entity_id: sensor.bedroom_humidity
  options:
    threshold:
      type: above
      value:
        entity: input_number.humidity_alert_threshold
    behavior: each
{% endexample %}

This passes when the bedroom humidity sensor reads above the number helper´s value.

### Options in YAML

{% options_yaml %}
threshold:
  description: |
    The humidity level the entity has to meet for the condition to pass:

    - `type: above` (exclusive): Sets a minimum. The reading must be strictly above the threshold to pass. Provide `value` with a `number` key (0–100) or an `entity` key.
    - `type: below` (exclusive): Sets a maximum. The reading must be strictly below the threshold to pass. Provide `value` with a `number` key (0–100) or an `entity` key.
    - `type: between` (exclusive): Defines a range. The reading must be strictly between both bounds to pass. Provide `value_min` and `value_max`, each with a `number` key or an `entity` key.
    - `type: outside` (inclusive): Defines an outside-range. The reading must be at or beyond either bound to pass. Provide `value_min` and `value_max`, each with a `number` key or an `entity` key.

    For the `number` key, use a percentage value (0–100). For the `entity` key, use an `input_number`, `number`, or `sensor` entity.
  required: false
  type: map
behavior:
  description: |
    When multiple entities are targeted, controls how results combine:

    - `each`: The condition passes if at least one targeted entity meets the threshold.
    - `all`: The condition passes only when every targeted entity meets the threshold.
  required: false
  type: string
  default: each
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The condition works with humidity sensors, climate entities (using the current humidity reading), humidifier entities (using the current humidity reading), and weather entities.
- Entities that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped for **Each** and fail for **All**.
- Humidity is expressed as a percentage. Indoor comfort is generally between 40% and 60%. Below 30% often feels dry and can irritate airways. Above 65% can encourage mold and dust mites.
- This condition checks the entity's _current_ humidity reading, not its target setpoint. To check a humidifier's target setpoint instead, use the [Humidifier target humidity](/conditions/humidifier.is_target_humidity/) condition.
- When you use a sensor as a dynamic threshold, its value is read at the moment the condition runs. The threshold is not continuously tracked; it is re-evaluated each time the automation fires.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: run a dehumidifier when the room gets too damp

When the bedroom humidity sensor reads above 65%, turn on the dehumidifier to bring levels back to a comfortable range. The condition prevents the dehumidifier from running when the air is already dry enough.

- **Trigger**: Time pattern: Every 15 minutes
- **Condition**: Relative humidity (above 65%)
  - **Target**: Bedroom humidity sensor
  - **Condition passes if**: Any
- **Action**: Turn on switch
  - **Target**: switch.bedroom_dehumidifier

{% details "YAML example for running a dehumidifier when humidity is high" %}

{% example %}
automation: |
  alias: "Run dehumidifier when bedroom is too damp"
  triggers:
    - trigger: time_pattern
      minutes: "/15"
  conditions:
    - condition: humidity.is_value
      target:
        entity_id:
          - sensor.bedroom_humidity
          - sensor.closet_humidity
      options:
        threshold:
          type: above
          value:
            number: 65
        behavior: each
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.bedroom_dehumidifier
{% endexample %}

{% enddetails %}

### Automation: send an alert when the air gets too dry

At midnight, check the living room humidity. If it has dropped below 30%, send a notification so you can switch on a humidifier before you go to sleep.

- **Trigger**: Time: 00:00
- **Condition**: Relative humidity (below 30%)
  - **Target**: Living room humidity sensor
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a low humidity alert" %}

{% example %}
automation: |
  alias: "Alert when living room air is too dry"
  triggers:
    - trigger: time
      at: "00:00:00"
  conditions:
    - condition: humidity.is_value
      target:
        area_id: living_room
      options:
        threshold:
          type: below
          value:
            number: 30
        behavior: all
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The living room humidity is below 30%.
          Consider switching on the humidifier.
{% endexample %}

{% enddetails %}

### Automation: adjust humidifier based on comfort range

Check every 15 minutes whether the bedroom humidity is outside your personal comfort range. Use number helpers to set the range, so you can easily adjust it through the UI without editing the automation.

- **Trigger**: Time pattern: Every 15 minutes
- **Condition**: Relative humidity (outside range, using number helpers)
  - **Target**: Bedroom humidity sensor
  - **Condition passes if**: Any
- **Action**: Turn on switch
  - **Target**: switch.bedroom_humidifier

{% details "YAML example for using number helpers as threshold" %}

{% example %}
automation: |
  alias: "Turn on humidifier when outside comfort range"
  triggers:
    - trigger: time_pattern
      minutes: "/15"
  conditions:
    - condition: humidity.is_value
      target:
        entity_id: sensor.bedroom_humidity
      options:
        threshold:
          type: outside
          value_min:
            entity: input_number.comfort_humidity_min
          value_max:
            entity: input_number.comfort_humidity_max
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.bedroom_humidifier
{% endexample %}

{% enddetails %}

### Automation: run the ventilation fan when indoor humidity exceeds outdoor humidity

Every 15 minutes, check whether the living room is more humid than the outside air. If so, open the ventilation to let drier air in. The outdoor humidity sensor acts as a live threshold, so the condition always compares the two current readings.

- **Trigger**: Time pattern: Every 15 minutes
- **Condition**: Relative humidity (above, entity: outdoor humidity sensor)
  - **Target**: Living room humidity sensor
  - **Condition passes if**: Any
- **Action**: Turn on switch
  - **Target**: switch.ventilation_fan

{% details "YAML example for comparing indoor to outdoor humidity" %}

{% example %}
automation: |
  alias: "Ventilate when indoor humidity exceeds outdoor"
  triggers:
    - trigger: time_pattern
      minutes: "/15"
  conditions:
    - condition: humidity.is_value
      target:
        entity_id: sensor.living_room_humidity
      options:
        threshold:
          type: above
          value:
            entity: sensor.outdoor_humidity
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.ventilation_fan
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

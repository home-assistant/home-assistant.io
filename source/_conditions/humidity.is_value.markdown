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
   - Select **Number** to enter a fixed percentage directly, for example `65` for 65%.
   - Select **Entity** to use a helper or sensor as the threshold. When you pick an `input_number` or `number` helper, you can adjust the threshold without editing the automation. When you pick a humidity sensor, its current reading becomes the threshold and updates automatically as the sensor changes. This is useful for comparing two humidity readings, for example to check whether indoor humidity is higher than outdoor humidity.
   Then pick whether the reading must be above, below, or within a range of the threshold.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: >
    The humidity level the entity has to meet for the condition to pass. You can enter a fixed percentage between 0 and 100 (select **Number**), or pick an entity as a dynamic threshold (select **Entity**). When you pick an `input_number` or `number` helper, you can change the threshold without editing the automation. When you pick a humidity sensor, its live reading becomes the threshold, which is useful for comparing two humidity values, for example indoor versus outdoor. In both cases, also pick whether the reading must be above, below, or within a range of that value.
  required: true
Condition passes if:
  description: When multiple entities are targeted, controls how results combine. Pick **Any** to pass if at least one targeted entity meets the threshold, or **All** to pass only when every targeted entity does. Default is **Any**.
  required: true
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
      above: 60
    behavior: any
{% endexample %}

This passes when the bedroom humidity sensor reads above 60%.

To check that humidity stays below a certain level:

{% example %}
condition: |
  condition: humidity.is_value
  target:
    entity_id: sensor.bedroom_humidity
  options:
    threshold:
      below: 40
    behavior: any
{% endexample %}

This passes when the bedroom humidity sensor reads below 40%.

To check that humidity stays within a comfortable range:

{% example %}
condition: |
  condition: humidity.is_value
  target:
    entity_id: sensor.bedroom_humidity
  options:
    threshold:
      above: 40
      below: 60
    behavior: any
{% endexample %}

This passes when the bedroom humidity sensor reads between 40% and 60%.

### Options in YAML

{% options_yaml %}
threshold:
  description: >
    The humidity level the entity has to meet for the condition to pass. Use `above` to set a minimum, `below` to set a maximum, or both to define a range. Accepts a fixed number between 0 and 100, or a reference to an `input_number`, `number`, or `sensor` entity. When you reference a sensor, its current reading is used as the threshold at the moment the condition is evaluated. This lets you compare two humidity readings dynamically, for example checking whether indoor humidity is above outdoor humidity.
  required: true
  type: any
behavior:
  description: >
    When multiple entities are targeted, controls how results combine. Accepts `all` or `any`.
  required: true
  type: string
  default: any
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The condition works with humidity sensors, climate entities (using the current humidity reading), humidifier entities (using the current humidity reading), and weather entities.
- Entities that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped for **Any** and fail for **All**.
- Humidity is expressed as a percentage. Indoor comfort is generally between 40% and 60%. Below 30% often feels dry and can irritate airways. Above 65% can encourage mold and dust mites.
- This condition checks the entity's _current_ humidity reading, not its target setpoint. To check a humidifier's target setpoint instead, use the [Humidifier target humidity](/conditions/humidifier.is_target_humidity/) condition.
- When you use a sensor as a dynamic threshold, its value is read at the moment the condition runs. The threshold is not continuously tracked; it is re-evaluated each time the automation fires.
- Pair with [Relative humidity crossed threshold](/triggers/humidity.crossed_threshold/) as a matching trigger when you need the automation to run the moment humidity crosses a specific level.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: run a dehumidifier when the room gets too damp

When the bedroom humidity sensor reads above 65%, turn on the dehumidifier to bring levels back to a comfortable range. The condition prevents the dehumidifier from running when the air is already dry enough.

- **Trigger**: Time pattern: Every 15 minutes
- **Condition**: Relative humidity (above 65%)
- **Target**: Bedroom humidity sensor
- **Condition passes if**: Any
- **Action**: Switch: Turn on

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
        entity_id: sensor.bedroom_humidity
      options:
        threshold:
          above: 65
        behavior: any
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
- **Action**: Notifications: Send a notification via mobile_app_phone

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
        entity_id: sensor.living_room_humidity
      options:
        threshold:
          below: 30
        behavior: any
  actions:
    - action: notify.mobile_app_phone
      data:
        message: >
          The living room humidity is below 30%.
          Consider switching on the humidifier.
{% endexample %}

{% enddetails %}

### Automation: run the ventilation fan when indoor humidity exceeds outdoor humidity

Every 15 minutes, check whether the living room is more humid than the outside air. If so, open the ventilation to let drier air in. The outdoor humidity sensor acts as a live threshold, so the condition always compares the two current readings.

- **Trigger**: Time pattern: Every 15 minutes
- **Condition**: Relative humidity (above, entity: outdoor humidity sensor)
- **Target**: Living room humidity sensor
- **Condition passes if**: Any
- **Action**: Switch: Turn on ventilation fan

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
          above: sensor.outdoor_humidity
        behavior: any
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.ventilation_fan
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

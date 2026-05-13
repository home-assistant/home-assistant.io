---
title: "Temperature crossed threshold"
trigger: temperature.crossed_threshold
domain: temperature
description: "Triggers after one or more temperature readings cross a threshold."
related_triggers:
  - temperature.changed
---

The **Temperature crossed threshold** trigger fires when a temperature reading crosses into a zone you define. A bedroom sensor crossing below 18°C on a cold night, a living room sensor climbing above 24°C in summer, a reading entering a target comfort range, or a reading escaping that range are all supported.

Use **Temperature crossed threshold** to automate heating or cooling when the temperature becomes uncomfortable, alert you when conditions in a room drift out of range, or coordinate devices that respond to specific temperature levels.

When you target more than one entity, the trigger's **Trigger when** option controls when it fires.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Temperature crossed threshold** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your temperature sensor is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Temperature crossed threshold**.
6. Under **Threshold type**, configure the zone the reading must enter for the trigger to fire:
   - Select **Above** or **Below** and enter a value to fire when the reading crosses that level.
   - Select **In range** and enter a lower and upper bound to fire when the reading enters the range from outside.
   - Select **Outside range** and enter a lower and upper bound to fire when the reading leaves the range (crosses past either bound).
   - For each option, you can enter a fixed temperature or pick a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold.
     - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Under **Unit**, select the temperature unit (°C or °F) to use for the threshold comparison.
8. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple entities are targeted.
9. Under **For at least**, set how long the reading must stay past the threshold before the trigger fires. Leave it at zero to fire immediately.
10. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls the zone the reading must enter for the trigger to fire:

    - **Above** or **Below**: enter a value to fire when the reading crosses that level.
    - **In range**: enter a lower and upper bound to fire when the reading enters the range from outside.
    - **Outside range**: enter a lower and upper bound to fire when the reading leaves the range (crosses past either bound).

    For each mode you can enter a fixed temperature or reference a sensor entity or [number helper](/integrations/input_number/) entity.
Unit:
  description: The temperature unit to use for threshold comparison. Accepts `°C` or `°F`. Required when using numerical thresholds (not required when using entity references). Default is `°C`.
Trigger when:
  description: |
    When multiple entities are targeted, controls when the trigger fires:

    - **Each**: fires every time any targeted entity crosses the threshold.
    - **First**: fires only on the first crossing.
    - **All**: fires only after every targeted entity crosses the threshold.

    This corresponds to the `behavior` field in YAML. Default is **Each**.
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Useful to avoid triggering on brief fluctuations. For example, set it to `0:05:00` to fire only after the reading has stayed past the threshold for 5 minutes. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Temperature crossed threshold** is referred to as `temperature.crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: temperature.crossed_threshold
  target:
    entity_id: sensor.living_room_temperature
  options:
    threshold:
      type: between
      value_min:
        number: 20
        unit_of_measurement: "°C"
      value_max:
        number: 22
        unit_of_measurement: "°C"
{% endexample %}

This fires whenever the living room temperature sensor enters the comfort range (20 to 22°C).

To fire when the reading leaves a comfort range (escapes above 22°C or below 20°C):

{% example %}
trigger: |
  trigger: temperature.crossed_threshold
  target:
    entity_id: sensor.living_room_temperature
  options:
    threshold:
      type: outside
      value_min:
        number: 20
        unit_of_measurement: "°C"
      value_max:
        number: 22
        unit_of_measurement: "°C"
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    A mapping that defines the zone the reading must enter for the trigger to fire:

    - `type: above` or `type: below`: Provide `value` with a `number` key (for a literal number) or an `entity` key (for an `input_number`, `number`, or `sensor` entity)
    - `type: between` or `type: outside`: Provide `value_min` and `value_max`, each with a `number` key (for a literal number) or an `entity` key (for an `input_number`, `number`, or `sensor` entity)

    When using the `number` key, you must also include `unit_of_measurement` to specify the temperature unit (`°C` or `°F`). When using the `entity` key, the unit is taken from the entity itself.

    For example:

    ```yaml
    threshold:
      type: between
      value_min:
        number: 18
        unit_of_measurement: °C
      value_max:
        entity: input_number.max_comfort_temperature
    ```

    A `sensor` entity's current reading is used as the threshold, which lets you compare two temperature readings dynamically.
  required: true
  type: map
behavior:
  description: |
    When multiple entities are targeted, controls when the trigger fires. Accepts:

    - `any`: fires every time any targeted entity crosses the threshold.
    - `first`: fires only on the first crossing.
    - `last`: fires only after every targeted entity crosses the threshold.
  required: false
  type: string
  default: any
for:
  description: |
    How long the reading must remain past the threshold before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:05:00` fires only after the reading has stayed past the threshold for 5 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- **Above** and **Below** fire on the crossing moment only. Once the reading is above the threshold, the trigger does not fire again until the reading dips back below it and then crosses above again.
- **In range** (`between`) fires when the reading moves from outside the bounds into the bounds. **Outside range** (`outside`) fires when the reading moves from inside the bounds past either bound.
- A comfortable indoor temperature range is typically 20 to 22°C (68 to 72°F). Use **Outside range** with those bounds to fire the moment conditions drift out of that comfort zone.
- Pair this trigger with [Temperature changed](/triggers/temperature.changed/) if you also want to react to smaller fluctuations between crossings.
- The trigger works with [climate](/integrations/climate/) entities, [water heater](/integrations/water_heater/) entities, [weather](/integrations/weather/) entities, and sensors with the temperature device class.
- Climate, water heater, and weather entities that don't report a current temperature attribute are automatically excluded from the trigger. Only entities with a valid temperature value can fire the trigger.
- All temperature values are automatically converted to the unit you specify. For example, if your sensor reports in Fahrenheit but you configure the trigger in Celsius, the conversion happens automatically.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off climate when temperature enters comfort range

This automation turns off the living room climate system the moment the temperature crosses into the comfort range (20 to 22°C), saving energy once comfortable conditions are achieved.

- **Trigger**: Temperature crossed threshold
  - **Target**: Living room temperature sensor
  - **Threshold type**: In range (20-22°C)
- **Action**: Set thermostat HVAC mode (state: off)

{% details "YAML example for turning off climate when comfortable" %}

{% example %}
automation: |
  alias: "Turn off climate when living room is comfortable"
  triggers:
    - trigger: temperature.crossed_threshold
      target:
        entity_id: sensor.living_room_temperature
      options:
        threshold:
          type: between
          value_min:
            number: 20
            unit_of_measurement: "°C"
          value_max:
            number: 22
            unit_of_measurement: "°C"
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.living_room
      data:
        hvac_mode: "off"
{% endexample %}

{% enddetails %}

### Automation: alert when bedroom temperature enters comfort range

After opening windows to cool down a stuffy bedroom, this automation alerts you the moment the temperature enters your preferred comfort range so you can close the windows.

- **Trigger**: Temperature crossed threshold
  - **Target**: Bedroom temperature sensor
  - **Threshold type**: In range (20-22°C)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for comfort range entry alert" %}

{% example %}
automation: |
  alias: "Alert when bedroom temperature is comfortable"
  triggers:
    - trigger: temperature.crossed_threshold
      target:
        entity_id: sensor.bedroom_temperature
      options:
        threshold:
          type: between
          value_min:
            number: 20
            unit_of_measurement: "°C"
          value_max:
            number: 22
            unit_of_measurement: "°C"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Temperature Alert"
        message: >-
          Bedroom temperature reached {{ trigger.to_state.state }}°C.
          You can now close the windows.
{% endexample %}

{% enddetails %}

### Automation: prevent false triggers with a delay

To avoid false triggers from brief temperature fluctuations when opening a door or window, add a **For at least** delay. This automation only fires after the temperature has been below 18°C for 5 minutes.

- **Trigger**: Temperature crossed threshold
  - **Target**: Living room temperature sensor
  - **Threshold type**: Below (18°C)
  - **For at least**: 5 minutes
- **Action**: Set thermostat HVAC mode (state: heat)

{% details "YAML example with delay to prevent false triggers" %}

{% example %}
automation: |
  alias: "Turn on heating when consistently cold"
  triggers:
    - trigger: temperature.crossed_threshold
      target:
        entity_id: sensor.living_room_temperature
      options:
        threshold:
          type: below
          value:
            number: 18
            unit_of_measurement: "°C"
        for: "00:05:00"
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.living_room
      data:
        hvac_mode: heat
{% endexample %}

{% enddetails %}

### Automation: trigger heating based on adjustable comfort temperature

Trigger the heating when temperature crosses below your personal comfort threshold. Use a number helper as the threshold so you can easily adjust it through the UI without editing the automation.

- **Trigger**: Temperature crossed threshold
  - **Target**: Living room temperature sensor
  - **Threshold type**: Below (entity: comfort temperature threshold)
- **Action**: Set thermostat HVAC mode (state: heat)

{% details "YAML example for using a number helper as threshold" %}

{% example %}
automation: |
  alias: "Turn on heating when crossing below comfort threshold"
  triggers:
    - trigger: temperature.crossed_threshold
      target:
        entity_id: sensor.living_room_temperature
      options:
        threshold:
          type: below
          value:
            entity: input_number.comfort_temperature_threshold
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.living_room
      data:
        hvac_mode: heat
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}
{% include triggers/related.md %}

---
title: "Humidifier current humidity crossed threshold"
trigger: humidifier.current_humidity_crossed_threshold
domain: humidifier
description: "Triggers after the humidity measured by one or more humidifiers crosses a threshold."
related_triggers:
  - humidifier.current_humidity_changed
  - humidifier.started_humidifying
  - humidifier.started_drying
---

The **Humidifier current humidity crossed threshold** trigger fires once when the current humidity reading on a humidifier {% term entity %} crosses a boundary you define. Unlike [Humidifier current humidity changed](/triggers/humidifier.current_humidity_changed/), which fires on every change, **Humidifier current humidity crossed threshold** fires only at the moment the reading moves across the threshold, so your automation runs once per crossing and not on every fluctuation while the humidity stays on one side.

Use **Humidifier current humidity crossed threshold** for automations that should happen exactly once in response to a level being reached, like turning on an exhaust fan the first time humidity climbs above 70%, or sending an alert the moment the air drops outside a comfortable range.

When you target more than one humidifier, the trigger's **behavior** option controls when it fires.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Humidifier current humidity crossed threshold** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your humidifier is in (like your bedroom or bathroom). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Humidifier current humidity crossed threshold**.
6. Under **Threshold type**, choose how the trigger reacts: **Above a value**, **Below a value**, **In a range**, or **Outside a range**.
7. Enter the threshold values. For **Above a value**, set the **Lower threshold**. For **Below a value**, set the **Upper threshold**. For **In a range** or **Outside a range**, set both **Lower threshold** and **Upper threshold**.
8. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Any**, **First**, or **Last** to control how the trigger behaves when multiple humidifiers are targeted.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: "The type of threshold crossing to watch for. Select **Above a value** to fire when humidity rises above the lower threshold, **Below a value** to fire when it drops below the upper threshold, **In a range** to fire when it enters the range between the two thresholds, or **Outside a range** to fire when it leaves that range."
  required: true
Lower threshold:
  description: The lower boundary for the threshold. Required for **Above a value**, **In a range**, and **Outside a range**. Can be a fixed number or a reference to an `input_number`, `number`, or `sensor` helper entity.
  required: false
Upper threshold:
  description: The upper boundary for the threshold. Required for **Below a value**, **In a range**, and **Outside a range**. Can be a fixed number or a reference to an `input_number`, `number`, or `sensor` helper entity.
  required: false
Trigger when:
  description: When multiple humidifiers are targeted, controls when the trigger fires. Pick **Any** to fire every time any targeted humidifier crosses the threshold, **First** to fire only on the first crossing, or **Last** to fire only after every targeted humidifier crosses the threshold. This corresponds to the `behavior` field in YAML. Default is **Any**.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Humidifier current humidity crossed threshold** is referred to as `humidifier.current_humidity_crossed_threshold`. A basic example that fires when the bedroom humidity rises above 65%:

{% example %}
trigger: |
  trigger: humidifier.current_humidity_crossed_threshold
  target:
    entity_id: humidifier.bedroom
  options:
    threshold_type: above
    lower_limit: 65
    behavior: any
{% endexample %}

To fire when the humidity leaves a comfortable range:

{% example %}
trigger: |
  trigger: humidifier.current_humidity_crossed_threshold
  target:
    entity_id: humidifier.bedroom
  options:
    threshold_type: outside
    lower_limit: 40
    upper_limit: 60
    behavior: any
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold_type:
  description: >
    The type of threshold crossing to watch for. Accepts `above` (fires when humidity rises above `lower_limit`), `below` (fires when it drops below `upper_limit`), `between` (fires when it enters the range between both limits), or `outside` (fires when it leaves that range).
  required: true
  type: string
lower_limit:
  description: >
    The lower boundary for the threshold. Required for `above`, `between`, and `outside`. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
  required: false
  type: any
upper_limit:
  description: >
    The upper boundary for the threshold. Required for `below`, `between`, and `outside`. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
  required: false
  type: any
behavior:
  description: >
    When multiple humidifiers are targeted, controls when the trigger fires. Accepts `any`, `first`, or `last`.
  required: true
  type: string
  default: any
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger fires once per crossing, not continuously. Once the humidity has crossed and settled on one side, it fires again only the next time the reading moves back across the threshold.
- For **In a range** and **Outside a range**, both the lower and upper thresholds are required.
- If you want to react to every humidity change while a value stays in a certain range (not just at the moment of crossing), use [Humidifier current humidity changed](/triggers/humidifier.current_humidity_changed/) with `above` and `below` filters instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on an exhaust fan when bathroom humidity spikes

After a shower, bathroom humidity spikes quickly. When the humidity crosses 70% for the first time, turn on the exhaust fan to clear the moisture before condensation builds up on the walls and mirror.

- **Trigger**: Humidifier current humidity crossed threshold
- **Target**: Bathroom humidifier
- **Threshold type**: Above a value
- **Lower threshold**: 70
- **Trigger when**: Any
- **Action**: Fan: Turn on

{% details "YAML example for a shower exhaust fan" %}

{% example %}
automation: |
  alias: "Run exhaust fan when humidity spikes"
  triggers:
    - trigger: humidifier.current_humidity_crossed_threshold
      target:
        entity_id: humidifier.bathroom
      options:
        threshold_type: above
        lower_limit: 70
        behavior: any
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bathroom_exhaust
{% endexample %}

{% enddetails %}

### Automation: alert when bedroom humidity leaves the comfortable range

When the bedroom humidity crosses outside the ideal 40–60% range, send a notification so you can adjust the humidifier's target setting or check the device.

- **Trigger**: Humidifier current humidity crossed threshold
- **Target**: Bedroom humidifier
- **Threshold type**: Outside a range
- **Lower threshold**: 40
- **Upper threshold**: 60
- **Trigger when**: Any
- **Action**: Notify mobile app

{% details "YAML example for a comfort-range alert" %}

{% example %}
automation: |
  alias: "Alert when bedroom humidity is out of range"
  triggers:
    - trigger: humidifier.current_humidity_crossed_threshold
      target:
        entity_id: humidifier.bedroom
      options:
        threshold_type: outside
        lower_limit: 40
        upper_limit: 60
        behavior: any
  actions:
    - action: notify.mobile_app_phone
      data:
        title: "Humidity out of range"
        message: >
          Bedroom humidity has left the 40–60%
          comfort range. Check your humidifier.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

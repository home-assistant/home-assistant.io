---
title: "Valve closed"
trigger: valve.closed
domain: valve
description: "Triggers after one or more valves close."
related_triggers:
  - valve.opened
---

The **Valve closed** trigger fires after a valve {% term entity %} transitions to the closed state. Valve entities represent water, gas, or air valves in your home.

Use it to react the moment a valve is closed, whether it was closed manually, by a schedule, through an {% term automation %}, or by a voice command. For example, you can create an automation to log when irrigation ends, confirm that a gas valve has been shut off, or chain follow-up actions after a valve closes.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target**, pick the area your valve is in, such as your garden or utility room. You can also select a device, a specific entity, or a label, as described in [Targets](#targets).
5. From the triggers shown for that target, select **Valve closed**.
6. Under **Trigger when**, pick **Each**, **First**, or **All** to control how the trigger behaves when multiple valves are targeted, as described in [Behavior](#behavior-with-multiple-targets).
7. Under **For at least**, set how long the valve must stay closed before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple valves are targeted, controls when the trigger fires. **Each** (default) fires every time any targeted valve closes. **First** fires only when the first of a group closes. **All** fires only after every targeted valve is closed.
For at least:
  description: How long the valve must stay closed before the trigger fires. Default is 0 (fires immediately). Useful to ignore brief, momentary closures.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `valve.closed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: valve.closed
  target:
    entity_id: valve.garden_irrigation
{% endexample %}

This fires every time `valve.garden_irrigation` transitions to the **Closed** state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple valves are targeted, controls when the trigger fires:

    - `any`: fires every time any targeted valve closes.
    - `first`: fires only when the first valve in the group closes.
    - `last`: fires only after every targeted valve is closed.
  required: false
  type: string
  default: any
for:
  description: >
    How long the valve must stay closed before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:00:10` fires only after the valve has stayed closed for 10 seconds, which helps ignore brief or accidental closures.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger fires when the valve reaches the **Closed** state. It does not fire during the transitional **Closing** state while the valve is still moving. You can check the available states in [The state of a valve entity](/integrations/valve/#the-state-of-a-valve-entity).
- Valves that report position (0 to 100%) are considered closed only when their position reaches exactly 0.
- Use the **For at least** option to avoid false alarms from brief or accidental closures, such as a momentary sensor glitch that causes a valve to flicker to closed and back.
- This trigger works with any valve entity in Home Assistant, including water, gas, and air valves from integrations such as MQTT, Z-Wave, Zigbee, and ESPHome.
- You can use this trigger to track your water consumption. Create an automation that records the elapsed time since it opened (using a helper or template sensor) and build a daily watering log when a valve closes. Awareness of actual usage is the first step towards reducing it.
- Use this trigger to confirm gas valves are safely shut off. Create an automation that sends a confirmation notification when a gas valve closes, giving you peace of mind and a clear audit trail that no gas is flowing when the system is idle.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: Log total watering time and estimate water used

A water-awareness automation that calculates how long the irrigation valve was open each time it closes, logs the result, and estimates the volume of water used. Over time, this record helps you identify patterns, spot waste, and set more efficient watering schedules.

- **Trigger**: Valve closed
  - **Target**: `valve.garden_irrigation`
- **Action**: Define variables (configured in YAML editor only)
- **Action**: Activity: log activity
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for logging total watering time and estimated water use" %}

{% example %}
automation: |
  alias: "Log watering time and estimated water use"
  triggers:
    - trigger: valve.closed
      target:
        entity_id: valve.garden_irrigation
  actions:
    - variables:
        duration_min: >
          {{
            (
              (trigger.to_state.last_changed
              - trigger.from_state.last_changed).total_seconds() / 60
            ) | round(1)
          }} 
        liters_used: >
          {{ (duration_min * 12) | round(0) }}
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "🌿 Irrigation finished"
        message: >
          Valve closed after {{ duration_min }} min.
          Estimated water used: {{ liters_used }} L.
          Consider adjusting the schedule if the garden looks saturated.
    - action: logbook.log
      data:
        name: "Irrigation"
        message: "Valve open for {{ duration_min }} min — ~{{ liters_used }} L used."
        entity_id: valve.garden_irrigation
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}

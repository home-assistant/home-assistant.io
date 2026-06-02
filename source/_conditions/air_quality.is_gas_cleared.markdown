---
title: "Gas cleared"
condition: air_quality.is_gas_cleared
domain: air_quality
description: "Tests if one or more gas sensors are cleared."
related_conditions:
  - air_quality.is_gas_detected
---

The **Gas cleared** condition passes when one or more gas sensors are no longer detecting gas. After a gas event, you want to be sure the air is truly safe before your automation reopens a shut-off valve or sends an all-clear notification. This condition acts as that safeguard, preventing your automation from acting too early while a reading persists in another room.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your gas sensor is in (like your kitchen or garage). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Gas cleared**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Each** or **All** to control how the check behaves when multiple sensors are targeted.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Each** to pass if at least one targeted sensor is cleared, or **All** to pass only when every targeted sensor is cleared.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_gas_cleared`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_gas_cleared
  target:
    entity_id: binary_sensor.kitchen_gas
{% endexample %}

This passes when the kitchen gas sensor is no longer detecting gas.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple sensors are targeted, controls how results combine. Accepts `all` or `each`.
  required: true
  type: string
  default: each
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Sensors that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as cleared. With **Each** behavior, they are skipped. With **All** behavior, the condition fails if every targeted sensor is unavailable.
- To check whether gas is currently detected, use [Gas detected](/conditions/air_quality.is_gas_detected/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only silence the alarm once every sensor has cleared

After a gas event, pressing a button to silence the alarm too early is risky if gas lingers in another room. This automation triggers when you press the silence button, but the condition requires _every_ gas sensor in the house to read clear before the siren actually turns off. If any sensor still detects gas, the alarm keeps sounding.

- **Trigger**: State: Silence alarm button pressed
- **Condition**: Air Quality: Gas cleared
  - **Target**: All gas sensors (kitchen, basement)
  - **Condition passes if**: All
- **Action**: Turn off siren
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for silencing the alarm only after full all-clear" %}

{% example %}
automation: |
  alias: "Silence alarm only after full gas all-clear"
  triggers:
    - trigger: state
      entity_id: input_button.silence_alarm
  conditions:
    - condition: air_quality.is_gas_cleared
      target:
        entity_id:
          - binary_sensor.kitchen_gas
          - binary_sensor.basement_gas
      options:
        behavior: all
  actions:
    - action: siren.turn_off
      target:
        entity_id: siren.house_alarm
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Gas all-clear"
        message: >
          Every gas sensor reads clear.
          The alarm has been silenced.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

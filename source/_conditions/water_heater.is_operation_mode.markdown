---
title: "Water heater operation mode"
condition: water_heater.is_operation_mode
domain: water_heater
description: "Tests if one or more water heaters are set to a specific operation mode."
related_conditions:
  - water_heater.is_on
  - water_heater.is_off
  - water_heater.is_target_temperature
---

The **Water heater operation mode** condition passes when a water heater {% term entity %} is set to one of the operation modes you select. Use it when you want an automation to run only while a water heater is in a specific mode, like **Eco** or **Performance**.

When you target more than one water heater, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted water heater to match the selected mode, or demand that all of them do.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Water heater operation mode** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your water heater is in, or select a device, a specific entity, a floor, or a label.
5. From the conditions shown for that target, select **Water heater operation mode**.
6. Under **Operation mode**, select one or more modes to check for. Only modes supported by the targeted water heater are shown.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Under **For at least**, enter how long the water heater must stay in the selected mode before the condition passes.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Operation mode:
  description: The operation mode or modes to check for. Only modes supported by the targeted water heater are shown.
Condition passes if:
  description: When multiple water heaters are targeted, controls how results combine. Pick **Any** to pass if at least one targeted water heater matches the selected mode, or **All** to pass only when every targeted water heater matches it. Default is **Any**.
For at least:
  description: How long the water heater must stay in the selected mode before the condition passes. Default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Water heater operation mode** is referred to as `water_heater.is_operation_mode`. A basic example looks like this:

{% example %}
condition: |
  condition: water_heater.is_operation_mode
  target:
    entity_id: water_heater.utility_room
  options:
    operation_mode: eco
{% endexample %}

This passes when `water_heater.utility_room` is currently in `eco` mode.

To check for more than one mode:

{% example %}
condition: |
  condition: water_heater.is_operation_mode
  target:
    entity_id: water_heater.utility_room
  options:
    operation_mode:
      - eco
      - heat_pump
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
operation_mode:
  description: >
    The operation mode or modes to check for. Accepts a single mode string or a list of mode strings. Only modes supported by the targeted water heater are valid.
  required: true
  type: [string, list]
behavior:
  description: >
    When multiple water heaters are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the water heater must stay in the selected mode before the condition passes. Accepts a duration string in `HH:MM:SS` format. For example, `00:05:00` waits 5 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The available operation modes depend on the device. Home Assistant only shows modes that the targeted water heater supports.
- `unavailable` and `unknown` are not offered as selectable modes.
- With **Any**, unavailable and unknown water heaters are skipped. With **All**, they make the condition fail.
- To react when the mode changes instead of checking the current mode, use [Water heater operation mode changed](/triggers/water_heater.operation_mode_changed/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: run recirculation only in performance mode

When the kitchen motion sensor detects activity, run the hot water recirculation pump only if the utility room water heater is already in **Performance** mode.

- **Trigger**: State: Kitchen motion changes to on
- **Condition**: Water heater operation mode
  - **Target**: Utility room water heater
  - **Operation mode**: Performance
- **Action**: Turn on

{% details "YAML example for recirculation in performance mode" %}

{% example %}
automation: |
  alias: "Run recirculation only in performance mode"
  triggers:
    - trigger: state
      entity_id: binary_sensor.kitchen_motion
      to: "on"
  conditions:
    - condition: water_heater.is_operation_mode
      target:
        entity_id: water_heater.utility_room
      options:
        operation_mode: performance
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.hot_water_recirculation
{% endexample %}

{% enddetails %}

### Automation: send a reminder when all targeted water heaters stay in Eco mode

Every evening, check whether all targeted water heaters have stayed in **Eco** mode for 5 minutes. If they have, send a confirmation message.

- **Trigger**: Time: 21:00:00
- **Condition**: Water heater operation mode
  - **Target**: Water heaters with the energy label
  - **Operation mode**: Eco
  - **Condition passes if**: All
  - **For at least**: 00:05:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an Eco mode check" %}

{% example %}
automation: |
  alias: "Confirm Eco mode each evening"
  triggers:
    - trigger: time
      at: "21:00:00"
  conditions:
    - condition: water_heater.is_operation_mode
      target:
        label_id: energy_water_heaters
      options:
        operation_mode: eco
        behavior: all
        for: "00:05:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "All targeted water heaters have stayed in Eco mode for 5 minutes."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

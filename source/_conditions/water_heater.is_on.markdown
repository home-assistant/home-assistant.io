---
title: "Water heater is on"
condition: water_heater.is_on
domain: water_heater
description: "Tests if one or more water heaters are on."
related_conditions:
  - water_heater.is_off
  - water_heater.is_operation_mode
---

The **Water heater is on** condition passes when a water heater {% term entity %} is currently on. Use it to gate an automation so it runs only when a specific water heater, or every targeted water heater, is already heating or ready to heat.

When you target more than one water heater, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted water heater to be on, or demand that all of them are.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Water heater is on** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your water heater is in, or select a device, a specific entity, a floor, or a label.
5. From the conditions shown for that target, select **Water heater is on**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, enter how long the water heater must stay on before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple water heaters are targeted, controls how results combine. Pick **Any** to pass if at least one targeted water heater is on, or **All** to pass only when every targeted water heater is on. Default is **Any**.
For at least:
  description: How long the water heater must stay on before the condition passes. Default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Water heater is on** is referred to as `water_heater.is_on`. A basic example looks like this:

{% example %}
condition: |
  condition: water_heater.is_on
  target:
    entity_id: water_heater.utility_room
{% endexample %}

This passes when `water_heater.utility_room` is currently on.

To require all targeted water heaters to stay on for 5 minutes:

{% example %}
condition: |
  condition: water_heater.is_on
  target:
    label_id: basement_water_heaters
  options:
    behavior: all
    for: "00:05:00"
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple water heaters are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the water heater must stay on before the condition passes. Accepts a duration string in `HH:MM:SS` format. For example, `00:05:00` waits 5 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition checks whether the water heater is on, regardless of which operation mode it is using.
- `unavailable` and `unknown` do not count as on for this condition.
- With **Any**, unavailable and unknown water heaters are skipped. With **All**, they make the condition fail.
- To react when the water heater turns on instead of checking its current state, use [Water heater turned on](/triggers/water_heater.turned_on/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: raise the target temperature only when the water heater is on

When overnight rates begin, raise the target temperature, but only if the water heater is already on.

- **Trigger**: State: Utility rate changes to low
- **Condition**: Water heater is on
  - **Target**: Utility room water heater
- **Action**: Set temperature

{% details "YAML example for setting temperature only when on" %}

{% example %}
automation: |
  alias: "Store more hot water during low-rate periods"
  triggers:
    - trigger: state
      entity_id: sensor.utility_rate
      to: "low"
  conditions:
    - condition: water_heater.is_on
      target:
        entity_id: water_heater.utility_room
  actions:
    - action: water_heater.set_temperature
      target:
        entity_id: water_heater.utility_room
      data:
        temperature: 55
{% endexample %}

{% enddetails %}

### Automation: notify when all basement water heaters are back on

Every 30 minutes, check whether all targeted basement water heaters have stayed on for 5 minutes. If they have, send a notification.

- **Trigger**: Time pattern: Every 30 minutes
- **Condition**: Water heater is on
  - **Target**: Basement water heaters
  - **Condition passes if**: All
  - **For at least**: 00:05:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an all-on check" %}

{% example %}
automation: |
  alias: "Check that basement water heaters are running"
  triggers:
    - trigger: time_pattern
      minutes: "/30"
  conditions:
    - condition: water_heater.is_on
      target:
        label_id: basement_water_heaters
      options:
        behavior: all
        for: "00:05:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "All basement water heaters have stayed on for 5 minutes."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

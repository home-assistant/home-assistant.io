---
title: "Water heater is off"
condition: water_heater.is_off
domain: water_heater
description: "Tests if one or more water heaters are off."
related_conditions:
  - water_heater.is_on
  - water_heater.is_operation_mode
---

The **Water heater is off** condition passes when a water heater {% term entity %} is currently off. Use it to make sure an automation runs only when a specific water heater, or every targeted water heater, is not heating.

When you target more than one water heater, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted water heater to be off, or demand that all of them are.

{% include conditions/ui_header.md %}

To use **Water heater is off** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your water heater is in, or select a device, a specific entity, a floor, or a label.
5. From the conditions shown for that target, select **Water heater is off**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, enter how long the water heater must stay off before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple water heaters are targeted, controls how results combine. Pick **Any** to pass if at least one targeted water heater is off, or **All** to pass only when every targeted water heater is off. Default is **Any**.
For at least:
  description: How long the water heater must stay off before the condition passes. Default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Water heater is off** is referred to as `water_heater.is_off`. A basic example looks like this:

{% example %}
condition: |
  condition: water_heater.is_off
  target:
    entity_id: water_heater.utility_room
{% endexample %}

This passes when `water_heater.utility_room` is currently off.

To require every targeted water heater to stay off for 15 minutes:

{% example %}
condition: |
  condition: water_heater.is_off
  target:
    label_id: vacation_water_heaters
  options:
    behavior: all
    for: "00:15:00"
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
    How long the water heater must stay off before the condition passes. Accepts a duration string in `HH:MM:SS` format. For example, `00:15:00` waits 15 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- `unavailable` and `unknown` do not count as off for this condition.
- With **Any**, unavailable and unknown water heaters are skipped. With **All**, they make the condition fail.
- To check for a transition to off instead of the current state, use [Water heater turned off](/triggers/water_heater.turned_off/).
- To require a water heater to be on instead, use [Water heater is on](/conditions/water_heater.is_on/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: switch to boost mode only when the water heater is off

When a utility-rate sensor reports a low-price period, switch the water heater to **Performance** mode, but only if it is currently off.

- **Trigger**: State: Utility rate changes to low
- **Condition**: Water heater is off
  - **Target**: Utility room water heater
- **Action**: Set water heater operation mode

{% details "YAML example for setting boost mode only when off" %}

{% example %}
automation: |
  alias: "Use low-rate period for hot water recovery"
  triggers:
    - trigger: state
      entity_id: sensor.utility_rate
      to: "low"
  conditions:
    - condition: water_heater.is_off
      target:
        entity_id: water_heater.utility_room
  actions:
    - action: water_heater.set_operation_mode
      target:
        entity_id: water_heater.utility_room
      data:
        operation_mode: performance
{% endexample %}

{% enddetails %}

### Automation: notify when all vacation water heaters stay off

Every hour, check whether all targeted vacation water heaters have stayed off for 15 minutes. If they have, send a reminder notification.

- **Trigger**: Time pattern: Every hour
- **Condition**: Water heater is off
  - **Target**: Vacation water heaters
  - **Condition passes if**: All
  - **For at least**: 00:15:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an off-state reminder" %}

{% example %}
automation: |
  alias: "Check that vacation water heaters remain off"
  triggers:
    - trigger: time_pattern
      hours: "/1"
  conditions:
    - condition: water_heater.is_off
      target:
        label_id: vacation_water_heaters
      options:
        behavior: all
        for: "00:15:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "All vacation water heaters have stayed off for 15 minutes."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

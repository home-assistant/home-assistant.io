---
title: Valve is open
condition: valve.is_open
domain: valve
description: Tests if one or more valves are open.
related_conditions:
  - valve.is_closed
---

The **Valve is open** condition passes when a targeted valve {% term entity %} is currently open.

Use it when you want an automation to continue only if a valve is actively letting water, gas, or air through. For example, create an automation to avoid sending a "start irrigation" action when the main water valve is already open, or gate a water-conservation alert on whether an irrigation valve is still running.

## Prerequisites

- The target valve entity must exist in Home Assistant.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target**, pick the area the valve is in, like your garden or utility room. You can also select a floor, a device, a specific entity, or a label, as described in [Targets](#targets).
5. From the conditions shown for that target, select **Valve is open**.
6. Under **Condition passes if**, pick **Any** or **All** to control how the check behaves when multiple valves are targeted, as described in [Behavior](#behavior-with-multiple-targets).
7. Under **For at least**, set how long the valve must have been open before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: >
    When multiple valves are targeted, controls how results combine. Pick **Any** to pass if at least one targeted valve is open, or **All** to pass only when every targeted valve is open.
For at least:
  description: >
    How long the valve must have been open before the condition passes. Set to zero to pass immediately. Useful to avoid acting on a valve that opened only momentarily.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `valve.is_open`. A basic example looks like this:

{% example %}
condition: |
  condition: valve.is_open
  target:
    entity_id: valve.garden_irrigation
{% endexample %}

This passes when `valve.garden_irrigation` is currently open.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple valves are targeted, controls how results combine.
    Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    Duration the valve must have been open before the condition passes.
    Accepts a duration string like `00:05:00` for 5 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Valves that are in the transitional `opening` state do not satisfy this condition. The condition only passes once the valve is fully `open`. You can check the available states in [The state of a valve entity](/integrations/valve/#the-state-of-a-valve-entity).
- Valves reporting position (0 to 100%) are considered open as soon as their position is above 0. If you need to check for a fully open valve, combine this condition with a numeric state condition on the `current_position` attribute.
- Valves that have an `unavailable` or `unknown` state are skipped from the condition evaluation.
- Use the **For at least** option to make your automation more robust against brief, incidental openings, such as a valve that flickered open during a restart.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: skip irrigation if the main water valve is already open

A water-conservation guard that prevents a scheduled irrigation run from starting if the main supply valve is already open, avoiding double water flow and reducing unnecessary water use.

- **Trigger**: Time: at the scheduled irrigation start time (e.g. 06:00)
- **Condition**: Valve is open
  - **Target**: `valve.main_water_supply`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for skipping irrigation when the supply valve is already open" %}

{% example %}
automation: |
  alias: "Skip irrigation if main supply valve is already open"
  triggers:
    - trigger: time
      at: "06:00:00"
  conditions:
    - condition: valve.is_open
      target:
        entity_id: valve.main_water_supply
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Irrigation skipped"
        message: >
          The main water supply valve is already open.
          Scheduled irrigation was skipped to avoid wasting water.
{% endexample %}

{% enddetails %}

### Automation: turn off the water pump if any irrigation valve has been open for too long

This is a sustainability automation that protects against forgotten-open valves by shutting down the pump after a valve has been running longer than the expected watering window. It prevents overwatering and unnecessary energy use.

- **Trigger**: Time pattern: every 5 minutes
- **Condition**: Valve is open
  - **Target**: Irrigation valves (by label)
  - **For at least**: 00:30:00
- **Action**: Turn off switch
  - **Target**: Water pump
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for turning off the pump after a valve has been open too long" %}

{% example %}
automation: |
  alias: "Turn off pump if irrigation valve stays open too long"
  triggers:
    - trigger: time_pattern
      minutes: "/5"
  conditions:
    - condition: valve.is_open
      target:
        label_id: irrigation_valves
      options:
        for: "00:30:00"
  actions:
    - action: switch.turn_off
      target:
        entity_id: switch.irrigation_pump
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Irrigation pump stopped"
        message: >
          An irrigation valve has been open for over 30 minutes.
          The pump has been turned off to prevent overwatering.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

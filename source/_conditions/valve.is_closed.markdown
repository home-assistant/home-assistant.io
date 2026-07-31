---
title: Valve is closed
condition: valve.is_closed
domain: valve
description: Tests if one or more valves are closed.
related_conditions:
  - valve.is_open
---

The **Valve is closed** condition passes when a targeted valve {% term entity %} is currently closed.

Use it when you want an automation to continue only if no fluid is flowing through a valve. For example, create an automation to confirm that the main water shutoff is closed before performing maintenance, gate a leak-response action on whether the supply valve has been shut off, or prevent a heating system from firing while a gas valve is closed.

## Prerequisites

- The target must be a valve entity that reports whether the valve is open or closed to Home Assistant.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target**, pick the area the valve is in, like your garden or utility room. You can also select a floor, a device, a specific entity, or a label, as described in [Targets](#targets).
5. From the conditions shown for that target, select **Valve is closed**.
6. Under **Condition passes if**, pick **Any** or **All** to control how the check behaves when multiple valves are targeted, as described in [Behavior](#behavior-with-multiple-targets).
7. Under **For at least**, set how long the valve must have been closed before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: >
    When multiple valves are targeted, controls how results combine. Pick **Any** to pass if at least one targeted valve is closed, or **All** to pass only when every targeted valve is closed.
For at least:
  description: >
    How long the valve must have been closed before the condition passes. Set to zero to pass immediately. Useful to confirm that a valve has been stably shut before acting.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `valve.is_closed`. A basic example looks like this:

{% example %}
condition: |
  condition: valve.is_closed
  target:
    entity_id: valve.garden_irrigation
{% endexample %}

This passes when `valve.garden_irrigation` is currently closed.

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
    Duration the valve must have been closed before the condition passes.
    Accepts a duration string like `00:00:30` for 30 seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Valves in the transitional **Closing** state do not satisfy this condition. The condition only passes once the valve is fully **Closed**. You can check the available states in [The state of a valve entity](/integrations/valve/#the-state-of-a-valve-entity).
- Valves reporting position (0 to 100%) are considered closed only when their position is exactly 0. A valve at position 1% is considered open.
- Valves that have an **Unavailable** or **Unknown** state do not count as closed. Home Assistant skips them and evaluates the condition using the remaining targeted valves.
- Use the **For at least** option when you need confidence that a valve is stably closed. For example, set up an automation that waits 10 seconds before sending an "all clear" notification, to avoid false positives from a brief closure during valve movement.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: confirm the main water valve is closed before sending an all-clear after a leak alert

A safety automation that waits until the main water supply valve is confirmed closed before notifying the household that it is safe to proceed. It avoids premature reassurance while water may still be flowing.

- **Trigger**: Time pattern: every minute
- **Condition**: Valve is closed
  - **Target**: `valve.main_water_supply`
  - **For at least**: 00:00:30
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a post-leak all-clear notification when the supply valve is confirmed closed" %}

{% example %}
automation: |
  alias: "Send all-clear once main water valve is confirmed closed"
  triggers:
    - trigger: time_pattern
      minutes: "/1"
  conditions:
    - condition: valve.is_closed
      target:
        entity_id: valve.main_water_supply
      options:
        for: "00:00:30"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Water supply closed"
        message: >
          The main water supply valve has been confirmed closed for at least
          30 seconds. It is safe to inspect the leak and reopen when ready.
{% endexample %}

{% enddetails %}

### Automation: prevent the heating system from starting while the gas valve is closed

A resource-preservation automation that blocks the boiler from starting if the gas supply valve is closed. It avoids wasted ignition cycles and protects the boiler from dry-running while no gas is available.

- **Trigger**: Thermostat started heating
- **Condition**: Valve is closed
  - **Target**: `valve.gas_supply`
- **Action**: Turn off switch
  - **Target**: Boiler
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for blocking the boiler when the gas valve is closed" %}

{% example %}
automation: |
  alias: "Block boiler start when gas supply valve is closed"
  triggers:
    - trigger: state
      entity_id: switch.boiler
      to: "on"
  conditions:
    - condition: valve.is_closed
      target:
        entity_id: valve.gas_supply
  actions:
    - action: switch.turn_off
      target:
        entity_id: switch.boiler
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Boiler blocked"
        message: >
          The boiler tried to start but the gas supply valve is closed.
          Open the gas valve before restarting the heating system.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

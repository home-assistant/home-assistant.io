---
title: "Gate is closed"
condition: gate.is_closed
domain: gate
description: "Tests if one or more gates are closed."
related_conditions:
  - gate.is_open
---

The **Gate is closed** condition passes when one or more targeted gates are currently closed. Use it when an automation should continue only after a gate is shut.

This condition is useful for safety checks and routines that should run only when access is secured, like arming your home or starting irrigation.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Gate is closed**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your gate is in, like your driveway or courtyard. You can also select a floor, a device, a specific entity, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, enter how long the gate must have stayed closed before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple gates are targeted, controls how results combine. Pick **Any** to pass if at least one targeted gate is closed, or **All** to pass only when every targeted gate is closed.
For at least:
  description: How long the gate must have stayed closed before the condition passes.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `gate.is_closed`. A basic example looks like this:

{% example %}
condition: |
  condition: gate.is_closed
  target:
    entity_id: cover.driveway_gate
{% endexample %}

This passes when `cover.driveway_gate` is currently closed.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple gates are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the gate must have stayed closed before the condition passes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition works only with `cover` entities that use the `gate` device class.
- Entities in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- With **Any**, the condition passes if at least one available targeted gate is closed.
- With **All**, the condition passes only if every available targeted gate is closed. If every targeted gate is `unavailable` or `unknown`, **All** passes and **Any** fails.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: arm the house at night only when every gate is closed

At bedtime, this automation arms your home only if the driveway gate and courtyard gate are both closed. That keeps you from arming the house while access is still open.

- **Trigger**: Time
- **Condition**: Gate is closed
   - **Target**: Driveway gate and courtyard gate
   - **Condition passes if**: All
- **Action**: Alarm control panel: Arm away

{% details "YAML example for arming only after all gates are closed" %}

{% example %}
automation: |
  alias: "Arm the house only when all gates are closed"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: gate.is_closed
      target:
        entity_id:
          - cover.driveway_gate
          - cover.courtyard_gate
      options:
        behavior: all
  actions:
    - action: alarm_control_panel.alarm_arm_away
      target:
        entity_id: alarm_control_panel.home_alarm
{% endexample %}

{% enddetails %}

### Automation: start irrigation only after the side gate has been closed for 5 minutes

If people often walk through the side gate in the morning, this automation waits until the gate has stayed closed for 5 minutes before it turns on irrigation. That helps avoid spraying someone who is still using the path.

- **Trigger**: Time
- **Condition**: Gate is closed
   - **Target**: Side gate
   - **For at least**: 00:05:00
- **Action**: Switch: Turn on

{% details "YAML example for waiting to start irrigation" %}

{% example %}
automation: |
  alias: "Start irrigation only after the side gate is closed"
  triggers:
    - trigger: time
      at: "06:00:00"
  conditions:
    - condition: gate.is_closed
      target:
        entity_id: cover.side_gate
      options:
        behavior: any
        for: "00:05:00"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.garden_irrigation
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

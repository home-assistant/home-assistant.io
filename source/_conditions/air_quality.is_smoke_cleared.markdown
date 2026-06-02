---
title: "Smoke cleared"
condition: air_quality.is_smoke_cleared
domain: air_quality
description: "Tests if one or more smoke sensors are cleared."
related_conditions:
  - air_quality.is_smoke_detected
---

The **Smoke cleared** condition passes when one or more smoke sensors are no longer detecting smoke. After a smoke event, the last thing you want is to restore normal lighting or send an all-clear while one room still has hazy air. This condition acts as your safety gate, letting your automation continue only after every sensor in the house confirms the air is clear again.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your smoke sensor is in (like your kitchen or garage). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Smoke cleared**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Each** or **All** to control how the check behaves when multiple sensors are targeted.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Each** to pass if at least one targeted sensor is cleared, or **All** to pass only when every targeted sensor is cleared.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_smoke_cleared`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_smoke_cleared
  target:
    entity_id: binary_sensor.kitchen_smoke
{% endexample %}

This passes when the kitchen smoke sensor is no longer detecting smoke.

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
- To check whether smoke is currently detected, use [Smoke detected](/conditions/air_quality.is_smoke_detected/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only restore normal lighting once every smoke sensor has cleared

After a smoke event, you want to keep the emergency lights on until every room is safe. This automation triggers when you press the reset button, but the condition requires _every_ smoke sensor to read clear before the normal lighting scene restores. If any sensor still detects smoke, the emergency lights stay on.

- **Trigger**: State: Reset lighting button pressed
- **Condition**: Air Quality: Smoke cleared
  - **Target**: All smoke sensors (kitchen, hallway)
  - **Condition passes if**: All
- **Action**: Activate scene (normal lighting)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for restoring lighting only after full smoke all-clear" %}

{% example %}
automation: |
  alias: "Restore lights only after full smoke all-clear"
  triggers:
    - trigger: state
      entity_id: input_button.reset_lighting
  conditions:
    - condition: air_quality.is_smoke_cleared
      target:
        entity_id:
          - binary_sensor.kitchen_smoke
          - binary_sensor.hallway_smoke
      options:
        behavior: all
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.normal_lighting
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Smoke all-clear"
        message: >
          Every smoke sensor reads clear.
          Normal lighting has been restored.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

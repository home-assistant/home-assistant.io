---
title: "Humidifier target humidity"
condition: humidifier.is_target_humidity
domain: humidifier
description: "Tests the target humidity of one or more humidifiers."
related_conditions:
  - humidifier.is_on
  - humidifier.is_humidifying
  - humidifier.is_drying
---

The **Humidifier target humidity** condition passes when a humidifier {% term entity %}'s target humidity setting meets a threshold you define. The target humidity is the setpoint you configure on the device, not the actual current humidity reading from its sensor. Use this condition to gate automations based on what the humidifier is aiming for, for example to skip an adjustment if the device is already set to a high enough level.

When you target more than one humidifier, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted humidifier to meet the threshold, or demand that all of them do.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Humidifier target humidity** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your humidifier is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Humidifier target humidity**.
6. Under **Threshold type**, enter the target humidity percentage the condition checks against.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple humidifiers are targeted.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The target humidity percentage the humidifier has to be set to or above for the condition to pass. Can be a fixed number between 0 and 100, or a reference to an `input_number`, `number`, or `sensor` helper entity that provides a humidity value.
  required: true
Condition passes if:
  description: When multiple humidifiers are targeted, controls how results combine. Pick **Any** to pass if at least one targeted humidifier meets the threshold, or **All** to pass only when every targeted humidifier does. Default is **Any**.
  required: true
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Humidifier target humidity** is referred to as `humidifier.is_target_humidity`. A basic example looks like this:

{% example %}
condition: |
  condition: humidifier.is_target_humidity
  target:
    entity_id: humidifier.bedroom
  options:
    threshold: 50
{% endexample %}

This passes when the bedroom humidifier's target humidity is set to 50% or above.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The target humidity percentage the humidifier has to be set to or above for the condition to pass. Accepts a number between 0 and 100, or a reference to an `input_number`, `number`, or `sensor` entity that provides a humidity value.
  required: true
  type: any
behavior:
  description: >
    When multiple humidifiers are targeted, controls how results combine. Accepts `all` or `any`.
  required: true
  type: string
  default: any
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition checks the humidifier's _target humidity_ setpoint, not the actual measured humidity in the room. To react to the measured humidity, use a sensor-based numeric condition instead.
- Humidifiers that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped for **Any** and fail for **All**.
- Target humidity is expressed as a percentage. The valid range depends on the device, but is typically between 20% and 90%.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: skip boosting if the target is already high enough

When you press the boost button, increase the humidifier's target humidity. But if the bedroom humidifier is already set to 65% or above, skip the adjustment to avoid over-humidifying the room.

- **Trigger**: State: Boost button pressed
- **Condition**: Humidifier target humidity (negated: not already at 65% or above)
- **Target**: Bedroom humidifier
- **Condition passes if**: Any
- **Action**: Humidifier: Set humidity

{% details "YAML example for skipping a boost when the target is already high" %}

{% example %}
automation: |
  alias: "Boost humidity only if target is low"
  triggers:
    - trigger: state
      entity_id: input_button.humidity_boost
  conditions:
    - condition: not
      conditions:
        - condition: humidifier.is_target_humidity
          target:
            entity_id: humidifier.bedroom
          options:
            threshold: 65
            behavior: any
  actions:
    - action: humidifier.set_humidity
      target:
        entity_id: humidifier.bedroom
      data:
        humidity: 65
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

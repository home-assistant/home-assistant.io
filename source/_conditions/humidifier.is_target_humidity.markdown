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

The **Humidifier target humidity** condition passes when a humidifier {% term entity %}'s target humidity setting meets a threshold you define. The target humidity is the setpoint you configure on the device, not the actual current humidity reading from its sensor. For example, you can use it to turn on a ventilation fan when the humidifier is set to 70% or above.

When you target more than one humidifier, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted humidifier to meet the threshold, or demand that all of them do.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Humidifier target humidity** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your humidifier is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Humidifier target humidity**.
6. Under **Threshold type**, set the comparison direction (**Above**, **Below**, **In range**, or **Outside range**) and the threshold value.
   - Choose **Number** to enter a fixed humidity percentage between 0 and 100, or **Entity** to use a humidity sensor or input number as the threshold.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple humidifiers are targeted.
8. Under **For at least**, set how long the humidifier must have been at the threshold before the condition passes. Leave it at zero to pass immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: Controls how the target humidity is compared and where the threshold value comes from. Use **Above**, **Below**, **In range**, or **Outside range** to set the comparison direction. Then choose **Number** to enter a fixed percentage between 0 and 100, or **Entity** to use a humidity sensor or input number as the threshold value.
  required: true
Condition passes if:
  description: When multiple humidifiers are targeted, controls how results combine. Pick **Any** to pass if at least one targeted humidifier meets the threshold, or **All** to pass only when every targeted humidifier does. Default is **Any**.
  required: true
For at least:
  description: How long the humidifier must have continuously met the threshold before the condition passes. Default is `0` (passes immediately).
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
    threshold:
      above: 50
{% endexample %}

This passes when the bedroom humidifier's target humidity is set above 50%.

### Options in YAML

{% options_yaml %}
threshold:
  description: >
    The threshold to check the target humidity against. Accepts a mapping with the comparison direction as the key and the humidity percentage (0–100) as the value. Use `above`, `below`, or both (`above` and `below` together for a range) as keys. Instead of a fixed number, you can reference a `sensor`, `input_number`, or `number` entity as the value.
  required: true
  type: map
behavior:
  description: >
    When multiple humidifiers are targeted, controls how results combine. Accepts `all` or `any`.
  required: true
  type: string
  default: any
for:
  description: >
    How long the humidifier must have continuously met the threshold before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: true
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition checks the humidifier's _target humidity_ setpoint, not the actual measured humidity in the room. To react to the measured humidity, use a sensor-based numeric condition instead.
- Humidifiers that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped for **Any** and fail for **All**.
- Target humidity is expressed as a percentage. The valid range depends on the device, but is typically between 20% and 90%.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: turn on the ventilation fan when the humidifier is set high

When the bedroom humidifier's target humidity is set to 70% or above, turn on the ventilation fan to reduce the risk of condensation. This keeps air circulating whenever the humidifier is running at a high setting.

- **Trigger**: State change of the bedroom humidifier's `humidity` attribute
- **Condition**: Humidifier target humidity (70% or above)
- **Target**: Bedroom humidifier
- **Condition passes if**: Any
- **Action**: Switch: Turn on ventilation fan

{% details "YAML example for turning on the ventilation fan when the target is high" %}

{% example %}
automation: |
  alias: "Ventilation fan on when humidifier target is high"
  triggers:
    - trigger: state
      entity_id: humidifier.bedroom
      attribute: humidity
  conditions:
    - condition: humidifier.is_target_humidity
      target:
        entity_id: humidifier.bedroom
      options:
        threshold:
          above: 70
        behavior: any
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.ventilation_fan
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

---
title: "Smoke detected"
condition: air_quality.is_smoke_detected
domain: air_quality
description: "Tests if one or more smoke sensors are detecting smoke."
related_conditions:
  - air_quality.is_smoke_cleared
---

The **Smoke detected** condition passes when one or more smoke sensors are actively detecting smoke. When seconds count, your automation needs to act on confirmed smoke, not on a brief sensor glitch. This condition makes sure that emergency lighting, alarm sirens, or urgent phone notifications only fire while smoke is truly present.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your smoke sensor is in (like your kitchen or garage). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Smoke detected**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Each** or **All** to control how the check behaves when multiple sensors are targeted.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Each** to pass if at least one targeted sensor detects smoke, or **All** to pass only when every targeted sensor detects smoke.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_smoke_detected`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_smoke_detected
  target:
    entity_id: binary_sensor.kitchen_smoke
{% endexample %}

This passes when the kitchen smoke sensor is currently detecting smoke.

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

- Sensors that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as detecting. With **Each** behavior, they are skipped. With **All** behavior, the condition fails if every targeted sensor is unavailable.
- To check whether smoke is no longer detected, use [Smoke cleared](/conditions/air_quality.is_smoke_cleared/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: send a reminder every 5 minutes while smoke is detected

During a smoke event, a single notification is easy to miss. This automation fires every 5 minutes and checks whether the kitchen smoke sensor is still detecting smoke. As long as smoke is present, you keep getting reminders so you stay up to date.

- **Trigger**: Time pattern: Every 5 minutes
- **Condition**: Air Quality: Smoke detected
  - **Target**: Kitchen smoke sensor
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for repeating smoke reminders" %}

{% example %}
automation: |
  alias: "Repeating smoke reminder"
  triggers:
    - trigger: time_pattern
      minutes: "/5"
  conditions:
    - condition: air_quality.is_smoke_detected
      target:
        entity_id: binary_sensor.kitchen_smoke
      options:
        behavior: each
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Smoke still detected"
        message: >
          The kitchen smoke sensor is still
          detecting smoke. Check the house.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

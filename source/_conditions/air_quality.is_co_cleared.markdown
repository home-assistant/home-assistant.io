---
title: "Carbon monoxide cleared"
condition: air_quality.is_co_cleared
domain: air_quality
description: "Tests if one or more carbon monoxide sensors are cleared."
related_conditions:
  - air_quality.is_co_detected
  - air_quality.is_co_value
---

The **Carbon monoxide cleared** condition passes when one or more carbon monoxide sensors are no longer detecting carbon monoxide (CO). After a CO event, you want to be absolutely sure the air is safe before letting your automation silence the alarm or tell the household everything is fine.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your CO sensor is in (like your kitchen or garage). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Carbon monoxide cleared**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple sensors are targeted.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Any** to pass if at least one targeted sensor is cleared, or **All** to pass only when every targeted sensor is cleared.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_co_cleared`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_co_cleared
  target:
    entity_id: binary_sensor.hallway_co
{% endexample %}

This passes when the hallway carbon monoxide sensor is no longer detecting CO.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple sensors are targeted, controls how results combine. Accepts `all` or `any`.
  required: true
  type: string
  default: any
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Sensors that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as cleared. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted sensor is unavailable.
- To check whether carbon monoxide is currently detected, use [Carbon monoxide detected](/conditions/air_quality.is_co_detected/).
- To check the actual CO concentration, use [Carbon monoxide value](/conditions/air_quality.is_co_value/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only silence the alarm once every CO sensor has cleared

After a CO event, you want the alarm to keep sounding until every room is safe. This automation triggers when you press the silence button, but the condition requires _every_ CO sensor in the house to read clear before the siren actually turns off. If any sensor still detects carbon monoxide, the alarm keeps going.

- **Trigger**: State: Silence alarm button pressed
- **Condition**: Air Quality: Carbon monoxide cleared
  - **Target**: All CO sensors (hallway, basement)
  - **Condition passes if**: All
- **Action**: Turn off siren
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for silencing the alarm only after full CO all-clear" %}

{% example %}
automation: |
  alias: "Silence alarm only after full CO all-clear"
  triggers:
    - trigger: state
      entity_id: input_button.silence_alarm
  conditions:
    - condition: air_quality.is_co_cleared
      target:
        entity_id:
          - binary_sensor.hallway_co
          - binary_sensor.basement_co
      options:
        behavior: all
  actions:
    - action: siren.turn_off
      target:
        entity_id: siren.house_alarm
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "CO all-clear"
        message: >
          Every CO sensor reads clear.
          The alarm has been silenced.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

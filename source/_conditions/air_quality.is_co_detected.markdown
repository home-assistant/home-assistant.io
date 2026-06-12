---
title: "Carbon monoxide detected"
condition: air_quality.is_co_detected
domain: air_quality
description: "Tests if one or more carbon monoxide sensors are detecting carbon monoxide."
related_conditions:
  - air_quality.is_co_cleared
  - air_quality.is_co_value
---

The **Carbon monoxide detected** condition passes when one or more carbon monoxide sensors are actively detecting carbon monoxide (CO). Because CO is colorless and odorless, your sensors are the only way to know it is there. Adding this condition to your automation ensures that safety actions, like sounding an alarm, turning on ventilation, or sending an urgent notification, only happen while the danger is confirmed. It prevents false alarms from a sensor that briefly flickered and keeps your response focused on real threats.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your CO sensor is in (like your kitchen or garage). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Carbon monoxide detected**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple sensors are targeted.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Any** to pass if at least one targeted sensor detects carbon monoxide, or **All** to pass only when every targeted sensor detects carbon monoxide.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_co_detected`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_co_detected
  target:
    entity_id: binary_sensor.hallway_co
{% endexample %}

This passes when the hallway carbon monoxide sensor is currently detecting CO.

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

- Sensors that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as detecting. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted sensor is unavailable.
- To check whether carbon monoxide is no longer detected, use [Carbon monoxide cleared](/conditions/air_quality.is_co_cleared/).
- To check the actual CO concentration rather than just a binary detection, use [Carbon monoxide value](/conditions/air_quality.is_co_value/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: warn the family when someone arrives home during a CO event

If carbon monoxide built up while the family was out, the first person home needs a warning before walking inside. This automation triggers when someone enters the home zone and checks whether the hallway CO sensor is still detecting carbon monoxide. If it is, an urgent notification tells them to stay outside and call emergency services.

- **Trigger**: Zone: Person enters home zone
- **Condition**: Air Quality: Carbon monoxide detected
  - **Target**: Hallway CO sensor
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a CO warning on arrival home" %}

{% example %}
automation: |
  alias: "CO warning on arrival home"
  triggers:
    - trigger: zone
      entity_id: person.frenck
      zone: zone.home
      event: enter
  conditions:
    - condition: air_quality.is_co_detected
      target:
        entity_id: binary_sensor.hallway_co
      options:
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Carbon monoxide detected at home"
        message: >
          The hallway CO sensor is detecting carbon
          monoxide. Stay outside and call emergency services.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

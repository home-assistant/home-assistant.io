---
title: "Gas detected"
condition: air_quality.is_gas_detected
domain: air_quality
description: "Tests if one or more gas sensors are detecting gas."
related_conditions:
  - air_quality.is_gas_cleared
---

The **Gas detected** condition passes when one or more gas sensors are actively detecting gas. Gas sensors watch for combustible or toxic gases in the air, helping protect your home from leaks and hazardous buildups. Add this condition to your automation so it only takes action while a gas hazard is still present, for example keeping the kitchen exhaust fan running for as long as the sensor reports gas, or making sure an emergency notification goes out only when the threat is real and ongoing.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your gas sensor is in (like your kitchen or garage). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Gas detected**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple sensors are targeted.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Any** to pass if at least one targeted sensor detects gas, or **All** to pass only when every targeted sensor detects gas.
  required: true
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_gas_detected`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_gas_detected
  target:
    entity_id: binary_sensor.kitchen_gas
{% endexample %}

This passes when the kitchen gas sensor is currently detecting gas.

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
- To check whether gas is no longer detected, use [Gas cleared](/conditions/air_quality.is_gas_cleared/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: alert when you arrive home and gas is detected

If a gas leak started while you were away, you want to know the moment you pull into the driveway. This automation triggers when you arrive home and checks whether the kitchen gas sensor is still detecting gas. If it is, you get an urgent notification before you even open the front door so you know to stay outside and call for help.

- **Trigger**: Zone: Person enters home zone
- **Condition**: Air Quality: Gas detected
- **Target**: Kitchen gas sensor
- **Condition passes if**: Any
- **Action**: Notify: Send urgent notification

{% details "YAML example for a gas alert on arrival home" %}

{% example %}
automation: |
  alias: "Gas alert on arrival home"
  triggers:
    - trigger: zone
      entity_id: person.frenck
      zone: zone.home
      event: enter
  conditions:
    - condition: air_quality.is_gas_detected
      target:
        entity_id: binary_sensor.kitchen_gas
      options:
        behavior: any
  actions:
    - action: notify.mobile_app_phone
      data:
        title: "Gas detected at home"
        message: >
          The kitchen gas sensor is detecting gas.
          Do not enter the house.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

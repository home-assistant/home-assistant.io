---
title: "Siren is on"
condition: siren.is_on
domain: siren
description: "Tests if one or more sirens are on."
related_conditions:
  - siren.is_off
---

The **Siren is on** condition is useful when an automation should continue only while a siren is sounding. You can use it to send repeated reminders, stop a siren after a set time, or make sure a follow-up action only runs while the siren is still on.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your siren is in. You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Siren is on**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple sirens are targeted.
7. Under **For at least**, set how long the siren must stay on before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple sirens are targeted, controls how results combine. Pick **Any** to pass if at least one targeted siren is on, or **All** to pass only when every targeted siren is on.
For at least:
  description: How long the siren must stay on before the condition passes.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `siren.is_on`. A basic example looks like this:

{% example %}
condition: |
  condition: siren.is_on
  target:
    entity_id: siren.patio
{% endexample %}

This passes when `siren.patio` is currently on.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple sirens are targeted, controls how results combine.
    Accepts `all` or `any`.
  required: true
  type: string
  default: any
for:
  description: >
    How long the siren must stay on before the condition passes.
    Accepts a duration string like `00:05:00`.
  required: true
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Sirens in the `unavailable` or `unknown` state do not count as being on.
- With **All** behavior, the condition passes only if every targeted siren is on for the selected time.
- To check whether a siren is not sounding, use [Siren is off](/conditions/siren.is_off/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: send a reminder while the siren is still on

If a siren keeps sounding, it is easy to miss the first alert and forget to check again. This automation runs every minute and sends a reminder only if the patio siren has stayed on for at least 5 minutes.

- **Trigger**: Time pattern: Every minute
- **Condition**: Siren is on
  - **Target**: Patio siren
  - **Condition passes if**: Any
  - **For at least**: 00:05:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a siren reminder" %}

{% example %}
automation: |
  alias: "Remind me while the patio siren is on"
  triggers:
    - trigger: time_pattern
      minutes: "/1"
  conditions:
    - condition: siren.is_on
      target:
        entity_id: siren.patio
      options:
        behavior: any
        for: "00:05:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Siren still on"
        message: >
          The patio siren has been on for
          at least 5 minutes.
{% endexample %}

{% enddetails %}

### Automation: turn off the siren when the alarm is disarmed

When you disarm your alarm, you usually want the noise to stop too. This automation turns off the entry siren only if it is still on when the alarm control panel changes to the disarmed state.

- **Trigger**: State changed: Home alarm to disarmed
- **Condition**: Siren is on
  - **Target**: Entry siren
  - **Condition passes if**: Any
  - **For at least**: 00:00:00
- **Action**: Turn off siren

{% details "YAML example for silencing the siren after disarming" %}

{% example %}
automation: |
  alias: "Turn off the siren when the alarm is disarmed"
  triggers:
    - trigger: state
      entity_id: alarm_control_panel.home_alarm
      to: disarmed
  conditions:
    - condition: siren.is_on
      target:
        entity_id: siren.entry
      options:
        behavior: any
        for: "00:00:00"
  actions:
    - action: siren.turn_off
      target:
        entity_id: siren.entry
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

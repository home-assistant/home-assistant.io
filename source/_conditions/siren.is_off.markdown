---
title: "Siren is off"
condition: siren.is_off
domain: siren
description: "Tests if one or more sirens are off."
related_conditions:
  - siren.is_on
---

The **Siren is off** condition is useful when an automation should continue only when a siren is quiet. You can use it to confirm a reset is complete, avoid starting a test during a real alarm, or make sure another action runs only after the siren has stopped.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your siren is in. You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Siren is off**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Each** or **All** to control how the check behaves when multiple sirens are targeted.
7. Under **For at least**, set how long the siren must stay off before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple sirens are targeted, controls how results combine. Pick **Each** to pass if at least one targeted siren is off, or **All** to pass only when every targeted siren is off.
For at least:
  description: How long the siren must stay off before the condition passes.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `siren.is_off`. A basic example looks like this:

{% example %}
condition: |
  condition: siren.is_off
  target:
    entity_id: siren.entry
{% endexample %}

This passes when `siren.entry` is currently off.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple sirens are targeted, controls how results combine.
    Accepts `all` or `each`.
  required: false
  type: string
  default: each
for:
  description: >
    How long the siren must stay off before the condition passes.
    Accepts a duration string like `00:05:00`.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Sirens in the `unavailable` or `unknown` state do not count as being off.
- With **All** behavior, the condition passes only if every targeted siren is off for the selected time.
- To check whether a siren is sounding, use [Siren is on](/conditions/siren.is_on/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: confirm the alarm has reset after the siren stays off

After you disarm an alarm, you may want a quick confirmation that the siren has really stopped. This automation waits for the entry siren to stay off for 30 seconds, then sends a message that the reset is complete.

- **Trigger**: State changed: Home alarm to disarmed
- **Condition**: Siren is off
  - **Target**: Entry siren
  - **For at least**: 00:00:30
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a siren reset confirmation" %}

{% example %}
automation: |
  alias: "Confirm the siren has stopped"
  triggers:
    - trigger: state
      entity_id: alarm_control_panel.home_alarm
      to: disarmed
  conditions:
    - condition: siren.is_off
      target:
        entity_id: siren.entry
      options:
        for: "00:00:30"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Alarm reset complete"
        message: >
          The entry siren has been off for
          30 seconds.
{% endexample %}

{% enddetails %}

### Automation: run a siren test only when every siren is off

Testing a siren is useful, but not if a real alarm is already active. This automation runs a short siren test at noon only when every targeted siren is already off.

- **Trigger**: Time: 12:00
- **Condition**: Siren is off
  - **Target**: All sirens (by label)
  - **Condition passes if**: All
- **Action**: Turn on siren

{% details "YAML example for a siren test" %}

{% example %}
automation: |
  alias: "Siren test at noon"
  triggers:
    - trigger: time
      at: "12:00:00"
  conditions:
    - condition: siren.is_off
      target:
        label_id: house_sirens
      options:
        behavior: all
  actions:
    - action: siren.turn_on
      target:
        entity_id: siren.entry
      data:
        duration: 3
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

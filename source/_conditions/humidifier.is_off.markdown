---
title: "Humidifier is off"
condition: humidifier.is_off
domain: humidifier
description: "Tests if one or more humidifiers are off."
related_conditions:
  - humidifier.is_on
  - humidifier.is_humidifying
  - humidifier.is_drying
---

The **Humidifier is off** condition passes when a humidifier {% term entity %} is currently switched off. Use it to prevent automations from running actions that only make sense on a powered-on device, or to send a reminder when a humidifier that should be running has been left off.

When you target more than one humidifier, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted humidifier to be off, or demand that all of them are.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Humidifier is off** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your humidifier is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Humidifier is off**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple humidifiers are targeted.
7. Under **For at least**, set how long the humidifier must have been off before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple humidifiers are targeted, controls how results combine. Pick **Any** to pass if at least one targeted humidifier is off, or **All** to pass only when every targeted humidifier is off. Default is **Any**.
For at least:
  description: How long the humidifier must have been continuously off before the condition passes. Default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Humidifier is off** is referred to as `humidifier.is_off`. A basic example looks like this:

{% example %}
condition: |
  condition: humidifier.is_off
  target:
    entity_id: humidifier.bedroom
{% endexample %}

This passes when the bedroom humidifier is currently off.

### Options in YAML

{% options_yaml %}
behavior:
  description: >
    When multiple humidifiers are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the humidifier must have been continuously off before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Humidifiers that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as off. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted humidifier is unavailable.
- To gate an automation on the humidifier being on instead, use [Humidifier is on](/conditions/humidifier.is_on/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: send a bedtime reminder if the humidifier is still off

At 22:30 on weeknights, check whether the bedroom humidifier has been left off. If so, send a reminder so you can switch it on before you sleep.

- **Trigger**: Time: 22:30
- **Condition**: Day of the week is Monday to Friday
- **Condition**: Humidifier is off
  - **Target**: Bedroom humidifier
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My device (`notify.my_device`)

{% details "YAML example for a bedtime humidifier reminder" %}

{% example %}
automation: |
  alias: "Bedtime reminder if humidifier is off"
  triggers:
    - trigger: time
      at: "22:30:00"
  conditions:
    - condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
    - condition: humidifier.is_off
      target:
        entity_id: humidifier.bedroom
      options:
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The bedroom humidifier is off.
          Switch it on before you sleep.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

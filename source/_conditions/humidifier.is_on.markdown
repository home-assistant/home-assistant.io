---
title: "Humidifier is on"
condition: humidifier.is_on
domain: humidifier
description: "Tests if one or more humidifiers are on."
related_conditions:
  - humidifier.is_off
  - humidifier.is_humidifying
  - humidifier.is_drying
---

The **Humidifier is on** condition passes when a humidifier {% term entity %} is currently switched on. For example, you can adjust the target humidity only when the humidifier is ready to act on the change.

When you target more than one humidifier, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted humidifier to be on, or demand that all of them are.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Humidifier is on** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your humidifier is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Humidifier is on**.
6. If you targeted more than one humidifier, an extra option appears: under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check combines results.
7. Under **For at least**, set how long the humidifier must have been on before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: Only shown when multiple humidifiers are targeted. Controls how results combine. Pick **Any** to pass if at least one targeted humidifier is on, or **All** to pass only when every targeted humidifier is on. Default is **Any**.
For at least:
  description: How long the humidifier must have been continuously on before the condition passes. Useful to confirm the device has been running for a meaningful amount of time before taking action. Default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Humidifier is on** is referred to as `humidifier.is_on`. A basic example looks like this:

{% example %}
condition: |
  condition: humidifier.is_on
  target:
    entity_id: humidifier.bedroom
{% endexample %}

This passes when the bedroom humidifier is currently on.

### Options in YAML

{% options_yaml %}
behavior:
  description: >
    Only relevant when multiple humidifiers are targeted. Controls how results combine. Use `any` to pass if at least one targeted humidifier is on, or `all` to pass only when every targeted humidifier is on.
  required: false
  type: string
  default: any
for:
  description: >
    How long the humidifier must have been continuously on before the condition passes. Useful to confirm the device has been running for a meaningful amount of time before taking action. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Being "on" does not mean the humidifier is actively running. A device that is on may idle once it reaches its target humidity and only resume when the air dries out. To check for an active humidification cycle, use [Humidifier is humidifying](/conditions/humidifier.is_humidifying/).
- Humidifiers that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as on. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted humidifier is unavailable.
- To gate an automation on the humidifier being off instead, use [Humidifier is off](/conditions/humidifier.is_off/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: adjust target humidity only when the humidifier is on

At 22:00, lower the bedroom humidity target for sleeping, but only if the humidifier is already on. Skip the action entirely if the device has been switched off.

- **Trigger**: Time: 22:00
- **Condition**: Humidifier is on
- **Target**: Bedroom humidifier
- **Condition passes if**: Any
- **Action**: Humidifier: Set humidity

{% details "YAML example for a gated humidity adjustment" %}

{% example %}
automation: |
  alias: "Lower humidity at night if humidifier is on"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: humidifier.is_on
      target:
        entity_id: humidifier.bedroom
      options:
        behavior: any
  actions:
    - action: humidifier.set_humidity
      target:
        entity_id: humidifier.bedroom
      data:
        humidity: 45
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

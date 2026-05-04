---
title: "Humidifier is humidifying"
condition: humidifier.is_humidifying
domain: humidifier
description: "Tests if one or more humidifiers are humidifying."
related_conditions:
  - humidifier.is_on
  - humidifier.is_drying
  - humidifier.is_mode
---

The **Humidifier is humidifying** condition passes when a humidifier {% term entity %} is actively adding moisture to the air. A humidifier that is switched on does not necessarily run continuously. It pauses once it reaches its target humidity and resumes only when the air dries out again. Use **Humidifier is humidifying** to confirm the device is in an active cycle, rather than just powered on and idle.

When you target more than one humidifier, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted humidifier to be actively humidifying, or demand that all of them are.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Humidifier is humidifying** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your humidifier is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Humidifier is humidifying**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple humidifiers are targeted.
7. Under **For at least**, set how long the humidifier must have been actively humidifying before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple humidifiers are targeted, controls how results combine. Pick **Any** to pass if at least one targeted humidifier is actively humidifying, or **All** to pass only when every targeted humidifier is actively humidifying. Default is **Any**.
  required: true
For at least:
  description: How long the humidifier must have been continuously humidifying before the condition passes. Default is `0` (passes immediately).
  required: true
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Humidifier is humidifying** is referred to as `humidifier.is_humidifying`. A basic example looks like this:

{% example %}
condition: |
  condition: humidifier.is_humidifying
  target:
    entity_id: humidifier.bedroom
{% endexample %}

This passes when the bedroom humidifier is actively adding moisture to the air.

### Options in YAML

{% options_yaml %}
behavior:
  description: >
    When multiple humidifiers are targeted, controls how results combine. Accepts `all` or `any`.
  required: true
  type: string
  default: any
for:
  description: >
    How long the humidifier must have been continuously humidifying before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: true
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- A humidifier can be on but not humidifying if it has already reached its target humidity and is idling. Use [Humidifier is on](/conditions/humidifier.is_on/) if you only care about whether the device is powered.
- Humidifiers that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as actively humidifying. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted humidifier is unavailable.
- This condition only applies to devices in a humidification cycle. For dehumidifiers that are actively removing moisture, use [Humidifier is drying](/conditions/humidifier.is_drying/) instead.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: run an air purifier only while the humidifier is active

When the bedroom humidifier is confirmed to be in an active humidification cycle, turn on the air purifier alongside it. This keeps both devices running together during active cycles without running the purifier while the humidifier idles.

- **Trigger**: Time pattern: Every 5 minutes
- **Condition**: Humidifier is humidifying
- **Target**: Bedroom humidifier
- **Condition passes if**: Any
- **Action**: Fan: Turn on

{% details "YAML example for running a purifier alongside the humidifier" %}

{% example %}
automation: |
  alias: "Run purifier while humidifier is active"
  triggers:
    - trigger: time_pattern
      minutes: "/5"
  conditions:
    - condition: humidifier.is_humidifying
      target:
        entity_id: humidifier.bedroom
      options:
        behavior: any
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom_purifier
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

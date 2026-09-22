---
title: "Humidifier is drying"
condition: humidifier.is_drying
domain: humidifier
description: "Tests if one or more humidifiers are drying."
related_conditions:
  - humidifier.is_on
  - humidifier.is_humidifying
  - humidifier.is_mode
---

The **Humidifier is drying** condition passes when a humidifier {% term entity %} is actively removing moisture from the air. This typically applies to dehumidifiers and devices set to a dehumidification mode. Like a humidifier that idles once it reaches its target, a dehumidifier pauses once the air is dry enough and resumes when humidity rises again. Use **Humidifier is drying** to confirm the device is in an active drying cycle, not just powered on.

When you target more than one humidifier, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted device to be actively drying, or demand that all of them are.

{% include conditions/ui_header.md %}

To use **Humidifier is drying** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your dehumidifier is in (like your basement or bathroom). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Humidifier is drying**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple devices are targeted.
7. Under **For at least**, set how long the humidifier must have been actively drying before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple humidifiers are targeted, controls how results combine. Pick **Any** to pass if at least one targeted device is actively drying, or **All** to pass only when every targeted device is actively drying. Default is **Any**.
For at least:
  description: How long the humidifier must have been continuously drying before the condition passes. Default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Humidifier is drying** is referred to as `humidifier.is_drying`. A basic example looks like this:

{% example %}
condition: |
  condition: humidifier.is_drying
  target:
    entity_id: humidifier.basement
{% endexample %}

This passes when the basement dehumidifier is actively removing moisture from the air.

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
    How long the humidifier must have been continuously drying before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- A dehumidifier can be on but not drying if it has already reached its target humidity and is idling. Use [Humidifier is on](/conditions/humidifier.is_on/) if you only care about whether the device is powered.
- Humidifiers that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as actively drying. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted device is unavailable.
- This condition applies to devices in a drying cycle. For humidifiers that are actively adding moisture, use [Humidifier is humidifying](/conditions/humidifier.is_humidifying/) instead.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: open a window vent only while the dehumidifier is running

When the basement dehumidifier is actively removing moisture, open the basement vent to help air circulation. This keeps the vent open during active drying cycles and avoids unnecessary operation when the dehumidifier is idling.

- **Trigger**: Time pattern: Every 5 minutes
- **Condition**: Humidifier is drying
  - **Target**: Basement dehumidifier
  - **Condition passes if**: Any
- **Action**: Open cover

{% details "YAML example for opening a vent while the dehumidifier is active" %}

{% example %}
automation: |
  alias: "Open vent while dehumidifier is active"
  triggers:
    - trigger: time_pattern
      minutes: "/5"
  conditions:
    - condition: humidifier.is_drying
      target:
        entity_id: humidifier.basement
      options:
        behavior: any
  actions:
    - action: cover.open_cover
      target:
        entity_id: cover.basement_vent
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

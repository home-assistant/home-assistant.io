---
title: "Switch is off"
condition: switch.is_off
domain: switch
description: "Tests if one or more switches are off."
related_conditions:
  - switch.is_on
---

The **Switch is off** condition is useful when an automation should continue only if a switch is not currently activated. Use it to avoid sending repeated off commands, prevent starting a device that is already powered down, or only act when a power plug is known to be off.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the switch you want to check. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Switch is off**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, set how long the switch must have been off.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple switches are targeted, controls whether **Any** targeted switch must be off or **All** targeted switches must be off.
  required: false
For at least:
  description: How long the switch must have been off for the condition to pass. The default is `0` (no minimum duration).
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `switch.is_off`. A basic example looks like this:

{% example %}
condition: |
  condition: switch.is_off
  target:
    entity_id: switch.porch_light
{% endexample %}

This passes when `switch.porch_light` is off.

### Options in YAML

{% options_yaml %}
behavior:
  description: When multiple switches are targeted, controls whether `any` or `all` targeted switches must be off.
  required: false
  type: string
  default: any
for:
  description: How long the switch must have been off for the condition to pass. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- A switch in the `unknown` or `unavailable` state does not count as off.
- With **All**, every targeted switch must match. With **Any**, one matching switch is enough.
- To check for the opposite state, use [Switch is on](/conditions/switch.is_on/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: start the coffee machine in the morning only if it is off

When your morning routine runs, this avoids sending another start command if the coffee machine's power plug is already on.

- **Trigger**: Time: 07:00
- **Condition**: Switch is off
  - **Target**: Coffee machine power plug
- **Action**: Turn on switch
  - **Target**: Coffee machine power plug

{% details "YAML example for a morning coffee start" %}

{% example %}
automation: |
  alias: "Start coffee machine at 07:00 if off"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: switch.is_off
      target:
        entity_id: switch.coffee_machine
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.coffee_machine
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

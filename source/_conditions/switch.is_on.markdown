---
title: "Switch is on"
condition: switch.is_on
domain: switch
description: "Tests if one or more switches are on."
related_conditions:
  - switch.is_off
---

The **Switch is on** condition is useful when an automation should continue only if a switch is already activated. Use it to avoid duplicate actions, confirm a power plug is supplying power before doing something else, or branch your automation based on whether a switch is currently in use.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the switch you want to check. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Switch is on**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, set how long the switch must have been on.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple switches are targeted, controls whether **Any** targeted switch must be on or **All** targeted switches must be on.
  required: false
For at least:
  description: How long the switch must have been on for the condition to pass.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `switch.is_on`. A basic example looks like this:

{% example %}
condition: |
  condition: switch.is_on
  target:
    entity_id: switch.coffee_machine
{% endexample %}

This passes when `switch.coffee_machine` is on.

### Options in YAML

{% options_yaml %}
behavior:
  description: When multiple switches are targeted, controls whether `any` or `all` targeted switches must be on.
  required: false
  type: string
  default: any
for:
  description: How long the switch must have been on for the condition to pass. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- A switch in the `unknown` or `unavailable` state does not count as on.
- With **All**, every targeted switch must match. With **Any**, one matching switch is enough.
- To check for the opposite state, use [Switch is off](/conditions/switch.is_off/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: warn when leaving home with the iron still on

When you leave home, this automation checks whether the iron's power plug is still on and sends a notification so you can switch it off remotely.

- **Trigger**: State: Person leaves home
- **Condition**: Switch is on
  - **Target**: Iron power plug
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an iron-left-on warning" %}

{% example %}
automation: |
  alias: "Warn if iron is still on when leaving home"
  triggers:
    - trigger: state
      entity_id: person.me
      from: "home"
  conditions:
    - condition: switch.is_on
      target:
        entity_id: switch.iron_power_plug
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The iron is still on. Tap to turn it off."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}

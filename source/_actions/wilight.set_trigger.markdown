---
title: "Set trigger"
action: wilight.set_trigger
domain: wilight
description: "Sets a WiLight irrigation trigger schedule."
---

Use this action to set one of the WiLight irrigation trigger schedules.

{% include actions/ui_header.md %}

To set a WiLight trigger from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the WiLight watering switch.
6. From the actions shown for that target, select **Set trigger**.
7. Enter the trigger index and trigger rules.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger index:
  description: The trigger slot to set, from 1 through 4.
Trigger rules:
  description: The 8-character trigger rule string.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `wilight.set_trigger`. A basic example looks like this:

{% example %}
action: |
  action: wilight.set_trigger
  target:
    entity_id: switch.irrigation_watering
  data:
    trigger_index: "1"
    trigger: "12707001"
{% endexample %}

This sets trigger slot 1 for `switch.irrigation_watering`.

### Options in YAML

{% options_yaml %}
trigger_index:
  description: The trigger slot to set, from 1 through 4.
  required: true
  type: string
trigger:
  description: The 8-character trigger rule string.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="switch" %}

## Trigger rules

The trigger rule is an 8-character string made of decimal characters from `0` through `9`:

- Characters 1 through 3 represent a number from 0 through 127. This number is a bitfield for the days of the week: 1 for Sunday, 2 for Monday, 4 for Tuesday, 8 for Wednesday, 16 for Thursday, 32 for Friday, and 64 for Saturday. Use 0 to make the trigger valid only for today.
- Characters 4 and 5 represent the trigger hour, from 0 through 23.
- Characters 6 and 7 represent the trigger minute, from 0 through 59.
- Character 8 represents whether the trigger is enabled. Use 0 for disabled and 1 for enabled.

## Good to know

This action works with WiLight watering switch entities.

{% include actions/stuck.md %}

{% include actions/related.md %}

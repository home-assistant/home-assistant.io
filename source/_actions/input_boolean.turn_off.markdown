---
title: "Turn off input boolean"
action: input_boolean.turn_off
domain: input_boolean
description: "Turns an input boolean off."
related_actions:
  - input_boolean.turn_on
  - input_boolean.toggle
---

Use this action to set one or more input booleans to off. An input boolean is a toggle helper you can use in automations and scripts, for example to enable or disable a behavior.

{% include actions/ui_header.md %}

To turn off an input boolean from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the input boolean you want to turn off.
6. From the actions shown for that target, select **Turn off input boolean**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `input_boolean.turn_off`. A basic example looks like this:

{% example %}
action: |
  action: input_boolean.turn_off
  target:
    entity_id: input_boolean.guest_mode
{% endexample %}

This turns off the `input_boolean.guest_mode` helper.

{% include actions/targets.md %}

## Good to know

- Turn an input boolean off to pause a behavior that other automations check, such as a notification routine.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

---
title: "Toggle input boolean"
action: input_boolean.toggle
domain: input_boolean
description: "Toggles an input boolean between on and off."
related_actions:
  - input_boolean.turn_on
  - input_boolean.turn_off
---

Use this action to toggle one or more input booleans. If the input boolean is on, it turns off, and if it is off, it turns on. An input boolean is a toggle helper you can use in automations and scripts.

{% include actions/ui_header.md %}

To toggle an input boolean from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the input boolean you want to toggle.
6. From the actions shown for that target, select **Toggle input boolean**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `input_boolean.toggle`. A basic example looks like this:

{% example %}
action: |
  action: input_boolean.toggle
  target:
    entity_id: input_boolean.guest_mode
{% endexample %}

This toggles the `input_boolean.guest_mode` helper.

{% include actions/targets.md %}

## Good to know

- Toggling is handy for a single button or remote key that should switch a behavior on and off with each press.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

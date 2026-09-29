---
title: "Turn on input boolean"
action: input_boolean.turn_on
domain: input_boolean
description: "Turns an input boolean on."
related_actions:
  - input_boolean.turn_off
  - input_boolean.toggle
---

Use this action to set one or more input booleans to on. An input boolean is a toggle helper you can use in automations and scripts, for example to enable or disable a behavior.

{% include actions/ui_header.md %}

To turn on an input boolean from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the input boolean you want to turn on.
6. From the actions shown for that target, select **Turn on input boolean**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `input_boolean.turn_on`. A basic example looks like this:

{% example %}
action: |
  action: input_boolean.turn_on
  target:
    entity_id: input_boolean.guest_mode
{% endexample %}

This turns on the `input_boolean.guest_mode` helper.

{% include actions/targets.md %}

## Good to know

- Use an input boolean as a switch in your automations. For example, turn it on to enable a notification routine and turn it off to pause it.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: enable guest mode when a guest arrives

Turn on a guest mode helper that other automations check.

- **Trigger**: A guest's phone connects to the Wi-Fi
- **Action**: Turn on input boolean
  - **Target**: Guest mode

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Enable guest mode when a guest arrives"
    triggers:
      - trigger: state
        entity_id: device_tracker.guest_phone
        to: "home"
    actions:
      - action: input_boolean.turn_on
        target:
          entity_id: input_boolean.guest_mode
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}

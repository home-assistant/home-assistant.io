---
title: "Set input text value"
action: input_text.set_value
domain: input_text
description: "Sets the value of an input text."
related_actions:
  - input_text.reload
---

Use this action to set the text value of one or more input texts. An input text is a helper you can use in automations and scripts to store a line of text, such as a message or a name.

{% include actions/ui_header.md %}

To set an input text value from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the input text you want to set.
6. From the actions shown for that target, select **Set input text value**.
7. Enter the **Value** you want to set.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Value:
  description: The target value to set.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `input_text.set_value`. A basic example looks like this:

{% example %}
action: |
  action: input_text.set_value
  target:
    entity_id: input_text.welcome_message
  data:
    value: "Hello!"
{% endexample %}

This sets the `input_text.welcome_message` helper to `Hello!`.

### Options in YAML

{% options_yaml %}
value:
  description: The target value to set.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The value must fit within the `min` and `max` length you configured for the input text, and it must match the configured pattern if one is set.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

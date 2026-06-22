---
title: "Set text value"
action: text.set_value
domain: text
description: "Sets the value of a text entity."
---

Use this action to set a text entity to a specific value, for example a label, a message, or any other text a device exposes.

{% include actions/ui_header.md %}

To set a text value from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the text entity you want to set.
6. From the actions shown for that target, select **Set text value**.
7. Set the **Value** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Value:
  description: The text to set on the entity. It must match the entity's allowed pattern and stay within its minimum and maximum length.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `text.set_value`. A basic example looks like this:

{% example %}
action: |
  action: text.set_value
  target:
    entity_id: text.display_message
  data:
    value: "Welcome home"
{% endexample %}

This sets `text.display_message` to `Welcome home`.

### Options in YAML

{% options_yaml %}
value:
  description: The text to set on the entity. It must match the entity's allowed pattern and stay within its minimum and maximum length.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with text entities.
- The value must match the entity's pattern, if one is set, and respect its minimum and maximum length. A value outside those limits is rejected.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: show a welcome message when someone arrives

Set a text entity to a message whenever a person comes home, for example to update a display.

- **Trigger**: State: Person arrives home
- **Action**: Set text value
  - **Target**: Display message
  - **Value**: Welcome home

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Show a welcome message"
    triggers:
      - trigger: state
        entity_id: person.your_name
        to: "home"
    actions:
      - action: text.set_value
        target:
          entity_id: text.display_message
        data:
          value: "Welcome home"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}

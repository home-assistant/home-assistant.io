---
title: "Panic"
action: ness_alarm.panic
domain: ness_alarm
description: "Triggers a panic alarm on the Ness alarm panel."
related_actions:
  - ness_alarm.aux
---

The **Panic** action triggers a panic alarm on your Ness alarm panel, using a user code.

This is handy when you want a fast way to raise the alarm, for example from a dashboard button or a wall-mounted tablet during an emergency.

{% include actions/ui_header.md %}

To trigger a panic alarm from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Ness Alarm: Panic**.
6. Enter the user **Code** to trigger the panic alarm.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Code:
  description: The user code to trigger the panic alarm.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ness_alarm.panic`. A basic example looks like this:

{% example %}
action: |
  action: ness_alarm.panic
  data:
    code: "1234"
{% endexample %}

This triggers a panic alarm on the panel.

### Options in YAML

{% options_yaml %}
code:
  description: >
    The user code to trigger the panic alarm.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: trigger panic from a button

When a dashboard button is pressed, trigger a panic alarm on the panel.

- **Trigger**: A button helper is pressed
- **Action**: Ness Alarm: Panic

{% details "YAML example for triggering panic from a button" %}

{% example %}
automation: |
  alias: "Panic button"
  triggers:
    - trigger: state
      entity_id: input_button.panic
  actions:
    - action: ness_alarm.panic
      data:
        code: "1234"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}

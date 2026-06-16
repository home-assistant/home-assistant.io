---
title: "Key press"
action: alarmdecoder.alarm_keypress
domain: alarmdecoder
description: "Sends custom key presses to an AlarmDecoder alarm panel."
related_actions:
  - alarmdecoder.alarm_toggle_chime
---

Use this action to send a string of characters to your AlarmDecoder alarm panel, as if you had pressed those keys on a keypad.

{% include actions/ui_header.md %}

To send key presses from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the alarm panel you want to send key presses to.
6. From the actions shown for that target, select **AlarmDecoder: Key press**.
7. Enter the **Key press** string to send.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Key press:
  description: The string to send to the alarm panel.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `alarmdecoder.alarm_keypress`. A basic example looks like this:

{% example %}
action: |
  action: alarmdecoder.alarm_keypress
  target:
    entity_id: alarm_control_panel.alarm_panel
  data:
    keypress: "*71"
{% endexample %}

This sends the key sequence `*71` to the alarm panel.

### Options in YAML

{% options_yaml %}
keypress:
  description: The string to send to the alarm panel.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="alarm_control_panel" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

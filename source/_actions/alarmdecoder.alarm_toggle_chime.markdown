---
title: "Toggle chime"
action: alarmdecoder.alarm_toggle_chime
domain: alarmdecoder
description: "Toggles the chime on an AlarmDecoder alarm panel."
related_actions:
  - alarmdecoder.alarm_keypress
---

Use this action to send the toggle chime command to your AlarmDecoder alarm panel, switching the chime on or off.

{% include actions/ui_header.md %}

To toggle the chime from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the alarm panel you want to toggle the chime on.
6. From the actions shown for that target, select **AlarmDecoder: Toggle chime**.
7. Enter the **Code** to toggle the chime with.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Code:
  description: The code to toggle the alarm control panel chime with.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `alarmdecoder.alarm_toggle_chime`. A basic example looks like this:

{% example %}
action: |
  action: alarmdecoder.alarm_toggle_chime
  target:
    entity_id: alarm_control_panel.alarm_panel
  data:
    code: "1234"
{% endexample %}

This toggles the chime on the alarm panel.

### Options in YAML

{% options_yaml %}
code:
  description: The code to toggle the alarm control panel chime with.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="alarm_control_panel" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

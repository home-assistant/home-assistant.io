---
title: "Alarm keypress"
action: envisalink.alarm_keypress
domain: envisalink
description: "Sends custom keypresses to an Envisalink alarm panel."
related_actions:
  - envisalink.invoke_custom_function
---

Use this action to send a string of keypresses to your Envisalink alarm panel, for example to enter a special command sequence that is not available as a standard action.

{% include actions/ui_header.md %}

To send keypresses from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Envisalink: Alarm keypress**.
6. Select the alarm control panel **Entity** and enter the **Keypress** string to send.
7. Select **Save**.

This action does not support targets. In the UI, you choose the alarm control panel in the **Entity** field.

### Options in the UI

{% options_ui %}
Entity:
  description: The alarm control panel to send the keypresses to.
  required: true
Keypress:
  description: The string to send to the alarm panel (1-6 characters).
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `envisalink.alarm_keypress`:

{% example %}
action: |
  action: envisalink.alarm_keypress
  data:
    entity_id: alarm_control_panel.home_alarm
    keypress: "*71"
{% endexample %}

This sends the keypress sequence `*71` to the alarm panel.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The alarm control panel to send the keypresses to.
  required: true
  type: string
keypress:
  description: The string to send to the alarm panel (1-6 characters).
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- This action works with DSC panels and is confirmed to work with the Honeywell Vista-20P (also known as the First Alert FA-168).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: send a command sequence at bedtime

Send a custom keypress sequence to the panel every night, for example to activate a special arming mode that is not available as a standard action.

- **Trigger**: Time: 23:00:00
- **Action**: Envisalink: Alarm keypress
  - **Entity**: Your alarm control panel
  - **Keypress**: `*71`

{% details "Show example YAML" %}

{% example %}
automation: |
    alias: "Send the night command sequence"
    triggers:
      - trigger: time
        at: "23:00:00"
    actions:
      - action: envisalink.alarm_keypress
        data:
          entity_id: alarm_control_panel.home_alarm
          keypress: "*71"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}

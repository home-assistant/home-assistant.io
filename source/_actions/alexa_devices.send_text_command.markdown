---
title: Send text command
action: alexa_devices.send_text_command
domain: alexa_devices
description: "Sends a text command to an Alexa device as if you had spoken it."
related_actions:
  - action: alexa_devices.send_sound
  - action: alexa_devices.send_info_skill
---

With this action, you can control Alexa using text commands instead of speaking to it. Anything you could ask out loud, like asking for the time, setting the volume, or controlling another device linked to Alexa, you can send as text.

Use it in automations to trigger Alexa routines and features that are not yet available through dedicated Home Assistant entities.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Alexa Devices: Send text command**.
6. Select the device that should run the command.
7. In the **Alexa text command** field, enter the command you want to send.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Alexa device that should run the command.
Alexa text command:
  description: The command to send, written the same way you would say it out loud, for example "what's the time".
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `alexa_devices.send_text_command`. A basic example looks like this:

{% example %}
action: |
  action: alexa_devices.send_text_command
  data:
    device_id: 037d79c1af96c67ba57ebcae560fb18e
    text_command: "what's the time"
{% endexample %}

This makes the selected Alexa device respond as if you had asked it for the time.

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of the Alexa device that should run the command.
  required: true
  type: string
text_command:
  description: The command to send, written the same way you would say it out loud, for example "what's the time".
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The command behaves exactly like a spoken request, so anything Alexa can do by voice should work here.
- Some common uses are setting the volume (`volume 7`), controlling devices linked to Alexa (`turn study lights off`), and playing media (`play BBC Radio 6`).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: announce the time on a button press

Make an Alexa device tell you the time when you press a dashboard button.

- **Trigger**: A user-created button is pressed
- **Action**: Alexa Devices: Send text command

{% details "YAML example for announcing the time" %}

{% example %}
automation: |
  alias: "Ask Alexa for the time"
  triggers:
    - trigger: state
      entity_id: input_button.ask_time
  actions:
    - action: alexa_devices.send_text_command
      data:
        device_id: 037d79c1af96c67ba57ebcae560fb18e
        text_command: "what's the time"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}

---
title: Send info skill command
action: alexa_devices.send_info_skill
domain: alexa_devices
description: "Runs a built-in Alexa info skill, such as the date, weather, or a joke."
related_actions:
  - alexa_devices.send_text_command
  - alexa_devices.send_sound
---

With this action, you can run one of Alexa's built-in info skills on a device. These are the short, everyday responses Alexa can give, such as the date, the time, a weather forecast, a flash briefing, or a joke.

Use it in automations to have a device speak useful information at the right moment, like a weather summary as part of a morning routine.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Alexa Devices: Send info skill command**.
6. Select the device that should run the info skill.
7. In the **Alexa info skill command** field, choose the info skill you want to run.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Alexa device that should run the info skill.
Alexa info skill command:
  description: The info skill to run, such as the date, the time, the weather, a flash briefing, or a joke.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `alexa_devices.send_info_skill`. A basic example looks like this:

{% example %}
action: |
  action: alexa_devices.send_info_skill
  data:
    device_id: 037d79c1af96c67ba57ebcae560fb18e
    info_skill: weather
{% endexample %}

This makes the selected Alexa device read out the weather forecast.

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of the Alexa device that should run the info skill.
  required: true
  type: string
info_skill:
  description: >
    The info skill to run, for example `weather`, `date`, `time`, `flash_briefing`, or `tell_joke`. The UI lists the available info skills with friendly names.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Info skills cover Alexa's built-in everyday responses, such as `date`, `time`, `weather`, `traffic`, `national_news`, `flash_briefing`, `fun_fact`, and `tell_joke`.
- For anything outside this set, use the [Send text command](/actions/alexa_devices.send_text_command/) action to send the request as text.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: read the weather as part of a morning routine

Have an Alexa device read out the weather forecast when your morning routine starts.

- **Trigger**: A scheduled time
- **Action**: Alexa Devices: Send info skill command

{% details "YAML example for a morning weather summary" %}

{% example %}
automation: |
  alias: "Read the weather in the morning"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: alexa_devices.send_info_skill
      data:
        device_id: 037d79c1af96c67ba57ebcae560fb18e
        info_skill: weather
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}

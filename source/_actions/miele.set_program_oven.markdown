---
title: "Set a program on a Miele oven"
action: miele.set_program_oven
domain: miele
description: "Sets and starts a program on a Miele oven."
related_actions:
  - miele.set_program
  - miele.get_programs
---

Use this action to set and start a program on a Miele oven, optionally with a target temperature and a duration.

The oven must be in a state where it accepts a new program. Most ovens must be turned on, and many appliances must be set to mobile start or remote control mode first. If the oven does not accept the program, an error is shown.

{% include actions/ui_header.md %}

To set an oven program from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for the action **Miele: Set program on oven** and select it.
6. Select the oven in the **Device** field and enter the **Program ID**. Optionally, set a **Temperature** and a **Duration**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Miele oven to set the program on.
Program ID:
  description: The ID of the program to set. To find the ID, use the [Get programs](/actions/miele.get_programs/) action, or fetch a diagnostics download while the program runs and read the value of `state.programId.value_raw`.
Temperature:
  description: The target temperature for the oven program, in degrees Celsius.
  required: false
Duration:
  description: The duration for the oven program.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `miele.set_program_oven`. A basic example looks like this:

{% example %}
action: |
  action: miele.set_program_oven
  data:
    device_id: abcde1234567890abcde1234567890ab
    program_id: 1
    temperature: 180
    duration: "01:15:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of the Miele oven to set the program on.
  required: true
  type: string
program_id:
  description: The ID of the program to set. To find the ID, use the `miele.get_programs` action, or fetch a diagnostics download while the program runs and read the value of `state.programId.value_raw`.
  required: true
  type: integer
temperature:
  description: The target temperature for the oven program, in degrees Celsius. Between 30 and 300.
  required: false
  type: integer
duration:
  description: The duration for the oven program, in `HH:MM:SS` format. Between 1 minute and 12 hours.
  required: false
  type: string
{% endoptions_yaml %}

This action does not support targets. Select the oven through the **Device** field.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

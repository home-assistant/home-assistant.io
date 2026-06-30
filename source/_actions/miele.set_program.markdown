---
title: "Set a program on a Miele appliance"
action: miele.set_program
domain: miele
description: "Sets and starts a program on a Miele appliance."
related_actions:
  - miele.set_program_oven
  - miele.get_programs
---

Use this action to set and start a program on a Miele appliance, for example to start a washing machine at a scheduled time.

The appliance must be in a state where it accepts a new program. Most washing machines must be turned on, and many appliances must be set to mobile start or remote control mode first. If the appliance does not accept the program, an error is shown.

{% include actions/ui_header.md %}

To set a program from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for the action **Miele: Set program** and select it.
6. Select the appliance in the **Device** field and enter the **Program ID**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Miele appliance to set the program on.
Program ID:
  description: The ID of the program to set. To find the ID, use the [Get programs](/actions/miele.get_programs/) action, or fetch a diagnostics download while the program runs and read the value of `state.programId.value_raw`.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `miele.set_program`. A basic example looks like this:

{% example %}
action: |
  action: miele.set_program
  data:
    device_id: abcde1234567890abcde1234567890ab
    program_id: 1
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of the Miele appliance to set the program on.
  required: true
  type: string
program_id:
  description: The ID of the program to set. To find the ID, use the `miele.get_programs` action, or fetch a diagnostics download while the program runs and read the value of `state.programId.value_raw`.
  required: true
  type: integer
{% endoptions_yaml %}

This action does not support targets. Select the appliance through the **Device** field.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

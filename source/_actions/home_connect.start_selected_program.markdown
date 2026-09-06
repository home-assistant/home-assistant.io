---
title: "Start selected program"
action: home_connect.start_selected_program
domain: home_connect
description: "Starts the program that is already selected on a Home Connect appliance."
related_actions:
  - home_connect.set_program_and_options
  - home_connect.change_setting
---

Use this action to start the program that is already selected on a Home Connect appliance, for example to begin a cycle you set up earlier on the appliance itself. You can pass start-only options to apply them as the program begins. You can also use this action to update those start-only options on a program that is already active but waiting on a delayed start.

If a program is currently running, the action starts that one again with your options. If nothing is running, it starts the program that is selected on the appliance.

{% include actions/ui_header.md %}

To start the selected program from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Start selected program**.
6. Select the appliance you want to start.
7. Optionally, set when the program should start or finish.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Home Connect appliance whose selected program you want to start.
Start in relative:
  description: When the program should start, in seconds from now. For example, 9000 means in 2 hours and 30 minutes.
  required: false
Finish in relative:
  description: When the program should end, in seconds from now. For example, 9000 means in 2 hours and 30 minutes.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `home_connect.start_selected_program`. A basic example looks like this:

{% example %}
action: |
  action: home_connect.start_selected_program
  data:
    device_id: a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The device ID of the Home Connect appliance whose selected program you want to start.
  required: true
  type: string
b_s_h_common_option_start_in_relative:
  description: When the program should start, in seconds from now. For example, 9000 means in 2 hours and 30 minutes.
  required: false
  type: integer
b_s_h_common_option_finish_in_relative:
  description: When the program should end, in seconds from now. For example, 9000 means in 2 hours and 30 minutes.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- This action only starts a program that is already selected. To choose a program first, use the [Set program and options](/actions/home_connect.set_program_and_options/) action.
- The start and finish timing options are start-only. They are applied when the program begins, or when you update a program that is waiting on a delayed start.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: start the selected program with a delayed finish

Start whatever program is selected on your washer, set to finish in two hours so the laundry is ready when you get home.

- **Trigger**: You leave home
- **Action**: Start selected program
  - **Finish in relative**: 7200 seconds

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Start the washer to finish in two hours"
  triggers:
    - trigger: state
      entity_id: person.you
      to: "not_home"
  actions:
    - action: home_connect.start_selected_program
      data:
        device_id: a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6
        b_s_h_common_option_finish_in_relative: 7200
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}

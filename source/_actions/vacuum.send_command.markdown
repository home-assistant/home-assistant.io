---
title: Send command
action: vacuum.send_command
domain: vacuum
description: "Send a platform-specific command or advanced function."
---

The **Send command to vacuum cleaner** action passes a custom command (and optional parameters) directly to your vacuum for advanced or platform-specific control.

Use it for features that your vacuum integration exposes but that do not have a dedicated Home Assistant action, like toggling a do-not-disturb mode or changing a vendor-specific setting.

{% include actions/ui_header.md %}

To use this action from an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. Add an action and search for **Vacuum: Send command to vacuum cleaner**.
4. Enter the desired command.
5. Optionally add parameters.
6. Select the vacuum target and save.

{% include actions/yaml_header.md %}

{% example %}
action: |
  action: vacuum.send_command
  target:
    entity_id: vacuum.upstairs
  command: set_do_not_disturb
  params:
    enabled: true
{% endexample %}

This sends the `set_do_not_disturb` command to `vacuum.upstairs`.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
target:
  description: The vacuum to send the command to.
  required: false
  type: map
command:
  description: The command name the vacuum platform expects (string).
  required: true
  type: string
params:
  description: (Optional) Parameters for the command (YAML or JSON mapping).
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Platform-specific commands may not be documented. Consult your integration's documentation for command names and parameters.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: enable Do Not Disturb at night

Some vacuum platforms support a Do Not Disturb mode through a custom command. This automation sends that command each night so the robot stays quiet during sleeping hours.

- **Trigger**: Time: 23:00
- **Action**: Send command
- **Target**: Upstairs vacuum
- **Command**: `set_do_not_disturb`

{% details "YAML example for sending a custom vacuum command" %}

{% example %}
automation: |
  alias: "Vacuum Do Not Disturb at night"
  triggers:
    - trigger: time
      at: "23:00:00"
  actions:
    - action: vacuum.send_command
      target:
        entity_id: vacuum.upstairs
      command: set_do_not_disturb
      params:
        enabled: true
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}

---
title: Send command
action: vacuum.send_command
domain: vacuum
description: "Send a platform-specific command or advanced function."
---

The **Send command** action passes a custom command (and optional parameters) directly to your vacuum for advanced or platform-specific control.

{% include integrations/labs_entity_actions_note.md %}

## Usage in the UI

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. Add an action and search for **Vacuum: Send command**.
4. Enter the desired command (as a string).
5. Optionally add parameters (YAML or JSON format, as required).
6. Select the vacuum target and save.

## Usage in YAML

{% example %}
action: |
  - action: vacuum.send_command
    target:
      entity_id: vacuum.upstairs
    command: set_do_not_disturb
    params:
      enabled: true
{% endexample %}

## Options

### Options in YAML

{% options_yaml %}
target:
  description: The vacuum to send the command to.
  required: false
  type: target
command:
  description: The command name the vacuum platform expects (string).
  required: true
  type: string
params:
  description: (Optional) Parameters for the command (YAML or JSON mapping).
  required: false
  type: mapping
{% endoptions_yaml %}

## Good to know

- Platform-specific commands may not be documented. Consult your integration’s docs for command names and parameters.


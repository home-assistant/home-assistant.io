---
title: "Delete remote command"
action: remote.delete_command
domain: remote
description: "Deletes one or more learned commands from a supported remote entity."
related_actions:
  - remote.learn_command
  - remote.send_command
---

The **Delete remote command** action deletes one command or a list of commands from a supported remote {% term entity %}. Use it when you want to remove learned commands that are no longer needed or that should be learned again.

Deleting support depends on the remote integration and the selected remote entity.

{% include actions/ui_header.md %}

To delete a remote command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the remote entity, device, area, floor, or label that should delete the command.
6. From the actions shown for that target, select **Delete remote command**.
7. In **Command**, enter the command to delete.
8. _Optional_: In **Device**, enter the device ID that contains the command.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: Device ID from which commands will be deleted.
  required: false
Command:
  description: A single command or a list of commands to delete.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `remote.delete_command`. A basic example looks like this:

{% example %}
action: |
  action: remote.delete_command
  target:
    entity_id: remote.living_room
  data:
    device: television
    command: mute
{% endexample %}

This deletes the `mute` command for `television` from `remote.living_room`.

### Options in YAML

{% options_yaml %}
device:
  description: >
    Device ID from which commands will be deleted.
  required: false
  type: string
command:
  description: >
    A single command or a list of commands to delete.
  required: true
  type: string or list
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The action targets remote entities that support deleting commands.
- Deleting a command removes it from the remote integration's command database. Learn the command again before sending it later.
- The exact device IDs and command names depend on the remote integration.
- To add a command again, use [Learn remote command](/actions/remote.learn_command/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: delete a learned command from a helper button

When a user-created {% term helper %} button, created separately, is pressed, delete a learned mute command.

- **Trigger**: State
  - **Entity**: Delete mute (`input_button.delete_mute`)
- **Action**: Delete remote command
  - **Target**: Living room remote
  - **Device**: television
  - **Command**: mute

{% details "YAML example for deleting a learned command" %}

{% example %}
automation: |
  alias: "Delete TV mute command"
  triggers:
    - trigger: state
      entity_id: input_button.delete_mute
  actions:
    - action: remote.delete_command
      target:
        entity_id: remote.living_room
      data:
        device: television
        command: mute
{% endexample %}

{% enddetails %}

### Automation: delete several commands from a helper button

When a user-created {% term helper %} button, created separately, is pressed, delete several TV commands that you want to learn again.

- **Trigger**: State
  - **Entity**: Delete TV commands (`input_button.delete_tv_commands`)
- **Action**: Delete remote command
  - **Target**: Living room remote
  - **Device**: television
  - **Command**: power, input_hdmi_1

{% details "YAML example for deleting several commands" %}

{% example %}
automation: |
  alias: "Delete TV commands"
  triggers:
    - trigger: state
      entity_id: input_button.delete_tv_commands
  actions:
    - action: remote.delete_command
      target:
        entity_id: remote.living_room
      data:
        device: television
        command:
          - power
          - input_hdmi_1
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}

---
title: "Learn remote command"
action: remote.learn_command
domain: remote
description: "Teaches a supported remote entity one or more commands."
related_actions:
  - remote.send_command
  - remote.delete_command
---

The **Learn remote command** action teaches a supported remote {% term entity %} one command or a list of commands. Use it when your remote integration can learn IR or RF commands from another remote control.

Learning support depends on the remote integration and the selected remote entity.

{% include actions/ui_header.md %}

To learn a remote command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the remote entity, device, area, floor, or label that should learn the command.
6. From the actions shown for that target, select **Learn remote command**.
7. _Optional_: Set **Device**, **Command**, **Command type**, **Alternative**, or **Timeout**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: Device ID to learn the command from.
  required: false
Command:
  description: A single command or a list of commands to learn.
  required: false
Command type:
  description: Type of command to learn. Options are **ir** and **rf**. Default is **ir**.
  required: false
Alternative:
  description: Store the code as an alternative. This is useful for discrete codes, such as a code that only turns a device on.
  required: false
Timeout:
  description: How long to wait for the command to be learned, in seconds.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `remote.learn_command`. A basic example looks like this:

{% example %}
action: |
  action: remote.learn_command
  target:
    entity_id: remote.living_room
  data:
    device: television
    command: mute
{% endexample %}

This asks `remote.living_room` to learn the `mute` command for `television`.

### Options in YAML

{% options_yaml %}
device:
  description: >
    Device ID to learn the command from.
  required: false
  type: string
command:
  description: >
    A single command or a list of commands to learn.
  required: false
  type: [string, list]
command_type:
  description: >
    Type of command to learn. Accepts `ir` or `rf`.
  required: false
  type: string
  default: ir
alternative:
  description: >
    Store the code as an alternative. This is useful for discrete codes, such as a code that only turns a device on.
  required: false
  type: boolean
timeout:
  description: >
    How long to wait for the command to be learned, in seconds.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The action targets remote entities that support learning commands.
- Learning usually requires you to press a button on the original remote while Home Assistant waits for the signal.
- The exact device IDs, command names, and supported command types depend on the remote integration.
- Use [Send remote command](/actions/remote.send_command/) after the command has been learned.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: learn a mute command from a helper button

When a user-created {% term helper %} button, created separately, is pressed, start learning the TV mute command.

- **Trigger**: State
  - **Entity**: Learn mute (`input_button.learn_mute`)
- **Action**: Learn remote command
  - **Target**: Living room remote
  - **Device**: television
  - **Command**: mute

{% details "YAML example for learning a mute command" %}

{% example %}
automation: |
  alias: "Learn TV mute command"
  triggers:
    - trigger: state
      entity_id: input_button.learn_mute
  actions:
    - action: remote.learn_command
      target:
        entity_id: remote.living_room
      data:
        device: television
        command: mute
{% endexample %}

{% enddetails %}

### Automation: learn an RF command with a longer timeout

When a user-created {% term helper %} button, created separately, is pressed, start learning an RF command and wait up to 30 seconds.

- **Trigger**: State
  - **Entity**: Learn gate command (`input_button.learn_gate_command`)
- **Action**: Learn remote command
  - **Target**: RF bridge remote
  - **Device**: gate
  - **Command**: open
  - **Command type**: rf
  - **Timeout**: 30

{% details "YAML example for learning an RF command" %}

{% example %}
automation: |
  alias: "Learn gate RF command"
  triggers:
    - trigger: state
      entity_id: input_button.learn_gate_command
  actions:
    - action: remote.learn_command
      target:
        entity_id: remote.rf_bridge
      data:
        device: gate
        command: open
        command_type: rf
        timeout: 30
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}

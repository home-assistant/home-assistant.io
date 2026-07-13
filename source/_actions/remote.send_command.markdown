---
title: "Send remote command"
action: remote.send_command
domain: remote
description: "Sends one or more commands through a remote entity."
related_actions:
  - remote.learn_command
  - remote.delete_command
  - remote.turn_on
---

The **Send remote command** action sends one command or a list of commands through a remote {% term entity %}. Use it when an automation or script should press a saved remote-control button, such as play, pause, volume up, or input select.

The available device IDs and command names depend on the remote integration and on the commands it knows.

{% include actions/ui_header.md %}

To send a remote command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the remote entity, device, area, floor, or label that should send the command.
6. From the actions shown for that target, select **Send remote command**.
7. In **Command**, enter the command to send.
8. _Optional_: Set **Device**, **Repeats**, **Delay seconds**, or **Hold seconds** if your remote integration uses them.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: Device ID to send the command to. Some remote integrations require this value.
  required: false
Command:
  description: A single command or a list of commands to send.
  required: true
Repeats:
  description: Number of times to repeat the command. Default is 1.
  required: false
Delay seconds:
  description: Time to wait between repeated commands. Default is 0.4 seconds.
  required: false
Hold seconds:
  description: Time to hold the command before release. Default is 0 seconds.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `remote.send_command`. A basic example looks like this:

{% example %}
action: |
  action: remote.send_command
  target:
    entity_id: remote.living_room
  data:
    device: television
    command: play
{% endexample %}

This sends the `play` command to the `television` device through `remote.living_room`.

### Options in YAML

{% options_yaml %}
device:
  description: >
    Device ID to send the command to. Some remote integrations require this value.
  required: false
  type: string
command:
  description: >
    A single command or a list of commands to send.
  required: true
  type: string or list
num_repeats:
  description: >
    Number of times to repeat the command.
  required: false
  type: integer
  default: 1
delay_secs:
  description: >
    Time to wait between repeated commands, in seconds.
  required: false
  type: float
  default: 0.4
hold_secs:
  description: >
    Time to hold the command before release, in seconds.
  required: false
  type: float
  default: 0
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The action targets remote entities.
- Command names and device IDs depend on the remote integration. Check the documentation for your remote integration if a command is not accepted.
- Use [Learn remote command](/actions/remote.learn_command/) to teach supported remotes a command before you send it.
- If the remote is unavailable, Home Assistant cannot send the command.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: pause the TV when the front door opens

When the front door opens, send a pause command to the TV.

- **Trigger**: State
  - **Entity**: Front door (`binary_sensor.front_door`)
  - **To**: On
- **Action**: Send remote command
  - **Target**: Living room remote
  - **Device**: television
  - **Command**: pause

{% details "YAML example for pausing the TV" %}

{% example %}
automation: |
  alias: "Pause TV when the front door opens"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  actions:
    - action: remote.send_command
      target:
        entity_id: remote.living_room
      data:
        device: television
        command: pause
{% endexample %}

{% enddetails %}

### Automation: lower the volume at night

At 22:00, send the volume-down command three times.

- **Trigger**: Time
  - **At**: 22:00
- **Action**: Send remote command
  - **Target**: Living room remote
  - **Device**: television
  - **Command**: volume_down
  - **Repeats**: 3
  - **Delay seconds**: 0.5

{% details "YAML example for lowering the volume" %}

{% example %}
automation: |
  alias: "Lower TV volume at night"
  triggers:
    - trigger: time
      at: "22:00:00"
  actions:
    - action: remote.send_command
      target:
        entity_id: remote.living_room
      data:
        device: television
        command: volume_down
        num_repeats: 3
        delay_secs: 0.5
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}

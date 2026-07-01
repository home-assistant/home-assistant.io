---
title: "Send remote command"
action: remote.send_command
domain: braviatv
description: "Sends a remote control command to a Sony Bravia TV."
---

Use this action to send a remote control command to a Sony Bravia TV.

{% include actions/ui_header.md %}

To send a Bravia remote command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Bravia TV remote.
6. From the actions shown for that target, select **Send remote command**.
7. Enter the command to send.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Command:
  description: The command to send. You can also enter a list of commands.
Repeats:
  description: How many times to repeat the command.
  required: false
  default: 1
Delay seconds:
  description: The delay between repeated commands.
  required: false
  default: 0.4
Hold seconds:
  description: How long to hold the command.
  required: false
  default: 0
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `remote.send_command`. A basic example looks like this:

{% example %}
action: |
  action: remote.send_command
  target:
    entity_id: remote.bravia_tv
  data:
    command: "Down"
{% endexample %}

This sends the `Down` command to `remote.bravia_tv`.

### Options in YAML

{% options_yaml %}
command:
  description: The command to send. You can also provide a list of commands.
  required: true
  type: string
num_repeats:
  description: How many times to repeat the command.
  required: false
  type: integer
  default: 1
delay_secs:
  description: The delay between repeated commands.
  required: false
  type: float
  default: 0.4
hold_secs:
  description: How long to hold the command.
  required: false
  type: float
  default: 0
{% endoptions_yaml %}

{% include actions/targets.md domain="remote" %}

## Good to know

The available commands depend on your TV model. To see the supported commands for your TV, call `remote.send_command` with an invalid command, such as `Test`, and then check [Home Assistant System Logs](https://my.home-assistant.io/redirect/logs). You can also download the {% term diagnostics %} from the device info in the [integration settings](https://my.home-assistant.io/redirect/integration/?domain=braviatv).

## Some commonly used commands

- Up
- Down
- Left
- Right
- Confirm
- Return
- Home
- Exit
- Rewind
- Forward
- ActionMenu
- SyncMenu
- Num0
- Num1
- Num2
- Num3
- Num4
- Num5
- Num6
- Num7
- Num8
- Num9

{% include actions/stuck.md %}

{% include actions/related.md %}

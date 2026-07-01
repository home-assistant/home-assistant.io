---
title: "Send remote command"
action: remote.send_command
domain: xbox
description: "Sends controller commands or text input to an Xbox console."
---

Use this action to send controller commands or text input to an Xbox console. This is useful for dashboard buttons, scripts, and automations that control navigation or playback.

{% include actions/ui_header.md %}

To send a command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Xbox remote.
6. From the actions shown for that target, select **Send remote command**.
7. Enter the **Command** to send.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Command:
  description: The controller command, text input, or list of commands to send.
Repeats:
  description: The number of times to repeat the command sequence. The default is `1`.
  required: false
Delay seconds:
  description: The delay, in seconds, between commands and repeats. The default is `0.4`.
  required: false
Hold seconds:
  description: The time, in seconds, to hold the command. The default is `0`.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `remote.send_command`. A basic example looks like this:

{% example %}
action: |
  action: remote.send_command
  target:
    entity_id: remote.xboxone
  data:
    command: "A"
{% endexample %}

### Options in YAML

{% options_yaml %}
command:
  description: The controller command, text input, or list of commands to send.
  required: true
  type: string
num_repeats:
  description: The number of times to repeat the command sequence.
  required: false
  type: integer
  default: 1
delay_secs:
  description: The delay, in seconds, between commands and repeats.
  required: false
  type: float
  default: 0.4
hold_secs:
  description: The time, in seconds, to hold the command.
  required: false
  type: float
  default: 0
{% endoptions_yaml %}

{% include actions/targets.md domain="remote" %}

## Good to know

Supported controller commands include `A`, `B`, `X`, `Y`, `Up`, `Down`, `Left`, `Right`, `Menu`, `View`, `Nexus`, `WakeUp`, `TurnOff`, `Reboot`, `Mute`, `Unmute`, `Play`, `Pause`, `Next`, `Previous`, `GoHome`, `GoBack`, `ShowGuideTab`, and `ShowGuide`.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: open a menu item

Send two right commands and then select the highlighted item.

- **Trigger**: State, helper turns on
- **Action**: Send remote command
  - **Target**: Xbox remote
  - **Command**: `Right`, `Right`, `A`
  - **Delay seconds**: 0.1

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Send Xbox menu commands"
  triggers:
    - trigger: state
      entity_id: input_boolean.xbox_menu_sequence
      to: "on"
  actions:
    - action: remote.send_command
      target:
        entity_id: remote.xboxone
      data:
        command:
          - Right
          - Right
          - A
        delay_secs: 0.1
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}

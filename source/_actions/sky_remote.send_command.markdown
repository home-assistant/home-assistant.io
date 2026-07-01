---
title: "Send remote command"
action: remote.send_command
domain: sky_remote
description: "Sends one or more remote control commands to a Sky box."
---

Use this action to send remote control commands to a Sky+ HD or Sky Q box, such as opening the TV guide, navigating menus, or sending playback controls.

{% include actions/ui_header.md %}

To send a command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Sky remote.
6. From the actions shown for that target, select **Send remote command**.
7. Enter the **Command** to send.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Command:
  description: The command, or list of commands, to send.
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
    entity_id: remote.192_168_1_250
  data:
    command:
      - sky
      - tvguide
{% endexample %}

### Options in YAML

{% options_yaml %}
command:
  description: The command, or list of commands, to send.
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

Supported commands include:

- Power and navigation: `power`, `up`, `down`, `left`, `right`, `select`, `backup`
- Menu access: `sky`, `tvguide`, `boxoffice`, `services`, `interactive`
- Channel controls: `channelup`, `channeldown`
- Information and help: `i`, `text`, `help`
- Color buttons: `red`, `green`, `yellow`, `blue`
- Numbers: `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`
- Playback controls: `play`, `pause`, `stop`, `record`, `fastforward`, `rewind`
- Sky Q only: `sidebar`, `dismiss`, `search`, `home`

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: open the TV guide

Send the Sky and TV guide commands when you start your TV activity.

- **Trigger**: State, TV activity turns on
- **Action**: Send remote command
  - **Target**: Sky remote
  - **Command**: `sky`, `tvguide`

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Open the Sky TV guide"
  triggers:
    - trigger: state
      entity_id: input_boolean.tv_activity
      to: "on"
  actions:
    - action: remote.send_command
      target:
        entity_id: remote.192_168_1_250
      data:
        command:
          - sky
          - tvguide
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}

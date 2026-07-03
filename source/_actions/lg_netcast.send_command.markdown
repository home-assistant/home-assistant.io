---
title: "Send remote command"
action: remote.send_command
domain: lg_netcast
description: "Sends one or more remote control commands to an LG Netcast TV."
---

Use this action to send remote control commands to an LG Netcast TV, such as opening the home menu, changing volume, or moving through TV menus.

{% include actions/ui_header.md %}

To send a command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the LG Netcast remote.
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
    entity_id: remote.lg_tv
  data:
    command: HOME_MENU
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

{% details "Full key code list" %}

- `APPS`
- `ASPECT_RATIO`
- `AUDIO_DESCRIPTION`
- `AV_MODE`
- `BACK`
- `BLUE`
- `CHANNEL_DOWN`
- `CHANNEL_UP`
- `DASH`
- `DOWN`
- `ENERGY_SAVING`
- `EPG`
- `EXIT`
- `EXTERNAL_INPUT`
- `FAST_FORWARD`
- `FAVORITE_CHANNEL`
- `GREEN`
- `HOME_MENU`
- `LEFT`
- `LIVE_TV`
- `LR_3D`
- `MARK`
- `MUTE_TOGGLE`
- `NUMBER_0`
- `NUMBER_1`
- `NUMBER_2`
- `NUMBER_3`
- `NUMBER_4`
- `NUMBER_5`
- `NUMBER_6`
- `NUMBER_7`
- `NUMBER_8`
- `NUMBER_9`
- `OK`
- `PAUSE`
- `PIP_CHANNEL_DOWN`
- `PIP_CHANNEL_UP`
- `PIP_SECONDARY_VIDEO`
- `PLAY`
- `POWER`
- `PREVIOUS_CHANNEL`
- `PROGRAM_INFORMATION`
- `PROGRAM_LIST`
- `QUICK_MENU`
- `RECORD`
- `RECORDING_LIST`
- `RED`
- `REPEAT`
- `RESERVATION_PROGRAM_LIST`
- `REWIND`
- `RIGHT`
- `SHOW_SUBTITLE`
- `SIMPLINK`
- `SKIP_BACKWARD`
- `SKIP_FORWARD`
- `STOP`
- `SWITCH_VIDEO`
- `TELE_TEXT`
- `TEXT_OPTION`
- `UP`
- `VIDEO_3D`
- `VOLUME_DOWN`
- `VOLUME_UP`
- `YELLOW`

{% enddetails %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn up the volume

Send the volume up command five times.

- **Trigger**: State, media player turns on
- **Action**: Send remote command
  - **Target**: LG TV remote
  - **Command**: `VOLUME_UP`
  - **Repeats**: 5

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Turn up LG TV volume when it turns on"
  triggers:
    - trigger: state
      entity_id: media_player.lg_tv
      to: "on"
  actions:
    - action: remote.send_command
      target:
        entity_id: remote.lg_tv
      data:
        command: VOLUME_UP
        num_repeats: 5
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}

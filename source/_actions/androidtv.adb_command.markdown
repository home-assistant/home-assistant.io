---
title: "ADB command"
action: androidtv.adb_command
domain: androidtv
description: "Sends a key command or ADB shell command to an Android or Fire TV device."
related_actions:
  - androidtv.learn_sendevent
  - androidtv.download
  - androidtv.upload
---

Use this action to send a key command (such as `HOME` or `UP`) or a raw ADB shell command to your Android or Fire TV device. If the command returns any output, it is returned as an action response, stored in the `adb_response` attribute of the media player entity, and logged at the info level.

{% include actions/ui_header.md %}

To send a command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Android or Fire TV device you want to control.
6. From the actions shown for that target, select **ADB command**.
7. Enter the **Command** you want to send.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Command:
  description: Either a key command (such as `HOME`) or an ADB shell command.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `androidtv.adb_command`. A basic example looks like this:

{% example %}
action: |
  action: androidtv.adb_command
  target:
    entity_id: media_player.fire_tv_living_room
  data:
    command: HOME
{% endexample %}

This sends the `HOME` key command to `media_player.fire_tv_living_room`.

### Options in YAML

{% options_yaml %}
command:
  description: Either a key command (such as `HOME`) or an ADB shell command.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- Key commands include `POWER`, `SLEEP`, `HOME`, `UP`, `DOWN`, `LEFT`, `RIGHT`, `CENTER`, `BACK`, and `MENU`. The full list lives in the backend [androidtv](https://github.com/JeffLIrion/python-androidtv) package.
- Use the special command `GET_PROPERTIES` to retrieve the properties Home Assistant uses to determine the device state. The result is returned as an action response, stored in the `adb_response` attribute, and is helpful when you want to write your own custom state detection rules.
- When a command returns output, read it from the `adb_response` attribute, for example with `{% raw %}{{ state_attr('media_player.fire_tv_living_room', 'adb_response') }}{% endraw %}`.
- Sending key commands like `UP` and `HOME` over ADB can be slow. To send them faster, use [Learn sendevent](/actions/androidtv.learn_sendevent/) to translate a button press into a faster `sendevent` command.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn off the TV at bedtime

Send the `SLEEP` command to put the device to sleep on a schedule.

- **Trigger**: Time is 11:00 PM
- **Action**: ADB command
  - **Target**: Living room Fire TV
  - **Command**: `SLEEP`

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Put the Fire TV to sleep at bedtime"
    triggers:
      - trigger: time
        at: "23:00:00"
    actions:
      - action: androidtv.adb_command
        target:
          entity_id: media_player.fire_tv_living_room
        data:
          command: SLEEP
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}

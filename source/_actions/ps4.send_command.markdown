---
title: "Send command"
action: ps4.send_command
domain: ps4
description: "Emulates a button press on a PlayStation 4."
---

The **Send command** action emulates a button press on a PlayStation 4. It mimics the buttons available in the PS4 Second Screen App, so you can navigate the console from an automation or a script. These are not the buttons on a DualShock 4 controller.

{% include actions/ui_header.md %}

To send a command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **PlayStation 4: Send command**.
6. Select the **Entity** of your PlayStation 4 and the **Command** to send.
7. Select **Save**.

This action does not support targets. In the UI, use the **Entity** field to choose which PlayStation 4 to send the command to.

### Options in the UI

{% options_ui %}
Entity:
  description: The PlayStation 4 to send the command to.
  required: true
Command:
  description: The button to press.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ps4.send_command`. A basic example looks like this:

{% example %}
action: |
  action: ps4.send_command
  data:
    entity_id: media_player.ps4
    command: ps
{% endexample %}

This presses the PS (PlayStation) button on `media_player.ps4`.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The PlayStation 4 to send the command to.
  required: true
  type: [string, list]
command:
  description: The button to press.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

The **Command** accepts one of the following values, each emulating a button:

- `up`: Swipe up
- `down`: Swipe down
- `left`: Swipe left
- `right`: Swipe right
- `enter`: Enter
- `back`: Back
- `option`: Option
- `ps`: PS (PlayStation)
- `ps_hold`: PS hold (long press)

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

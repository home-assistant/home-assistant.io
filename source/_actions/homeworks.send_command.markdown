---
title: "Send command"
action: homeworks.send_command
domain: homeworks
description: "Sends a custom command to a Lutron Homeworks controller."
---

The **Send command** action sends a custom command to your Lutron Homeworks controller. You can send a single command or a list of commands.

This action does not target an entity. Instead, you provide the controller to send to and the command to send.

In addition to the [commands supported by the controller](https://assets.lutron.com/a/documents/hwi%20rs232%20protocol.pdf), the special command `DELAY <ms>` is supported, where `<ms>` is the number of milliseconds to wait before continuing.

{% include actions/ui_header.md %}

To send a command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Lutron Homeworks: Send command**.
6. Enter the **Controller ID** and the **Command** to send.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Controller ID:
  description: The controller to which the command is sent.
  required: true
Command:
  description: The command to send to the controller. This can be a single command or a list of commands.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homeworks.send_command`. A basic example looks like this:

{% example %}
action: |
  action: homeworks.send_command
  data:
    controller_id: "homeworks"
    command: "KBP, [02:08:02:01], 1"
{% endexample %}

This sends a single command to the controller.

### Options in YAML

{% options_yaml %}
controller_id:
  description: The controller to which the command is sent.
  required: true
  type: string
command:
  description: >
    The command to send to the controller. This can be a single command
    or a list of commands. The special command `DELAY <ms>` waits the
    given number of milliseconds before continuing.
  required: true
  type: list
{% endoptions_yaml %}

## Good to know

To send several commands in sequence, pass a list. The following example sends `KBP`, waits 0.5 seconds, then sends `KBR` to simulate a keypad button press that lasts half a second:

{% example %}
action: |
  action: homeworks.send_command
  data:
    controller_id: "homeworks"
    command:
      - "KBP, [02:08:02:01], 1"
      - "DELAY 500"
      - "KBR, [02:08:02:01], 1"
{% endexample %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

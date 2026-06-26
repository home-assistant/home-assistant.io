---
title: "Send command"
action: hdmi_cec.send_command
domain: hdmi_cec
description: "Sends a raw CEC command to the HDMI-CEC bus."
related_actions:
  - hdmi_cec.power_on
  - hdmi_cec.standby
  - hdmi_cec.select_device
  - hdmi_cec.update
  - hdmi_cec.volume
---

The **Send command** action sends a raw CEC command onto the HDMI-CEC bus. It gives you direct control for cases the other actions don't cover, letting you craft a command from its source, destination, and command bytes, or pass a complete raw command string.

This is meant for situations where you know exactly which CEC command you need. If you just want to power devices on or off, switch inputs, or change volume, the other HDMI-CEC actions are easier to use.

{% include actions/ui_header.md %}

To send a raw CEC command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HDMI-CEC: Send command**.
6. Fill in the command fields you need, or provide a complete **Raw** command.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Source:
  description: The source of the command. A decimal number or a string in hexadecimal notation, such as `0x10`.
  required: false
Destination:
  description: The destination for the command. A decimal number or a string in hexadecimal notation, such as `0x10`.
  required: false
Command:
  description: The command itself. A decimal number or a string in hexadecimal notation, such as `0x10`.
  required: false
Raw:
  description: A complete raw CEC command in the format `00:00:00:00`. When set, the other fields are ignored.
  required: false
Att:
  description: Optional extra parameters for the command.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hdmi_cec.send_command`. A basic example looks like this:

{% example %}
action: |
  action: hdmi_cec.send_command
  data:
    raw: "1f:82:10:00"
{% endexample %}

This sends the raw CEC command onto the bus.

### Options in YAML

{% options_yaml %}
src:
  description: >
    The source of the command. A decimal number or a string in
    hexadecimal notation, such as `0x10`.
  required: false
  type: string
dst:
  description: >
    The destination for the command. A decimal number or a string in
    hexadecimal notation, such as `0x10`.
  required: false
  type: string
cmd:
  description: >
    The command itself. A decimal number or a string in hexadecimal
    notation, such as `0x10`.
  required: false
  type: string
raw:
  description: >
    A complete raw CEC command in the format `00:00:00:00`, where the
    first two digits are source and destination, the second byte is the
    command, and any further bytes are command parameters. When set, the
    other fields are ignored.
  required: false
  type: string
att:
  description: >
    Optional extra parameters for the command.
  required: false
  type: map
{% endoptions_yaml %}

## Good to know

- A raw command in the format `00:00:00:00` packs the source and destination into the first byte, the command into the second byte, and any parameters into the bytes that follow. When you provide a **Raw** command, the separate source, destination, and command fields are ignored.
- To work out the right command bytes, the [CEC-o-matic](https://www.cec-o-matic.com/) tool is a helpful reference.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

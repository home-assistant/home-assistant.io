---
title: "PCK"
action: lcn.pck
domain: lcn
description: "Sends an arbitrary PCK command."
related_actions:
  - lcn.output_abs
  - lcn.relays
  - lcn.send_keys
---

The **PCK** action sends an arbitrary PCK command to an LCN module. Use it to send commands that are not covered by the other LCN actions. You only specify the command part of the PCK command, without the address header.

{% include actions/ui_header.md %}

To send a PCK command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **LCN: PCK**.
6. Select the LCN module or group in the **Device** field and enter the **PCK** command.
7. Select **Save**.

This action does not support targets. Instead, you select the LCN module or group through the **Device** field.

### Options in the UI

{% options_ui %}
Device:
  description: The LCN module or group to send the command to.
  required: true
PCK:
  description: The PCK command, without the address header.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lcn.pck`. A basic example looks like this:

{% example %}
action: |
  action: lcn.pck
  data:
    device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
    pck: PIN4
{% endexample %}

This sends the PCK command `PIN4` to the selected module.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The device ID of the LCN module or group.
  required: true
  type: string
pck:
  description: >
    The PCK command, without the address header.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

---
title: "Send transparent command"
action: opentherm_gw.send_transparent_command
domain: opentherm_gw
description: "Sends a custom OpenTherm Gateway command through a transparent interface."
---

The **Send transparent command** action sends a custom [command](https://otgw.tclcode.com/firmware.html) directly to your OpenTherm Gateway through a transparent interface.

{% warning %}
Improper use of this action may impair the performance of your central heating system.
{% endwarning %}

{% include actions/ui_header.md %}

To send a transparent command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OpenTherm Gateway: Send transparent command**.
6. Enter the **Gateway ID**, the **Command**, and the **Argument**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Gateway ID:
  description: The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
Command:
  description: The command to send to the OpenTherm Gateway.
  required: true
Argument:
  description: The argument of the command to send to the OpenTherm Gateway.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `opentherm_gw.send_transparent_command`. A basic example looks like this:

{% example %}
action: |
  action: opentherm_gw.send_transparent_command
  data:
    gateway_id: opentherm_gateway
    transp_cmd: SC
    transp_arg: "23:59"
{% endexample %}

This sends the `SC` command with the given argument to the selected gateway.

### Options in YAML

{% options_yaml %}
gateway_id:
  description: >
    The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
  type: string
transp_cmd:
  description: >
    The command to send to the OpenTherm Gateway.
  required: true
  type: string
transp_arg:
  description: >
    The argument of the command to send to the OpenTherm Gateway.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

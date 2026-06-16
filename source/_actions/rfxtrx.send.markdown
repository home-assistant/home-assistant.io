---
title: "Send"
action: rfxtrx.send
domain: rfxtrx
description: "Sends a raw event over radio with the RFXtrx device."
---

Use this action to send a raw event over radio, for example to simulate a button press or control a device that is not automatically added in Home Assistant.

{% include actions/ui_header.md %}

To send a raw event from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **RFXCOM RFXtrx: Send**.
6. Enter the **Event** as a hexadecimal string.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Event:
  description: A hexadecimal string to send, for example 0b1111e003af16aa10000060.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rfxtrx.send`:

{% example %}
action: |
  action: rfxtrx.send
  data:
    event: "0b1111e003af16aa10000060"
{% endexample %}

This simulates a button being pressed by sending the raw event over radio.

### Options in YAML

{% options_yaml %}
event:
  description: A hexadecimal string to send, for example 0b1111e003af16aa10000060.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- To generate event codes for switches and lights, see [Generate codes](/integrations/rfxtrx/#generate-codes) on the RFXCOM RFXtrx integration page.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

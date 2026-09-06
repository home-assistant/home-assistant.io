---
title: "Virtual key"
action: homematic.virtualkey
domain: homematic
description: "Simulates a keypress on a Homematic device or virtual remote."
related_actions:
  - homematic.set_device_value
  - homematic.set_variable_value
  - homematic.put_paramset
  - homematic.reconnect
  - homematic.set_install_mode
---

Use this action to simulate a keypress, or another valid action, on a CCU or Homegear using virtual or device keys. It is handy for pressing buttons on devices such as a BidCoS-RF virtual remote or a KeyMatic lock.

{% include actions/ui_header.md %}

To simulate a keypress from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Homematic: Virtual key**.
6. Enter the **Address**, **Channel**, and **Param** and, optionally, an **Interface**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Address:
  description: "The address of the Homematic device, or BidCoS-RF for the virtual remote."
  required: true
Channel:
  description: "The channel to send the keypress to."
  required: true
Param:
  description: "The event to send, such as PRESS_LONG or PRESS_SHORT."
  required: true
Interface:
  description: "The name of the interface from your configuration. Only needed when you have more than one."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homematic.virtualkey`:

{% example %}
action: |
  action: homematic.virtualkey
  data:
    address: "BidCoS-RF"
    channel: 1
    param: PRESS_LONG
{% endexample %}

To open a KeyMatic lock:

{% example %}
action: |
  action: homematic.virtualkey
  data:
    address: "LEQ1234567"
    channel: 1
    param: OPEN
{% endexample %}

### Options in YAML

{% options_yaml %}
address:
  description: "The address of the Homematic device, or BidCoS-RF for the virtual remote."
  required: true
  type: string
channel:
  description: "The channel to send the keypress to."
  required: true
  type: integer
param:
  description: "The event to send, such as PRESS_LONG or PRESS_SHORT."
  required: true
  type: string
interface:
  description: "The name of the interface from your configuration. Only needed when you have more than one."
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

---
title: "Set install mode"
action: homematic.set_install_mode
domain: homematic
description: "Sets a Homematic RPC XML interface into installation mode."
related_actions:
  - homematic.virtualkey
  - homematic.set_device_value
  - homematic.set_variable_value
  - homematic.put_paramset
  - homematic.reconnect
---

Use this action to put an RPC XML interface into installation mode so you can pair, or learn, a new device.

{% include actions/ui_header.md %}

To set install mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Homematic: Set install mode**.
6. Enter the **Interface** and, optionally, a **Mode**, **Time**, and **Address**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Only users with administrator rights can run this action.

### Options in the UI

{% options_ui %}
Interface:
  description: "The interface to set into install mode."
  required: true
Mode:
  description: "The install mode: 1 for normal mode, or 2 to remove existing old links."
Time:
  description: "How long to stay in install mode, in seconds."
Address:
  description: "The address of the Homematic device, or BidCoS-RF, to learn."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homematic.set_install_mode`:

{% example %}
action: |
  action: homematic.set_install_mode
  data:
    interface: wireless
    time: 120
{% endexample %}

### Options in YAML

{% options_yaml %}
interface:
  description: "The interface to set into install mode."
  required: true
  type: string
mode:
  description: "The install mode: 1 for normal mode, or 2 to remove existing old links."
  required: false
  type: integer
  default: 1
time:
  description: "How long to stay in install mode, in seconds."
  required: false
  type: integer
  default: 60
address:
  description: "The address of the Homematic device, or BidCoS-RF, to learn."
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

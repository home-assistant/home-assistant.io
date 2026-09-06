---
title: "Set client name"
action: tplink_omada.set_client_name
domain: tplink_omada
description: "Sets the name of a network client on the Omada controller."
---

The **Set client name** action sets the name of a network client on your Omada controller. The name is shown in the Omada client list. Home Assistant uses the client name when creating tracker entities for the device, which is useful for clients that only identify themselves by their MAC address or a generic hostname.

This action does not target an entity. Instead, you select the Omada device of the client and enter the new name. The client's MAC address is taken from the device's registered network connection.

{% include actions/ui_header.md %}

To set the name of a network client from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **TP-Link Omada: Set client name**.
6. Select the **device** of the client you want to rename. If you have more than one Omada controller, also select the **Omada controller** to use.
7. Enter the new **name** for the client.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Omada controller:
  description: The Omada integration the client is connected to. If you have a single controller, you can leave this empty.
  required: false
Device:
  description: The device of the network client to rename. The client's MAC address is taken from the device.
  required: true
Name:
  description: The new name for the client.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tplink_omada.set_client_name`. A basic example looks like this:

{% example %}
action: |
  action: tplink_omada.set_client_name
  data:
    device_id: "d5f2a4f9f0e54f8e9b1e2a3b4c5d6e7f"
    name: "Ting sensor"
{% endexample %}

This renames the client with the given device ID to "Ting sensor" on the Omada controller.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The Omada integration the client is connected to. If you have
    a single controller, you can leave this out.
  required: false
  type: string
device_id:
  description: The ID of the device of the network client to rename.
  required: true
  type: string
name:
  description: The new name for the client.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Name a newly discovered client

This automation renames a client to a friendly name the first time it connects to your network.

- **Trigger**: the client's device tracker entity comes online
- **Action**: TP-Link Omada: Set client name, with the device and the new name

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Name newly connected Omada client"
  triggers:
    - trigger: state
      entity_id: device_tracker.ting_d5_10
      to: "home"
  actions:
    - action: tplink_omada.set_client_name
      data:
        device_id: "{{ device_id('device_tracker.ting_d5_10') }}"
        name: "Ting sensor"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
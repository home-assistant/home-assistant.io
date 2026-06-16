---
title: "Reconnect wireless client"
action: tplink_omada.reconnect_client
domain: tplink_omada
description: "Forces a wireless client to reconnect to the Omada network."
---

The **Reconnect wireless client** action forces a Wi-Fi client to reconnect to your Omada network. This is useful when a client has a troublesome connection that needs to be reset.

This action does not target an entity. Instead, you select which Omada controller to use and provide the client to reconnect.

{% include actions/ui_header.md %}

To reconnect a wireless client from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **TP-Link Omada: Reconnect wireless client**.
6. Enter the **MAC address** of the client you want to reconnect. If you have more than one Omada controller, also select the **Omada controller** to use.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Omada controller:
  description: The Omada integration the wireless client is connected to. If you have a single controller, you can leave this empty.
  required: false
MAC address:
  description: The MAC address of the wireless client to reconnect.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tplink_omada.reconnect_client`. A basic example looks like this:

{% example %}
action: |
  action: tplink_omada.reconnect_client
  data:
    mac: "01-23-45-67-89-AB"
{% endexample %}

This forces the client with the given MAC address to reconnect to the network.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The Omada integration the wireless client is connected to. If you
    have a single controller, you can leave this out.
  required: false
  type: string
mac:
  description: The MAC address of the wireless client to reconnect.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

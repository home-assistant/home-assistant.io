---
title: "Remove device"
action: xiaomi_aqara.remove_device
domain: xiaomi_aqara
description: "Removes a specific device from a Xiaomi Aqara Gateway."
related_actions:
  - xiaomi_aqara.add_device
---

The **Remove device** action removes a specific device from a Xiaomi Aqara Gateway. Removing a device is required before you can pair it with another gateway.

{% include actions/ui_header.md %}

To remove a device from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Xiaomi Gateway (Aqara): Remove device**.
6. Enter the **Gateway MAC** and the **Device ID** of the device to remove.
7. Select **Save**.

This action does not support targets. In the UI, use the **Gateway MAC** field to choose which gateway the device is removed from.

### Options in the UI

{% options_ui %}
Gateway MAC:
  description: The MAC address of the Xiaomi Aqara Gateway.
  required: true
Device ID:
  description: The hardware address of the device to remove.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_aqara.remove_device`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_aqara.remove_device
  data:
    gw_mac: xxxxxxxxxxxx
    device_id: "158d0000000000"
{% endexample %}

This removes the device with the given hardware address from the gateway.

### Options in YAML

{% options_yaml %}
gw_mac:
  description: The MAC address of the Xiaomi Aqara Gateway.
  required: true
  type: string
device_id:
  description: The hardware address of the device to remove.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

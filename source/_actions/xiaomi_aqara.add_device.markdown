---
title: "Add device"
action: xiaomi_aqara.add_device
domain: xiaomi_aqara
description: "Opens the Xiaomi Aqara Gateway for pairing a new device."
related_actions:
  - xiaomi_aqara.remove_device
  - xiaomi_aqara.play_ringtone
  - xiaomi_aqara.stop_ringtone
---

The **Add device** action enables the join permission of a Xiaomi Aqara Gateway for 30 seconds. During that time, you can add a new device by pressing its pairing button once.

This is useful for pairing a new sensor or switch without opening the Mi Home app.

{% include actions/ui_header.md %}

To open the gateway for pairing from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Xiaomi Gateway (Aqara): Add device**.
6. Enter the **Gateway MAC**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Gateway MAC:
  description: The MAC address of the gateway. When you have a single gateway, it is selected automatically.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_aqara.add_device`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_aqara.add_device
  data:
    gw_mac: xxxxxxxxxxxx
{% endexample %}

### Options in YAML

{% options_yaml %}
gw_mac:
  description: The MAC address of the gateway. When you have a single gateway, it is used automatically.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

---
title: "Stop ringtone"
action: xiaomi_aqara.stop_ringtone
domain: xiaomi_aqara
description: "Stops a ringtone that is playing on a Xiaomi Aqara Gateway."
related_actions:
  - xiaomi_aqara.play_ringtone
  - xiaomi_aqara.add_device
  - xiaomi_aqara.remove_device
---

The **Stop ringtone** action immediately stops a ringtone that is playing on a Xiaomi Aqara Gateway.

This is useful for silencing a sound before it finishes on its own, for example stopping an alarm sound once you have acknowledged it.

{% include actions/ui_header.md %}

To stop a ringtone from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Xiaomi Gateway (Aqara): Stop ringtone**.
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

In YAML, refer to this action as `xiaomi_aqara.stop_ringtone`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_aqara.stop_ringtone
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

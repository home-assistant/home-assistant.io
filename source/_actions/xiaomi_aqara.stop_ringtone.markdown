---
title: "Stop ringtone"
action: xiaomi_aqara.stop_ringtone
domain: xiaomi_aqara
description: "Stops a playing ringtone on a Xiaomi Aqara Gateway."
related_actions:
  - xiaomi_aqara.play_ringtone
---

The **Stop ringtone** action immediately stops a ringtone that is playing on a Xiaomi Aqara Gateway.

{% include actions/ui_header.md %}

To stop a ringtone from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Xiaomi Gateway (Aqara): Stop ringtone**.
6. Enter the **Gateway MAC**.
7. Select **Save**.

This action does not support targets. In the UI, use the **Gateway MAC** field to choose which gateway stops the ringtone.

### Options in the UI

{% options_ui %}
Gateway MAC:
  description: The MAC address of the Xiaomi Aqara Gateway.
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

This stops any ringtone playing on the gateway.

### Options in YAML

{% options_yaml %}
gw_mac:
  description: The MAC address of the Xiaomi Aqara Gateway.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

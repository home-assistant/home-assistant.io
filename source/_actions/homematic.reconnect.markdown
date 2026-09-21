---
title: "Reconnect"
action: homematic.reconnect
domain: homematic
description: "Reconnects to all Homematic hubs."
related_actions:
  - homematic.set_device_value
  - homematic.set_variable_value
  - homematic.virtualkey
  - homematic.put_paramset
  - homematic.set_install_mode
---

Use this action to reconnect to all your Homematic hubs without restarting Home Assistant. This is useful when your CCU or Homegear has been restarted and Home Assistant stops getting updates from your devices.

{% include actions/ui_header.md %}

To reconnect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Homematic: Reconnect**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homematic.reconnect`:

{% example %}
action: |
  action: homematic.reconnect
{% endexample %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

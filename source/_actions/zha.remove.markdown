---
title: "Remove a device from the Zigbee network"
action: zha.remove
domain: zha
description: "Removes a node from the ZHA Zigbee network."
related_actions:
  - zha.permit
---

Use this action to remove a device from your Zigbee network by its IEEE address. You can find the IEEE address on the device's page in Home Assistant. This is useful when you want to remove a device from an automation or a script, rather than through the UI.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To remove a device from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Remove**.
6. Set **IEEE** to the IEEE address of the device you want to remove.
7. Select **Save**.

### Options in the UI

{% options_ui %}
IEEE:
  description: The IEEE address of the device to remove.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zha.remove`. A basic example looks like this:

{% example %}
action: |
  action: zha.remove
  data:
    ieee: "00:0d:6f:00:05:7d:2d:34"
{% endexample %}

### Options in YAML

{% options_yaml %}
ieee:
  description: The IEEE address of the device to remove.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Removing a device is not reversible. To use the device again, you need to pair it back to the network.

{% include actions/stuck.md %}

{% include actions/related.md %}

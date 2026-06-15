---
title: Update devices
action: vesync.update_devices
domain: vesync
description: "Polls the VeSync server to find and add any new devices."
---

The **Update devices** action polls the VeSync server for your account and adds any new devices to Home Assistant. Use it after you set up a new VeSync device in the VeSync app, so it shows up in Home Assistant without waiting or restarting.

{% include actions/ui_header.md %}

To update devices from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **VeSync: Update devices**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `vesync.update_devices`:

{% example %}
action: |
  action: vesync.update_devices
{% endexample %}

This polls the VeSync server and adds any new devices it finds.

### Options in YAML

This action has no additional options in YAML.

## Good to know

- Run this action after adding a device in the VeSync app to bring it into Home Assistant right away.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

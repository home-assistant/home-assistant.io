---
title: "Reload network storage mount"
action: hassio.mount_reload
domain: hassio
description: "Reloads a network storage mount."
---

Use this action to reload a network storage mount, such as a network share you use for backups or media. Reloading reconnects the mount, which is handy when it dropped its connection, for example after your <abbr title="network-attached storage">NAS</abbr> rebooted.

{% include actions/ui_header.md %}

To reload a network storage mount from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Reload network storage mount**.
6. Select the network storage **Device** to reload.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The network storage mount to reload.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hassio.mount_reload`. It takes the device ID of the network storage mount:

{% example %}
action: |
  action: hassio.mount_reload
  data:
    device_id: a1b2c3d4e5f60718293a4b5c6d7e8f90
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The device ID of the network storage mount to reload.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Only administrators can run this action.
- This action is only available when you run {% term "Home Assistant Operating System" %} or the Supervised installation method. It is not available on {% term "Home Assistant Container" %} or {% term "Home Assistant Core" %}.
- Each network storage mount has a **Connected** binary sensor. You can use it as a trigger to reload the mount automatically when it disconnects.

{% include actions/stuck.md %}

{% include actions/related.md %}

---
title: "Upgrade firmware"
action: guardian.upgrade_firmware
domain: guardian
description: "Upgrades the device firmware."
related_actions:
  - guardian.pair_sensor
  - guardian.unpair_sensor
---

The **Upgrade firmware** action upgrades the firmware on a Guardian valve controller.

By default, the valve controller upgrades to the latest firmware published by Guardian. If you need to install a specific firmware image, you can point the action at a custom URL, port, and filename.

{% include actions/ui_header.md %}

To upgrade the firmware from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Guardian: Upgrade firmware**.
6. Select the **Valve controller** to upgrade. Optionally, enter a custom **URL**, **Port**, and **Filename**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Valve controller:
  description: The valve controller to upgrade.
  required: true
URL:
  description: The URL of the server hosting the firmware image. If not provided, the latest firmware from Guardian is used.
  required: false
Port:
  description: The port on the server hosting the firmware image.
  required: false
Filename:
  description: The filename of the firmware image on the server.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `guardian.upgrade_firmware`. A basic example looks like this:

{% example %}
action: |
  action: guardian.upgrade_firmware
  data:
    device_id: 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d
{% endexample %}

This upgrades the selected valve controller to the latest firmware from Guardian.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the valve controller device to upgrade.
  required: true
  type: string
url:
  description: >
    The URL of the server hosting the firmware image. If not provided, the
    latest firmware from Guardian is used.
  required: false
  type: string
port:
  description: >
    The port on the server hosting the firmware image.
  required: false
  type: integer
filename:
  description: >
    The filename of the firmware image on the server.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}

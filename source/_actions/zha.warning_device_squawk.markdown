---
title: "Make a warning device squawk"
action: zha.warning_device_squawk
domain: zha
description: "Emits a short audible and visible pulse on a Zigbee warning device."
related_actions:
  - zha.warning_device_warn
---

Use this action to make a Zigbee warning device, such as a siren, emit a short pulse called a squawk. A squawk is a quick beep and flash, often used to confirm that a system was armed or disarmed. You identify the device by its IEEE address.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To make a warning device squawk from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Warning device squawk**.
6. Set the device and, optionally, the squawk mode, strobe, and level.
7. Select **Save**.

### Options in the UI

{% options_ui %}
IEEE:
  description: The IEEE address of the warning device.
Mode:
  description: The squawk mode, which sets the kind of sound the device makes. Defaults to 0.
  required: false
Strobe:
  description: Whether the device also flashes its strobe during the squawk. Use 1 to flash, 0 for sound only. Defaults to 1.
  required: false
Level:
  description: The loudness of the squawk, from 0 (low) to 3 (high). Defaults to 2.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zha.warning_device_squawk`. A basic example looks like this:

{% example %}
action: |
  action: zha.warning_device_squawk
  data:
    ieee: "00:0d:6f:00:05:7d:2d:34"
{% endexample %}

### Options in YAML

{% options_yaml %}
ieee:
  description: The IEEE address of the warning device.
  required: true
  type: string
mode:
  description: The squawk mode, which sets the kind of sound the device makes, from 0 to 1. Defaults to 0.
  required: false
  type: integer
strobe:
  description: Whether the device also flashes its strobe during the squawk. Use 1 to flash, 0 for sound only. Defaults to 1.
  required: false
  type: integer
level:
  description: The loudness of the squawk, from 0 (low) to 3 (high). Defaults to 2.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- A squawk has no effect while the device is already running an active warning.
- The exact sound for each mode depends on the device.

{% include actions/stuck.md %}

{% include actions/related.md %}

---
title: "Permit devices to join the Zigbee network"
action: zha.permit
domain: zha
description: "Opens the ZHA Zigbee network so new devices can join."
related_actions:
  - zha.remove
---

Use this action to open your Zigbee network for a short time so new devices can join. Most of the time you add devices through the UI with the **Add device** flow, but this action is handy when you want to open the network from an automation or a script, for example with the press of a button.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To open the network for joining from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Permit**.
6. Optionally, set how long the network stays open and the joining details.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: How long, in seconds, the network stays open for joining. Defaults to 60 seconds.
  required: false
IEEE:
  description: The IEEE address of an existing router device through which the new device should join. Useful when you want a device to join through a specific router.
  required: false
Source IEEE:
  description: The IEEE address of the joining device. Use together with the install code.
  required: false
Install code:
  description: The install code of the joining device. Use together with the source IEEE address.
  required: false
QR code:
  description: A QR code that contains both the IEEE address and the install code of the joining device.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zha.permit`. A basic example looks like this:

{% example %}
action: |
  action: zha.permit
  data:
    duration: 120
{% endexample %}

This opens the network for new devices to join for 120 seconds.

### Options in YAML

{% options_yaml %}
duration:
  description: How long, in seconds, the network stays open for joining. Defaults to 60 seconds.
  required: false
  type: integer
ieee:
  description: The IEEE address of an existing router device through which the new device should join.
  required: false
  type: string
source_ieee:
  description: The IEEE address of the joining device. Use together with the install code.
  required: false
  type: string
install_code:
  description: The install code of the joining device. Use together with the source IEEE address.
  required: false
  type: string
qr_code:
  description: A QR code that contains both the IEEE address and the install code of the joining device.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- To join a device that uses an install code, provide either the QR code, or the source IEEE address and install code together.
- QR install codes are supported from Aqara, Bosch, Consciot, and Embrighten.
- For everyday device pairing, the **Add device** flow in the UI is the easier path.

{% include actions/stuck.md %}

{% include actions/related.md %}

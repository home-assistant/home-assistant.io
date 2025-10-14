---
title: "TIS Control"
description: "Instructions on how to integrate TIS Control devices with Home Assistant."
ha_release: "2025.10.0"
ha_category: "Switch"
ha_iot_class: "Local Polling"
ha_config_flow: true
ha_codeowners:
  - '@karimtis'
  - '@ibrahimmohamed2001'
ha_domain: tis_control
ha_integration_type: hub
---

The [TIS Control](https://tiscontrol.com) integration allows you to integrate and control your TIS Control smart home devices within Home Assistant.

This integration automatically discovers TIS Control devices (RCUs and Relays) on your local network using a UDP broadcast.

## Prerequisites

For the integration to work, your Home Assistant instance and your TIS Control devices must be connected to the **same local network**. You will also need to know the UDP communication port used by your TIS devices. The default port is `6000`.


{% include integrations/config_flow.md %}

{% important %}
You will be prompted to enter the **UDP Port** for communication. If you haven't changed it on your devices, leave the default value of `6000`.
{% endimportant %}


## Supported Devices

Currently, this integration supports the following types of TIS Control devices:

- Switch devices (e.g., RCUs, Relays)

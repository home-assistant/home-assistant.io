---
title: Tailscale
description: Instructions on how to integrate Tailscale within Home Assistant.
ha_category:
  - Binary Sensor
  - Network
  - Sensor
ha_release: 2021.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: tailscale
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_quality_scale: platinum
ha_integration_type: integration
---

The Tailscale integration integrates the [Tailscale](https://www.tailscale.com) API
with Home Assistant; giving you the possibility to monitor and automate on
the state of the devices in your Tailscale VPN network (Tailnet).

<div class="note">

This integration **DOES NOT** make your Home Assistant accessible via
Tailscale VPN remotely!

If you want to access your Home Assistant instance remotely, you will
need to install Tailscale itself on your own. For instructions on how to do
this, please consult the [Tailscale documentation](https://tailscale.com/kb/).

</div>

## Prerequisites

To use the Tailscale integration, you will need to obtain an API key,
you can create one in the [Tailscale Admin Panel](https://login.tailscale.com/admin/settings/authkeys).

Additionally, you will need to know the Tailnet name of your Tailscale network.
You can find it in the top left corner in the [Tailscale Admin Panel](https://login.tailscale.com/admin/settings/authkeys)
(beside the Tailscale logo).

{% include integrations/config_flow.md %}

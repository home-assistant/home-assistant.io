---
title: Flow-it
description: Instructions on how to integrate Flow-it ventilation systems into Home Assistant.
ha_category:
  - Fan
ha_iot_class: Local Push
ha_release: 2026.7
ha_config_flow: true
ha_domain: flow_it
ha_zeroconf: true
---

The **Flow-it** {% term integration %} lets you monitor and control your Flow-it ventilation system in Home Assistant.

Home Assistant connects to your Flow-it device over your local network and exposes it as a fan entity.

The integration receives updates locally and refreshes periodically to keep the state in sync.

## Prerequisites

Before setting up the integration, ensure that you have your Flow-it device connected to your local network.

While you can locate the device's IP address on its LCD display via the dedicated menu to set up the integration manually, doing so will require you to set up a static DHCP lease for the VMC in your router. Failure to bind the IP address statically will result in the device becoming unreachable as soon as the DHCP lease expires and the IP changes.

For this reason, using Home Assistant's automatic discovery ([Zeroconf](/integrations/zeroconf/)) is recommended.

{% include integrations/config_flow.md %}

## Discovery

If your Flow-it device supports Zeroconf, Home Assistant will automatically discover it on your network.

By using automatic discovery, Home Assistant configures the integration using the device's **hostname** instead of its IP address. This completely avoids the need for advanced DHCP lease configurations on your router, as the device will remain reachable even if its IP address changes over time.

You can set it up from the discovered card on the **Settings** > **Devices & services** page by entering your credentials (the default username is usually `api`).

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the app of the manufacturer and remove the Home Assistant integration from there as well.

---
title: Flow-it
description: Instructions on how to integrate Flow-it VMC systems into Home Assistant.
ha_category:
  - Fan
ha_iot_class: Local Push
ha_release: 2026.7
ha_config_flow: true
ha_domain: flow_it
---

The **Flow-it** integration allows you to integrate your Flow-it VMC systems into Home Assistant.

This integration connects directly to your Flow-it VMC over the local network to monitor and control its operations, exposing the VMC as a fan entity.

It uses a hybrid approach to fetch data: it primarily relies on local push (via WebSockets) to deliver near-instantaneous updates as soon as data becomes available, while also using a local polling mechanism as a fallback to ensure states remain perfectly aligned if the connection is ever interrupted.

## Prerequisites

Before setting up the integration, ensure that you have your Flow-it device connected to your local network.

While you can locate the device's IP address on its LCD display via the dedicated menu to set up the integration manually, doing so will require you to set up a static DHCP lease for the VMC in your router. Failure to bind the IP address statically will result in the device becoming unreachable as soon as the DHCP lease expires and the IP changes.

For this reason, **using Home Assistant's automatic discovery (ZeroConf) is highly recommended**.

{% include integrations/config_flow.md %}

## Discovery

If your Flow-it device supports ZeroConf, Home Assistant will automatically discover it on your network.

By using automatic discovery, Home Assistant configures the integration using the device's **hostname** instead of its IP address. This completely avoids the need for advanced DHCP lease configurations on your router, as the device will remain reachable even if its IP address changes over time.

You can configure it directly by clicking on the discovered card in the Integrations page and providing the authentication credentials (the default username is usually `api`).

## Removal

To remove the Flow-it integration from your Home Assistant instance:

1. Go to **Settings** > **Devices & Services**.
2. Find the **Flow-it** integration card.
3. Click on the three dots icon (overflow menu).
4. Select **Delete**.

---
title: Ruuvi Gateway
description: Support for Ruuvi Gateway devices acting as BLE remote scanners.
ha_category:
  - Sensor
ha_release: '2023.2'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@akx'
ha_domain: ruuvi_gateway
ha_dhcp: true
ha_integration_type: integration
---

Integrates [Ruuvi Gateway](https://ruuvi.com/gateway/) devices as
polling BLE remote scanners [via the `/history` endpoint][poll].

## Setup

Make sure to [enable Bearer Token authentication][poll] on the Ruuvi Gateway device
(and take note of the token).

You may also wish to enable scanning for _all_ BLE beacons (not just RuuviTags);
be sure to set the "Use Ruuvi Cloud or/and a custom server and configure more settings"
option on the Cloud Options setup page, and when you get to the "Bluetooth Scanning" page,
select "All (including third party beacons)".

{% include integrations/config_flow.md %}

[poll]: https://docs.ruuvi.com/gw-examples/polling-mode

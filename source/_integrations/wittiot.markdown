---
title: Wittiot
description: Instructions on how to integrate Wittiot within Home Assistant.
ha_category:
  - Sensor
ha_release: 2022.6
ha_iot_class: Local Push
ha_domain: wittiot
ha_config_flow: true
ha_codeowners:
  - '@Wittiot'
ha_platforms:
  - sensor
ha_integration_type: integration
---

{% include integrations/config_flow.md %}

## Wittiot configuration

The following steps must be performed to set up this integration.

1. Configure WittBoy to your LAN using the ws view plus or ecowitt app on your phone and then view the device IP address.
2. Enter the IP address of the device into the integration, and the integration will obtain WittBoy's data after a successful connection.

Home Assistant and WittBoy need to be in the same LAN for Wittiot integration to properly capture data.
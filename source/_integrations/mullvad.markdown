---
title: Mullvad VPN
description: Instructions on how to integrate Mullvad VPN api data into Home Assistant.
ha_category:
  - Binary sensor
  - Network
ha_iot_class: Cloud Polling
ha_release: 2021.3
ha_domain: mullvad
ha_config_flow: true
ha_codeowners:
  - '@meichthys'
ha_platforms:
  - binary_sensor
ha_integration_type: integration
---

The Mullvad VPN integration uses the [Mullvad](https://mullvad.net/) VPN API to detect if your Home Assistant instance is connected to the Mullvad VPN service.

![](/images/screenshots/mullvad_vpn_sample_sensor_connected.png)

{% include integrations/config_flow.md %}

---
title: Mullvad VPN
description: Instructions on how to integrate Mullvad VPN api data into Home Assistant.
ha_category:
  - Binary Sensor
  - Network
ha_iot_class: Cloud Polling
ha_release: 2021.3
ha_domain: mullvad
ha_config_flow: true
ha_codeowners:
  - '@meichthys'
ha_platforms:
  - binary_sensor
---

The Mullvad VPN integration pulls [Mullvad](https://mullvad.net/) VPN status information into Home Assistant.

<div class='note'>

This integration reports the Mullvad status of Home Assistant itself, not the status of other clients that may be connected to your Mullvad account.

</div>

![](/images/screenshots/mullvad_vpn_sample_sensor_connected.png)

{% include integrations/config_flow.md %}

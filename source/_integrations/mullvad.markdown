---
title: Mullvad VPN
description: Instructions on how to integrate Mullvad VPN api data into Home Assistant.
ha_category:
  - Sensor
  - Binary Sensor
ha_iot_class: Cloud Polling
ha_release: 0.114
ha_domain: mullvad_vpn
ha_codeowners:
  - '@meichthys'
---

The Mullvad VPN integration pulls [Mullvad](https://mullvad.net/) VPN status information into Home Assistant.

<p class='img'>
<img src='/images/screenshots/mullvad_vpn_sample_sensor_connected.png' />
</p>

<p class='img'>
<img src='/images/screenshots/mullvad_vpn_sample_sensor_ip.png' />
</p>

## Configuration

This integration can be configured via the Home Assistant frontend:

- Go to *Configuration -> Integrations*
- Click on the `+` in the bottom right corner to add a new integration.
- Search and Select the *Mullvad VPN* integration from the list.
- Click *Submit* to setup the integration (No login or additional user input necessary)

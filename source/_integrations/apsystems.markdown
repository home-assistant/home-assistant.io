---
title: APsystems EZ1
description: Control and monitor your APsystems EZ1 microinverters locally without the cloud
featured: false
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 2024.6
ha_category:
  - Energy
ha_domain: apsystems
ha_platforms:
  - sensor
ha_integration_type: device
---

The APsystems {% term integration %} allows you to read the data from your EZ1 inverter.
<!--, disable its output and set the maximum output. -->
The following data is provided by the integration:

- Lifetime production (Per input and in total)
- Current production (Per input and in total)
- Today's production (Per input and in total)

<!-- 
The following can be adjusted:

- Status (Output can be enabled and disabled)
- Output limit can be set between 30 and 800 watts

-->
Make sure the local API is activated and set to continuously. For that, connect to the inverter via Bluetooth using the app and go to settings -> local mode and set this to continuously.

{% include integrations/config_flow.md %}

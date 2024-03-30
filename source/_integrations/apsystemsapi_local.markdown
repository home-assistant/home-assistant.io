---
title: APsystems EZ1
description: Control and monitor your APsystems EZ1 microinverters locally without the cloud
featured: false
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 2024.5
ha_category:
  - Energy
ha_domain: apsystemsapi_local
ha_platforms:
  - number
  - sensor
  - switch
ha_integration_type: device
---

The APsystems EZ1 integration will allow you to read the data from the inverter, disable its output and set the maximum output.

{% include integrations/config_flow.md %}

Make sure the local API is activated and set to continuously. For that, connect to the inverter via Bluetooth using the app and go to settings -> local mode and set this to continuously.

The polling frequency can be changed as needed, but don't set this too low, unless you know what you're doing and why. The default 15 seconds are enough.

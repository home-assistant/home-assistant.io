---
title: Leviton Z-Wave
description: Connect and control your Leviton Z-Wave devices using the Z-Wave integration
featured: true
ha_release: '2021.2'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@home-assistant/z-wave'
ha_category:
  - Binary Sensor
  - Button
  - Climate
  - Cover
  - Fan
  - Hub
  - Humidifier
  - Light
  - Lock
  - Number
  - Select
  - Sensor
  - Siren
  - Switch
  - Update
ha_domain: leviton_z_wave
ha_integration_type: integration
works_with:
  - zwave
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - fan
  - humidifier
  - light
  - lock
  - number
  - select
  - sensor
  - siren
  - switch
  - update
ha_zeroconf: true
ha_supporting_domain: zwave_js
ha_supporting_integration: Z-Wave
---

[Leviton](https://leviton.com) is a member of the Works with Home Assistant partner program for their Z-Wave products. Leviton is committed to making sure their products are up-to-date and ready to use in Home Assistant. [Leviton Z-Wave products](https://www.amazon.com/Leviton) make it easy to automate your lighting using any of their products including the DZ6HD dimmer, DZ15S switch, ZW4SF Fan Speed Controller, DZPD3 Plug-in Dimmer, DZPA1 Plug-in Switch, and ZW15R Outlet.

Leviton Z-Wave devices work locally and integrate seamlessly with the Z-Wave integration in Home Assistant (Z-Wave stick required). As all connectivity is happening locally, status updates and controlling your devices happen instantly in Home Assistant. Each device that is connected to power will also act as a Z-Wave router to extend your Z-Wave mesh network.

{% include integrations/config_flow.md domain=page.ha_supporting_domain %}
<br><br>
To find more information, please use the [Z-Wave integration](/integrations/zwave_js) page.

### Firmware updates

Leviton is working on adding firmware updates that are publicly available to download. In Home Assistant, you can navigate to your device page and use the Update Device Firmware option to upload the firmware from Leviton for your device.

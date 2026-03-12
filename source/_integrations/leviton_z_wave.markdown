---
title: Leviton Z-Wave
description: Connect and control your Leviton Z-Wave devices using the Z-Wave integration
featured: true
ha_release: '2021.2'
ha_iot_class: Local Push
ha_codeowners:
  - '@home-assistant/z-wave'
ha_category:
  - Binary sensor
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
ha_iot_standard: zwave
---

[Leviton](https://leviton.com) is a member of the Works with Home Assistant partner program for their Z-Wave products. Leviton is committed to making sure their products are up-to-date and ready to use in Home Assistant. [Leviton Z-Wave products](https://www.amazon.com/Leviton) make it easy to automate your lighting using any of their products including the DZ6HD dimmer, DZ15S switch, ZW4SF Fan Speed Controller, DZPD3 Plug-in Dimmer, DZPA1 Plug-in Switch, and ZW15R Outlet.

Leviton Z-Wave devices work locally and integrate seamlessly with the Z-Wave integration in Home Assistant (Z-Wave stick required). As all connectivity is happening locally, status updates and controlling your devices happen instantly in Home Assistant. Each device that is connected to power will also act as a Z-Wave router to extend your Z-Wave mesh network.

{% my add_zwave_device badge domain=page.ha_domain %}
<br><br>
To find more information, please use the [Z-Wave integration](/integrations/zwave_js) page.

## Firmware updates

Leviton provides firmware updates that are publicly available to download. In Home Assistant, you can navigate to your device page and use the Update Device Firmware option to upload the firmware from Leviton for your device.

## Supported devices

The following devices are known to be supported by the integration. They are certified under the [Works with Home Assistant](https://partner.home-assistant.io/) program.

- [Leviton Decora Smart Z-Wave Dimmer](https://leviton.com/products/zw6hd-1rw)
- [Leviton Decora Smart Z-Wave Switch](https://leviton.com/products/zw15s-1rw)
- [Leviton Decora Smart Z-Wave Fan Speed Controller](https://leviton.com/products/zw4sf-1bw)
- [Leviton Decora Smart Z-Wave Plug-in Dimmer](https://leviton.com/products/dzpd3-2bw)
- [Leviton Decora Smart Z-Wave Plug-in Outlet](https://leviton.com/products/dzpa1-2bw)
- [Leviton Decora Smart Z-Wave Outlet](https://leviton.com/products/zw15r-1bw)

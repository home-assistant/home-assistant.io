---
title: Leviton
description: Connect and control your Leviton devices using the Z-Wave integration
featured: true
ha_release: '2022.8'
ha_iot_class: Local Push
ha_config_flow: false
ha_codeowners:
  - '@home-assistant/z-wave'
ha_category:
  - Light
  - Switch
ha_domain: leviton
ha_platforms:
  - light
  - switch
ha_integration_type: integration
works_with:
  - zwave
---

[Leviton](https://leviton.com) is a member of the Works with Home Assistant partner program for their Z-Wave products. Leviton is committed to making sure their products are up-to-date and ready to use in Home Assistant. [Leviton Z-Wave products](https://www.amazon.com/Leviton) make it easy to automate your lighting using any of their products including the DZ6HD dimmer, DZ15S switch, ZW4SF Fan Speed Controller, DZPD3 Plug-in Dimmer, DZPA1 Plug-in Switch, and ZW15R Outlet.

Leviton Z-Wave devices work locally and integrate seamlessly with the Z-Wave integration in Home Assistant (Z-Wave stick required). As all connectivity is happening locally, status updates and controlling your devices happen instantly in Home Assistant. Each device that is connected to power will also act as a Z-Wave router to extend your Z-Wave mesh network.

To find more information, please use the [Z-Wave integration](/integrations/zwave_js) page.

### Firmware updates

Leviton is providing device updates automatically in Home Assistant. When Leviton posts a new update, the update will show in your Home Assistant updates dashboard.

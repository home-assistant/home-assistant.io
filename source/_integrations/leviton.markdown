---
title: Leviton
description: Connect and control your Leviton devices using the Z-Wave integration
featured: true
ha_release: '2021.2'
ha_iot_class: Local Push
ha_config_flow: true
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
---

Leviton is a member of the Works with Home Assistant partner program for their Z-Wave products. Leviton is committed to making sure their products are up-to-date and ready to use in Home Assistant. Leviton Z-Wave products make it easy to automate your lighting using any of their products including the DZ6HD dimmer, DZ15S switch, ZW4SF Fan Speed Controller, DZPD3 Plug-in Dimmer, DZPA1 Plug-in Switch, and ZW15R Outlet.

Leviton products use the Z-Wave integration in Home Assistant. To find more information, please use the Z-Wave integration page:

{% include integrations/config_flow.md %}

### Firmware updates

Leviton is providing device updates automatically in Home Assistant. When your device is out of date and Leviton posts a new update this will show in your Home Assistant updates dashboard.

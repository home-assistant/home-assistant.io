---
title: Radio Thermostat
description: Instructions on how to integrate Radio Thermostat (3M Filtrete) thermostats within Home Assistant.
ha_category:
  - Climate
  - Switch
ha_iot_class: Local Polling
ha_release: 0.7.6
ha_domain: radiotherm
ha_config_flow: true
ha_codeowners:
  - '@vinnyfuria'
ha_platforms:
  - climate
  - switch
ha_integration_type: integration
ha_dhcp: true
---

The `radiotherm` climate platform let you control a thermostat from [Radio Thermostat](https://www.radiothermostat.com/) or [3M Filtrete](https://www.filtrete.com/). Your thermostat must have the Wi-Fi module installed and connected to your network.

{% include integrations/config_flow.md %}

## Time synchronization

The integration will automatically sync the time when it is loaded if the device is not currently in hold mode, as syncing the time will disable hold mode.

## Hold mode

If you want temperature settings from Home Assistant to override a thermostat schedule on the thermostat itself, hold mode can be enabled with the hold mode switch.

## Known working devices

- CT30 v1.75
- CT30 v1.92
- CT30 v1.94
- CT30 v1.99
- CT50 V1.09
- CT50 V1.88
- CT50 V1.92
- CT50 V1.94 (also known as Filtrete 3M50)
- CT80 Rev B1 V1.00
- CT80 Rev B2 V1.00
- CT80 Rev B2 V1.03
- CT80 Rev B2 V1.09

New models that are derivatives of the CT30 or CT80 should be detected automatically and basic functionality should work.

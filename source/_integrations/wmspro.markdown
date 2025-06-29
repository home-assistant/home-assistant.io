---
title: WMS WebControl pro
description: Instructions on how to integrate WAREMA devices via WMS WebControl pro within Home Assistant.
ha_category:
  - Button
  - Cover
  - Hub
  - Light
  - Scene
ha_release: '2024.10'
ha_iot_class: Local Polling
ha_codeowners:
  - '@mback2k'
ha_domain: wmspro
ha_config_flow: true
ha_platforms:
  - button
  - cover
  - diagnostics
  - light
  - scene
ha_integration_type: hub
related:
  - url: https://www.warema.com/en/smart-home/wms-webcontrol-pro/
    title: Consumer information about WMS WebControl pro
  - url: https://smartbuildings.warema.com/en/control-systems/radio-systems/wms/wms-webcontrol-pro/
    title: Technical documentation for WMS WebControl pro
ha_dhcp: true
---

The **WMS WebControl pro** {% term integration %} allows you to integrate WAREMA devices into Home Assistant.

This integration uses a local API which is available with firmware container version 11H.

See device section for support information: [buttons](#buttons), [covers](#covers), [lights](#lights) and [scenes](#scenes).

{% include integrations/config_flow.md %}

The WMS WebControl pro *may* also be discovered on your local network via DHCP.

## Buttons

- All devices that support an identification activity (for example, winking an awning or blinking a light)
  can be triggered to perform such activity.

## Covers

- *Patio awnings* and *roller shutters/blinds* can be opened, closed, set to a certain position and stopped.
- The integration and library *may* already support other types of awnings or covers with a single motor.

## Lights

- Dimmers (with brightness control) and switches are fully supported.

## Scenes

- Scenes can be activated, but not changed or monitored.
- Scenes are accessible via a virtual device per room.

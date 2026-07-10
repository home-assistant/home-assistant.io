---
title: WMS WebControl pro
description: Instructions on how to integrate WAREMA devices via WMS WebControl pro within Home Assistant.
ha_category:
  - Button
  - Cover
  - Hub
  - Light
  - Number
  - Scene
  - Switch
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
  - number
  - scene
  - switch
ha_integration_type: hub
related:
  - url: https://www.warema.com/en/smart-home/wms-webcontrol-pro/
    title: Consumer information about WMS WebControl pro
  - url: https://smartbuildings.warema.com/en/control-systems/radio-systems/wms/wms-webcontrolpro/
    title: Technical documentation for WMS WebControl pro
ha_dhcp: true
---

The **WMS WebControl pro** {% term integration %} allows you to integrate WAREMA devices into Home Assistant.

This integration uses a local API which is available since firmware container version 11H.

See device section for support information: [buttons](#buttons), [covers](#covers), [lights](#lights),
[numbers](#numbers), [scenes](#scenes), and [switches](#switches).

{% include integrations/config_flow.md %}

The WMS WebControl pro *may* also be discovered on your local network via DHCP.

{% include integrations/actions.md %}
### Supported functionality

The **WMS WebControl pro** integration provides the following entities.
### Buttons

- All devices that support an identification activity (for example, winking an awning or blinking a light) can be triggered to perform such activity.

### Covers

- *Awnings*, *volant awnings* (vertical drop sun shades), and *roller shutters/blinds* can be opened, closed, set to a certain position, and stopped.
- *Slat-based blinds* can additionally have their slats rotated open, closed, or to a specific rotation angle.

#### Rotation support

Home Assistant treats the slat rotation as a linear scale from fully open to fully closed. The integration uses the maximum rotation angle as the fully closed position, but the minimum (opposite) angle is not treated as fully open. Instead when you set the slats to the open position in Home Assistant, they move to the position where the slats are parallel to the ground as expected. You can change the minimum and maximum rotation angles via configuration [number](#numbers) entities or [automatic learning](#automatic-learning).

### Lights

- Dimmers (with brightness control) and switches are fully supported.

### Numbers

- *Slat-based blinds* have configuration entities to overwrite the minimum and maximum rotation angle.
  This is required as the WMS WebControl pro currently reports invalid minimum and maximum rotation values.
- *Slat-drives supporting rotation* also have a diagnostic entity to control the raw rotation angle.
  This is especially useful for *slat-based roofs* which currently have no other way to be controlled.
- *Slat-based covers* like roofs that only have rotation, but not position control, only have this entity.
   For covers with rotation only, this entity appears as the main control.

#### Automatic learning

The number entities persist across Home Assistant restarts. They are updated automatically on slat rotation to allow automatic learning of the valid rotation range based on the current rotation angle. For learning, it is sufficient to rotate *slat-based blinds* to both end positions while Home Assistant is connected and wait until the position has updated.

### Scenes

- Scenes can be activated, but not changed or monitored.
- Scenes are accessible via a virtual device per room.

### Switches

- Load switches (for example, a connected heater) can be turned on and off.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

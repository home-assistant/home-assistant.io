---
title: SkyBell
description: Instructions on how to integrate your Skybell HD devices within Home Assistant.
ha_category:
  - Binary sensor
  - Camera
  - Doorbell
  - Light
  - Sensor
  - Switch
ha_release: 0.56
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_domain: skybell
ha_platforms:
  - binary_sensor
  - camera
  - light
  - sensor
  - switch
ha_codeowners:
  - '@tkdrob'
ha_integration_type: hub
---

The `skybell` implementation allows you to integrate your [Skybell.com](http://www.skybell.com/) doorbells in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](/integrations/skybell/#binary-sensor)
- [Camera](/integrations/skybell/#camera)
- [Light](/integrations/skybell/#light)
- [Sensor](/integrations/skybell/#sensor)
- [Switch](/integrations/skybell/#switch)

Currently only the SkyBell HD is supported by this platform.

{% include integrations/config_flow.md %}

## Integration entities

### Binary sensor

Each added configuration entry will create the following binary sensors:

- **Button**: When the doorbell button has been pushed.
- **Motion**: When motion has been detected.

## Camera

There are two available camera types "Avatar", which is the default, displays the SkyBell avatar image.
It is periodically updated with a fresh image. The other type is "Activity", which displays a snapshot from
the latest event (motion, bell, or on demand) captured by the camera.

### Light

The light supports switching and RGB color.

### Sensor

- **Chime Level**: The volume level for the outside ringer. (0 equals off)

### Switch

- **Do Not Disturb**: Disable the indoor ringer.
- **Motion Sensor**: Turn on/off motion sensing. (Enabling this will reset in-app notifications to on)

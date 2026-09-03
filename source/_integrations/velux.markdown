---
title: Velux
description: Instructions on how to integrate the Velux KLF 200 with Home Assistant.
ha_category:
  - Cover
  - Scene
ha_release: 0.49
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@Julius2342'
  - '@pawlizio'
  - '@wollew'
ha_domain: velux
ha_platforms:
  - binary_sensor
  - button
  - cover
  - diagnostics
  - light
  - number
  - scene
  - switch
ha_integration_type: hub
ha_dhcp: true
ha_quality_scale: silver
---

The [Velux](https://www.velux.com/) {% term integration %} for Home Assistant allows you to connect to a Velux KLF 200 interface so you can control [io-homecontrol](http://www.io-homecontrol.com) devices, such as windows, blinds, lights, and switches. The integration lets you start scenes configured on the KLF 200.

## Prerequisites

At least firmware version > 2.0.0.0 is required on the KLF 200 device. The firmware images may be obtained from the [vendor's website](https://www.velux.com/klf200) and may be imported via the web interface of your KLF 200.

1. Make sure you have the password for your gateway's wireless access point.
    - You'll find it printed on the underside of your KLF 200 device.
    - It is not the web login password.
2. Reboot or power cycle the KLF 200 device.
    - You must complete the configuration within 5 minutes of rebooting the device while its Wi-Fi access point is still visible.
3. During configuration, keep your Home Assistant connected to your regular network.
    - Don't connect to the device's wireless access point.

{% include integrations/config_flow.md %}

During configuration, you will be asked for a hostname and password:

{% configuration_basic %}
Hostname:
    description: "The IP address or hostname of the KLF 200 gateway. You can find it in your router."
Password:
    description: "The password of the gateway's wireless access point. You can find it printed on the underside of the device. It is not the web login password."
{% endconfiguration_basic %}

Remember: You must complete the configuration within 5 minutes of rebooting the KLF 200 gateway. If you can't complete in time and setup fails, power cycle the device and try again.

## Supported functionality

There is currently support for the following entity platforms:

- [Binary sensor](#binary-sensor)
- [Button](#button)
- [Cover](#cover)
- [Light](#light)
- [Number](#number)
- [Scene](#scene)
- [Switch](#switch)

### Binary sensor

Velux windows equipped with a rain sensor provide a moisture binary sensor.

Rain sensors:

- Are created only for windows that report a rain sensor.
- Are disabled by default.
- Are polled every 5 minutes because the KLF 200 does not report rain-state changes automatically.
- May report `on` when the window's opening limitation indicates that rain protection is active.

The rain sensor and the opening-position limitation entities use the same gateway data. As a result, setting the opening limitation to 11% or less can cause the rain sensor to report wet even when no rain is detected.

### Button

The integration provides the following buttons:

- **Identify**: The identify button sends a `wink` command to the selected Velux device. The device briefly moves or otherwise signals its location, allowing you to match the Home Assistant entity with the physical window, blind, shutter, or other product.
- **Restart gateway**: Reboots the KLF 200 gateway. This is a configuration entity.

### Cover

The integration creates cover entities for supported KLF 200 opening devices, including:

- Windows
- Awnings
- Garage doors
- Gates
- Roller shutters
- Blinds
- Dual roller shutters. A dual roller shutter creates three cover entities:
  - A combined entity controlling both curtains
  - An upper-curtain entity
  - A lower-curtain entity

All Velux cover entities support:

- Open
- Close
- Stop
- Set position

The `open`, `close` and `set_position` actions support an optional `speed` parameter. Valid values are `silent`, `default` and `fast`.

Blinds additionally support:

- Open tilt
- Close tilt
- Stop tilt
- Set tilt position

### Light

The integration supports two types of light entities:

- **On/off lights**: Support turning the light on and off.
- **Dimmable lights**: Support turning the light on and off and setting brightness.

Color temperature, RGB color, and effects are not supported.

### Number

The integration provides the following number entities:

- **Exterior heating intensity**: A percentage from 0 to 100%, in 1% steps.
- **Open position limitation**: The minimum opening position allowed for a cover device.
- **Closed position limitation**: The maximum closing position allowed for a cover device.

The open and close position limitation entities are configuration entities and disabled by default. Note that some cover devices may refuse setting an open or close limitation, resulting in an error when trying to do so.

### Scene

Scenes configured on the KLF 200 are exposed as Home Assistant scenes and can be activated from Home Assistant.

Scenes are loaded when the integration is set up. Changes made to the scene list on the KLF 200 are not automatically reflected in Home Assistant until the integration is reloaded or restarted.

### Switch

On/off switches connected to the KLF 200 are exposed as switch entities.

## Known limitations

The number entities for the window opening limitation and the rain sensor binary sensor use the same data from the gateway. If you set the opening limitation to 11% or less, the rain sensor can show as wet even when no rain is detected.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Unsupported Hardware

### Velux KLF 150

The Velux KLF 150 is not supported by this {% term integration %}, even though Velux markets it as the replacement for the now-discontinued KLF 200. Unlike the KLF 200, the KLF 150 does not provide a local API that Home Assistant can communicate with directly.

However, there is a community [project](https://github.com/uncaught/gpio-shutter-bridge) that bridges the KLF 150's GPIO interface with MQTT. Using this project with additional hardware, you can control your KLF 150 through the [MQTT Cover integration](/integrations/cover.mqtt/).

### Velux KIG 300 (included in the Velux Active (KIX 300) kit)

The Velux KIG 300 is not supported by this {% term integration %}. To integrate the Velux KIG 300 with Home Assistant, use the [HomeKit Controller](/integrations/homekit_controller/) {% term integration %} to control your windows and covers, including curtains. If you obtained the KIG 300 as part of the Velux Active (KIX 300) kit, the included KLA 300 air quality sensor will also be supported by the HomeKit Controller integration.

Add the Velux KIG 300 gateway using HomeKit pairing (with the pairing code on the sticker on the bottom of the device). The devices connected to the gateway, including sensors, will be automatically discovered and added to Home Assistant.

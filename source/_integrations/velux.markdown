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
  - '@DeerMaximum'
  - '@pawlizio'
  - '@wollew'
ha_domain: velux
ha_platforms:
  - binary_sensor
  - button
  - cover
  - light
  - scene
ha_integration_type: hub
ha_dhcp: true
---

The [Velux](https://www.velux.com/) {% term integration %} for Home Assistant allows you to connect to a Velux KLF 200 interface, to control [io-homecontrol](http://www.io-homecontrol.com) devices like windows and blinds. The module allows you to start scenes configured within KLF 200.

At least firmware version > 2.0.0.0 is required on the KLF 200 device. The firmware images may be obtained from the [vendor's website](https://www.velux.com/klf200) and may be imported via the web interface of your KLF 200.

There is currently support for the following device types within Home Assistant:

- Binary sensor (reports rain detection for windows that support it)
- Button (Reboot button on the gateway device to reboot the KLF 200 gateway)
- Cover
- Light
- Scene

Rain sensors of supported windows do not report automatically and must be polled every 5 minutes. For this reason, they are disabled by default, because polling uses more radio bandwidth and battery power than simply reporting changed window positions.

## Prerequisites

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

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Unsupported Hardware

### Velux KLF 150

The Velux KLF 150 is not supported by this {% term integration %}, even though Velux markets it as the replacement for the now-discontinued KLF 200. Unlike the KLF 200, the KLF 150 does not provide a local API that Home Assistant can communicate with directly.

However, there is a community [project](https://github.com/uncaught/gpio-shutter-bridge) that bridges the KLF 150's GPIO interface with MQTT. Using this project with additional hardware, you can control your KLF 150 through the [MQTT Cover integration](/integrations/cover.mqtt/).

### Velux Active (KIX 300)

The Velux Active (KIX 300) set is not supported by this {% term integration %}. To integrate Velux Active (KIX 300) with Home Assistant, you can use the [HomeKit Controller](/integrations/homekit_controller) {% term integration %} and get full control over your windows, curtains, covers, the air quality sensor KLA 300, etc.

Add the Velux Active gateway using HomeKit pairing (with the pairing code on the sticker at the bottom of the Velux Active gateway) and the devices connected to the gateway - including sensors - will be automatically discovered and added to Home Assistant.

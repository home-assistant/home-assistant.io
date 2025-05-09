---
title: Velux
description: Instructions on how to integrate Velux KLF 200 integration with Home Assistant.
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
ha_domain: velux
ha_platforms:
  - cover
  - light
  - scene
ha_integration_type: integration
ha_dhcp: true
---

[Velux](https://www.velux.com/) {% term integration %} for Home Assistant allows you to connect to a Velux KLF 200 interface, to control [io-homecontrol](http://www.io-homecontrol.com) devices like windows and blinds. The module allows you to start scenes configured within KLF 200.

At least firmware version > 2.0.0.0 is required on the KLF 200 device. The firmware images may be obtained [here](https://www.velux.com/klf200) and may be imported via the webinterface of your KLF 200.

There is currently support for the following device types within Home Assistant:

- Cover
- Light
- Scene

{% include integrations/config_flow.md %}

During configuration, you will be asked for a hostname and password:

- Hostname: enter the IP address of the KLF 200 gateway.
- Password: enter the password of the gateway's wireless access point (printed on the underside - **not** the web login password).

You must complete the configuration within 5 minutes of rebooting the KLF 200 gateway while the access point is still available.

## Actions

### Action `velux.reboot_gateway`

Reboots the configured KLF 200 Gateway.

There is a problem with the KLF 200 gateway where the connection cannot be established after a restart of Home Assistant, only a manual power off and on fixes this.
As a workaround, you can use an automation to force a restart of the KLF 200 before exiting Home Assistant, like this:

```yaml
automation:
  - alias: "KLF reboot on hass stop event"
    description: "Reboots the KLF200 in order to avoid SSL Handshake issue"
    triggers:
      - trigger: homeassistant
        event: shutdown
    actions:
      - action: velux.reboot_gateway
```

## Velux Active (KIX 300)

The Velux Active (KIX 300) set is not supported by this {% term integration %}. To integrate Velux Active (KIX 300) with Home Assistant, you can use the [HomeKit Controller](/integrations/homekit_controller) {% term integration %} and get full control over your windows, curtains, covers, the air quality sensor KLA 300, etc.

Add the Velux Active gateway using HomeKit pairing (with the pairing code on the sticker at the bottom of the Velux Active gateway) and the devices connected to the gateway - including sensors - will be automatically discovered and added to Home Assistant.

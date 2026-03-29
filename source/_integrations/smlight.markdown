---
title: SMLIGHT SLZB
description: The SMLIGHT SLZB integration allows users to monitor and manage their SMLIGHT SLZB devices from directly within Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Infrared
  - Light
  - Sensor
  - Switch
  - Update
ha_release: 2024.9
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: smlight
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - infrared
  - light
  - sensor
  - switch
  - update
ha_codeowners:
  - '@tl-sl'
ha_integration_type: device
ha_dhcp: true
ha_quality_scale: silver
---

The [SMLIGHT](https://smlight.tech) SLZB Ethernet Zigbee coordinators provide a reliable and convenient way to integrate Zigbee devices into your smart home setup. By placing the Zigbee gateway closer to your devices, you can improve connectivity and reduce interference, avoiding the limitations of gateways hidden in cupboards or distant locations.

The **SMLIGHT SLZB** {% term integration %} allows you to monitor and manage your SLZB devices directly from Home Assistant. This integration provides direct access to many features available in the SLZB device's web UI, such as managing firmware updates, monitoring device health through diagnostic sensors, and controlling settings like LED modes or restarting the device. These features can also be incorporated into your automations for central control.

## Prerequisites

You need a supported SLZB adapter.

This integration has been tested with the following devices. Newer "U" variants of these models are also supported.

- [SLZB-06](https://smlight.tech/product/slzb-06)
- [SLZB-06M](https://smlight.tech/product/slzb-06m)
- [SLZB-06Mg24](https://smlight.tech/product/slzb-06mg24)
- [SLZB-06p7](https://smlight.tech/product/slzb-06p7)
- [SLZB-06p10](https://smlight.tech/product/slzb-06p10/)
- [SLZB-06Mg26](https://smlight.tech/global/slzb06mg26)

Multi radio devices - Additional entities will be created for the second Zigbee radio, including Zigbee firmware updates, temperature sensor, router reconnect button, and firmware type. (Note: the Zigbee restart and flash mode buttons are shared between both radios.) Requires core firmware `v2.8.x` or later.

- [SLZB-MR1](https://smlight.tech/product/slzb-mr1/)
- [SLZB-MR2](https://smlight.tech/product/slzb-mr2/)
- [SLZB-MR3](https://smlight.tech/product/slzb-mr3/)
- [SLZB-MR4](https://smlight.tech/product/slzb-mr4/)
- [SLZB-MR5](https://smlight.tech/product/slzb-mr5/)
- [SLZB-Ultima3](https://smlight.tech/global/slzb-ultima)

Core firmware on your SLZB device must be `v2.3.6` or newer. If you have an older `v2.x.x` version, you can update from within Home Assistant. If you have `v0.9.9`, update using the [SMLIGHT web flasher](https://smlight.tech/flasher/#SLZB-06) before installing this integration.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "Hostname or IP address of your SLZB device"
Username:
  description: "Username for web login to your SLZB device"
Password:
  description: "Password for web login to your SLZB device"
{% endconfiguration_basic %}

## Data Updates

The **SMLIGHT** {% term integration %} will poll for sensor updates every 5 minutes, except for the internet connectivity sensor which is checked every 15 minutes. Firmware updates for both core and Zigbee are checked once per day.

## Supported functionality

### Sensors

The following sensors will be created:

- **Core temperature** - Temperature of core ESP32
- **Zigbee temperature** - Temperature of Zigbee CC2652 or EFR32 chip
- **Core uptime** - Uptime of Core device
- **Zigbee uptime** - Uptime of Zigbee connection to ZHA/Z2M
- **RAM usage** - Monitor RAM usage
- **PSRAM usage** - Monitor PSRAM usage (U-devices only)
- **FS usage** - Monitor filesystem usage
- **Connection mode** -  Connection mode - Ethernet, Wi-Fi, or USB
- **Ethernet** - Ethernet connection status
- **Internet** - Internet connection status
- **VPN** - WireGuard VPN client connection status
- **Wi-Fi** - Wi-Fi connection status
- **Firmware channel** - Channel for updates, stable, or development firmware or currently installed firmware.
- **Zigbee type** - Current mode of Zigbee chip. Coordinator, router, or Thread. Only works with official firmware installed via OTA in SMLIGHT web UI.

### Buttons

The following buttons will be created:

- **Core restart** - Restart core ESP32
- **Zigbee restart** - Restart Zigbee CC2652 or EFR32 chip
- **Zigbee flash mode** - Trigger the Zigbee chip into bootloader flash mode so it can be flashed. It is possible to flash Zigbee firmware over a network socket once this is activated.
- **Reconnect Zigbee router** - Place the router into pairing mode to join a new Zigbee network. This is only created if the SLZB device is in Zigbee router mode.

### Switches

The following switches will be created:

- **Auto Zigbee update** - This allows the core firmware on SLZB to manage Zigbee firmware updates and it will automatically install updates when they are released.
- **Disable LEDs** - Disable all LEDs on the SLZB device.
- **LED night mode** - Enables night mode, which turns off the LEDs overnight, based on the times set in SLZB web UI.
- **Enable VPN** - Enable WireGuard VPN client (requires configuration via the SMLIGHT web UI).

Switches update in real-time if the settings are changed from the SLZB device web interface.

### Updates

The following update entities will be created:

- **Core firmware** - Core firmware updates of SLZB firmware
- **Zigbee firmware** - Firmware updates of Zigbee chip

The updates offered in Home Assistant will match your currently installed firmware. This is based on the firmware channel (dev, release) and for Zigbee also on the firmware type (coordinator, router, Thread). If you wish to switch channels, install the different firmware type in the SMLIGHT web UI. You will get notifications when new firmware updates are available to install.

### Peripherals

SLZB-Ultima devices support additional peripherals not found on other SLZB adapters, including an Ambilight LED strip, an infrared remote controller, and a buzzer. Support for these peripherals is being added progressively. The following entities are currently available.

#### Lights

- **Ambilight** - Controls the LED strip on the front of the Ultima device, including selecting built-in effects. The `color2`, `speed`, and `direction` properties used by some effects are not yet supported.

#### Infrared

- **IR Emitter**: This entity can be used by other integrations as an [Infrared](/integrations/infrared/) proxy to send IR commands through the SLZB-Ultima device. For example, you can use the [LG Infrared](/integrations/lg_infrared/) integration with this entity type to control your TV.
## Actions

The integration provides the following actions.

### Action: Play RTTTL tone

The `smlight.play_rtttl` action plays a Ring Tone Text Transfer Language (<abbr title="Ring Tone Text Transfer Language">RTTTL</abbr>) tone on the built-in buzzer of SMLIGHT Ultima devices. If you want to learn more about the tone format, refer to [Ring Tone Text Transfer Language](https://en.wikipedia.org/wiki/Ring_Tone_Text_Transfer_Language). You can find and preview example tones using the [RTTTL Player](https://1j01.github.io/rtttl.js/).

- **Data attribute**: `tone`
  - **Description**: The RTTTL format string to play.
  - **Optional**: No

```yaml
{% raw %}
action: smlight.play_rtttl
target:
  device_id: "{{ device_id('SLZB-Ultima3') }}"
data:
  tone: "Doorbell:d=4,o=5,b=100:e,c"
{% endraw %}
```

## Examples

### Play chime when front door opens

Uses the SMLIGHT Ultima buzzer to play a ding-dong doorbell chime when the front door is opened.

```yaml
alias: "Play chime when front door opens"
description: >
  Uses the SMLIGHT Ultima buzzer to play a
  ding-dong doorbell chime when the front door is opened.
triggers:
  - trigger: state
    entity_id: binary_sensor.front_door
    to: "on"
actions:
  - action: smlight.play_rtttl
    target:
      device_id: 1234567890abcdef1234567890abcdef
    data:
      tone: "Doorbell:d=4,o=5,b=100:e,c"
```

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Known Limitations

Certain advanced features are not supported directly within this integration and must be configured through the SLZB device's web UI:

- Switching the firmware update channel (for example, stable or development).
- Changing firmware modes (for example, Zigbee coordinator, Zigbee router, or OpenThread).
- Configuring security settings.
- Adjusting network settings.
- Setting up the WireGuard VPN client.

## Troubleshooting

- In the unlikely event you encounter issues after a firmware update, you can always downgrade the firmware to a previously stable version using the device's web UI.

- If you require access to the SLZB device over IPv6, this can be enabled on the device's web UI.

For any problems with the integration, [open an issue on GitHub][1] and include the device diagnostics from the SMLIGHT integration page. Including diagnostics will help identify and address the issue more efficiently.

[1]: https://github.com/home-assistant/core/issues/new?template=bug_report.yml

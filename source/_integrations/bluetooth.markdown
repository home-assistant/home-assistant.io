---
title: Bluetooth
description: Discover, connect, and monitor bluetooth devices.
ha_category:
  - Utility
ha_iot_class: Local Push
ha_release: 2022.8
ha_domain: bluetooth
ha_quality_scale: internal
ha_codeowners:
  - '@bdraco'
ha_integration_type: integration
ha_config_flow: true
ha_platforms:
  - diagnostics
---

The Bluetooth integration will detect nearby Bluetooth devices. Discovered devices will show up in the discovered section on the integrations page in the configuration panel.

{% include integrations/config_flow.md %}

## Configuration

While this integration is part of [`default_config:`](/integrations/default_config/) to enable automatic discovery of the Bluetooth Adapter, it will only be enabled by setting up the configuration flow, or manually adding it to your `configuration.yaml`.

```yaml
# Example configuration.yaml entry
bluetooth:
```

## D-Bus and BlueZ are required on Linux

For Bluetooth to function on Linux systems, the [D-Bus](https://en.wikipedia.org/wiki/D-Bus) socket must be accessible to Home Assistant. The Bluetooth adapter must be accessible to D-Bus and running [BlueZ](http://www.bluez.org/) >= 5.43.

- Home Assistant Operating System: no additional steps are required. Home Assistant OS version 8.4 or later is recommended for performance reasons.
- Home Assistant Container: The host system must run BlueZ, and the D-Bus socket must be accessible to Home Assistant **inside** the container.
- Home Assistant Supervised: The host system must run BlueZ, and the D-Bus socket must be accessible to Home Assistant **inside** the container.
- Home Assistant Core: The system must run BlueZ, and the D-Bus socket must be accessible to Home Assistant.

### Additional details for Container installs

{% details Making the DBus socket available in the Docker container %}

For most systems, the Dbus socket is in `/run/dbus`. The socket must be available in the container for Home Assistant to be able to connect to Dbus and access the Bluetooth adapter. When starting with `docker run`, this can be accomplished by adding `-v /run/dbus:/run/dbus:ro` to the command. If the Dbus socket is in `/var/run/dbus` on the host system, use `-v /var/run/dbus:/run/dbus:ro` instead.

{% enddetails %}

### Additional details for Container and Supervised installs

{% details Installing BlueZ %}

On Debian based host systems, the `sudo apt-get -y install bluez` command will install BlueZ.

{% enddetails %}

## Installing a USB Bluetooth Adapter

Some systems may not come with Bluetooth and require a USB adapter. Installing an adapter for the first time may require multiple restarts for the device to be fully recognized.

If you experience an unreliable Bluetooth connection, installing a short USB extension cable between your Bluetooth adapter and your Home Assistant server may improve reliability.

### Known working adapters

- ASUS USB-BT400 [BCM20702A1]
- ASUS USB-BT500 [RTL8761BU]
- Avantree DG45 [RTL8761BU]
- EDUP LOVE EP-B3536 [RTL8761BU] (Long Range)
- Kinivo BTD-400 [BCM20702A1]
- Maxuni BT-501 [RTL8761B]
- SUMEE BT501 [RTL8761B]
- UGREEN CM390 [RTL8761BU]
- XDO BT802 [RTL8761BU] (Long Range)
- ZEXMTE BT-505 [RTL8761BU] (Long Range)
- ZEXMTE BT-DG54 [RTL8761BU]

### Unsupported adapters

- tp-link UB400 [BCM20702A1] - Frequent connection failures with active connections
- tp-link UB500 [RTL8761BU] - Frequent connection failures with active connections

## Multiple adapters

Support for multiple local Bluetooth adapters is available on Linux systems only. Place adapters far enough away from each other to reduce interference.

The following methods are known to work to add multiple adapters:

- Long USB Extension cables
- USB-Ethernet extenders
- [USB/IP](http://usbip.sourceforge.net/)

Integrations that have followed the [Best practices for library authors](https://developers.home-assistant.io/docs/network_discovery?_highlight=bluetooth#best-practices-for-library-authors) will automatically connect via the adapter with the best signal and failover to an active adapter if one becomes unavailable.

## Passive Scanning

Passive Scanning on Linux can be enabled in the options flow per adapter if the host system runs BlueZ 4.63 or later with experimental features enabled.

Many integrations require active scanning and may not function when scanning is passive.

{% include integrations/option_flow.md %}

## Remote adapters

The Bluetooth integration supports receiving advertisement data from external adapters for devices and sensors that do not need an active connection. The number of remote scanners is limited only by the performance of the host system.

The following remote adapters are supported:

- [ESPHome](https://esphome.io)

### ESPHome requirements

Devices with an ESP32 chip running ESPHome must enable the `bluetooth_proxy` component and be added to Home Assistant before advertisements are forwarded.

```yaml
esp32_ble_tracker:
bluetooth_proxy:
```

Many integrations require an active scan for discovery. By default, the [ESPHome tracker](https://esphome.io/components/esp32_ble_tracker.html) runs in active mode. Adding ESPHome remotes that have active scanning disabled may cause some integrations to malfunction.

## Troubleshooting

### Integrations that require exclusive use of the Bluetooth Adapter

While newer integrations can share the Bluetooth Adapter, some legacy integrations require exclusive use of the adapter. Enabling this integration may prevent an integration that has not been updated to use newer methods from functioning.

Deleting the config entry for this integration will release control of the adapter and allow another integration to gain exclusive use of the Bluetooth adapter. If you have manually added `bluetooth:` to your `configuration.yaml`, you must also remove it to prevent the configuration from being recreated. Consider adding a second Bluetooth adapter on Linux systems if you need to continue using legacy integrations, as more integrations will move to use the Bluetooth integration in the future.

### Bluetooth interference with other devices

Devices that are using the 2.4 GHz band, like Wi-Fi, Zigbee, and USB3 devices (and their cable connections) are known to affect Bluetooth reception. Especially external SSD drives with USB3 cables are known to block the Bluetooth signal. Also, metal casings can decrease the Bluetooth performance of internal Bluetooth Adapters.

The following tips may improve reception of the Bluetooth Adapter:

- Try to place USB3 devices (SSD, etc.) as far away as possible from your Bluetooth Adapter, e.g., by using an extension cable.
- Use a USB3 extension cable with proper shielding and ferrite clamps.
- Use a (good quality) external Bluetooth adapter with an antenna.

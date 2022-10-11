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

## Requirements for Linux systems

For Bluetooth to function on Linux systems:

- The [D-Bus](https://en.wikipedia.org/wiki/D-Bus) socket must be accessible to Home Assistant. 
- The Bluetooth adapter must be accessible to D-Bus and running [BlueZ](http://www.bluez.org/) >= 5.43. It is highly recommended to use BlueZ >= 5.63 as older versions have been reported to be unreliable.
- The D-Bus implementation should be [dbus-broker](https://github.com/bus1/dbus-broker).
- The host system should be running Linux kernel 5.15.62 or later.

### Additional requirements by install method

- Home Assistant Operating System: Upgrade to Home Assistant OS version 9.0 or later.
- Home Assistant Container: The host system must run BlueZ, and the D-Bus socket must be accessible to Home Assistant **inside** the container.
- Home Assistant Supervised: The host system must run BlueZ, and the D-Bus socket must be accessible to Home Assistant **inside** the container.
- Home Assistant Core: The system must run BlueZ, and the D-Bus socket must be accessible to Home Assistant.

### Additional details for Container, Core, and Supervised installs

{% details Making the DBus socket available in the Docker container %}

For most systems, the Dbus socket is in `/run/dbus`. The socket must be available in the container for Home Assistant to be able to connect to Dbus and access the Bluetooth adapter. When starting with `docker run`, this can be accomplished by adding `-v /run/dbus:/run/dbus:ro` to the command. If the Dbus socket is in `/var/run/dbus` on the host system, use `-v /var/run/dbus:/run/dbus:ro` instead.

If you are using Docker Compose, add something like the following (adjust as necessary) to your `volumes` section:

```dockerfile
volumes:
  - /run/dbus:/run/dbus:ro
```

{% enddetails %}

{% details Switching from dbus-daemon to dbus-broker %}

Follow [the instructions](https://github.com/bus1/dbus-broker/wiki) to switch to dbus-broker.

{% enddetails %}

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
- Feasycom FSC-BP119 [CSR8510A10] (Long Range)
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

Integrations that have followed the [Best practices for library authors](https://developers.home-assistant.io/docs/bluetooth/?_highlight=Best+practices#best-practices-for-library-authors) will automatically connect via the adapter with the best signal and failover to an active adapter if one becomes unavailable.

## Passive Scanning

Passive Scanning on Linux can be enabled in the options flow per adapter if the host system runs BlueZ 5.63 or later with experimental features enabled.

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

Sources of interference for radios can lead to transmission/reception loss or connection problems and show symptoms such as errors/failures when sending and receiving Bluetooth messages that can cause significant degradation in performance. Below are some basic but essential tips for getting a good setup starting point to achieve better signal quality, coverage, and extended range.

Following all these optimization tips below should significantly improve the reception of your Bluetooth radio adapter. The below insights describe working around the well-known limitations of low-power 2.4 GHz digital radio. It can resolve or avoid many known issues caused by interference or poor placement of your Bluetooth radio adapter or devices.

Computers, peripherals, and devices generate [electromagnetic interference (also known as EMI/EMI/RMI)](https://en.wikipedia.org/wiki/Electromagnetic_interference), which can interfere with signals transmissions on the 2.4 GHz radio band frequency, and degrade the wireless communication with your Bluetooth adapter/devices.

For example, unshielded USB 3 port and their cables are especially infamously known to affect 2.4 GHz radio reception. Place your Bluetooth adapter far away as possible from any potential sources of EMI/EMI/RMI by using a long, adequately shielded USB extension cable.

#### Simple actions that should improve most Bluetooth setups and common root causes of interference

- Bluetooth adapter hardware:
  - Bad performance from old/outdated Bluetooth adapter hardware or poor Bluetooth adapter antenna:
    - Buy and use a supported Bluetooth USB adapter based on newer/modern chip hardware.
      - Consider a Bluetooth adapter that has an external antenna.
      - While older adapters might work, they could have obsolete hardware or old firmware, which prevents reliable operation.
  - Poor or outdated Bluetooth adapter firmware on the Bluetooth adapter:
    - Update to the latest Bluetooth chip firmware on the Bluetooth adapter. Updating firmware is usually straightforward if the manufacturer or the chip maker provides one.
- Bluetooth adapters are RFI sensitive and can be very susceptible to all types of EMI/EMF interference:
  - Poor placement of the Bluetooth adapter or wrong orientation of Bluetooth adapter antenna:
    - Use a long USB extension cable to place the Bluetooth adapter away from interference and obstacles.
      - Ensure the USB extension cable is adequately shielded (thick cables usually have this).
        - A USB extension cable makes orienting the Bluetooth adapter/antenna easier.
    - Try different physical placement and orientations of the Bluetooth adapter or its antenna:
      - The optimal placement of the Bluetooth adapter is close to the middle of the house as possible.
      - Try to place the Bluetooth adapter at some distance away from walls, ceilings, and floors.
      - Try different orientations of the adapter's external antenna (or whole Bluetooth adapter).
  - USB 3.0 ports/computers/peripherals are known culprits of RFI/EMI/EMF disruption. (See Ref. [1](https://www.usb.org/sites/default/files/327216.pdf) and [2](https://www.unit3compliance.co.uk/2-4ghz-intra-system-or-self-platform-interference-demonstration/)).
    - Make sure to only connect the Bluetooth USB adapter to a USB 2.0 port (and not to a USB 3.x port). 
      - If your computer only has a USB 3.x port then connect the adapter via a powered USB 2.0 hub:
        - A USB 2.0 hub will convert USB 3.0 to a USB 2.0 port and avoid USB 3.0 EMF.
          - A USB 2.0 hub that uses an external power supply will ensure power requirements are fulfilled.
    - Shield any unshielded computers/peripherals/devices by adding all-metal enclosures/chassis/casings.
      - Single-board-computers and USB 3.x hard drives are especially known as source of EMF/EMI/RFI.
        - Be aware metal casings can decrease the performance of internal/built-in Bluetooth adapters.
      - Also, be sure to use adequately shielded USB cables for any such peripherals/devices too.
  - 2.4 GHz RF Interference (RFI) from Wi-Fi Routers and Wi-Fi Access Points or other devices:
    - While Bluetooth is designed to coexist with Wi-Fi, its stronger signal can interfere.
      - To play it safe, try to place your Bluetooth adapter away from Wi-Fi access points.
    - Place Bluetooth adapters far away from electrical/power wires/cables, power supplies, and household appliances.

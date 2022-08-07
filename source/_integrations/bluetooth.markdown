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

- ASUS USB-BT400
- ASUS USB-BT500
- Avantree DG45
- Kinivo BTD-400
- Maxuni BT-501
- SUMEE BT501
- UGREEN CM390
- XDO BT802 (Long Range)
- ZEXMTE BT-505 (Long Range)
- ZEXMTE BT-DG54

### Unsupported adapters

- tp-link UB400 - Frequent connection failures
- tp-link UB500 - Frequent connection failures

{% include integrations/option_flow.md %}

### Multiple adapters

Support for multiple Bluetooth adapters is available on Linux systems only. Select the adapter you wish to use via the options flow on the integrations page. The adapter selection only affects integrations that use the Bluetooth integration interfaces.

## Integrations that require exclusive use of the Bluetooth Adapter

While newer integrations can share the Bluetooth Adapter, some legacy integrations require exclusive use of the adapter. Enabling this integration may prevent an integration that has not been updated to use newer methods from functioning.

Deleting the config entry for this integration will release control of the adapter and allow another integration to gain exclusive use of the Bluetooth adapter. If you have manually added `bluetooth:` to your `configuration.yaml`, you must also remove it to prevent the configuration from being recreated. Consider adding a second Bluetooth adapter on Linux systems if you need to continue using legacy integrations, as more integrations will move to use the Bluetooth integration in the future.

## Bluetooth interference with other devices

Poor signal quality or interference can lead to transmission loss or connection problems and show symptoms such as or errors when sending and/or receiving Bluetooth messages that will cause significant degradation in performance. Below are some basic tips for a good setup starting point to achieve better signal quality, coverage and range, as well as some fundamental background information on root causes.

Most important is to know that other devices that also broadcast on the 2.4 GHz radio band, like USB3 devices (and their cable connections), or other devices are known to affect Bluetooth radio reception. Especially external SSD drives with USB3 cables are known to block the Bluetooth signal. Also, metal casings can decrease the Bluetooth performance of internal Bluetooth Adapters. Recommendation is therefore to at least place USB3 devices and their cables (SSD, etc.) as far away as possible from your Bluetooth adapter, e.g., by using your Bluetooth adapter with a long extension cable that has proper shielding.

Following all theese essential optimization tips below can significantly improve reception of your Bluetooth radio adapter and may resolve or avoid many known issues caused by a bad setup your Bluetooth radio adapter or devices. At the very least taking these actions should improve most message transmitting and receiving issues caused by not knowing the basics needed to workaround related to low-power 2.4 GHz digital radio limitations.

#### Simple actions that should improve most Bluetooth setups

- Bluetooth adapter hardware:
  - Buy and use a (good quality) Bluetooth USB adapter based on a newer/modern chip hardware.
    - If possible consider buying or upgrading to a Bluetooth adapter that has an external antenna. 
    - While older adapters might work they could have obsolete hardware and/or firmware.
  - Update to a later released Bluetooth chip firmware on the Bluetooth adapter.
    - Updating firmware is easy if one is provide by by the manufacturer or the chip maker.
- Bluetooth devices are RFI sensitive and can be susceptible to all types of EMI/EMF interference:
  - Use a long USB extension cable to place Bluetooth away from interference and obstacles.
    - Try to make sure the USB extension cable has proper shielded (thick cables usually do).
    - Make sure the extension cable has proper shielding and ferrite clamps
    - Longer USB extension cable also make it easier to orient Bluetooth and antenna.
  - Only connect the Bluetooth USB adapter to a USB 2.0 ports (or via a powered USB 2.0 hub). 
    - USB 3.0 ports/peripherals are infamously known to cause EMI/EMF interference.
  - Shield close unshielded computers and unshielded peripherals by using metal enclosures/chassis.
    - Single-board-computers and USB hard drives are especially known as source of EMI/EMF.
  - Try different physical placement and orientations of Bluetooth adapter or its antenna.
    - Optimal placement of Bluetooth adapter is as much in middle of the house as possible.
    - Try to place the Bluetooth adapter at some distance way from walls, ceilings and floors.
    - Try different orientations of the adapters external antenna (or whole Bluetooth adapter).

#### Understanding common root causes of problems in Bluetooth radio setups

- Bluetooth adapter hardware:
  - Poor placement of the Bluetooth adapter and/or wrong orientation of Bluetooth adapter antenna.
  - Old, outdated Bluetooth adapter hardware or poor Bluetooth adapter antenna.
  - Poor or outdated Bluetooth adapter firmware on the Bluetooth adapter.
-  Bluetooth adapters and Bluetooth devices sensitive to all types of RFI/EMI/EMF interference:
  - Electromagnetic interference (EMI) from electronics caused by Electromagnetic Fields (EMF).
  - USB 3.0 ports and computer peripherals are known culprits of EMI/EMF disrupting. Ref. [1](https://www.usb.org/sites/default/files/327216.pdf) and [1](https://www.unit3compliance.co.uk/2-4ghz-intra-system-or-self-platform-interference-demonstration/).
  - 2.4 GHz Radio Frequency Interference (RFI) from Wi-Fi Routers and Wi-Fi Access Points, or others.
  - While unsual as Bluetooth is designed to coexist with Wi-Fi, their stronger signal can interfere.
  - To play it safe best is to try to place your Bluetooth adapter awasy from Wi-Fi access-points.

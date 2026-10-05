---
title: USB Discovery
description: Discover usb devices on the host.
ha_category:
  - Utility
ha_iot_class: Local Push
ha_release: 2021.9
ha_domain: usb
ha_quality_scale: internal
ha_codeowners:
  - '@bdraco'
ha_integration_type: system
---

The **USB Discovery** {% term integration %} detects supported USB devices that can be discovered by Home Assistant integrations. Devices that match a supported integration appear in the **Discovered** section on {% my integrations title="**Settings** > **Devices & services**" %}.

This integration does not manage USB storage devices. To use a USB-attached drive, such as an SSD or HDD, as storage with {% term "Home Assistant Operating System" %}, see [using an external data disk](/common-tasks/os/#using-external-data-disk).

- On all supported systems, devices are detected during startup.
- On Linux systems that have functional `udev` support, including Home Assistant Operating System, devices are detected as soon as they are plugged in.
- On non-Linux systems or systems without `udev` support, devices are detected when visiting the integrations page and during onboarding.

The USB Discovery integration also provides the **Serial** panel under **Settings** > **Connectivity**. This panel lists all serial ports that Home Assistant can reach. This includes USB devices, but also serial ports that are built into your system or shared over your network.

## Viewing your serial ports

You can see all the serial ports on your system in one place from the **Serial** configuration panel. This is also where you look up the device path of a port, for example, when an integration asks for it during setup.

1. Go to **Settings** > **Connectivity** > **Serial**.
   - At the top, a status summary shows how many of your connected ports are in use, and whether any ports are disconnected.
   - The ports are grouped into three lists:
      - **Connected**: ports that are used by at least one integration or {% term app %}.
      - **Available**: ports that are connected, but not used by any integration or {% term app %}.
      - **Disconnected**: ports that an integration or {% term app %} uses, but that are currently not connected.
   - If Home Assistant did not find any serial ports, the panel shows **No serial ports found** instead.
   - To look for ports again, for example after plugging in a USB-to-serial adapter, select **Refresh** {% icon "mdi:refresh" %} in the top right corner.

   {% tip %}
   Serial ports that are only used by [serial sensors](/integrations/serial/) configured in your {% term "`configuration.yaml`" %} are not tracked as consumers, so they appear in the **Available** rather than the **Connected** section.
   {% endtip %}
2. Under each port, you see what it is used for:
   - Every integration and {% term app %} that uses the port is listed below it. Select one to go to its settings. An integration or app that is not running at the moment is marked as **not running**.
   - **Discovered by**: names the integration that recognized the device on this port and is ready to set it up. Select this line to start the setup.
   - **Can be used with**: lists the integrations that support the device on this port. This appears only for a port that is not in use yet.
3. To view more details about a port, select **Port information** {% icon "mdi:information-outline" %} next to it. The **Port information** dialog shows the device path, together with details such as the description, manufacturer, and serial number of the device. This option is available for ports that are currently connected.
   - To use the port with an integration that asks for a device path, such as [Zigbee Home Automation](/integrations/zha/) or the [Serial](/integrations/serial/) sensor, copy the value of the **Device** field. For example, `/dev/ttyAMA0`.

### About the serial ports panel

The **Serial** panel under **Settings** > **Connectivity** can list the following types of serial ports:

- **USB**: a device that is connected to a USB port, such as a USB-to-serial adapter.
- **Built-in**: a serial port that is part of your system's hardware. For example, the Zigbee radio on [Home Assistant Yellow](/yellow/).
- **Serial proxies**: a serial port that an [ESPHome](/integrations/esphome/) device shares over your network. These ports are listed alongside the ports that are connected to your system, so you can use them the same way. For more information, refer to [serial proxy](/integrations/serial/#serial-proxy).
- **Integration-provided**: a serial port that is addressed with a URL instead of a device path, such as a port on a remote system that you expose with `ser2net` or `socat`.
- **Other**: a serial port that Home Assistant cannot identify any further.

## Configuration

This {% term integration %} is part of [`default_config:`](/integrations/default_config/). If you have opted not to use [`default_config:`](/integrations/default_config/), you can add this {% term integration %} by adding the following lines to your {% term "`configuration.yaml`" %}:

```yaml
# Example configuration.yaml entry
usb:
```

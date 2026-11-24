---
description: Discover usb devices on the host.
ha_release: 2021.9
ha_domain: usb
---

The **USB Discovery** {% term integration %} detects supported USB devices that can be discovered by Home Assistant integrations. Devices that match a supported integration appear in the **Discovered** section on {% my integrations title="**Settings** > **Devices & services**" %}.

This integration does not manage USB storage devices. To use a USB-attached drive, such as an SSD or HDD, as storage with {% term "Home Assistant Operating System" %}, see [using an external data disk](/common-tasks/os/#using-external-data-disk).

- On all supported systems, devices are detected during startup.
- On Linux systems that have functional `udev` support, including Home Assistant Operating System, devices are detected as soon as they are plugged in.
- On non-Linux systems or systems without `udev` support, devices are detected when visiting the integrations page and during onboarding.

The USB Discovery integration also provides the **Serial** panel under **Settings** > **Connectivity**. This panel lists serial ports that Home Assistant detects or tracks through an integration or {% term app %}. This includes USB devices, but also serial ports that are built into your system or shared over your network. For details about this panel, refer to [Viewing your serial ports](/connectivity/serial/#viewing-your-serial-ports).

## Configuration

This {% term integration %} is part of [`default_config:`](/integrations/default_config/). If you have opted not to use [`default_config:`](/integrations/default_config/), you can add this {% term integration %} by adding the following lines to your {% term "`configuration.yaml`" %}:

```yaml
# Example configuration.yaml entry
usb:
```

---
title: Bluetooth Tracker
description: Instructions for integrating Bluetooth tracking within Home Assistant.
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_release: 0.18
ha_domain: bluetooth_tracker
ha_platforms:
  - device_tracker
ha_integration_type: integration
ha_quality_scale: legacy
---

This tracker discovers new devices on boot and tracks Bluetooth devices periodically based on `interval_seconds` value. It is not required to pair the devices with each other! Devices discovered are stored with 'bt_' as the prefix for device MAC addresses in `known_devices.yaml`.

{% details "Notes for Home Assistant Core Installations" %}

This platform requires `pybluez` to be installed. On Debian based installs, run

```bash
sudo apt install bluetooth libbluetooth-dev
```

{% enddetails %}

To use the Bluetooth tracker in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: bluetooth_tracker
```

{% configuration %}
request_rssi:
  description: Performs a request for the "Received signal strength indication" (RSSI) of each tracked device.
  required: false
  type: boolean
  default: false
device_id:
  description: The ID of the Bluetooth adapter to be used by the tracker, e.g., use `0` for `hci0`, `1` for `hci1`, and so on.
  required: false
  type: integer
  default: "`-1` (The first available Bluetooth adapter)"
{% endconfiguration %}

In some cases it can be that your device is not discovered. In that case let your phone scan for Bluetooth devices while you restart Home Assistant. Just hit `Scan` on your phone all the time (or keep the Bluetooth device view open on an iOS device) until Home Assistant is fully restarted and the device should appear in `known_devices.yaml`.

The integration will try to create an entity using the device name that is detected. If such an entity already exists (for example because you are already using the [Companion App](https://companion.home-assistant.io/) for this device) no entity will be created and the log file will show an error that the `The see action is not supported for this entity device_tracker.device` (as it is not a `device_tracker` entity). You can rename the other conflicting entity, next time the device is detected a new entity with the same name will be created.

For additional configuration variables check the [Device tracker page](/integrations/device_tracker/).

## `bluetooth_tracker.update` action

The `bluetooth_tracker.update` action can be used to manually trigger a Bluetooth scan. An example of when this action can be useful is to trigger scans based on other events like doors being opened, beacons are in range or buttons are pressed.

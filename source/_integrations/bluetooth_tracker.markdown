---
title: Bluetooth Tracker
description: Instructions for integrating Bluetooth tracking within Home Assistant.
ha_category:
  - Presence Detection
ha_iot_class: Local Polling
ha_release: 0.18
ha_domain: bluetooth_tracker
ha_platforms:
  - device_tracker
---

This tracker discovers new devices on boot and tracks Bluetooth devices periodically based on `interval_seconds` value. It is not required to pair the devices with each other! Devices discovered are stored with 'bt_' as the prefix for device MAC addresses in `known_devices.yaml`.

{% details "Notes for Home Assistant Core Installations" %}

This platform requires `pybluez` to be installed. On Debian based installs, run

```bash
sudo apt install bluetooth libbluetooth-dev
```

{% enddetails %}

To use the Bluetooth tracker in your installation, add the following to your `configuration.yaml` file:

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

In some cases it can be that your device is not discovered. In that case let your phone scan for Bluetooth devices while you restart Home Assistant. Just hit `Scan` on your phone all the time until Home Assistant is fully restarted and the device should appear in `known_devices.yaml`.

For additional configuration variables check the [Device tracker page](/integrations/device_tracker/).

## `bluetooth_tracker.update` service

The `bluetooth_tracker.update` service can be used to manually trigger a Bluetooth scan. An example of when this service can be useful is to trigger scans based on other events like doors being opened, beacons are in range or buttons are pressed.

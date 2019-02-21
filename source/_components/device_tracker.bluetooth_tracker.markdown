---
layout: page
title: "Bluetooth Tracker"
description: "Instructions for integrating Bluetooth tracking within Home Assistant."
date: 2016-04-10 17:24
sidebar: true
comments: false
sharing: true
footer: true
logo: bluetooth.png
ha_category: Presence Detection
ha_iot_class: "Local Polling"
ha_release: 0.18
---

This tracker discovers new devices on boot and tracks Bluetooth devices periodically based on `interval_seconds` value. It is not required to pair the devices with each other! Devices discovered are stored with 'bt_' as the prefix for device MAC addresses in `known_devices.yaml`.

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
  description: The ID of the bluetooth adapter to be used by the tracker, e.g., use `0` for `hci0`, `1` for `hci1`, and so on.
  required: false
  type: integer
  default: "`-1` (The first available bluetooth adapter)"
{% endconfiguration %}

In some cases it can be that your device is not discovered. In that case let your phone scan for Bluetooth devices while you restart Home Assistant. Just hit `Scan` on your phone all the time until Home Assistant is fully restarted and the device should appear in `known_devices.yaml`.

For additional configuration variables check the [Device tracker page](/components/device_tracker/).

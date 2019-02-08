---
layout: page
title: "Google Home"
description: "Instructions on how to connect to your Google Home device."
date: 2018-11-04 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: google_home.png
ha_release: 0.88
ha_category:
  - Hub
  - Presence Detection
  - Sensor
ha_iot_class: "Local Polling"
redirect_from:
  - /components/device_tracker.googlehome/
---

The `googlehome` component allows you to connect to your Google Home device using an [unofficial Google Home API][googlehomeapi].

This component will provide:
- [device_tracker](/components/device_tracker/) platform to track nearby bluetooth devices;
- [sensor](/components/sensor/) platform to track the alarms and the timers.

## {% linkable_title Configuration %}

To integrate the `googlehome` component in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
googlehome:
  devices:
    - host: IP_ADDRESS
```

{% configuration %}
devices:
  description: A list of Google Home devices.
  required: true
  type: list
  keys:
    host:
      description: The IP address of the Google Home device.
      required: true
      type: string
    rssi_threshold:
      description: The threshold for the RSSI signal of the device.
      required: false
      default: -70
      type: integer
    device_types:
      description: Device types that will be tracked [see device types](#device_types), by default all types are tracked.
      required: false
      type: list
    track_alarms:
      description: Setting to tell the component to track the alarms of the device.
      required: false
      type: boolean
      default: false
{% endconfiguration %}

## {% linkable_title Device types %}

Device type | Description
-- | --
1 | Classic - BR/EDR devices
2 | Low Energy - LE-only
3 | Dual Mode - BR/EDR/LE

## {% linkable_title Notes %}

Devices will appear in the format `devicetracker.<home hub ip>_<device mac address>`. Note that dots are removed from the IP and BT MAC addresses.

[googlehomeapi]: https://rithvikvibhu.github.io/GHLocalApi/
[devicetrackerconfig]: /components/device_tracker/#configuring-a-device_tracker-platform

---
title: "Google Home"
description: "Instructions on how to connect to your Google Home device."
logo: google_home.png
ha_release: 0.88
ha_category:
  - Hub
  - Presence Detection
  - Sensor
ha_iot_class: Local Polling
redirect_from:
  - /components/device_tracker.googlehome/
---

<div class='note warning'>

  This integration is currently broken and will be removed in a future version of home assistant. See [this pull request](https://github.com/home-assistant/home-assistant/pull/26035) for more information. As an alternative to the device tracking features of this component check out [this thread in the home assistant community forums](https://community.home-assistant.io/t/monitor-reliable-multi-user-distributed-bluetooth-occupancy-presence-detection/68505). No alternatives for the alarm tracking features of this component are known at this time.

</div>

The `googlehome` integration allows you to connect to your Google Home device using an [unofficial Google Home API][googlehomeapi].

This integration will provide:
- [device_tracker](/components/device_tracker/) platform to track nearby bluetooth devices;
- [sensor](/components/sensor/) platform to track the alarms and the timers.

## Configuration

To integrate the `googlehome` integration in Home Assistant, add the following section to your `configuration.yaml` file:

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
      description: Setting to tell the integration to track the alarms of the device.
      required: false
      type: boolean
      default: false
    track_devices:
      description: Setting to tell the integration to track nearby devices.
      required: false
      type: boolean
      default: true
{% endconfiguration %}

## Device types

Device type | Description
-- | --
1 | Classic - BR/EDR devices
2 | Low Energy - LE-only
3 | Dual Mode - BR/EDR/LE

## Notes

Devices will appear in the format `device_tracker.<home hub ip>_<device mac address>`. Note that dots are removed from the IP and BT MAC addresses.

[googlehomeapi]: https://rithvikvibhu.github.io/GHLocalApi/
[devicetrackerconfig]: /components/device_tracker/#configuring-a-device_tracker-platform

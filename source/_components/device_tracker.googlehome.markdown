---
layout: page
title: "Google Home Bluetooth tracker"
description: "Instructions on how to use Google Home to track devices in Home Assistant."
date: 2018-11-04 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: google_home.png
ha_release: 0.83
ha_category: Presence Detection
ha_iot_class: "Local Polling"
---

The `googlehome` platform allows you to detect presence using an [unofficial Google Home API][googlehomeapi].

## {% linkable_title Configuration %}

To integrate Google Home Bluetooth tracker in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: googlehome
    host: IP_ADDRESS
```

{% configuration %}
host:
  description: The IP address of the Google Home unit.
  required: true
  type: string
rssi_threshold:
  description: The threshold for the RSSI signal of the device.
  required: false
  default: -70
  type: integer
{% endconfiguration %}

## {% linkable_title Usage %}

Devices will appear in the format `devicetracker.<home hub ip>_<device mac address>`. Note that dots are removed from the IP and BT MAC addresses.

After running this component for a little while, you will likely see many devices appear. It's advisable to set the configuration to not discover new devices once the device you want to track have appeared (see [device tracker configuration][devicetrackerconfig] for details).

[googlehomeapi]: https://rithvikvibhu.github.io/GHLocalApi/
[devicetrackerconfig]: /components/device_tracker/#configuring-a-device_tracker-platform

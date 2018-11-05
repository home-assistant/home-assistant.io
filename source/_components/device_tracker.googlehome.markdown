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

To integrate Google Home bluetooth tracker in Home Assistant, add the following section to your `configuration.yaml` file:

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
  description: The threshold for the rssi signal of the device.
  required: false
  default: -70
  type: integer
{% endconfiguration %}

[googlehomeapi]: https://rithvikvibhu.github.io/GHLocalApi/
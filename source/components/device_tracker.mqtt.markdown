---
layout: page
title: "MQTT device tracker support"
description: "Instructions how to integrate MQTT based trackers into Home Assistant."
date: 2015-09-17 09:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/mqtt.png' class='brand pull-right' />
Before this tracker allows the detection of devices which are able to send MQTT messages.

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: mqtt
  qos: 1
  devices:
    paulus_oneplus: /location/paulus
    annetherese_n4: /location/annetherese
```

Configuration variables:

- **qos** (*Required*): Quality of service, default to 0.
- **devices** (*Required*): Array of devices to track.
  - **'device_name'** (*Required*): Name to use followed by the topic.

See the [device tracker component page](/components/device_tracker.html) for instructions how to configure the people to be tracked.

---
layout: page
title: "MQTT Device Tracker"
description: "Instructions how to use MQTT to track devices in Home Assistant."
date: 2015-09-19 20:41
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Presence Detection
ha_iot_class: depends
---


The `mqtt` device tracker platform allows you to detect presence by monitoring an MQTT topic for new locations. To use this platform, you specify a unique topic for each device.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: mqtt
    devices:
      paulus_oneplus: 'location/paulus'
      annetherese_n4: 'location/annetherese'
```

Configuration variables:

- **devices** (*Required*): List of devices with their topic.
- **qos** (*Optional*): The QoS level of the topic.


Example JSON you can publish to the topic (e.g. via mqtt.publish service):

```json
{
  "topic": "/location/paulus",
  "payload": "home"
}
```

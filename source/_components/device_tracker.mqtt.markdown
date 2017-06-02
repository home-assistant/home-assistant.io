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
---


The `mqtt` device tracker platform allows you to detect presence by monitoring an MQTT topic for new locations. To use this platform, you specify a unique topic for each device.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: mqtt
    devices:
      paulus_oneplus: location/paulus
      annetherese_n4: location/annetherese
```

Configuration variables:

- **devices** (*Required*): List of devices with their topic.
- **qos** (*Optional*): The QoS level of the topic.

This platform allows for two different types of MQTT payloads. The first one is a plain text containing the name of the location. For example, you can publish the following JSON formatted message to the topic (e.g. via mqtt.publish service):

```json
{
  "topic": "location/paulus",
  "payload": "home"
}
```
The second type of payload is a JSON formatted string containing GPS information, for example:
```
{'lon': 1.0,'acc': 60,'lat': 2.0,'batt': 99.9}
```
where `lon` is the longitude, `lat` is the latitude, `acc` is the accuracy in meters, `batt` is the current battery level of the device sending the update.
`lon` and `lat` are required keys, `acc` and `batt` are optional.

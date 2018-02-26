---
layout: page
title: "MQTT Room Presence"
description: "Instructions on how to track room presence within Home Assistant."
date: 2016-08-21 03:58
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Presence Detection
ha_release: 0.27
ha_iot_class: depends
---


The `mqtt_room` sensor platform allows you to detect the indoor location of devices using MQTT clients.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: mqtt_room
  device_id: 123testid
  name: 'Cool device'
  state_topic: 'room_presence'
  timeout: 5
  away_timeout: 60
```

Configuration variables:

- **device_id** (*Required*): The device id to track for this sensor.
- **name** (*Optional*): The name of the sensor.
- **state_topic** (*Optional*): The topic that contains all subtopics for the rooms.
- **timeout** (*Optional*): The time in seconds after which a room presence state is considered old. An example: device1 is reported at scanner1 with a distance of 1. No further updates are sent from scanner1. After 5 seconds scanner2 reports device1 with a distance of 2. The old location info is discarded in favor of the new scanner2 information as the timeout has passed.
- **away_timeout** (*Optional*): The time in seconds after which the state should be set to `not_home` if there were no updates. `0` disables the check and is the default.

Example JSON that should be published to the room topics:

```json
{
  "id": "123testid",
  "name": "Test Device",
  "distance": 5.678
}
```

### {% linkable_title Setting up clients %}

This component works with any software that is sending data in the given format.
Each client should post the discovered devices in its own subtopic of the configured topic.
Instead of developing your own application, you can also use any of these already existing clients:

- [**room-assistant**](https://github.com/mKeRix/room-assistant): looks for Bluetooth LE beacons, based on Node.js
- [**Happy Bubbles Presence Server**](https://github.com/happy-bubbles/presence): presence detection server for Happy Bubbles BLE-scanning devices, based on Go

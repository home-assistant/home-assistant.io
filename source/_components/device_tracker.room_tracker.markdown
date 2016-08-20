---
layout: page
title: "Room Presence Tracker"
description: "Instructions on how to track room presence in Home Assistant."
date: 2016-08-20 23:29
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Presence Detection
---


The `room_tracker` platform allows you to detect the indoor location of devices using MQTT clients.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: room_tracker
  topic: room_presence
  timeout: 5
```

Configuration variables:

- **topic** (*Optional*): The topic that contains all subtopics for the rooms.
- **timeout** (*Optional*): The time in seconds after which a room presence state is considered old. An example: device1 is reported at scanner1 with a distance of 1. No further updates are sent from scanner1. After 5 secoonds scanner2 reports device with a distance of 2. The old location info is discarded in favor of the new scanner2 information as the timeout has passed.


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

### {% linkable_title Using with Owntracks %}
Since this tracker utilizes the `mac` field of the `known_devices.yaml` you can use it in combination with Owntracks, you simply need to modify the Owntracks device accordingly.
The source that reported last will be used to determine the overall state.
This allows you to track the device accuractely outdoors as well as indoors.
More details about this config can found in [device tracker](/components/device_tracker/).

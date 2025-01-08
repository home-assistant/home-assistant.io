---
title: MQTT room presence
description: Instructions on how to track room presence within Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.27
ha_iot_class: Local Push
ha_domain: mqtt_room
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `mqtt_room` sensor {% term integration %} allows you to detect the indoor location of devices using MQTT clients.

## Configuration

To use this device tracker in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mqtt_room
    device_id: 123testid
    state_topic: "espresense/devices/123testid"
```

{% configuration %}
away_timeout:
  description: The time in seconds after which the state should be set to `not_home` if there were no updates. `0` disables the check.
  required: false
  default: 0
  type: integer
device_id:
  description: The device id to track for this sensor.
  required: true
  type: string
name:
  description: The name of the sensor.
  required: false
  default: Room Sensor
  type: string
state_topic:
  description: The topic that contains all subtopics for the rooms.
  required: true
  type: string
timeout:
  description: "The time in seconds after which a room presence state is considered old. An example: device1 is reported at scanner1 with a distance of 1. No further updates are sent from scanner1. After 5 seconds scanner2 reports device1 with a distance of 2. The old location info is discarded in favor of the new scanner2 information as the timeout has passed."
  required: false
  default: 5
  type: integer
unique_id:
  description: "An ID that uniquely identifies this room sensor. If two sensors have the same unique ID, Home Assistant will raise an exception."
  required: false
  type: string
{% endconfiguration %}

## Usage

Example JSON that should be published to the room topics:

```json
{
  "id": "123testid",
  "name": "Test Device",
  "distance": 5.678
}
```

### Setting up clients

This integration works with any software that is sending data in the given format. Each client should post the discovered devices in its own subtopic of the configured topic.
Instead of developing your own application, you can also use any of these already existing clients:

- [**ESPresense**](https://github.com/ESPresense/ESPresense): Fork of ESP32-MQTT-room w/ fingerprinting, tile support, Kalman filter, based on C++/Platformio
- [**ESP-32-BLE-Scanner for Home Assistant**](https://github.com/HeimdallMidgard/ESP-32-BLE-Scanner): ESP32 based BLE presence detection for Home Assistant with web GUI
- [**room-assistant**](https://github.com/mKeRix/room-assistant): looks for Bluetooth LE beacons, based on Node.js
- [**Happy Bubbles Presence Server**](https://github.com/happy-bubbles/presence): presence detection server for Happy Bubbles BLE-scanning devices, based on Go
- [**ESP32-MQTT-room**](https://jptrsn.github.io/ESP32-mqtt-room/): runs on an ESP32, and looks for Bluetooth LE devices, based on C++/Arduino
- [**OpenMQTTGateway**](https://github.com/1technophile/OpenMQTTGateway): uses ESP32 Bluetooth Low Energy to scan BLE Broadcaster like smart watches/bands and much more to get sensor values

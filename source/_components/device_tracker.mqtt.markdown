---
title: "MQTT Device Tracker"
description: "Instructions on how to use MQTT to track devices in Home Assistant."
logo: mqtt.png
ha_category:
  - Presence Detection
ha_iot_class: Configurable
ha_release: 0.7.3
---


The `mqtt` device tracker platform allows you to detect presence by monitoring an MQTT topic for new locations. To use this platform, you specify a unique topic for each device.

## Configuration

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: mqtt
    devices:
      paulus_oneplus: 'location/paulus'
      annetherese_n4: 'location/annetherese'
```

{% configuration %}
devices:
  description: List of devices with their topic.
  required: true
  type: list
qos:
  description: The QoS level of the topic.
  required: false
  type: integer
payload_home:
  description: The payload that represents the home state for the device.
  required: false
  type: string
  default: 'home'
payload_not_home:
  description: The payload that represents the not home state for the device.
  required: false
  type: string
  default: 'not_home'
payload_other_zones:
  description: List of payloads with the zones they correspond to. This parameter allows the device tracker to maintain states for other zones aside from 'home' and 'not_home' when the payload value does not match the zone name.
  required: false
  type: list
{% endconfiguration %}

## Complete example configuration

```yaml
# Complete configuration.yaml entry
device_tracker:
  devices:
    paulus_oneplus: 'location/paulus'
    annetherese_n4: 'location/annetherese'
  qos: 1
  payload_home: 'present'
  payload_not_home: 'not present'
  payload_other_zones:
    work1: 'work_paulus'
    work2: 'work_annetherese'
```

## Usage

Example JSON you can publish to the topic (e.g., via mqtt.publish service):

```json
{
  "topic": "location/paulus",
  "payload": "home"
}
```

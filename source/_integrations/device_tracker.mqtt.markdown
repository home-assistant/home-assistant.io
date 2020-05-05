---
title: "MQTT Device Tracker"
description: "Instructions on how to use MQTT to track devices in Home Assistant."
ha_category:
  - Presence Detection
ha_iot_class: Configurable
ha_release: 0.7.3
ha_domain: mqtt
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
  description: The payload value that represents the 'home' state for the device.
  required: false
  type: string
  default: 'home'
payload_not_home:
  description: The payload value that represents the 'not_home' state for the device.
  required: false
  type: string
  default: 'not_home'
source_type:
  description: Attribute of a device tracker that affects state when being used to track a [person](/integrations/person/). Valid options are `gps`, `router`, `bluetooth`, or `bluetooth_le`.
  required: false
  type: string
{% endconfiguration %}

## Complete example configuration

```yaml
# Complete configuration.yaml entry
device_tracker:
  - platform: mqtt
    devices:
      paulus_oneplus: 'location/paulus'
      annetherese_n4: 'location/annetherese'
    qos: 1
    payload_home: 'present'
    payload_not_home: 'not present'
    source_type: bluetooth
```

## Usage

Example JSON you can publish to the topic (e.g., via mqtt.publish service):

```json
{
  "topic": "location/paulus",
  "payload": "home"
}
```

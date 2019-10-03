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
    payload_custom:
      present: home
      not present: not_home
```

{% configuration %}
devices:
  description: A dictionary where the keys are devices and the values are their corresponding topic.
  required: true
  type: map
qos:
  description: The QoS level of the topic.
  required: false
  type: integer
payload_custom:
  description: A dictionary where the keys are payloads and the values are the corresponding locations that should be set for the device when the given payload is published to a device topic. This parameter should be used when the device or application that is publishing MQTT device tracker updates is not sending values that HomeAssistant will natively recognize (e.g. `home`, `not_home`, and any custom zones you have defined).
  required: false
  type: map
{% endconfiguration %}

## Usage

Example JSON you can publish to the topic (e.g., via mqtt.publish service):

```json
{
  "topic": "location/paulus",
  "payload": "home"
}
```

---
title: MQTT JSON
description: Instructions on how to use MQTT JSON to track devices in Home Assistant.
ha_category:
  - Presence detection
ha_iot_class: Local Push
ha_release: 0.44
ha_domain: mqtt_json
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `mqtt_json` device tracker {% term integration %} allows you to detect presence by monitoring an MQTT topic for new locations. To use this platform, you specify a unique topic for each device.

## Configuration

To use this device tracker in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: mqtt_json
    devices:
      paulus_oneplus: location/paulus
      annetherese_n4: location/annetherese
```

{% configuration %}
devices:
  description: List of devices with their topic.
  required: true
  type: list
qos:
  description: The QoS level of the topic.
  required: false
  type: string
{% endconfiguration %}

## Usage

This platform receives JSON formatted payloads containing GPS information, for example:

```json
{"longitude": 1.0,"gps_accuracy": 60,"latitude": 2.0,"battery_level": 99.9}
```

Where `longitude` is the longitude, `latitude` is the latitude, `gps_accuracy` is the accuracy in meters, `battery_level` is the current battery level of the device sending the update.
`longitude` and `latitude` are required keys, `gps_accuracy` and `battery_level` are optional.

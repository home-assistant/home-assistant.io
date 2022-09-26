---
title: Volkszaehler
description: Instructions on how to integrate Volkszaehler sensors into Home Assistant.
ha_category:
  - System Monitor
ha_iot_class: Local Polling
ha_release: 0.78
ha_domain: volkszaehler
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `volkszaehler` sensor platform is consuming the system information provided by the [Volkszaehler](https://wiki.volkszaehler.org/) API.

## Configuration

To enable the Volkszaehler sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: volkszaehler
    uuid: DEVICE_UUID
```

{% configuration %}
uuid:
  description: The UUID of the device to track.
  required: true
  type: string
host:
  description: The IP address of the host where Volkszaehler is running.
  required: false
  type: string
  default: localhost
port:
  description: The port where Volkszaehler is listening.
  required: false
  type: integer
  default: 80
name:
  description: The prefix for the sensors.
  required: false
  type: string
  default: Volkszaehler
monitored_conditions:
  description: Entries to monitor.
  required: false
  type: list
  default: average
  keys:
    average:
      description: The average power.
    consumption:
      description: The power consumption.
    max:
      description: The maximum power.
    min:
      description: The minimum power.
{% endconfiguration %}

## Full examples

```yaml
# Example configuration.yaml entry
sensor:
  - platform: volkszaehler
    host: demo.volkszaehler.org
    uuid: "57acbef0-88a9-11e4-934f-6b0f9ecd95a8"
    monitored_conditions:
      - average
      - consumption
      - min
      - max
```

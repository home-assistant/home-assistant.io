---
title: "ferien-api.de Binary Sensor"
description: "Steps to configure the ferien-api.de sensor."
ha_category:
  - Utility
  - Binary Sensor
ha_iot_class: Cloud Polling
ha_release: 0.91
---

The `ferien-api.de` binary sensor indicates, whether the current day is a german vacation day or not.
The sensor utilizes the publicly available api `ferien-api.de` to fetch german holiday information based on your specified federal state.

## Setup

Check the [state code list](https://de.wikipedia.org/wiki/ISO_3166-2:DE) for available german federal states.

## Configuration

To enable the sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
binary_sensor:
  - platform: ferienapidotde
    state_code: HH
```

{% configuration %}
name:
  description: A name for this sensor.
  required: false
  type: string
  default: Vacation Sensor
state_code:
  description: Federal state code according to [state code list](https://de.wikipedia.org/wiki/ISO_3166-2:DE) notation.
  required: true
  type: string
{% endconfiguration %}

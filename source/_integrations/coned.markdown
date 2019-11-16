---
title: "ConEdison Real-Time Energy Usage Sensor"
description: "Instructions on how to integrate the ConEdison real-time energy usage sensor within Home Assistant."
logo: coned.png
ha_release: 0.102
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
---

[ConEdison](https://coned.com) is an energy provider in New York City and Westchester County, NY, USA.
The `coned` sensor platform fetches your current energy usage from your ConEd smart meter.

## Configuration

To add the `coned` sensor to your installation, add your `meter_number` to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: coned
    meter_number: YOUR_METER_NUMBER
```

{% configuration %}
name:
  description: The sensor name to use in the frontend.
  required: false 
  default: "ConEdison Current Energy Usage" 
  type: string
meter_number:
  description: The meter number of your smart meter with ConEdison. 
  required: true
  type: string
{% endconfiguration %}

`meter_number` is the smart meter number. It can be found on your energy bill.

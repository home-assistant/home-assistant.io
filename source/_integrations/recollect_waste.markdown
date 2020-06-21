---
title: ReCollect Waste
description: Instructions on how to set up Recollect Waste sensor within Home Assistant.
ha_category:
  - Sensor
ha_release: 0.87
ha_iot_class: Cloud Polling
ha_domain: recollect_waste
---

The `recollect_waste` integration allows you to track the next scheduled waste pickup and what type of waste from [Recollect](https://recollect.net/private-waste-haulers/). To use this sensor your city's waste company must be Recollect and you will need to find your place_id and service_id.

1. In Chrome open developer tools and go to the network tab.
2. Go to your city's Recollect collection calendar.
3. Search for and select your address in the UI.
4. Watch for a request that looks like

   ht<span>tps://api.recollect.net/api/places/**(place_id)**/services/**(service_id)**/events?nomerge ...

5. Use the place_id and service_id when configuring the sensor.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: recollect_waste
    place_id: YOUR_PLACE_ID
    service_id: YOUR_SERVICE_ID
```

{% configuration %}
place_id:
  description: The place_id used for your neighbourhood.
  required: true
  type: string
service_id:
  description: The service_id used for your city.
  required: true
  type: string
name:
  description: Name the sensor.
  required: false
  type: string
  default: recollect_waste
{% endconfiguration %}

The default frequency for pulling data from Recollect Waste is once a day (86400 seconds).

<div class='note warning'>
The Recollect Waste sensor uses the Recollect API <strong>URL</strong> to obtain data not an official API from Recollect. Use at your own risk.
</div>

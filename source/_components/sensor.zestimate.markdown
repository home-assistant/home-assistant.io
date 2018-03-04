---
layout: page
title: "Zestimate"
description: "Instructions on how to integrate the Zestimate sensor into Home Assistant."
date: 2018-03-02 3:10
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_release: 0.65
ha_iot_class: "Cloud Polling"
---

The `zestimate` sensor allows one to track the Zestimate value of properties using the [Zillow API](https://www.zillow.com/howto/api/APIOverview.htm).

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`. You will need to sign up for the Zillow API at the following link [Zillow API](https://www.zillow.com/howto/api/APIOverview.htm). You will also need the Zillow property ID for each property you'd like to track. This information is available from the URL of a property you are interested in. 

For example, the White House zpid is 84074482 and can be found in it's Zillow URL: https://www.zillow.com/homedetails/1600-Pennsylvania-Ave-NW-Washington-DC-20006/84074482_zpid/
```yaml
sensor:
  - platform: zestimate
    api_key: <your API key>
    zpid:
      - <your zpid 1>
      - <your zpid 2>
```

```yaml
{% configuration %}
api_key:
  description: The API key to access the service.
  required: true
  type: string
zpid:
  description: Property IDs to track in the front end.
  required: true
  type: list
{% endconfiguration %}
```

### Additional Attributes

The following additional attributes are also available via the sensor.

These attributes are available:

- Last update
- 30 Day change in value
- Valuation Range High
- Valuation Range Low
- Address
- Currency
- Amount

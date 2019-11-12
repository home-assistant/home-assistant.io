---
title: "Tankerkoenig Sensor"
description: "Instructions on how to integrate Tankerkoenig sensors within Home Assistant."
logo: tankerkoenig.png
ha_category:
  - Energy
ha_release: 0.102
ha_iot_class: Cloud Polling
---

The `tankerkoenig` platform allows you to monitor the fuel prices with [tankerkoenig.de](https://www.tankerkoenig.de/) from within Home Assistant and setup automations based on the information.
One entity will be created for each fuel station within the given radius and for each fuel type in it.

You can also add additional stations manually, referencing them via their IDs. To find out the ID for a given fuel station, you can use the [TankstellenFinder](https://creativecommons.tankerkoenig.de/TankstellenFinder/index.html) tool.

## Setup

To use this sensor you need an API key from [tankerkoenig](https://creativecommons.tankerkoenig.de). Go to [api-key](https://creativecommons.tankerkoenig.de/api-key), fill out the form and request a key. The API is free, but requests should be limited to less than once every 5 minutes.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: tankerkoenig
    api_key: YOUR_API_KEY
    radius: 1
    fuel_type: 
      - "diesel"
```

{% configuration %}
api_key:
  description: The api key you got when you registered.
  required: true
  type: string
fuel_types:
  description: The types of fuels you want to track. Allowed values are `e5`, `e10` and `diesel`."
  required: false
  default: ["e5", "e10", "diesel"]
  type: list
latitude:
  description: The latitude of the gas station to list.
  required: inclusive
  type: float
  default: latitude of your home zone
longitude:
  description: The longitude of the gas station to list.
  required: inclusive
  type: float
  default: longitude of your home zone
radius:
  description: The radius in km. in which to search for gas stations. 
  required: false
  default: 5
  type: integer
scan_interval:
  description: The time interval to poll the server for new data. You should not put values lower than 5 minutes here; otherwise you risk your API key being blocked.
  required: false
  default: 0:30:00
  type: time
stations:
  description: List of additional fuel stations to create entities for.
  required: false
  type: list
{% endconfiguration %}

## Full example

This is a full example of the sensor:

```yaml
sensor:
  - platform: tankerkoenig
    api_key: YOUR_API_KEY
    fuel_types:
      - "e10"
      - "diesel"
    latitude: 52.51627
    longitude: 13.3777
    radius: 1
    scan_interval: "0:10:01"
    stations:
      - 8531b393-1e42-423b-cb4d-e4b98cff8a0c
```

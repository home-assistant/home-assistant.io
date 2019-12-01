---
title: "Tankerkoenig Sensor"
description: "Instructions on how to integrate Tankerkoenig sensors within Home Assistant."
logo: tankerkoenig.png
ha_category:
  - Energy
  - Sensor
ha_release: 0.102
ha_iot_class: Cloud Polling
---

The `tankerkoenig` platform allows you to monitor the fuel prices with [tankerkoenig.de](https://www.tankerkoenig.de/) from within Home Assistant and setup automations based on the information.
One sensor entity will be created for each fuel station within the given radius and for each configured fuel type in it.

You can also add additional stations manually, referencing them via their IDs. To find out the ID for a given fuel station, you can use the [TankstellenFinder](https://creativecommons.tankerkoenig.de/TankstellenFinder/index.html) tool.

## Setup

To use this sensor you need an API key from [tankerkoenig](https://creativecommons.tankerkoenig.de). Go to [api-key](https://creativecommons.tankerkoenig.de/api-key), fill out the form and request a key. The API is free, but requests should be limited to less than once every 5 minutes.

## Configuration

To enable this platform, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tankerkoenig:
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
  description: The types of fuels you want to track. Allowed values are `e5`, `e10` and `diesel`.
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
  description: The radius in km. in which to search for gas stations. Cannot be less than 1.
  required: false
  default: 5
  type: integer
scan_interval:
  description: The time interval to poll the server for new data. You should not put values lower than 5 minutes here; otherwise you risk your API key being blocked.
  required: false
  default: 0:30
  type: time
stations:
  description: List of additional fuel stations to create entities for.
  required: false
  type: list
{% endconfiguration %}

## Full example

This is a full example of the platform:

```yaml
tankerkoenig:
  api_key: YOUR_API_KEY
  fuel_types:
    - "diesel"
    - "e10"
  latitude: 52.51627
  longitude: 13.3777
  radius: 1
  scan_interval: "0:10:01"
  stations:
    - 8531b393-1e42-423b-cb4d-e4b98cff8a0c
```

Assuming there are two fuel stations within the specified range and location, you would get six sensor entities:
 * sensor.tankerkoenig_berlin_paulstrasse_20_diesel
 * sensor.tankerkoenig_berlin_paulstrasse_20_e10
 * sensor.tankerkoenig_aral_tankstelle_diesel
 * sensor.tankerkoenig_aral_tankstelle_e10
 * sensor.tankerkoenig_svg_hamburg_strassen>_diesel
 * sensor.tankerkoenig_svg_hamburg_strassen_e10

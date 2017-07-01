---
layout: page
title: "World Air Quality Index"
description: "Instructions how to setup World Air Quality Index sensor in Home Assistant."
date: 2016-11-17 06:00
sidebar: true
comments: false
sharing: true
footer: true
logo: waqi.png
ha_category: Health
ha_release: 0.34
ha_iot_class: "Cloud Polling"
---

The `waqi` sensor platform will query [World Air Quality Index](http://aqicn.org) service to check AQI value for a specific set of locations. The resulting indexes will be added to the Home Assistant as sensor outputs.

This sensor requires an API token. Please obtain one at [AQICN API token](http://aqicn.org/data-platform/token/#/).

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: waqi
    token: AQICN_API_TOKEN
    locations:
      - beijing
    stations:
      - Beijing US Embassy
```

Configuration variables:

- **locations** (*Required*): A list of location names to look for air quality data. In case a specific location has multiple registered stations all of them will be added to Home Assistant.
- **token** (*Required*): The token for the AQICN public API.
- **stations** (*Optional*): A list of station names to look for air quality data. Station should be within locations specified above.

The value reported is an overall AQ index for the location. The values of the index can be interpreted as following:

AQI | Status | Description
------- | :----------------: | ----------
0 - 50  | **Good** | Air quality is considered satisfactory, and air pollution poses little or no risk
51 - 100  | **Moderate** | Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution
101 - 150 | **Unhealthy for Sensitive Groups** | Members of sensitive groups may experience health effects. The general public is not likely to be affected
151 - 200 | **Unhealthy** | Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects
201 - 300 | **Very unhealthy** | Health warnings of emergency conditions. The entire population is more likely to be affected
301+ | **Hazardous** | Health alert: everyone may experience more serious health effects

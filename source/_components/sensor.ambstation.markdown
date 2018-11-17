---
layout: page
title: "Ambient Weather Station Sensor"
description: "How to integrate Ambient Weather station within Home Assistant."
date: 2018-11-15 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Weather
featured: false
ha_release: "0.83"
ha_iot_class: "Cloud Polling"
---

The `Ambient Weather Station` platform uses the [Ambient Weather](https://ambientweather.net)  
web API to retrieve weather data from your personal weather station (PWS).

You need to register your compatible PWS using its MAC address and then request both an API key and an Application key.  The key requests can be found
under `My Account`.  Requesting an application key requires emailing the ambient weather support team.

To add your Ambient Weather PWS to your Home Assistant installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ambient_station
    api_key: YOUR_API_KEY
    app_key: YOUR_APP_KEY
    monitored_conditions:
      - tempf
      - humidity
      - windspeedmph
```

Configuration variables:

- **api_key** (*Required*): Your API key.
- **app_key** (*Required*): Your Application key
- **monitored_conditions** array (*Required*): Conditions to display in the frontend.
  - **winddir**:
  - **windspeedmph**:
  - **windgustmph**:
  - **maxdailygust**:
  - **windgustdir**:
  - **windspdmph_avg2m**:
  - **winddir_avg2m**:
  - **windspdmph_avg10m**:
  - **winddir_avg10m**: 
  - **humidity**:
  - **humidityin**:
  - **tempf**: 
  - **tempinf**:
  - **battout**:
  - **hourlyrainin**:
  - **dailyrainin**:
  - **24hourrainin**:
  - **weeklyrainin**:
  - **monthlyrainin**:
  - **yearlyrainin**:
  - **eventrainin**:
  - **totalrainin**:
  - **baromrelin**:
  - **baromabsin**:
  - **uv**:
  - **solarradiation**: 
  - **co2**:
  - **lastRain**:
  - **dewPoint**: 
  - **feelsLike**:
  
- **update_interval** (*Optional*): Minimum time interval between updates. Default is 5 minutes. Supported formats:
  - `update_interval: 'HH:MM:SS'`
  - `update_interval: 'HH:MM'`
  - Time period dictionary, e.g.:
    <pre>update_interval:
        # At least one of these must be specified:
        days: 0
        hours: 0
        minutes: 3
        seconds: 30
        milliseconds: 0
    </pre>



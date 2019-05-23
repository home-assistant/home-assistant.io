---
layout: page
title: "SL Public Transport"
description: "Instructions on how to integrate timetable data for traveling in Stockholm within Home Assistant."
date: 2017-05-23 15:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: "0.93.4"
redirect_from:
 - /components/sensor.hasl/
---

This component is used to create "Departure board" or "Traffic Situation" sensors for buses and trains in Stockholm, Sweden.
You have to get your own API keys from SL / Trafiklab.

### {% linkable_title Getting API-keys %}
Visit [https://www.trafiklab.se/api](https://www.trafiklab.se/api) and create a free account. They provide multiple APIs, the ones you want is ["SL Trafikinformation 4"](https://www.trafiklab.se/api/sl-realtidsinformation-4) and ["SL Störningsinformation 2"](https://www.trafiklab.se/api/sl-storningsinformation-2), optionally you can also register for ["SL Trafikläget 2"](https://www.trafiklab.se/api/sl-trafiklaget-2) to get status sensors.

### {% linkable_title Configuration %}
Add the data to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
- platform: hasl
  ri4key: YOUR-RI4-KEY-HERE
  si2key: YOUR-SI2-KEY-HERE
  ti2key: YOUR-OPTIONAL-TI2-KEY-HERE
  sensors:
   - friendly_name: Mölnvik
     sensor_type: departures
     siteid: 4244
     lines: 474, 480C
     direction: 1
     sensor: binary_sensor.test
   - friendly_name: Trafikstatus
     sensor_type: status
```

{% configuration %}
ri4key:
  description: Your API key from Trafiklab for the Realtidsinformation 4 API (required for departures sensors)
  required: false
  type: string
si2key: YOUR-SI2-KEY-HERE
  description: Your API key from Trafiklab for the Störningsinformation 2 API
  required: false
  type: string
ti2key:
  description: Your API key from Trafiklab for the Trafikläget 2 API (required for status sensors)
  required: false
  type: string
sensors:
  description: A list of all the sensors to be created. Theese can be of sensor_type `departures`, `status` or `trainlocation`
  type: list
  required: true
  keys:
    friendly_name:
      description: Used as display name.
      required: true
      type: string
    sensor_type: departures
      description: The API-key for use with status sensors.
      required: true
      type: string
    sensor: 
      description: Name of binary sensor, if the binary sensor is true then this sensor will update, otherwise not.
      required: false
      type: string
    scan_interval: 
      description:  Time between updates. You can specify `00:01:00` or `60` for update every minute.
      required: false
      type: time
    siteid: 4244
      description: (Only valid for departure sensors) The ID of the bus stop or station you want to monitor.
      required: true
      type: integer
    lines: 474, 480C
      description: (Only valid for departure sensors) A comma separated list of line numbers that you are interested in. Most likely, you only want info on the bus that you usually ride.  If omitted, all lines at the specified site id will be included. 
      required: true
      type: [list, string]
    direction:
      description: (Only valid for departure sensors) Unless your site id happens to be the end of the line, buses and trains goes in both directions.  You can enter `1` or `2`.  If omitted, both directions are included. 
      required: true
      type: [list, integer]
    timewindow:
      description: (Only valid for departure sensors) The ID of the bus stop or station you want to monitor.
      required: true
      type: integer
    property:
      description: (Only valid for departure sensors) Which property to report as sensor state. Can be one of: `min` minutes to departure (default), `time` next departure time, `deviations` number of active deviations, `refresh` if sensor is refreshing or not, `updated` when sensor data was last updated.
      required: false
      type: string
    traffic_class:
      description: (Only valid for status sensor) A comma separated list of the types to present in the sensor if not all (`metro`,`train`,`local`,`tram`,`bus`,`fer`)
      required: false
      type: string
    train_type:
      description: (Only valid for trainlocation sensor) Which train type should this sensor monitor. Choose one of `PT` (pendeltåg),`RB` (roslagsbanan),`TVB` (tvärbanan),`SB` (saltsjöbanan),`LB` (lidingöbanan),`SpvC` (spårväg city),`TB1` (gröna linjen),`TB2` (röda linjen),`TB3` (blåa linjen)
      required: false
      type: string
{% endconfiguration %}

### {% linkable_title API-Limitations %}
The `Bronze` level API is limited to 30 API calls per minute, 10.000 per month. With 10.000 calls per month, that allows for less than one call every 4 minute but if you are using multiple sensors this is split between them and each config sensor section can contain a separate pair of api-keys.
The calls have been optimized and are beeing locally cached for the specified freshness, if multiple sensors are using the same siteid there will still only be one call. Caching is done in a file (haslcache.json) that will be automatically created in the configuration directory.
You can also specify a binary_sensor that perhaps is turned of when no-one is at home or similar to reduce the number of calls. Optimizations can be turned of if needed in very specific situation or if you have a high level API-key.

### {% linkable_title Custom lovelace cards to enhance presentation %}
To display information you could use [HASL Cards](https://github.com/dsorlov/hasl-cards/).


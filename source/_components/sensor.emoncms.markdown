---
layout: page
title: "Emoncms Sensor"
description: "Instructions on how to integrate emoncms feeds as sensors into Home Assistant."
date: 2016-09-08 00:15
logo: emoncms.png
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
---


The `emoncms` sensor platform creates sensors for the feeds available in your local or cloud based version of [emoncms](https://emoncms.org).

To enable this sensor, add the following lines to your `configuration.yaml`, it will list all feeds as a sensor:

```yaml
# Example configuration.yaml entry using cloud based emoncms
sensor:
  platform: emoncms
  api_key: put your emoncms read api key here
  url: https://emoncms.org
  id: 1
```

## {% linkable_title Configuration variables %}

- **api_key** (*Required*): The read api key for your emoncms user.
- **url** (*Required*): The base url of emoncms, use "https://emoncms.org" for the cloud based version.
- **id** (*Required*): Positive Integer identifier for the sensor. Must be unique if you specify multiple emoncms sensors.
- **include_feed_id** (*optional*): Positive integer list of emoncms feed id's. Only the feeds with feed id's specified here will be displayed. Can not be specified if "exclude_feed_id" is specified.
- **exclude_feed_id** (*optional*): Positive integer list of emoncms feed id's. All the feeds will be displayed as sensors except the ones listed here. Can not be specified if "include_feed_id" is specified.
- **include_feed_id_names** (*optional*): List of names for the sensors created when using include_feed_id. List may contain less values than the "include_feed_id" list.
- **value_template** (*Optional*): Defines a [template](/topics/templating/) to alter the feed value.
- **scan_interval** (*Optional*): Defines the update interval of the sensor in seconds. Minimum is 5, default 60.
- **unit_of_measurement** (*Optional*): Defines the unit of measurement of for all the sensors. default is "W".

## {% linkable_title Default naming scheme %}

The names of the sensors created by this component, will be a combination of static text `id` from the config and `feedid` from the emoncms feed. Unless you used "include_feed_id_names".
An example name would be "emoncms1_feedid_10"

## {% linkable_title Examples %}

In this section you find some more examples of how this sensor can be used.

```yaml
# Display only feeds with their feed id's specified in "include_feed_id"
sensor:
  - platform: emoncms
    api_key: put your emoncms read api key here
    url: https://emoncms.org
    id: 1
    unit_of_measurement: "W"
    include_feed_id:
      - 107
      - 106
      - 105
```


```yaml
# Display all feeds except feeds with their feed id specified in "exclude_feed_id" 
sensor:
  - platform: emoncms
    api_key: put your emoncms read api key here
    url: https://emoncms.org
    id: 1
    unit_of_measurement: "KWH" 
    exclude_feed_id:
      - 107
      - 106
      - 105
```


```yaml
# Display only feeds with their feed id's specified in "include_feed_id" and give the feed sensors a name using "include_feed_id_names" You can specify less values in "include_feed_id_names" than in "include_feed_id", the remaining sensor names will be chosen based on "id" and the emoncms feedid
sensor:
  - platform: emoncms
    api_key: put your emoncms read api key here
    url: https://emoncms.org   
    id: 1
    unit_of_measurement: "KW" 
    include_feed_id:
      - 5
      - 18
      - 29
      - 48
      - 61
      - 110
      - 116
      - 120
    include_feed_id_names:
      - "feed_1"
      - "feed_2"
      - "feed_3"
      - "feed_4"
      - "feed_5"
      - "feed_6"
      - "feed_7"
```


```yaml
# Use a "value_template" to add 1500 to the feed value for all specified feed id's in "include_feed_id"
sensor:
  - platform: emoncms
    api_key: put your emoncms read api key here
    url: https://emoncms.org
    scan_interval: 15
    id: 1
    value_template: {% raw %}"{{ value | float + 1500 }}"{% endraw %}
    include_feed_id:
      - 107
      - 106
      - 105
      - 61
```


```yaml
# Display feeds from the same emoncms instance with 2 groups of feeds, diffrent scan_interval and a diffrent unit_of_measurement
sensor:
  - platform: emoncms
    api_key: put your emoncms read api key here
    url: https://emoncms.org
    scan_interval: 5
    id: 1
    unit_of_measurement: "W" 
    include_feed_id:
      - 107
      - 106
      - 105
  - platform: emoncms
    api_key:  put your emoncms read api key here
    url: https://emoncms.org
    id: 2
    scan_interval: 60
    unit_of_measurement: "A" 
    include_feed_id:
      - 108
      - 109
      - 110
      - 61
```
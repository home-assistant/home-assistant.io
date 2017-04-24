---
layout: page
title: "Emoncms Sensor"
description: "Instructions on how to integrate Emoncms feeds as sensors into Home Assistant."
date: 2016-09-08 00:15
logo: emoncms.png
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_release: 0.29
ha_iot_class: "Local Polling"
---


The `emoncms` sensor platform creates sensors for the feeds available in your local or cloud based version of [Emoncms](https://emoncms.org).

To enable this sensor, add the following lines to your `configuration.yaml`, it will list all feeds as a sensor:

```yaml
# Example configuration.yaml entry using cloud based Emoncms
sensor:
  platform: emoncms
  api_key: API_KEY
  url: https://emoncms.org
  id: 1
```

## {% linkable_title Configuration variables %}

- **api_key** (*Required*): The read API key for your Emoncms user.
- **url** (*Required*): The base URL of Emoncms, use "https://emoncms.org" for the cloud based version.
- **id** (*Required*): Positive integer identifier for the sensor. Must be unique if you specify multiple Emoncms sensors.
- **include_only_feed_id** (*Optional*): Positive integer list of Emoncms feed IDs. Only the feeds with feed IDs specified here will be displayed. Can not be specified if `exclude_feed_id` is specified.
- **exclude_feed_id** (*Optional*): Positive integer list of Emoncms feed IDs. All the feeds will be displayed as sensors except the ones listed here. Can not be specified if `include_only_feed_id` is specified.
- **sensor_names** (*Optional*): Dictionary of names for the sensors created that are created based on feed ID. The dictionary consists of `feedid: name` pairs. Sensors for feeds with their feed ID mentioned here will get the chosen name instead of the default name
- **value_template** (*Optional*): Defines a [template](/topics/templating/) to alter the feed value.
- **scan_interval** (*Optional*): Defines the update interval of the sensor in seconds.
- **unit_of_measurement** (*Optional*): Defines the unit of measurement of for all the sensors. default is "W".

## {% linkable_title Default naming scheme %}

The names of the sensors created by this component, will be a combination of static text, `id` from the config and `feedid` from the Emoncms feed, unless `sensor_names` is used. An example name would be `emoncms1_feedid_10`.

### {% linkable_title Examples %}

In this section you find some more examples of how this sensor can be used.

Display only feeds with their feed IDs specified in `include_only_feed_id`.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: emoncms
    api_key: API_KEY
    url: https://emoncms.org
    id: 1
    unit_of_measurement: "W"
    include_only_feed_id:
      - 107
      - 105
```

Display all feeds except feeds with their feed id specified in `exclude_feed_id`. 

```yaml
# Example configuration.yaml entry
sensor:
  - platform: emoncms
    api_key: API_KEY
    url: https://emoncms.org
    id: 1
    unit_of_measurement: "KWH" 
    exclude_feed_id:
      - 107
      - 105
```

Display only feeds with their feed id's specified in `include_only_feed_id` and give the feed sensors a name using "sensor_names". You don't have to specify all feeds names in "sensor_names", the remaining sensor names will be chosen based on "id" and the Emoncms `feedid`.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: emoncms
    api_key: API_KEY
    url: https://emoncms.org
    id: 1
    unit_of_measurement: "KW" 
    include_only_feed_id:
      - 5
      - 120
    sensor_names:
      5: "feed 1"
      48: "kwh feed"
      61: "amp feed"
      110: "watt feed"
```

Use a `value_template` to add 1500 to the feed value for all specified feed IDs in `include_feed_id`.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: emoncms
    api_key: API_KEY
    url: https://emoncms.org
    scan_interval: 15
    id: 1
    value_template: {% raw %}"{{ value | float + 1500 }}"{% endraw %}
    include_only_feed_id:
      - 107
      - 106
```

Display feeds from the same Emoncms instance with 2 groups of feeds, different `scan_interval` and a different `unit_of_measurement`.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: emoncms
    api_key: API_KEY
    url: https://emoncms.org
    scan_interval: 30
    id: 1
    unit_of_measurement: "W" 
    include_only_feed_id:
      - 107
      - 106
  - platform: emoncms
    api_key:  put your emoncms read api key here
    url: https://emoncms.org
    id: 2
    scan_interval: 60
    unit_of_measurement: "A" 
    include_only_feed_id:
      - 108
      - 61
```

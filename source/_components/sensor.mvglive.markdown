---
layout: page
title: "MVG"
description: "Instructions how to integrate Munich public transport departure times into Home Assistant."
date: 2017-03-21 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mvg.png
ha_category: Transport
ha_release: 0.42
ha_iot_class: "Cloud Polling"
---


The `mvglive` sensor will give you the departure time of the next bus, tram, subway, or train at the next station or stop in the Munich public transport network. Additional details such as the line number and destination are present in the attributes.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mvglive
    nextdeparture:
     - station: STATION_OR_STOP_NAME
```

Configuration variables:

  - **station** (*Required*): Name of the stop or station. Visit [the MVG live web site](http://www.mvg-live.de) to find valid names.
  - **destinations** (*Optional*): One or multiple final stop names, e.g. 'Feldmoching' or ['Feldmoching','Harthof']. This can be used to only consider a particular direction of travel
  - **lines** (*Optional*): One or more line numbers, e.g. 'U2' or ['U2','U8','N41']
  - **products** (*Optional*): One or more modes of transport, defaults to all 4 modes ['U-Bahn', 'Tram', 'Bus', 'S-Bahn']. 
  - **timeoffset** (*Optional*): Do not display connections departing sooner than this number of minutes (defaults to 0). Useful if you are a couple of minutes away from the stop.
  - **name** (*Optional*): You can customise the name of the sensor, which defaults to the station name.
## {% linkable_title Examples %}

### {% linkable_title Full configuration %}

The example below shows a full configuration with two sensors that showcase the various configuration options.

```yaml
# Example configuration.yml entry
sensor:
  - platform: mvglive
    nextdeparture:
     - station: Hauptbahnhof
       name: Hbf
       destinations: ['München Flughafen Terminal','Markt Schwaben']
       products: 'S-Bahn'
       timeoffset: 2
     - station: Scheidplatz
       lines: ['U2','U8']
```

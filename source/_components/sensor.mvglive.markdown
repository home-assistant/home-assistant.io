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
ha_release: 0.41
ha_iot_class: "Cloud Polling"
---


The `mvglive` sensor will give you the departure time of the next bus, tram, subway, or train at the next station or stop in the Munich public transport network. Additional details such as the line number and destination are present in the attributes.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mvglive
    station: STATION_OR_STOP
```

Configuration variables:

  - **station** (*Required*): Name of the stop or station. Visit [the MVG live web site](http://www.mvg-live.de) to find valid names.
  - **destination** (*Optional*): Name of the line's final destination to display only connections ending there.
  - **line** (*Optional*): Online display connections from this line, e.g. `'U6'`, `'S2'`.
  - **offset** (*Optional*): Do not display connections departing sooner than this number of minutes (defaults to 0). Useful if you are a  couple of minutes away from the stop.
  - **bus** (*Optional*): If 'False', do not display bus connections
  - **tram** (*Optional*): If 'False', do not display tram connections
  - **ubahn** (*Optional*): If 'False', do not display U-Bahn (subway) connections
  - **sbahn** (*Optional*): If 'False', do not display S-Bahn (suburban train) connections

## {% linkable_title Examples %}

### {% linkable_title Full configuration %}

The example below shows a full configuration using the 'line' argument.

```yaml
# Example configuration.yml entry
sensor:
  - platform: mvglive
    station: Marienplatz
    line: U6
    offset: 5
    destination: Garching-Forschungszentrum
```

Another example showing all bus connections at the main station.

```yaml
# Example configuration.yml entry
sensor:
  - platform: mvglive
    station: Hauptbahnhof
    offset: 2
    sbahn: False
    ubahn: False
    tram: False
```

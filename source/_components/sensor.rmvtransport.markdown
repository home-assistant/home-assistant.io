---
layout: page
title: "RMV"
description: "Instructions on how to integrate Rhein-Main public transport departure times into Home Assistant."
date: 2018-08-02 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: rmv.png
ha_category: Transport
ha_release: 0.76
ha_iot_class: "Cloud Polling"
---

The `rvmtransport` sensor will give you the departure time of the next bus, tram, subway, or train at the next station or stop in the Rhein-Main area public transport network. Additional details such as the line number and destination are present in the attributes.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rmvtransport
    nextdeparture:
     - station: STATION_OR_STOP_ID
```

Configuration variables:

  - **stationId** (*Required*): ID of the stop or station, e.g. 3000010. Visit [the RMV OpenData web site](https://opendata.rmv.de) to find a list of valid IDs.
  - **destinations** (*Optional*): One or multiple final stop names, e.g., 'Frankfurt (Main) Hauptbahnhof' or ['Frankfurt (Main) Hauptbahnhof','Frankfurt (Main) Stadion']. This can be used to only consider a particular direction of travel.
  - **lines** (*Optional*): One or more line numbers, e.g., 'S8' or ['S8', 'RB33', '41']
  - **products** (*Optional*): One or more modes of transport, defaults to all modes ['U-Bahn', 'Tram', 'Bus', 'S-Bahn', 'RB', 'RE', 'EC', 'IC', 'ICE']. 
  - **timeoffset** (*Optional*): Do not display departures leaving sooner than this number of minutes (defaults to 0). Useful if you are a couple of minutes away from the stop.
  - **name** (*Optional*): You can customize the name of the sensor, which defaults to the station name.
  - **max** (*Optional*): Specify the maximal number of journeys (defaults to 5). 

## {% linkable_title Examples %}

### {% linkable_title Full configuration %}

The example below shows a full configuration with three sensors that showcase the various configuration options.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rmvtransport
    nextdeparture:
    - station: 3000010
      timeoffset: 5
      destinations:
        - 'Frankfurt (Main) Flughafen Regionalbahnhof'
        - 'Frankfurt (Main) Stadion'
      products:
        - 'RB'
        - 'RE'
        - 'Bus'
        - 'S'
    - station: 3006907
      products: 'Bus'
      destinations: ['Wiesbaden Dernsches Gelände', 'Mainz Hauptbahnhof']
      name: Destination
    - station: 3006904
      lines: 'S8'
      max: 5
      products: 'S'
```

The first sensor will return S-Bahn, bus, RB and RE trains departures from Frankfurt Hauptbahnhof to Frankfurt Airport or Stadium that are at least 5 minutes away. 
The second sensor returns bus departures from Wiesbaden Hauptbahnhof going to Dernsches Gelände and Mainz Hauptbahnhof. To retrieve the time until the second departure, you would use states.sensor.ENTITY_NAME.attributes.departures[1].time.
The third sensor returns all S-Bahn trains from Mainz Hauptbahnhof for line S8.

---
title: MVG
description: Instructions on how to integrate Munich public transport departure times into Home Assistant.
ha_category:
  - Transport
ha_release: 0.42
ha_iot_class: Cloud Polling
ha_domain: mvglive
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `mvglive` {% term integration %} will give you the departure time of the next bus, tram, subway, or train at the next station or stop in the Munich public transport network. Additional details such as the line number and destination are present in the attributes.

## Configuration

To enable this {% term integration %}, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mvglive
    nextdeparture:
     - station: STATION_OR_STOP_NAME
```

{% configuration %}
station:
  description: Name of the stop or station. Visit [the MVG live web site](https://www.mvg.de/meinhalt.html) to find valid names. Be aware, that not all data of interest might be available (i.e., bus departure-times in Haar).
  required: true
  type: string
destinations:
  description: One or multiple final stop names, e.g., 'Feldmoching' or ['Feldmoching','Harthof']. This can be used to only consider a particular direction of travel.
  required: false
  type: list
directions:
  description: "Filter by direction of the departure. For Tram, Bus, SEV, and S-Bahn, direction = destination. For U-Bahn trains, directions are more general. For U1, U2, U3 and U6, direction='1' indicates south-bound trains, direction='2' indicates northbound trains. For U4 and U5, direction='1' indicates east-bound trains, direction='2' indicates west-bound trains. For example, setting directions: '1' can be used to get all south-bound trains at Scheidplatz."
  required: false
  type: list
lines:
  description: One or more line numbers, e.g., 'U2' or ['U2','U8','N41'].
  required: false
  type: list
products:
  description: One or more modes of transport.
  required: false
  default: all 5 modes ['U-Bahn', 'Tram', 'Bus', 'S-Bahn', 'Nachteule']
  type: list
timeoffset:
  description: Do not display departures leaving sooner than this number of minutes. Useful if you are a couple of minutes away from the stop.
  required: false
  default: 0
  type: integer
number:
  description: Store a list of departures in the attribute "departures". If you set this parameter to 3, the next three departures will be stored.
  required: false
  default: 1
  type: integer
name:
  description: You can customize the name of the sensor, which defaults to the station name.
  required: false
  type: string
{% endconfiguration %}

## Examples

### Full configuration

The example below shows a full configuration with three sensors that showcase the various configuration options.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mvglive
    nextdeparture:
     - station: Hauptbahnhof
       name: Hbf
       destinations: ['München Flughafen Terminal','Markt Schwaben']
       products: "S-Bahn"
       timeoffset: 2
     - station: Sendlinger Tor
       lines: ['U2','U8']
       number: 5
     - station: Scheidplatz
       products: ['U-Bahn']
       directions: "1"
```

The first sensor will return S-Bahn departures to Munich Airport or Markt Schwaben that are at least 2 minutes away.
The second sensor returns U2 and U8 departures from Sendlinger Tor and stores a total of 5 departures in attributes. To retrieve the time until the second departure, you would use state_attr('sensor.ENTITY_NAME', 'departures')[1].time.
The third sensor returns all south-bound U-Bahn trains from Scheidplatz.

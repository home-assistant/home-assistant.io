---
title: RMV
description: Instructions on how to integrate Rhein-Main public transport departure times into Home Assistant.
ha_category:
  - Transport
ha_release: 0.76
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@cgtobi'
ha_domain: rmvtransport
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `rvmtransport` {% term integration %} will give you the departure time of the next bus, tram, subway or train at the next station or stop in the Rhein-Main area public transport network. Additional details such as the line number and destination are present in the attributes.

## Setup

Visit the [RMV OpenData web site](https://opendata.rmv.de) to find a list of valid station IDs.

## Configuration

To enable this {% term integration %}, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rmvtransport
    next_departure:
     - station: STATION_OR_STOP_ID
```

{% configuration %}
timeout:
  description: Specify the timeout for the API calls.
  required: false
  default: 10
  type: integer
next_departure:
  description: One or multiple departure sensors.
  required: true
  type: list
  keys:
    name:
      description: Name to use in the frontend.
      required: false
      default: The default is the station name.
      type: string
    station:
      description: "ID of the stop or station, e.g.,  `3000010`."
      required: true
      type: string
    destinations:
      description: "One or multiple final stop names, e.g., 'Frankfurt (Main) Hauptbahnhof' or ['Frankfurt (Main) Hauptbahnhof','Frankfurt (Main) Stadion']. This can be used to only consider a particular direction of travel."
      required: false
      type: [string]
    direction:
      description: "Name of a stop or station, e.g., 'Frankfurt (Main) Hauptbahnhof'. This can be used to only consider a particular direction of travel."
      required: false
      type: [string]
    lines:
      description: "One or more line numbers, e.g., `'S8'` or `['S8', 'RB33', '41']`"
      required: false
      type: [string, integer]
    products:
      description: "One or more modes of transport `['U-Bahn', 'Tram', 'Bus', 'S', 'RB', 'RE', 'EC', 'IC', 'ICE']`."
      required: false
      default: ['U-Bahn', 'Tram', 'Bus', 'S', 'RB', 'RE', 'EC', 'IC', 'ICE']
      type: [string]
    time_offset:
      description: Do not display departures leaving sooner than this number of minutes. Useful if you are a couple of minutes away from the stop.
      required: false
      default: 0
      type: integer
    max_journeys:
      description: Specify the maximal number of journeys.
      required: false
      default: 5
      type: integer
{% endconfiguration %}

## Examples

### Full configuration

The example below shows a full configuration with three sensors that showcase the various configuration options.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rmvtransport
    scan_interval: 120
    timeout: 10
    next_departure:
      - station: 3000010
        time_offset: 5
        destinations:
          - 'Frankfurt (Main) Flughafen Regionalbahnhof'
          - 'Frankfurt (Main) Stadion'
        products:
          - 'RB'
          - 'RE'
          - 'Bus'
          - 'S'
      - station: 3006907
        products: "Bus"
        destinations: ['Wiesbaden Dernsches Gelände', 'Mainz Hauptbahnhof']
        name: Destination
      - station: 3006904
        lines: "S8"
        max_journeys: 5
        products: "S"
```

The first sensor will return S-Bahn, bus, RB and RE trains departures from Frankfurt Hauptbahnhof to Frankfurt Airport or Stadium that are at least 5 minutes away.

The second sensor returns bus departures from Wiesbaden Hauptbahnhof going to Dernsches Gelände and Mainz Hauptbahnhof. To retrieve the time of the second departure, you would use `state_attr('sensor.ENTITY_NAME', 'departures')[1].time`.

The third sensor returns all S-Bahn trains from Mainz Hauptbahnhof for line S8.

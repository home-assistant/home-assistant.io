---
title: Transport NSW
description: Instructions on how to integrate timetable data for Transport NSW (Australia) within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.81
ha_domain: transport_nsw
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

The `transport_nsw` sensor will give you the time until the next departure from a Transport NSW stop for bus, train, light rail or ferry.

## Setup

Prerequisite is a free API key from [Transport NSW](https://opendata.transport.nsw.gov.au/). You will need to register an account and then create a new application. You will need to add the 'Trip Planner APIs' to your application. 

In order to find your stop id, use the [Transport NSW stop finder](https://transportnsw.info/stop#/) and search for your stop. The URL will contain the stop id as a number.

You may also try going to Google maps and clicking on any bus/train/ferry stop. The pop up window shows the stop ID underneath the station name. For train stations the easiest way to get a stop id for a platform is through [Transport NSW Info](https://transportnsw.info/).

As a default the sensor picks up the next mode of transport leaving from a stop id.

## Configuration

To enable the sensor, add the following lines to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: transport_nsw
    stop_id: "200024"
    api_key: "YOUR API KEY"
```

{% configuration %}
api_key:
  description: Your API key for Open Data Transport NSW.
  required: true
  type: string
stop_id:
  description: The ID of the stop to get the information for.
  required: true
  type: string
route:
  description: Filter on bus route at the stop. This is the same as the bus number, e.g., `83`.
  required: false
  type: string
destination:
  description: Useful for ferry or train stops to filter the destination of the sensor, e.g.,  `Circular Quay`.
  required: false
  type: string
name:
  description: A friendly name for this sensor.
  required: false
  type: string
{% endconfiguration %}

The public information is provided from [Transport NSW](https://opendata.transport.nsw.gov.au/).

## Examples

More example configurations for bus or ferry.

```yaml
# Example bus route configuration.yaml entry
sensor:
  - platform: transport_nsw
    name: "Bus"
    stop_id: "209516"
    route:  '199'
    api_key: "YOUR API KEY"
```

```yaml
# Example ferry configuration.yaml entry
sensor:
  - platform: transport_nsw
    name: "Ferry"
    stop_id: "10102008"
    destination: "Circular Quay"
    api_key: "YOUR API KEY"
```

The sensor returns n/a if no stop event is found within the next 24h. A `template` sensor can help building a more meaningful string.

{% raw %}

```yaml
# Sample template sensor
template:
  - sensor:
    - name: "Bus monitor 199"
      state: >-
        {% if is_state_attr('sensor.bus', 'due', 'n/a') %}
          No schedule found
        {% else %}
          {{ state_attr('sensor.bus', 'route') }} in {{ state_attr('sensor.bus', 'due') }}m ({{ state_attr('sensor.bus', 'delay') }})
        {% endif %}
```

{% endraw %}

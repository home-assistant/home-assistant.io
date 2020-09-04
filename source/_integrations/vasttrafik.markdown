---
title: Västtrafik
description: Instructions on how to integrate timetable data for traveling in Sweden within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: '0.30'
ha_domain: vasttrafik
---

The `vasttrafik` sensor will provide you traveling details for the larger Göteborg area in Sweden from the [Västtrafik](https://vasttrafik.se/) public transportation service.

You must create an application [here](https://developer.vasttrafik.se/portal/#/applications) to obtain a `key` and a `secret`.

Add the data to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: vasttrafik
    key: YOUR_API_KEY
    secret: YOUR_API_SECRET
    departures:
      - from: Musikvägen
```

{% configuration %}
key:
  description: The API key to access your Västtrafik account.
  required: true
  type: string
secret:
  description: The API secret to access your Västtrafik account.
  required: true
  type: string
departures:
  description: List of travel routes.
  required: true
  type: list
  keys:
    name:
      description: Name of the route.
      required: false
      type: string
    from:
      description: The start station.
      required: true
      type: string
    heading:
      description: Direction of the traveling.
      required: false
      type: string
    lines:
      description: Only consider these lines.
      required: false
      type: [list, string]
    delay:
      description: Delay in minutes.
      required: false
      type: string
      default: 0
{% endconfiguration %}

The data are coming from [Västtrafik](https://vasttrafik.se/).

A full configuration example could look like this:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: vasttrafik
    key: YOUR_API_KEY
    secret: YOUR_API_SECRET
    departures:
      - name: Mot järntorget
        from: Musikvägen
        heading: Järntorget
        lines:
          - 7
          - GRÖN
        delay: 10
```

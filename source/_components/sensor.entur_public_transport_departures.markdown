---
layout: page
title: "Entur public transport"
description: "Instructions for how to set up monitoring of public transport departures in Norway."
date: 2018-09-01 17:15
sidebar: true
comments: false
sharing: true
footer: true
logo: entur.svg
ha_category: Transport
ha_release: 0.80
ha_iot_class: "Cloud Polling"
---

The `entur_public_transport` sensor gives realtime departure information for the next two departures from any bus stop, car ferry quay, train station, airport and person ferries quay in Norway. 

For each stop place given in the configuration, a sensor will be mounted for that stop place. It will give remaining minutes until nearest departure in the state, but also next departure in the attributes. Information about if the departure is monitored in realtime or is from scheduled times, and how many minues there is in delays, are included as well. 

Realtime data is fetched from [Entur](https://www.entur.org). Entur is a service which collects and delivers information about all public transport available in Norway under an [open source license](https://data.norge.no/nlod/no). 

## {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: entur_public_transport
    stop_ids:
      - 'STOP_ID_1'
      - 'STOP_ID_2'
```

{% configuration %}
stop_ids:
  description: List of stop places or platforms to monitor departure times from.
  required: true
  type: list
{% endconfiguration %}

## {% linkable_title Example usage %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: entur_public_transport
    stop_ids:
      - 'NSR:StopPlace:548'   # Bergen train station
      - 'NSR:StopPlace:737'   # Trondheim airport
      - 'NSR:StopPlace:5850'  # Grorud T bus stop
      - 'NSR:StopPlace:58652' # Mortavika ferry 
      - 'NSR:StopPlace:27639' # Sør-Hidle quay 
      - 'NSR:Quay:48550'      # Fiskepiren bus stop platform 1
```

## {% linkable_title Obtaining a stop id %}

[Entur's travel planer](https://en-tur.no) has a map of all stops used in Norway. Use the map to find the stops you're interested in. When you have found one of your stops, click on it. 

Now the web browser should contain a url with the id in it. Such as this: 

`https://en-tur.no/nearby-stop-place-detail?id=NSR:StopPlace:32376`

The stop id is the content after id= parameter in the url. Copy paste this into the configuration. 
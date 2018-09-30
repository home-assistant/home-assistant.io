---
layout: page
title: "Västtrafik Public Transport"
description: "Instructions on how to integrate timetable data for traveling in Sweden within Home Assistant."
date: 2016-10-05 08:45
sidebar: true
comments: false
sharing: true
footer: true
logo: vasttrafik.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: "0.30"
---

The `vasttrafik` sensor will provide you traveling details for the larger Göteborg area in Sweden from the [Västtrafik](https://vasttrafik.se/) public transportation service.

You must create an application [here](https://developer.vasttrafik.se/portal/#/applications) to obtain a `key` and a `secret`.

Add the data to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: vasttrafik
    key: XXXXXXXXXXXXXXXXXXX
    secret: YYYYYYYYYYYYYYYYY
    departures:
      - from: Musikvägen
```

Configuration variables:

- **key** (*Required*): The API key to access your Västtrafik account.
- **secret** (*Required*): The API secret to access your Västtrafik account.
- **departures** array (*Required*): List of travel routes.
  - **name** (*Optional*): Name of the route.
  - **from** (*Required*): The start station.
  - **heading** (*Optional*): Direction of the traveling.
  - **lines** (*Optional*): Only consider these lines.
  - **delay** (*Optional*): Delay in minutes. Defaults to 0.

The data are coming from [Västtrafik](https://vasttrafik.se/).

A full configuration example could look like this:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: vasttrafik
    key: XXXXXXXXXXXXXXXXXXX
    secret: YYYYYYYYYYYYYYYYY
    departures:
      - name: Mot järntorget
        from: Musikvägen
        heading: Järntorget
        lines:
          - 7
          - GRÖN
        delay: 10
```

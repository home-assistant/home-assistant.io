---
layout: page
title: "Lyft Sensor"
description: "How to integrate Lyft in Home Assistant"
date: 2017-03-19 21:05
sidebar: true
comments: false
sharing: true
footer: true
logo: lyft.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: 0.41
---


The `lyft` sensor will give you time and price estimates for all available [Lyft](https://lyft.com) products at the given `start_latitude` and `start_longitude`.The `ATTRIBUTES` are used to provide extra information about products, such as vehicle capacity and fare rates. If an `end_latitude` and `end_longitude` are specified, a price estimate will also be provided. One sensor will be created for each product at the given `start` location, for pickup time. A second sensor for each product, for estimated price, will be created if a destination is specified. The sensor is powered by the official Lyft [API](https://developer.lyft.com/reference/).


You must create an application [here](https://www.lyft.com/developers/manage) to obtain a `client_id` and `client_secret`.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: lyft
    client_id: CLIENT_ID
    client_secret: CLIENT_SECRET
    start_latitude: 37.8116380 
```

Configuration variables:

- **client_id** (*Required*): A client id obtained from [developer.lyft.com](https://developer.lyft.com) after [creating an app](https://www.lyft.com/developers/manage).
- **client_secret** (*Required*) A client secret obtained from [developer.lyft.com](https://developer.lyft.com) after [creating an app](https://www.lyft.com/developers/manage).
- **start_latitude** (*Required*): The starting latitude for a trip.
- **start_longitude** (*Required*): The starting longitude for a trip.
- **end_latitude** (*Optional*): The ending latitude for a trip. While `end_latitude` is optional, providing an `end_latitude`/`end_longitude` allows price estimates as well as time.
- **end_longitude** (*Optional*): The ending longitude for a trip. While `end_longitude` is optional, providing an `end_latitude`/`end_longitude` allows price estimates as well as time.
- **product_ids** (*Optional*): A list of Lyft product IDs.

A full configuration entry could look like the sample below: 

```yaml
# Example configuration.yaml entry
sensor:
  - platform: lyft
    client_id: CLIENT_ID
    client_secret: CLIENT_SECRET
    start_latitude: 37.8116380 
    start_longitude: -122.2648050
    end_latitude: 37.615223
    end_longitude: -122.389977
    product_ids:
      - 'lyft'
      - 'lyft_plus'
```

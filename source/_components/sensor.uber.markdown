---
layout: page
title: "Uber"
description: "How to integrate Uber in Home Assistant"
date: 2016-03-24 23:04
sidebar: true
comments: false
sharing: true
footer: true
logo: uber.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: 0.16
---


The `uber` sensor will give you time and price estimates for all available [Uber](https://uber.com) products at the given location. The `ATTRIBUTES` are used to provide extra information about products, such as estimated trip duration, distance and vehicle capacity. By default, 2 sensors will be created for each product at the given `start` location, one for pickup time and one for current price. The sensor is powered by the official Uber [API](https://developer.uber.com/).

You must create an application [here](https://developer.uber.com/dashboard/create) to obtain a `server_token`.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: uber
    server_token: 'BeAPPTDsWZSHLf7fd9OWjZkIezweRw18Q8NltY27'
```

Configuration variables:

- **server_token** (*Required*): A server token obtained from [developer.uber.com](https://developer.uber.com) after [creating an app](https://developer.uber.com/dashboard/create).
- **start_latitude** (*Optional*): The starting latitude for a trip. Defaults to the latitude in your `configuration.yaml` file.
- **start_longitude** (*Optional*): The starting longitude for a trip. Defaults to the longitude in your `configuration.yaml` file. 
- **end_latitude** (*Optional*): The ending latitude for a trip. While `end_latitude` is optional, it is strongly recommended to provide an `end_latitude`/`end_longitude` when possible as you will get more accurate price and time estimates.
- **end_longitude** (*Optional*): The ending longitude for a trip. While `end_longitude` is optional, it is strongly recommended to provide an `end_latitude`/`end_longitude` when possible as you will get more accurate price and time estimates.
- **product_ids** (*Options*): A list of Uber product UUIDs. If provided, sensors will only be created for the given product IDs. Please note that product IDs are region and some times even more specific geographies based. The easiest way to find a UUID is to click on a sensor in the Home Assistant frontend and look for "Product ID" in the attributes.

A full configuration entry could look like the sample below: 

```yaml
# Example configuration.yaml entry
sensor:
  - platform: uber
    start_latitude: 37.8116380
    start_longitude: -122.2648050
    end_latitude: 37.7768520
    end_longitude: -122.4155500
    server_token: 'BeAPPTDsWZSHLf7fd9OWjZkIezweRw18Q8NltY27'
    product_ids:
      - '04a497f5-380d-47f2-bf1b-ad4cfdcb51f2'
```

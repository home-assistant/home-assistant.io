---
title: Lyft
description: How to integrate Lyft in Home Assistant
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.41
ha_domain: lyft
ha_platforms:
  - sensor
---

The `lyft` sensor will give you time and price estimates for all available [Lyft](https://lyft.com) products at the given `start_latitude` and `start_longitude`.The `ATTRIBUTES` are used to provide extra information about products, such as vehicle capacity and fare rates. If an `end_latitude` and `end_longitude` are specified, a price estimate will also be provided. One sensor will be created for each product at the given `start` location, for pickup time. A second sensor for each product, for estimated price, will be created if a destination is specified. The sensor is powered by the official Lyft [API](https://developer.lyft.com/docs).

You must create an application [here](https://www.lyft.com/developers/apps) to obtain a `client_id` and `client_secret`.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: lyft
    client_id: CLIENT_ID
    client_secret: CLIENT_SECRET
```

{% configuration %}
client_id:
  description: "A client id obtained from [developer.lyft.com](https://developer.lyft.com) after [creating an app](https://www.lyft.com/developers/apps)."
  required: true
  type: string
client_secret:
  description: "A client secret obtained from [developer.lyft.com](https://developer.lyft.com) after [creating an app](https://www.lyft.com/developers/apps)."
  required: true
  type: string
start_latitude:
  description: The starting latitude for a trip.
  required: false
  type: float
  default: "The latitude defined under the `homeassistant` key in `configuration.yaml`."
start_longitude:
  description: The starting longitude for a trip.
  required: false
  type: float
  default: "The longitude defined under the `homeassistant` key in `configuration.yaml`."
end_latitude:
  description: The ending latitude for a trip. While `end_latitude` is optional, providing an `end_latitude`/`end_longitude` allows price estimates as well as time.
  required: false
  type: float
end_longitude:
  description: The ending longitude for a trip. While `end_longitude` is optional, providing an `end_latitude`/`end_longitude` allows price estimates as well as time.
  required: false
  type: float
product_ids:
  description: A list of Lyft product IDs.
  required: false
  type: [list, string]
{% endconfiguration %}

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

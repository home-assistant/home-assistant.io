---
layout: page
title: "Met Office"
description: "Instructions on how to integrate Met Office weather conditions into Home Assistant."
date: 2017-03-23 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: metoffice.jpg
ha_category: Weather
ha_release: 0.42
ha_iot_class: "Cloud Polling"
---

The `metoffice` weather platform uses the Met Office's [DataPoint API][datapoint] for weather data.

To add the Met Office weather platform to your installation, you'll need to register for a free API key at the link above and then add the following to your `configuration.yaml` file:

```yaml
weather:
  - platform: metoffice
    api_key: "my-api-key"
```

Configuration variables:

- **api_key** (*Required*): Your personal API key from the [Datapoint website][datapoint].

<p class='note'>
This platform is an alternative to the [`metoffice`](/components/sensor.metoffice/) sensor.
The weather platform is easier to configure but less customizable.
</p>

[datapoint]: http://www.metoffice.gov.uk/datapoint

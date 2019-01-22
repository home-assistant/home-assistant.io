---
layout: page
title: "Ruter Public Transport"
description: "Instructions on how to integrate departure times from Ruter within Home Assistant."
date: 2018-11-05 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ruter.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: 0.83
---

<p class='note warning'>
The API used for this sensor is shutting down soon, you should consider starting to use the [`entur_public_transport`](/components/sensor.entur_public_transport/) sensor before that happen.
To read the deprecation warning visit [ruter.no/labs](https://ruter.no/labs/),
</p>

The `ruter` sensor will provide you departure information for the larger Oslo area in Norway from the [Ruter][ruter] public transportation service.

This platform is using the [Ruter reisapi API][ruter-api] to gather the information.

To find the `stop_id` you need to visit the [Ruter][ruter] site and search for your stop.
In the URL after you have searched, there will be an ID right after the `Stoppested/` in a format like this `(2190400)`, the numbers there is what you need to put in the `stop_id:` configuration option.

Add the data to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ruter
    stop_id: STOPID
```

{% configuration %}
stop_id:
  description: The stop id for the stop you want to monitor.
  required: true
  type: string
destination:
  description: A destination name to show only departures that has this as the final stop.
  required: false
  type: string
offset:
  description: An offset for the next departure, 0 will give the first one.
  required: false
  type: integer
  default: 0
name:
  description: Name of the sensor.
  required: false
  type: string
  default: Ruter
{% endconfiguration %}

[ruter]: https://ruter.no/reiseplanlegger/Stoppested
[ruter-api]: http://reisapi.ruter.no/Help

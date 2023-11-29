---
title: Dublin Bus
description: Instructions on how to integrate timetable data for traveling on Dublin Bus within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.36
ha_domain: dublin_bus_transport
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `dublin_bus_transport` sensor will give you the time until the next two departures from a Dublin bus stop using the RTPI information.

The [Dublin Bus](https://www.dublinbus.ie/RTPI/) website can help to determine the id of your bus stop. You can check if this is correct by going to

https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=[Stop ID]

Then add the data to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dublin_bus_transport
    stopid: STOP_ID
```

{% configuration %}
stopid:
  description: The ID of the bus stop to get the information for.
  required: true
  type: string
route:
  description: Only show a single bus route at the stop. This is the same as the bus number, e.g., `83`.
  required: false
  type: string
name:
  description: A friendly name for this sensor.
  required: false
  default: Next Bus
  type: string
{% endconfiguration %}

The public RTPI information is coming from [Dub Linked](https://data.smartdublin.ie/).

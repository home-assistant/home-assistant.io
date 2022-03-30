---
title: NextBus
description: Instructions on how to use public transit data from Nextbus in Home Assistant.
ha_category:
  - Sensor
  - Transport
ha_iot_class: Local Polling
ha_release: 0.93
ha_codeowners:
  - '@vividboarder'
ha_domain: nextbus
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `nextbus` sensor will give you the next departure time and associated data from your public transit station/stop. The data comes from [NextBus](https://www.nextbus.com), which provides real time transit data for a number of transit authorities.

It is possible to get the tag information from the NextBus website.

  1. Visit https://www.nextbus.com/
  2. Use the drop downs to select the transit system, route, direction, and stop
  3. Extract the tags from the URL. It is constructed with the following pattern:

    https://www.nextbus.com/#!/<agency>/<route>/<direction>/<stop>

If tags are incorrect, valid ones will be displayed in the logs as a
convenience.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: nextbus
    agency: AGENCY_TAG
    route: ROUTE_TAG
    stop: STOP_TAG
```

{% configuration %}
agency:
  description: The agency tag from NextBus.
  required: true
  type: string
route:
  description: The route tag from NextBus.
  required: true
  type: string
stop:
  description: The stop tag from NextBus.
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  default: <Agency> - <Route>
  type: string
{% endconfiguration %}

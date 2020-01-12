---
title: Nederlandse Spoorwegen (NS)
description: Instructions on how to integrate timetable data for traveling by train in the Netherlands within Home Assistant.
logo: nederlandse_spoorwegen.png
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.57
---

This sensor will provide you with time table information of the [Nederlandse Spoorwegen](https://www.ns.nl/) train service in the Netherlands.

To obtain an API key, create an account on the [NS API-Portaal](https://apiportal.ns.nl/) and obtain an API key for the `RetrieveTripInformationPublicAPI` API.

The `nederlandse_spoorwegen` integration can be configured using `configuration.yaml` as shown below:

```yaml
# Example configuration.yaml entry
sensor:
- platform: nederlandse_spoorwegen
  api_key: NS_API_KEY
  routes:
    - name: Rotterdam-Amsterdam
      from: Rtd
      to: Asd
    - name: Groningen-Zwolle-Maastricht
      from: Gn
      to: Mt
      via: Zl
```

{% configuration %}
api_key:
  description: The API key provided by the Nederlandse Spoorwegen.
  required: true
  type: string
routes:
  description: List of travel routes.
  required: false
  type: list
  keys:
    name:
      description: Name of the route.
      required: true
      type: string
    from:
      description: The departure station.
      required: true
      type: string
    to:
      description: The arrival station.
      required: true
      type: string
    via:
      description: A station the route needs to pass through.
      required: false
      type: string
{% endconfiguration %}

The data are coming from [Nederlandse Spoorwegen](https://www.ns.nl/).

Station codes must be used and can be looked up [here](https://nl.wikipedia.org/wiki/Lijst_van_spoorwegstations_in_Nederland).

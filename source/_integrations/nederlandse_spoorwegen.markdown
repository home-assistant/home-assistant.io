---
title: Nederlandse Spoorwegen (NS)
description: Instructions on how to integrate timetable data for traveling by train in the Netherlands within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.57
ha_codeowners:
  - '@YarmoM'
ha_domain: nederlandse_spoorwegen
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This {% term integration %} will provide you with time table information of the [Nederlandse Spoorwegen](https://www.ns.nl/) train service in the Netherlands.

To obtain an API key, create an account on the [NS API-Portaal](https://apiportal.ns.nl/) and obtain an API key for the `Reisinformatie` API which is part of the `Ns-App` product.

The `nederlandse_spoorwegen` {% term integration %} can be configured using your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
    - name: "AlmereBuiten-Duivendrecht-the-08h06m-train"
      from: Almb
      to: Dvd
      time: "08:06:00"
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
    time:
      description: Optional time to search for a specific train.
      required: false
      type: time
{% endconfiguration %}

### Station codes

Station codes must be used and can be looked up [here](https://nl.wikipedia.org/wiki/Lijst_van_spoorwegstations_in_Nederland).

### Searching a specific train vs. the next train

The default behavior (without configuration variable `time`) gives you the information about the *next* train that fits the criteria (`from`, `to`, `via`).
When using the configuration variable `time`, you can search for a specific train.
This is convenient when searching for the next train doesn't give you enough time to base an automation on.
E.g., when you normally take the 08h06m train and want to get information about this train, but there is another train
that's departing just minutes before your train, your time window to warn you on a delay might be too small.

Using `time` only updates the route sensor during a time window around the chosen time.
Outside this window, the route sensor's state is `unknown`.
The window is from half an hour before the chosen time until half an hour after the chosen time.
In this way, you can have multiple routes with specific trains before hitting the FUP threshold for using NS API.

The data are coming from [Nederlandse Spoorwegen](https://www.ns.nl/).

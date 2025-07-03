---
title: Nederlandse Spoorwegen (NS)
description: Instructions on how to integrate timetable data for traveling by train in the Netherlands within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.57
ha_codeowners:
  - '@YarmoM'
  - '@heindrichpaul'
ha_domain: nederlandse_spoorwegen
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: silver
---

The **Nederlandse Spoorwegen (NS)** {% term integration %} provides real-time timetable information for [Nederlandse Spoorwegen](https://www.ns.nl/) (NS), the Dutch national railway, directly in Home Assistant.

## Getting Started

### Obtain an API Key

To use this integration, you need an API key from NS:

1. Create an account on the [NS API Portal](https://apiportal.ns.nl/).
2. Request an API key for the `Reisinformatie` API, which is part of the `Ns-App` product.

### Configuration Methods

You can set up the NS integration using either the Home Assistant UI or by editing your `configuration.yaml` file.

#### UI Configuration Flow (Recommended)

1. Go to **Settings > Devices & Services** in Home Assistant.
2. Click **Add Integration** and search for "Nederlandse Spoorwegen".
3. Enter your NS API key when prompted.
4. Add one or more train routes by specifying the departure station, arrival station, and optionally a via station.
5. Save your configuration. The integration will create sensors for each route.

You can edit, add, or remove routes at any time using the integration's options flow in the UI. If your API key changes or expires, use the reauthentication flow to update it without removing your integration.

#### YAML Configuration (Advanced)

```yaml
# Example configuration.yaml entry
sensor:
  - platform: nederlandse_spoorwegen
    api_key: !secret ns_api_key
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
      description: Optional time to search for a specific train (format `hh:mm:ss`, for example `08:06:00`).
      required: false
      type: time
{% endconfiguration %}

{% note %}
After adding or updating your configuration, restart Home Assistant to apply the changes.
{% endnote %}

### Station codes

You must use station codes, which you can look up in the [list of railway stations in the Netherlands](https://nl.wikipedia.org/wiki/Lijst_van_spoorwegstations_in_Nederland).

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

### Data source

Data is provided by [Nederlandse Spoorwegen](https://www.ns.nl/).

This integration meets the Silver quality scale requirements, ensuring reliable configuration via the Home Assistant UI and robust error handling.

---
title: Västtrafik
description: Instructions on how to integrate timetable data for traveling in Sweden within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: '0.30'
ha_domain: vasttrafik
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `vasttrafik` {% term integration %} will provide you traveling details for the larger Göteborg area in Sweden from the [Västtrafik](https://vasttrafik.se/) public transportation service.

You must create an application [here](https://developer.vasttrafik.se/applications) to obtain a `key` and a `secret`. Make sure to also subscribe to the API by clicking on `Prenumerera på nytt API`, and selecting the API `Planera Resa v4`.

Add the data to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: vasttrafik
    key: YOUR_API_KEY
    secret: YOUR_API_SECRET
    departures:
      - from: Musikvägen
```

{% configuration %}
key:
  description: The API key to access your Västtrafik account.
  required: true
  type: string
secret:
  description: The API secret to access your Västtrafik account.
  required: true
  type: string
departures:
  description: List of travel routes.
  required: true
  type: list
  keys:
    name:
      description: Name of the route.
      required: false
      type: string
    from:
      description: The start station name or ID.
      required: true
      type: string
    heading:
      description: The destination station name or ID.
      required: false
      type: string
    lines:
      description: Only consider these lines.
      required: false
      type: [list, string]
    delay:
      description: Delay in minutes.
      required: false
      type: string
      default: 0
{% endconfiguration %}

The data is coming from [Västtrafik](https://vasttrafik.se/).

A full configuration example could look like this:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: vasttrafik
    key: YOUR_API_KEY
    secret: YOUR_API_SECRET
    departures:
      - name: Mot järntorget
        from: Musikvägen
        heading: Järntorget
        lines:
          - 7
          - GRÖN
        delay: 10
```

## Solving incorrect selected station problems

It is possible to use the full name of the station for the from/heading values, e.g., Musikvägen, Göteborg.

In cases where the wrong station is being selected, it is possible to provide the station ID instead. To do this you first need to retrieve the station ID either via Västtrafik's [API-konsole](https://developer.vasttrafik.se/apis/13/v4) (using GET /locations/by-text) or with `curl`.

To retrieve the ID using `curl`:

1. Login into the Västtrafik API and go to ["Applikationer"](https://developer.vasttrafik.se/applications)
2. Click "* Generera accesstoken", and then "Kopiera". 
3. Execute the following `curl` command, replacing "<ACCESS_TOKEN>" and "<STATION_NAME>" as necessary:

   ```shell
      curl -H "Authorization: Bearer <ACCESS_TOKEN>" "https://ext-api.vasttrafik.se/pr/v4/locations/by-text?q=<STATION_NAME>"
   ```

4. In the output locate the key called "results", and under this key, you will find a list of stops. Copy the ID (gid) for your desired stop and use it in your configuration.

```yaml
# Example configuration.yaml entry using station ID as departure and station name as destination
sensor:
  - platform: vasttrafik
    key: YOUR_API_KEY
    secret: YOUR_API_SECRET
    departures:
      - name: To the Iron Square \o/
        from: 9021014004870000
        heading: Järntorget
        delay: 0
```

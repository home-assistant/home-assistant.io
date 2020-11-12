---
title: Västtrafik
description: Instructions on how to integrate timetable data for traveling in Sweden within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: '0.30'
ha_domain: vasttrafik
---

The `vasttrafik` sensor will provide you traveling details for the larger Göteborg area in Sweden from the [Västtrafik](https://vasttrafik.se/) public transportation service.

You must create an application [here](https://developer.vasttrafik.se/portal/#/applications) to obtain a `key` and a `secret`. Make sure to also subscribe to the API by going to `Mina prenumerationer`, selecting your newly created application and the API `Reseplaneraren V2`.

Add the data to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: vasttrafik
    key: YOUR_API_KEY
    secret: YOUR_API_SECRET
    departures:
      - from: Musikvägen
```
In cases where the wrong station is being selected (see [34851](https://github.com/home-assistant/core/issues/34851)), it is possible to provide the station ID instead. To do this you first need to retrieve the station ID either via Västtrafik's [API-konsole](https://developer.vasttrafik.se/portal/#/api/Reseplaneraren/v2/landerss) or with curl.
To retrieve the ID using curl:
1. Login to the Västtrafik API and go to "Hantera nycklar" next to the application your created for Home Assistant.
2. Make a copy of your AccessToken and execute the following curl command, replacing "<Access_Token>" and "<STATION_NAME>" as necessary:
```
curl -H "Authorization: Bearer <Access_Token>" "https://api.vasttrafik.se/bin/rest.exe/v2/location.name?input=<STATION_NAME>&format=json
```
3. In the output locate the key called "StopLocation", and under this key you will find a list of stops. Copy the ID for your desired stop and use it in your configuration.

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
      description: The start station.
      required: true
      type: string
    heading:
      description: Direction of the traveling.
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

The data are coming from [Västtrafik](https://vasttrafik.se/).

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

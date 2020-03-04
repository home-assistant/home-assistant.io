---
title: Stib-Mivb 
description: Instructions on how to integrate Stib-Mivb (Brusels public transport company) departure times into Home Assistant.
ha_release: 0.107
ha_category:
  - Transport
  - Sensor
ha_iot_class: Cloud Polling
logo: stib-mivb.svg
ha_codeowners:
  - '@Emilv2'
---

The `stib-mvib` sensor will give you the departure time of the next bus, tram or subway at a specific stop of the Stib-Mivb public transport network in Brussels (Belgium).

## Setup

### API key
Create a developer account at [Stib-Mivb Open Data portal](https://opendata.stib-mivb.be) and create a production key on the [subscriptions page](https://opendata.stib-mivb.be/store/subscriptions).
Make sure the you regenerate an access token with a long enough validity.

### Stop ids

Go to the [timetables webpage](https://www.stib-mivb.be/horaires-dienstregeling2.html), select the line, the destination and then the stop name. The stop id can be found at the end of the URL after "_stop=".

For example, for line 1 with direction 'Gare de l'Ouest' at 'Gare Centrale', the URL is: `http://www.stib-mivb.be/horaires-dienstregeling2.html?l=fr&_line=1&_directioncode=V&_stop=8021`. The stop id is then 8021.

Get the id for each stop you need and add them to your configuration.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: stib_mivb   
    api_key: API_KEY
    lang: LANG
    stops:
      - stop_id: STOP_ID
        line_numbers: 
          - LINE_1
          - LINE_2
```

{% configuration %}
api_key:
  description: "API Subscription key needed to access Stib-Mivb API's."
  required: true
  type: string
lang:
  description: "The language for the stop names. Supported languages are `nl` and `fr`."
  required: true
  type: string
message_lang:
  description: "The language for the information messages about the line serving this stop. Supported languages are `fr`, `nl` and `en`. if not provided the same as `lang`"
  required: false
  type: string
stops:
  description: One or multiple stop sensors.
  required: true
  type: list
  keys:
    stop_id:
      description: "ID of the stop, e.g.,  `8301`."
      required: true
      type: string
    line_numbers:
      description: "Numbers of the lines that stop at this stop and you are interested in."
      required: true
      type: list
{% endconfiguration %}

## Examples

### Full configuration

The example below shows a full configuration with two sensors, only the `ed3d8637ab9d3397a50a801957cb17ca` needs to be replaced with an actual API subscription key.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: stib_mivb   
    api_key: ed3d8637ab9d3397a50a801957cb17ca
    lang: nl
    message_lang: en
    stops:
      - stop_id: 8301
        line_numbers: 
          - 6
          - 2
      - stop_id: 1067
        line_numbers: 
          - 83
```

## Custom Lovelace card

Works best with the following custom Lovelace card: <https://github.com/emilv2/stib-mivb-card>

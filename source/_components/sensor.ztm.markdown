---
layout: page
title: "Warsaw Public Transport (ZTM)"
description: "Instructions on how to integrate Warsaw Public Transport (ZTM) data into Home Assistant."
date: 2018-03-31 14:35
sidebar: true
comments: false
sharing: true
footer: true
logo: ztm_warsaw.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: "0.68"
---

The `ztm` sensor will give you information about departure times for bus/trams using [Warsaw Open Data](https://api.um.warszawa.pl/) API.

To access the data, you need an `api_key` that is provided after creating an account at [Otwarte dane po warszawsku](https://api.um.warszawa.pl/) -> Logowanie -> Rejestracja konta.

To activate the sensor you need the bus/tram `number`, `stop_id` and the `stop_number`. 
You can obtain `stop_id` and `number_id` by searching for a stop at [ZTM](http://www.ztm.waw.pl/rozklad_nowy.php?c=183&l=1) website. 
In the url `n` param is the `stop_id` and `o` param is `stop_number` (example stop: [Wawrzyszewska](http://www.ztm.waw.pl/rozklad_nowy.php?c=182&l=1&n=5068&o=03)).

<p class='note'>
You have to quote `stop_number` as it starts with the number 0.
</p>

Then add the data to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ztm
    api_key: YOUR_API_KEY
    lines:
      - number: 24
        stop_id: 5068
        stop_number: "03"
      - number: 23
        stop_id: 5068
        stop_number: "03"
```

{% configuration %}
api_key:
  description: API key
  required: true
  type: int
entries:
  description: Number of entries saved in sensor.attributes.departures
  required: false
  type: int
  default: 3
name:
  description: The first part of the sensor name
  required: false
  type: string
  default: ztm
lines:
  description: List of lines to monitor
  required: true
  type: map
  keys:
    line:
      description: Bus/tram line number
      required: true
      type: int
    stop_id:
      description: Id of the stop
      required: true
      type: int
    stop_number:
      description: Number of the stop (starts with 0 so use quotes)
      required: true
      type: string
{% endconfiguration %}

The public data is coming from [Miasto Stołeczne Warszawa](http://api.um.warszawa.pl ). 

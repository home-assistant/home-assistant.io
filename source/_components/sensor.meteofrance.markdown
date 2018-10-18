---
layout: page
title: "Météo-France Sensor"
description: "Show 1hr rain forecast from Météo-France."
date: 2018-10-18 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: meteo-france.png
ha_category: Sensor
featured: true
ha_release: 0.81
#redirect_from: /components/sensor.meteofrance/
ha_iot_class: "Cloud Polling"
---

The `meteo_france` platform uses the [Météo-France](http://www.meteofrance.com/) web service as a source a 1hour rain forecast.

The location ID is the INSEE code of the town, not the postal code. You can find the code on the [INSEE website](https://www.insee.fr/fr/recherche/recherche-geographique).

<p class='note warning'>
More than 75% of metropolitan France is covered by the service.<br/>
You can check if your city is covered on the [Météo-France website](http://www.meteofrance.com/previsions-meteo-france/previsions-pluie)
</p>

The sensor value is the time to next rain, from 0 to 55min.
If no rain is forecasted for the nex hour, value will be "No rain".

Attributes also gives the forecast for the next hour in 5min intervals.
Possible value for each intervals attributes are :
- 1 No rain
- 2 Light rain
- 3 Moderate rain
- 4 Heavy rain

To add Météo-France to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: meteo_france
    location_id: 75101
    name: Paris 1er
```


Configuration variables:

- **location_id** (*Required*): INSEE code of the city.
- **name** (*Optional*): Additional name for the sensors.

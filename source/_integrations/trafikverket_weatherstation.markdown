---
description: Instructions how to integrate Trafikverket WeatherStation within Home Assistant.
ha_release: 0.66
ha_domain: trafikverket_weatherstation
---

Showing weather information provided by [Trafikverket](https://www.trafikverket.se/) weather stations in Sweden.

## Potential use cases

- Get weather data in general.
- You live near a weather station and want to know the current weather conditions at home.
- Setup automations for your car heating system. If the road is frozen along the way to work, you might want the car heating system to start earlier.

## Prerequisites

Please click [here](https://data.trafikverket.se/home) and register to obtain the API key.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "The API key you created on the [Trafikverket open data portal](https://data.trafikverket.se/)."
Station:
  description: "The name of the weather station, exactly as shown on the Trafikverket traffic information map. For example, `Arlanda`. See [Weather stations](#weather-stations) for how to find it."
{% endconfiguration_basic %}

If no station has the name you entered, or more than one station matches it, the form tells you so. Check the name on the map and try again.

To follow more than one weather station, add the integration again for each station.

## Reconfiguration

You can change the API key or switch to another weather station without removing the integration.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Trafikverket Weather Station** integration.
2. Next to the station entry, select the three dots {% icon "mdi:dots-vertical" %} menu, then select **Reconfigure**.
3. Enter the new **API key** or **Station**, and select **Submit**.

## Entities provided by the integration
- Air temperature.
- Road temperature.
- Dew point
- Relative humidity.
- Precipitation type.
- Precipitation amount
- Wind direction in degrees.
- Wind speed

### Entities provided but not enabled by default
- Maximum wind speed measured during the last 30 minutes
- Measurement time
- Visible distance
- Road ice depth
- Road snow depth
- Road water depth
- Road water equivalent depth
- Wind measurement height
- Data modified time 

## Weather stations

To get a map of valid weather stations, open the [trafikverket website](https://www.trafikverket.se/trafikinformation/vag/?map_x=473143.67679&map_y=6622458.53332&map_z=2&map_l=100000001000000). Once you have found a station, copy its name as shown in the picture below and paste it in the **Station** field.

<p class='img'>
  <img src='/images/screenshots/get_trafikverket_weather_station_example.png' />
</p>

## Data updates

The integration {% term polling polls %} the Trafikverket API every 10 minutes.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

If you no longer use the API key for anything else, you can also remove it from the [Trafikverket open data portal](https://data.trafikverket.se/).

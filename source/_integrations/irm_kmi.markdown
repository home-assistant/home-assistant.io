---
description: Instructions on how to integrate IRM KMI weather within Home Assistant.
ha_release: '2025.10'
ha_domain: irm_kmi
related:
  - url: https://community.home-assistant.io/t/660421
    title: Community forum thread
---

The **Royal Meteorological Institute of Belgium** {% term integration %} integrates the weather data from [IRM KMI (meteo.be)](https://www.meteo.be) with Home Assistant.

Although the provider is Belgian, the data is available for Belgium 🇧🇪, Luxembourg 🇱🇺, and The Netherlands 🇳🇱. 

The data provided by this integration is retrieved from their [mobile application](https://www.meteo.be/en/info/faq/products-services/the-rmi-weather-app). 


{% include integrations/config_flow.md %}

{% configuration_basic %}
Location:
    description: "The location for which you want to get weather data."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Language:
    description: "Override the Home Assistant language for forecast texts. Defaults to **Follow Home Assistant server language**. If that language is not English, French, Dutch, or German, English is used."
{% endconfiguration_basic %}

## Supported features

The integration provides a weather entity along with [weather forecast services](/integrations/weather/#action-weatherget_forecasts).

## Supported functionality

The integration provides a weather entity along with [weather forecast services](/integrations/weather/#action-weatherget_forecasts).

### Sensors

The integration also provides the following sensors for the current weather at your location. Some sensors are [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity). You can enable them after you set up the integration.

- **Temperature**: The current outdoor temperature.
- **Atmospheric pressure**: The current air pressure.
- **Wind speed**: The current wind speed.
- **Wind gust speed**: The speed of the strongest wind gusts. Disabled by default.
- **Wind direction**: The direction the wind is coming from, in degrees.
- **UV index**: The current ultraviolet index.

There is also a pollen sensor for each type the provider reports, such as **Grass pollen** and **Birch pollen**. The colors follow the provider's [pollen scale](https://www.meteo.be/en/weather/forecasts/pollen-allergy-and-hay-fever):

- `green`: The lowest level.
- `yellow`: Low.
- `orange`: Moderate.
- `red`: High.
- `purple`: Very high.
- `active`: The type is in season, but the provider gives no level.
- `none`: The type is not in season.

## Limitations

1. The weather provider sometimes uses two weather conditions for the same day (see below). When this is the case, only the first weather condition is taken into account in this integration. <br/> <img src="/images/integrations/irm_kmi/monday.png" height="150" alt="Example of two weather conditions">

2. The trends for 14 days are not shown.

3. The provider only has data for Belgium, Luxembourg and The Netherlands. 

4. Not every location gets a pollen forecast. For locations in The Netherlands, all pollen sensors report `none`.

## Data updates

The integration {% term polling polls %} weather data every 7 minutes by default.

When a poll cannot reach the API, the weather entity keeps showing the data from the last poll that succeeded. Once that poll is more than 17.5 minutes old, the next failed poll makes the entity unavailable, until a poll succeeds again.

The pollen levels are downloaded separately. If only that download fails, the other entities keep updating and the pollen sensors keep their last level for the same 17.5 minutes, then become unavailable until a download succeeds again. Right after Home Assistant starts, there is no earlier level to keep, and they are unavailable at once. The log shows `Could not get pollen data from the API` when the problem starts and `Pollen data is available again` when it is over.

## Examples

### Notify on high grass pollen

{% raw %}

```yaml
automation:
  - alias: "Notify on high grass pollen"
    triggers:
      - trigger: state
        entity_id: sensor.brussels_grass_pollen
        to:
          - "red"
          - "purple"
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.my_device
        data:
          message: "Grass pollen level is {{ states('sensor.brussels_grass_pollen') }}."
```

{% endraw %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

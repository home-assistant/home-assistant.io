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

## Reconfiguration

To move an entry to a new location:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **IRM KMI Weather Belgium**.
2. Next to the entry, select the three dots {% icon "mdi:dots-vertical" %} menu, then select **Reconfigure**.
3. Pick the new location and select **Submit**.

You can also move to another municipality. The entities keep their entity IDs and history, and the entry and its device take the name of the new municipality unless you renamed the entry. A municipality that already has an entry cannot be chosen.

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

## Limitations

1. The weather provider sometimes uses two weather conditions for the same day (see below). When this is the case, only the first weather condition is taken into account in this integration. <br/> <img src="/images/integrations/irm_kmi/monday.png" height="150" alt="Example of two weather conditions">

2. The trends for 14 days are not shown.

3. The provider only has data for Belgium, Luxembourg and The Netherlands. 

## Data updates

The integration {% term polling polls %} weather data every 7 minutes by default.

When a poll cannot reach the API, the weather entity keeps showing the data from the last poll that succeeded. Once that poll is more than 17.5 minutes old, the next failed poll makes the entity unavailable, until a poll succeeds again.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

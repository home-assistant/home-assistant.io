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
    description: "Override the Home Assistant language for forecast texts and warnings. Defaults to **Follow Home Assistant server language**. If that language is not English, French, Dutch, or German, English is used."
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
- **Next warning**: The start time of the next upcoming weather warning. Unknown if no warning is scheduled to start.

### Binary sensors

- **Warning**: On while at least one official weather warning is in effect. All published warnings, including upcoming ones, are listed in the `warnings` attribute.

Each item in the `warnings` attribute has these fields:

- `slug`: The warning type, independent of the language, such as `wind`, `ice_or_snow`, or `thunder`. It is `unknown` if the warning type is not recognized.
- `id`: The provider ID of the warning type.
- `level`: The severity, from 1 to 3. Empty if the provider did not send one.
- `friendly_name`: The name of the warning type in the configured language.
- `text`: The description of the warning in the configured language.
- `starts_at` and `ends_at`: When the warning is in effect.
- `is_active`: Whether the warning is in effect now.

## Limitations

1. The weather provider sometimes uses two weather conditions for the same day (see below). When this is the case, only the first weather condition is taken into account in this integration. <br/> <img src="/images/integrations/irm_kmi/monday.png" height="150" alt="Example of two weather conditions">

2. The trends for 14 days are not shown.

3. The provider only has data for Belgium, Luxembourg and The Netherlands. 

## Data updates

The integration {% term polling polls %} weather data every 7 minutes by default.

When a poll cannot reach the API, the weather entity keeps showing the data from the last poll that succeeded. Once that poll is more than 17.5 minutes old, the next failed poll makes the entity unavailable, until a poll succeeds again.

## Examples

### Notify when a weather warning is in effect

{% raw %}

```yaml
automation:
  - alias: "Notify on weather warning"
    triggers:
      - trigger: state
        entity_id: binary_sensor.brussels_warning
        to: "on"
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.my_device
        data:
          title: "Weather warning"
          message: >
            {% for warning in state_attr('binary_sensor.brussels_warning', 'warnings')
               | selectattr('is_active') %}
            {{ warning.friendly_name }} (level {{ warning.level }}): {{ warning.text }}
            {% endfor %}
```

{% endraw %}

To only react to one type of warning, filter on `slug`:

{% raw %}

```yaml
conditions:
  - condition: template
    value_template: >
      {{ state_attr('binary_sensor.brussels_warning', 'warnings')
         | selectattr('is_active')
         | selectattr('slug', 'eq', 'ice_or_snow')
         | list | count > 0 }}
```

{% endraw %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

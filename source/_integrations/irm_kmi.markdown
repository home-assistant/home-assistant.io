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

## IRM KMI automation examples

The warning entities let you react to official weather warnings in your automations. Here are two ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when a weather warning is in effect

Get a notification for each warning that is in effect when the **Warning** binary sensor turns on. The editor shows this state as **Unsafe**. The notification shows the warning type as the title and the provider's description as the message, both in the configured language.

- **Trigger**: State changed
  - **Entity**: Your own warning binary sensor, for example Brussels Warning (`binary_sensor.brussels_warning`)
  - **To**: Unsafe
- **Action**: Repeat
  - **Type**: For each
  - **Items**: The warnings in effect, see the YAML example
  - **Action**: Send a notification message
    - **Target**: My Device (`notify.my_device`)
    - **Title**: {% raw %}`Weather warning: {{ repeat.item.friendly_name }}`{% endraw %}
    - **Message**: {% raw %}`{{ repeat.item.text }}`{% endraw %}

{% details "YAML example for notifying on a weather warning" %}

{% example %}
automation: |
  alias: "Notify on weather warning"
  triggers:
    - trigger: state
      entity_id: binary_sensor.brussels_warning
      to: "on"
  actions:
    - repeat:
        for_each: >-
          {{ state_attr('binary_sensor.brussels_warning', 'warnings')
             | selectattr('is_active') | list }}
        sequence:
          - action: notify.send_message
            target:
              entity_id: notify.my_device
            data:
              title: "Weather warning: {{ repeat.item.friendly_name }}"
              message: "{{ repeat.item.text }}"
{% endexample %}

{% enddetails %}

### Automation: Close the awning on a wind warning

Close the awning as soon as a wind warning comes into effect. The trigger filters the `warnings` attribute on `slug`, which does not depend on the language. It also fires when a wind warning starts while another warning is already in effect, which a trigger on the binary sensor would miss. Add other types to the list, such as `thunder_wind_rain`, if you want to react to those too.

- **Trigger**: Template
  - **Value template**: The template from the YAML example
- **Action**: Close cover
  - **Target**: Awning (`cover.awning`)

{% details "YAML example for closing the awning on a wind warning" %}

{% example %}
automation: |
  alias: "Close the awning on a wind warning"
  triggers:
    - trigger: template
      value_template: >-
        {{ state_attr('binary_sensor.brussels_warning', 'warnings')
           | default([], true)
           | selectattr('is_active')
           | selectattr('slug', 'in', ['wind', 'thunderstorm_strong_gusts'])
           | list | count > 0 }}
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.awning
{% endexample %}

{% enddetails %}

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

---
title: Stookwijzer
description: Instructions on how to use Stookwijzer data within Home Assistant
ha_category:
  - Environment
  - Sensor
ha_release: 2023.2
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fwestenberg'
ha_domain: stookwijzer
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

The **Stookwijzer** {% term integration %} queries the [Atlas Leefomgeving Stookwijzer](https://www.atlasleefomgeving.nl/stookwijzer) API for windspeed and air quality index. Based on these values, Stookwijzer advises people not to burn pallets or wood or use barbecues. This can help prevent health issues for people in the area.

The state can provide three different levels of recommendations:

- **Code Yellow**: Please note: burning wood causes discomfort and air pollution.
- **Code Orange**: It is recommended not to burn wood now.
- **Code Red**: Do not burn wood now.

Additionally, various sensor entities are provided:

- **Windspeed**: Sensor containing the current windspeed at the selected location.
- **Air Quality Index**: Sensor containing the air quality index at the selected location.

{% include integrations/config_flow.md %}

{% include integrations/actions.md %}

## Examples

{% details "Example template sensor using get_forecast" %}

Example template sensors containing the Stookwijzer forecast for 6 and 12 hours from now.

```yaml
template:
  - trigger:
      - trigger: time_pattern
        hours: /1
    action:
      - action: stookwijzer.get_forecast
        data:
          config_entry_id: 1b4a46c6d0f3406c80d275f5b0c6483b
        response_variable: advice_forecast
    sensor:
      - name: Stookwijzer forecast 6 hours
        unique_id: stookwijzer_forecast_6_hours
        state: "{{ advice_forecast['forecast'][0]['advice'] }}"
        attributes:
          final: "{{ advice_forecast['forecast'][0]['final'] }}"
          timestamp: "{{ advice_forecast['forecast'][0]['datetime'] }}"
      - name: Stookwijzer forecast 12 hours
        unique_id: stookwijzer_forecast_12_hours
        state: "{{ advice_forecast['forecast'][1]['advice'] }}"
        attributes:
          final: "{{ advice_forecast['forecast'][1]['final'] }}"
          timestamp: "{{ advice_forecast['forecast'][1]['datetime'] }}"
```

{% enddetails %}

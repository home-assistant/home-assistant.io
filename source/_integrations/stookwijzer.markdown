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

## Action: Get Forecast

The `stookwijzer.get_forecast` action populates [response data](/docs/scripts/perform-actions#use-templates-to-handle-response-data)
with a mapping of the Stookwijzer advice forecast.

```yaml
action: stookwijzer.get_forecast
target:
  config_entry_id: 12345
response_variable: stookwijzer_forecast
```

The response data field contains the `forecast` field.
`forecast` is a list of forecast advice entries at a given time:

| Response data | Description                                                                 | Example                   |
|--------------|-----------------------------------------------------------------------------|---------------------------|
| `datetime`   | The time of the forecasted advice.                                         | 2025-01-14T14:00:00+00:00 |
| `advice`     | The forecasted advice code.                                               | code_yellow               |
| `final`      | Indicator whether the advice is final or can still change.                | True                      |

{% details "Example action response" %}

```yaml
forecast:
  - datetime: "2025-02-12T17:00:00+01:00"
    advice: code_yellow
    final: True
  - datetime: "2025-02-12T23:00:00+01:00"
    advice: code_yellow
    final: True
  - datetime: "2025-02-13T05:00:00+01:00"
    advice: code_orange
    final: False
  - datetime: "2025-02-13T11:00:00+01:00"
    advice: code_red
    final: False
```

{% enddetails %}

## Examples

{% details "Example template sensor using get_forecast" %}

Example template sensors containing the Stookwijzer forecast for 6 and 12 hours from now.

{% raw %}

```yaml
template:
  - trigger:
      - trigger: time_pattern
        hours: /1
    action:
      - action: stookwijzer.get_forecast
        target:
          entity_id: sensor.stookwijzer_advice_code
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

{% endraw %}

{% enddetails %}

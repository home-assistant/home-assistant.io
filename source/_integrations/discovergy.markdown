---
title: inexogy
description: Instructions on how to integrate inexogy smart meters within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: '2023.7'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@jpbede'
ha_domain: discovergy
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
ha_quality_scale: platinum
---

The **inexogy** {% term integration %} allows users to integrate their [inexogy](https://inexogy.com/) smart meters into Home Assistant.
The integration is using the [official REST API](https://api.inexogy.com/docs/#/) by inexogy.

The integration supports the following meter types within Home Assistant:

- [Electricity meter](#electricity-meter)
- [Gas meter](#gas-meter)

## Prerequisites

For this {% term integration %}, you need a inexogy smart meter, a [inexogy account](https://my.inexogy.com/) and your credentials.

{% include integrations/config_flow.md %}
{% configuration_basic %}
"Email address":
  description: "Email address to connect Home Assistant to your inexogy account"
Password:
  description: "Password for the account to connect Home Assistant to inexogy"
{% endconfiguration_basic %}

## Electricity meter

Sensor {% term entities %} are being added for current active power usage and the all-time total consumption.
By default, the sensors for phase-specific current active power usage are disabled but can be enabled in the entity settings.

In case you have a bidirectional meter for consumption and production, the all-time total production is added as well.

## Gas meter

A Sensor {% term entity %} is being added for total gas consumption.

## Provided sensors

Depending on your meter type, different sensors are available:

### Electricity - Main sensors
- `sensor.electricity_<street>_<number>_total_power`: Current power consumption in watts
- `sensor.electricity_<street>_<number>_total_consumption`: Total energy consumption in kWh
- `sensor.electricity_<street>_<number>_total_production`: Total energy production in kWh (bidirectional meters only)

### Electricity - Optional sensors (disabled by default)
- `sensor.electricity_<street>_<number>_phase_1_power`: Power consumption phase 1 in watts
- `sensor.electricity_<street>_<number>_phase_2_power`: Power consumption phase 2 in watts
- `sensor.electricity_<street>_<number>_phase_3_power`: Power consumption phase 3 in watts
- `sensor.electricity_<street>_<number>_phase_1_voltage`: Voltage phase 1 in volts
- `sensor.electricity_<street>_<number>_phase_2_voltage`: Voltage phase 2 in volts
- `sensor.electricity_<street>_<number>_phase_3_voltage`: Voltage phase 3 in volts

### Gas
- `sensor.gas_<street>_<number>_total_gas_consumption`: Total gas consumption in cubic meters

## Data update

The sensors are updated every 30 seconds. This pulls the latest data available from the inexogy API.
Note that this doesn't mean the meter data itself is new every 30 seconds. The frequency at which your meter sends new data to inexogy depends on your meter model and measurement concept.

## Use cases and examples

### Energy dashboard

The total consumption and production sensors provided by this integration are fully compatible with the [Home Assistant Energy Dashboard](/docs/energy/).

- `sensor.electricity_example_street_11_total_consumption` (total consumption) can be added to the "Grid consumption" field.
- `sensor.electricity_example_street_11_total_production` (total production) can be added to the "Return to grid" field.

### Automations

You can use the current power sensor (`sensor.electricity_example_street_11_total_power`) to trigger automations based on your electricity usage.

Example: Send a notification when power consumption exceeds 3000&nbsp;W for 5 minutes.

{% raw %}

```yaml
automation:
  - alias: High Power Consumption Detected
    trigger:
      - platform: numeric_state
        entity_id: sensor.electricity_example_street_11_total_power
        above: 3000
        for:
          minutes: 5
    action:
      - service: notify.mobile_app_your_device
        data:
          message: "High power consumption detected: {{ states('sensor.electricity_example_street_11_total_power') }} W"
```

{% endraw %}

Example: Turn off high-power devices when photovoltaic production is insufficient (for bidirectional meters).

{% raw %}

```yaml
automation:
  - alias: Consumption Control Based on PV Output
    trigger:
      - platform: state
        entity_id: sensor.electricity_example_street_11_total_power
    condition:
      - condition: numeric_state
        entity_id: sensor.electricity_example_street_11_total_power
        above: 0  # Positive value means grid consumption
    action:
      - service: switch.turn_off
        target:
          entity_id: switch.high_power_device
```

{% endraw %}

## Troubleshooting

### No data or stale sensors

If your sensors are not showing data or values are stale, check the following:

1. **inexogy Portal**: Log in to the [inexogy web portal](https://my.inexogy.com/) and check if it shows current data from your meter. If not, there might be an issue with your meter or connection to inexogy.

2. **Home Assistant Logs**: Check the Home Assistant logs for error messages related to the `inexogy` integration. Authentication errors (`Authentication failed`) mean your email address or password is incorrect.

3. **API Rate Limits**: The inexogy API has rate limits. Although the integration is designed to stay within these limits, frequent Home Assistant restarts or other tools using the API might lead to temporary blocks.

### Missing sensors

- **Production sensors**: The electricity production sensor is only available for bidirectional meters. If you have such a meter but don't see it, check your data in the inexogy portal.
- **Phase sensors**: Per-phase power and voltage sensors are disabled by default and not available for all meters. You can enable them on the integration page under "Entities".

### Network issues

If you see connection errors, ensure that Home Assistant has a stable internet connection. The integration needs access to `api.inexogy.com` over HTTPS (port 443).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

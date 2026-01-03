---
title: Weheat
description: Instructions on setting up Weheat within Home Assistant.
ha_category:
  - Climate
  - Energy
  - Sensor
ha_iot_class: Cloud Polling
ha_release: '2024.10'
ha_config_flow: true
ha_codeowners:
  - '@jesperraemaekers'
ha_domain: weheat
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

The **Weheat** {% term integration %} allows you to display your [Weheat](https://www.weheat.nl/) devices through Home Assistant.

## Supported devices

The Blackbird, Sparrow and Flint heat pumps are supported.

## Prerequisites

- You need a Weheat account, **username**, and **password**
- When adding the integration in Home Assistant, you will be prompted to enter a **Name**, **Client ID**,  and **Client Secret**.
  - The name is arbitrary, the ID and secret are provided in the [knowledge base](https://support.weheat.nl/s/article/Is-er-een-offici%C3%ABle-Home-Assistant-integratie).
- During setup of the integration in Home Assistant, you will be redirected to the Weheat login provider. Log in using your **username** and **password**.
  - After login, select **link account** to link your account.

{% include integrations/config_flow.md %}

## Entities

### Sensors

The Weheat integration provides the following sensors:

- **Output power**: Thermal power added to the water in Watts
- **Input power**: Electrical power in Watts
- **COP**: The Coefficient of performance between the above two power measurements
- **Water inlet temperature**: The heat pump water inlet temperature in °C
- **Water outlet temperature**: The heat pump water outlet temperature in °C
- **Water target temperature**: Target for the water temperature in °C
- **Central heating inlet temperature**: The central heating inlet temperature in °C
- **Outside temperature**: Outside temperature in °C
- **Current room temperature**: Current room temperature in °C
- **Room temperature setpoint**: Setpoint for the room temperature in °C
- **Electricity used**: Total electricity used in kWh
- **Energy output**: Total output generated in kWh
- **State**: The current heat pump state
- **DHW top temperature**: The domestic hot water temperature in the top of the vessel in °C (optional)
- **DHW bottom temperature"**: The domestic hot water temperature in the bottom of the vessel in °C (optional)
- **Compressor RPM**: The rpm of the compressor fan.
- **Compressor percentage**: The percentage of the compressor fan. Can exceed 100% for some models.

Depending on the model/installation, states for the Indoor Unit states are available:

- **Indoor unit water pump**
- **Indoor unit auxiliary water pump**
- **Indoor unit DHW valve or water pump**
- **Indoor unit gas boiler heating allowed** - Note: This may be True even when no gas boiler is installed or active at this time.
- **Indoor unit electric heater**

## Data updates

The integration is {% term polling %} and retrieves data every 30 seconds from the cloud.

## Actions

This integration does not provide any actions.

## Known limitations

There is currently no way to control the heat pump via this integration.

## Troubleshooting

In case no devices are discovered, make sure that you can log in to the [Weheat portal](https://portal.weheat.nl) and the correct heat pumps are visible there. If they are available there, contact Weheat support.

## Remove integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}

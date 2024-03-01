---
title: Fyta
description: Instructions on how to integrate Fyta sensors within Home Assistant.
ha_category:
  - Sensor
ha_release: 0.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@dontinelli'
ha_domain: fyta
ha_platforms:
  - sensor
ha_integration_type: integration
---

The **FYTA** {% term integration %} uses the open API of [FYTA](https://www.fyta.de) to obtain the data from your plant sensors and integrate these into Home Assistant.

For the authentication on the FYTA-server you need your login-credentials (email and password).

The integration provides a device for the controller interface and for all plants with a FYTA Beam sensor.

{% include integrations/config_flow.md %}

## Sensors

The following sensors are currently available for the controller:

| name                  | Unit   | Description   |
|-----------------------|--------|:-------------------------------------------|
| plant_number          |        | Number of plants                           |

The following sensors are currently available per plant:

| name                  | Unit   | Description   |
|-----------------------|--------|:-------------------------------------------|
| last_update           |        | Time of latest data update.                |
| plant_name            |        | Name of the plant (as set by user)         |
| scientific_name       |        | Scientific name of the plant               |
| plant_status          |        | FYTA-Status (number 1 to 5)                |
| temperature_status    |        | FYTA-Status (number 1 to 5)                |
| light_status          |        | FYTA-Status (number 1 to 5)                |
| moisture_status       |        | FYTA-Status (number 1 to 5)                |
| salinity_status       |        | FYTA-Status (number 1 to 5)                |
| temperature           | °C     | Temperature measured by sensor             |
| light                 | mol/d  | Light measured by sensor                   |
| moisture              | %      | Moisture measured by sensor                |
| salinity              | mS/cm  | Salinity measured by sensor                |
| battery_level         | %      | Battery level of the sensor                |


<div class='note'>
The fyta integration is using the fyta_cli package to get the data from the Fyta server (over the public API).
</div>

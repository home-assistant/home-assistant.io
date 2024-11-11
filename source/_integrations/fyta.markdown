---
title: FYTA
description: Instructions on how to integrate FYTA sensors within Home Assistant.
ha_category:
  - Sensor
ha_release: 2024.4
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@dontinelli'
ha_domain: fyta
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: hub
ha_quality_scale: platinum
---

The **FYTA** {% term integration %} uses the open API of [FYTA](https://www.fyta.de) to obtain the data from your plant sensors and integrate these into Home Assistant.

For the authentication on the FYTA server, you need your login-credentials (email and password).

The integration provides a device for all plants with a [FYTA Beam](https://fyta.de/collections/all/products/single-beam) sensor. In order to be able to access your plant data over the API, you need a [FYTA hub](https://fyta.de/collections/all/products/single-hub) that uploads the data from the Beam sensor to the FYTA server. Alternatively, the mobile app can serve as gateaway to upload the data from the Beam to the server. No direct connection to the FYTA Beam is supported.

{% include integrations/config_flow.md %}

## Sensors

The following sensors are currently available per plant:

| name                  | Unit   | Description   |
|-----------------------|--------|:-------------------------------------------|
| scientific_name       |        | Scientific name of the plant               |
| plant_status          |        | FYTA-Status (number 1 to 5)                |
| temperature_status    |        | FYTA-Status (number 1 to 5)                |
| light_status          |        | FYTA-Status (number 1 to 5)                |
| moisture_status       |        | FYTA-Status (number 1 to 5)                |
| salinity_status       |        | FYTA-Status (number 1 to 5)                |
| temperature           | °C     | Temperature measured by sensor             |
| light                 | μmol/h | Light measured by sensor (hourly photosynthetically active radiation PAR)|
| moisture              | %      | Moisture measured by sensor                |
| salinity              | mS/cm  | Salinity measured by sensor (measured as conductivity)|
| battery_level         | %      | Battery level of the sensor                |

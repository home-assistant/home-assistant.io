---
title: Arve
description: Instructions on how to integrate Arve into Home Assistant
ha_category:
  - Environment
  - Health
  - Sensor
ha_release: '2024.5'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@ikalnyi'
ha_domain: arve
ha_platforms:
  - sensor
ha_integration_type: integration
ha_config_flow: true
---

The **Arve** {% term integration %} provides the ability to monitor real-life air quality data, as measured by your [Arve](https://www.arveair.com) device.

{% include integrations/config_flow.md %}

To create an integration for an Arve device, you need to fill in two required fields.
Those are _Home Assistant access token_ and _Arve customer token_.
_Home Assistant access token_ and _Arve customer token_ can be obtained by the user on the [Arve web platform](https://dashboard.arveair.com).

## Measurement entities

At the moment, an Arve device has the following measurement entities:

| Entity name | Unit of measurement |
| ----------- | ------------------- |
| AQI         |                     |
| CO2         | ppm                 |
| Humidity    | %                   |
| PM10        | µg/m³               |
| PM25        | µg/m³               |
| Temperature | °C                  |
| TVOC        |                     |

Here:

AQI - air quality index;

CO2 - co2 measurement in parts per million;

Humidity - humidity percentage;

PM10 - concentration of particulates with a diameter less than 10&nbsp;µm;

PM25 - concentration of particulates with a diameter less than 2.5&nbsp;µm;

Temperature - temperature measurement in degrees Celsius;

TVOC - Total Volatile Organic Compounds index.

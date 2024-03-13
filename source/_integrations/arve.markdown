---
title: Arve
description: Instructions on how to integrate Arve into Home Assistant
ha_category:
  - Environment
  - Health
  - Sensor
ha_iot_class: Cloud Polling
ha_codeowners:
  - "@ikalnyi"
ha_domain: arve
ha_platforms:
  - sensor
ha_integration_type: hub
ha_external_link: https://github.com/home-assistant/core/tree/dev/homeassistant/components/arve
---

The **Arve** {% term integration %} provides the ability to monitor real life air quality data, measured by your [Arve](https://www.arveair.com) device.

{% include integrations/config_flow.md %}

To create an integration for an Arve device, the user needs to fill in three required fields.
Those are _Home Assistant acess token_, _Arve customer token_ and _Serial number_.
_Home Assistant access token_ and _Arve customer token_ can be obtained by the user on the [Arve web platform](https://dashboard.arveair.com).
The _serial number_ is located on the rear panel of the Arve device.

## Measurement entities

At the moment, Arve device has following measurement entities:

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

PM10 - concentration of particulates with diameter less than 10µm;

PM25 - concentration of particulates with diameter less than 2.5µm;

Temperature - temperature measurement in celsius degrees;

TVOC - Total Volatile Organic Compounds index.

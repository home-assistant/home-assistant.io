---
title: Airly
description: Instructions on how to integrate Airly within Home Assistant.
ha_category:
  - Health
ha_release: 0.101
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: airly
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

The **Airly** {% term integration %} uses the [Airly](https://airly.org/) web service as a source for air quality data for your location.

## Setup

To generate an Airly API key, go to [Airly for developers](https://developer.airly.org/register) page.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
    description: "The API key for your Airly account."
Latitude:
    description: "The latitude of the location for which to retrieve air quality data. By default, Home Assistant uses your home location."
Longitude:
    description: "The longitude of the location for which to retrieve air quality data. By default, Home Assistant uses your home location."
{% endconfiguration_basic %}

{% note %}
Airly allows 100 data updates per day. For this reason, the more Airly instances
configured, the less frequent updates will be. For one configured Airly instance,
data will be updated every 15 minutes, for two configured instances, data will
be updated every 30 minutes, for three configured instances, data will be 
updated every 45 minutes, and so on.
{% endnote %}

## Supported functionality

The **Airly** integration provides the following entities. Which entities are created depends on the data available from the Airly measuring stations closest to your location.

### Sensors

- **Common air quality index**
  - **Description**: Shows the Common Air Quality Index (CAQI) for your location. The `level`, `description`, and `advice` attributes provide a human-readable air quality level and a recommendation from Airly.
- **PM1**
  - **Description**: Shows the concentration of particulate matter smaller than 1 micrometer in micrograms per cubic meter.
- **PM2.5**
  - **Description**: Shows the concentration of particulate matter smaller than 2.5 micrometers in micrograms per cubic meter. The `limit` and `percent` attributes show the recommended limit and the measured value as a percentage of that limit.
- **PM10**
  - **Description**: Shows the concentration of particulate matter smaller than 10 micrometers in micrograms per cubic meter. The `limit` and `percent` attributes show the recommended limit and the measured value as a percentage of that limit.
- **Carbon monoxide**
  - **Description**: Shows the carbon monoxide concentration in micrograms per cubic meter. The `limit` and `percent` attributes show the recommended limit and the measured value as a percentage of that limit.
- **Nitrogen dioxide**
  - **Description**: Shows the nitrogen dioxide concentration in micrograms per cubic meter. The `limit` and `percent` attributes show the recommended limit and the measured value as a percentage of that limit.
- **Ozone**
  - **Description**: Shows the ozone concentration in micrograms per cubic meter. The `limit` and `percent` attributes show the recommended limit and the measured value as a percentage of that limit.
- **Sulphur dioxide**
  - **Description**: Shows the sulfur dioxide concentration in micrograms per cubic meter. The `limit` and `percent` attributes show the recommended limit and the measured value as a percentage of that limit.
- **Humidity**
  - **Description**: Shows the relative humidity in percent.
- **Pressure**
  - **Description**: Shows the atmospheric pressure in hectopascals.
- **Temperature**
  - **Description**: Shows the air temperature in degrees Celsius.

## Known limitations

Airly allows 100 data updates per day. Data updates become less frequent as you add Airly integration instances, as described in [Setup](#setup).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

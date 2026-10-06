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

## Automation examples

The following examples show how to use the integration in Home Assistant automations. These examples are just a starting point, and you can use them as inspiration to create your own automations.

{% include docs/paste_yaml_tip.md %}

### Automation: notify when the air quality is poor

This automation sends a notification when the common air quality index goes above 75, which is where the index enters the "high" range. The message includes the current index value and the advice provided by Airly.

In the automation editor:

- **Trigger**: Numeric state crossed threshold
  - **Entity**: Common air quality index (`sensor.airly_common_air_quality_index`)
  - **Above**: `75`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Title**: `Poor air quality`
  - **Message**: The current index value and the advice from Airly

{% details "YAML example for notifying when the air quality is poor" %}

{% example %}
automation: |
  alias: "Notify when the air quality is poor"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.airly_common_air_quality_index
      above: 75
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Poor air quality"
        message: >
          The air quality index is
          {{ states('sensor.airly_common_air_quality_index') }}.
          {{ state_attr('sensor.airly_common_air_quality_index', 'advice') }}
{% endexample %}

{% enddetails %}

### Automation: control an air purifier based on the PM2.5 level

These two automations turn on an air purifier when the PM2.5 level goes above 25 µg/m³ and turn it off when the level drops below 15 µg/m³. Using two different thresholds keeps the purifier from turning on and off repeatedly when the level hovers around a single threshold.

In the automation editor, create the first automation:

- **Trigger**: Numeric state crossed threshold
  - **Entity**: PM2.5 (`sensor.airly_pm2_5`)
  - **Above**: `25`
- **Action**: Turn on fan
  - **Target**: Air purifier (`fan.air_purifier`)

{% details "YAML example for turning on the air purifier" %}

{% example %}
automation: |
  alias: "Turn on the air purifier when PM2.5 is high"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.airly_pm2_5
      above: 25
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.air_purifier
{% endexample %}

{% enddetails %}

Then create the second automation:

- **Trigger**: Numeric state crossed threshold
  - **Entity**: PM2.5 (`sensor.airly_pm2_5`)
  - **Below**: `15`
- **Action**: Turn off fan
  - **Target**: Air purifier (`fan.air_purifier`)

{% details "YAML example for turning off the air purifier" %}

{% example %}
automation: |
  alias: "Turn off the air purifier when PM2.5 is low"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.airly_pm2_5
      below: 15
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.air_purifier
{% endexample %}

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Known limitations

Airly allows 100 data updates per day. Data updates become less frequent as you add Airly integration instances, as described in [Setup](#setup).

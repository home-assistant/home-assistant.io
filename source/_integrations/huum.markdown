---
title: Huum
description: Instructions on how to integrate Huum saunas into Home Assistant.
ha_release: 2024.2
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@frwickst'
  - '@vincentwolsink'
ha_domain: huum
ha_integration_type: device
ha_config_flow: true
ha_quality_scale: bronze
related:
  - url: https://huum.eu/
    title: Huum
  - url: https://huum.eu/products/uku-wifi/
    title: Huum UKU WiFi smart sauna control system
ha_platforms:
  - binary_sensor
  - climate
  - light
  - number
  - sensor
ha_category:
  - Binary sensor
  - Climate
  - Light
  - Number
  - Sensor
---

The **Huum** {% term integration %} lets you monitor and control your [Huum](https://huum.eu/) sauna from Home Assistant. Huum manufactures electric sauna heaters with smart connectivity, allowing you to adjust the temperature and, when your sauna controller supports these features, control the light and manage the steamer humidity level right from your dashboard.

Use case: Preheat your sauna before you get home, and, when your controller includes light or steamer control, automate the light and humidity based on schedules, or monitor the sauna temperature from anywhere.

## Prerequisites

Before setting up this integration, make sure you have:

1. A Huum UKU WiFi sauna control system installed and connected to the internet.
2. A Huum account. You can create one in the **Huum** app. Your username is usually your email address.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
    description: "The username of your Huum account, which is usually your email address."
Password:
    description: "The password of your Huum account."
{% endconfiguration_basic %}

## Supported functionality

The **Huum** integration provides the following entities.

### Binary sensors

- **Door**
  - **Description**: Indicates whether the sauna door is open or closed.

### Climate

- **Sauna heater**
  - **Description**: Controls the sauna heater. You can adjust the target temperature within the range configured on the sauna controller (defaults to 40–110 °C, with a step of 1 °C).
  - **Modes**: Heat, Off
  - **Remarks**: The target temperature can only be changed while the sauna is in heat mode.

### Lights

- **Light**
  - **Description**: Turns the sauna light on or off.
  - **Remarks**: Only available if the sauna controller is configured with a light or a steamer and light combination.

### Numbers

- **Humidity**
  - **Description**: Controls the steamer duty cycle (0–10) to adjust the sauna humidity level.
  - **Remarks**: Only available if the sauna controller is configured with a steamer or a steamer and light combination. The humidity level can only be changed while the sauna is actively heating.

### Sensors

- **Temperature**
  - **Description**: Shows the current sauna temperature in degrees Celsius.

## Data updates

The **Huum** integration {% term polling polls %} the Huum cloud service every 30 seconds for status updates.

## Known limitations

- The light and steamer entities are only available when the corresponding hardware is configured on the sauna controller.
- The steamer humidity level can only be adjusted while the sauna is actively heating.
- The target temperature can only be changed while the sauna is in heat mode.
- The integration applies the same safety measures as the Huum app. If a safety condition is triggered (for example, the sauna door is open), the sauna will not turn on.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

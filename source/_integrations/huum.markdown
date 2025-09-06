---
title: Huum
description: Instructions on how to integrate a Huum saunas into Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Light
  - Number
ha_release: 2024.2
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@frwickst'
  - '@vincentwolsink'
ha_domain: huum
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - climate
  - light
  - number
ha_integration_type: integration
---

Integrates [Huum](https://huum.eu/) saunas into Home Assistant.

You’ll need your username (which is usually your email) and password to configure the integration.

The integration takes the same security measures regarding an open sauna door as the Huum app.
If the sauna door is open, the sauna will not turn on.

{% note %}
When the sauna is off, you must turn on the sauna before setting the temperature.
This is as a security measure so that one does not turn on the
sauna by mistake.
{% endnote %}

{% include integrations/config_flow.md %}

## Available platforms & entities

### Binary sensors

- **Door**: Sauna door state (open or closed).

### Climate

The climate entity controls the sauna heater and offers the following capabilities:

- Adjust target temperature
- Change operation mode (off or heat)

### Light

- **Light**: Sauna light control (on or off).

### Number

- **Humidity**: Control steamer duty cycle (0-10) to adjust sauna humidity.


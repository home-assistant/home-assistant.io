---
title: Volkswagen WeConnect
description: Instructions on how to add Volkswagen WeConnect to Home Assistant.
ha_category:
  - Car
  - Device tracker
  - Lock
  - Sensor
ha_release: '2024.11'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@krzysdabro'
ha_domain: weconnect
ha_platforms:
  - device_tracker
  - lock
  - sensor
ha_integration_type: integration
---

The **Volkswagen WeConnect** {% term integration %} allows you to interact with your Volkswagen vehicle using the WeConnect service.

## Prerequisites

You must have a [WeConnect](https://www.myvolkswagen.net/) account and a Volkswagen vehicle to use this integration.

{% include integrations/config_flow.md %}

{% note %}
To use the lock feature, you must complete ID verification in the WeConnect service and set up S-PIN during integration configuration.
{% endnote %}

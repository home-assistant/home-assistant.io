---
title: Epion
description: Instructions on how to integrate Epion Air CO2 sensors with Home Assistant
ha_category:
  - Environment
  - Sensor
ha_release: '2024.2'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@lhgravendeel'
ha_config_flow: true
ha_domain: epion
ha_platforms:
  - sensor
ha_integration_type: hub
---

Integrates Epion Air sensors into Home Assistant.

[Epion](https://www.epion.nl/) helps you provide insights into air quality, easy to use for everyone.

Requires a configured Epion Air device and an Epion account with access to this device.

## Prerequisites

Epion API token setup.

1. Login to [Epion](https://www.epion.nl/).
2. Select [Integrations](https://epion.nl/dashboard/integrations) in the left menu.
3. To create a new token, if you don't see one already, select **Generate new Token**.
4. Copy your generated token. The token is a set of alphanumeric characters separated by hyphens. It starts with "a/".

The Epion integration can now be activated using this API token.

All connected devices will show entities for the carbon dioxide (CO2) concentration, temperature, relative humidity, and barometric pressure.

{% include integrations/config_flow.md %}

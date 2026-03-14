---
title: TRMNL
description: Instructions on how to integrate TRMNL with Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.4
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: trmnl
ha_platforms:
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **TRMNL** {% term integration %} allows you to monitor your [TRMNL](https://usetrmnl.com/) e-paper screens in Home Assistant. TRMNL devices are low-power e-paper displays that show content such as calendars, weather, and custom dashboards at a glance.

## Prerequisites

To use this integration, you need a TRMNL developer license.

1. Open [your TRMNL account settings](https://trmnl.com/account).
2. Copy your API key. It starts with `user_`.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
    description: "The API key for your TRMNL account."
{% endconfiguration_basic %}

## Supported functionality

The **TRMNL** integration provides the following entities for each TRMNL device on your account.

### Sensors

- **Battery**: The current battery level of the device, in percent.
- **Signal strength**: The Wi-Fi signal strength of the device, in dBm. This entity is disabled by default.

## Data updates

The integration {% term polling polls %} the TRMNL API every hour to update sensor data.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

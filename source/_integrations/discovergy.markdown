---
title: inexogy
description: Instructions on how to integrate inexogy within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: '2023.7'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@jpbede'
ha_domain: discovergy
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
ha_quality_scale: silver
---

The **inexogy** {% term integration %} allows users to integrate their [inexogy](https://inexogy.com/) smart meters into Home Assistant.
The integration is using the [official REST API](https://api.inexogy.com/docs/#/) by inexogy.

The integration supports the following meters within Home Assistant:

- [Electricity meter](#electricity-meter)
- [Gas meter](#gas-meter)

## Prerequisites

For this {% term integration %}, you need a inexogy smart meter, a [inexogy account](https://my.inexogy.com/) and your credentials.

{% include integrations/config_flow.md %}
{% configuration_basic %}
"Email address":
  description: "Email address to connect Home Assistant to your inexogy account"
Password:
  description: "Password for the account to connect Home Assistant to inexogy"
{% endconfiguration_basic %}

## Electricity meter

Sensor {% term entities %} are being added for current active power usage and the all-time total consumption.
By default, the sensors for phase-specific current active power usage are disabled.

In case you have a combined meter for consumption and production, the all-time total production is added as well.

## Gas meter

A Sensor {% term entity %} is being added for total gas consumption.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

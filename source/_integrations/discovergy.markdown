---
title: Discovergy
description: Instructions on how to integrate Discovergy within Home Assistant.
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
---

The **Discovergy** {% term integration %} allows users to integrate their [Discovergy](https://discovergy.com/) smart meters into Home Assistant.
The integration is using the [official REST API](https://api.discovergy.com/docs/#/) by Discovergy.

The integration supports the following meters within Home Assistant:

- [Electricity meter](#electricity-meter)
- [Gas meter](#gas-meter)

## Prerequisites

For this {% term integration %}, you need a Discovergy smart meter, a [Discovergy account](https://my.discovergy.com/) and your credentials.

{% include integrations/config_flow.md %}

## Electricity meter

Sensor {% term entities %} are being added for current active power usage and the all-time total consumption.
By default, the sensors for phase-specific current active power usage are disabled.

In case you have a combined meter for consumption and production, the all-time total production is added as well.

## Gas meter

A Sensor {% term entity %} is being added for total gas consumption.

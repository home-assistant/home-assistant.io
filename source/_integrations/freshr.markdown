---
title: Fresh-r
description: Instructions on how to integrate Fresh-R ventilation solutions within Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.1.2
ha_iot_class: Cloud Polling
ha_domain: freshr
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
ha_codeowners:
  - '@SierraNL'
---

The **Fresh-R** {% term integration %} connects to the [Fresh-R.me](https://www.fresh-r.me/) cloud dashboard, letting you monitor all Fresh-R ventilation devices linked to your account. It polls the Fresh-R cloud to keep your data up to date.

## Prerequisites

- A Fresh-R account on [Fresh-R.me](https://www.fresh-r.me/).
- At least one Fresh-R ventilation unit connected to your Fresh-R account.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: The email address you use to sign in to your Fresh-R account.
Password:
  description: The password for your Fresh-R account.
{% endconfiguration_basic %}

## Supported functionality

### Sensors

The integration provides the following sensors:

- **Inside temperature**: Temperature of the air leaving the ventilation unit, in °C.
- **Outside temperature**: Temperature of the incoming fresh air, in °C.
- **Inside CO2**: CO2 concentration of the indoor air, in ppm.
- **Inside humidity**: Relative humidity of the indoor air, in %.
- **Flow**: Air flow rate through the ventilation unit, in m³/h.
- **Dew point**: Dew point temperature of the indoor air, in °C.

{% note %}
Some Fresh-R systems include an air quality sensor, which is not yet supported by this integration.
{% endnote %}

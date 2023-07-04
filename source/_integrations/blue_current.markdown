---
title: Blue Current
description: Instructions on how to integrate Blue Current charge points within Home Assistant.
ha_category:
  - Sensor
  - Car
ha_release: 2022.12
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@Floris272'
  - '@gleeuwen'
ha_domain: blue_current
ha_platforms:
  - sensor
---

[Blue Current](https://www.bluecurrent.nl/) is an Dutch company that makes electric car chargers.

The Blue Current integration allows you to connect to your blue current account to Home Assistant and monitor your charge point(s).

## Prerequisites

1. Log in to the [Blue Current driver portal](https://my.bluecurrent.nl/).
2. Goto settings and enable developer mode.
3. Generate an API token.

{% include integrations/config_flow.md %}

## Sensor

The Blue Current integration provides the following sensors:

### Charge point sensors

- Activity
- Average current
- Average voltage
- Energy usage in kWh
- Max usage in Amps
  - The max amps the charge point can use.
- Offline since
- Started on
- Stopped on
- Total cost in EUR
- Total kW (estimate)
- Vehicle status

The following sensors are created as well, but disabled by default:

- Current phase 1-3
- offline max usage
- remaining current
- smart charging max usage
- Voltage phase 1-3

### Grid sensors

- Grid average current
- Grid max current

The following sensors are created as well, but disabled by default:

- Grid current phase 1-3

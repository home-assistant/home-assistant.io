---
title: Tessie
description: Instructions on how to integrate Tessie within Home Assistant.
ha_category:
  - Sensor
ha_release: 2024.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: tessie
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Tessie integration displays various sensors from the vehicles in your [Tessie](https://my.tessie.com/) account.

## Prerequisites

You must have a [Tessie](https://my.tessie.com/) account and [access token](https://my.tessie.com/settings/api).

{% include integrations/config_flow.md %}

## Entities

### Sensor

The integration will create sensor entities for a variety of metrics that relate to your vehicles:

#### Charge State
- Battery Level
- Change Energy Added
- Change Power
- Charge Voltage
- Charger Current
- Change Rate
- Battery Range

#### Drive State
- Speed
- Power
- Shift State

### Vehicle State
- Odometer
- Tyre Pressure Front Left
- Tyre Pressure Front Right
- Tyre Pressure Rear Left
- Tyre Pressure Rear Right

### Climate State
- Inside Temperature
- Outside Temperature
- Driver Temperature Setting
- Passenger Temperature Setting
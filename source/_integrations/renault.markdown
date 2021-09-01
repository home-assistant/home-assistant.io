---
title: Renault
description: Instructions on how to integrate Renault car into Home Assistant.
ha_category:
  - Car
  - Binary Sensor
  - Sensor
ha_release: 2021.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@epenet'
ha_domain: renault
ha_platforms:
  - binary_sensor
  - sensor
---

The Renault integration offers integration with the **MyRenault** cloud service and provides sensors such as charger state and temperature.

This integration provides the following platforms:

- Binary sensors - such as plug and charge status.
- Sensors - such as battery level, outside temperature, odometer, estimated range, and charging rate.

## Prerequisites

You need two API keys: one for Gigya and one for Kamereon and they shouldn't be confused with your API credentials. Instructions can be found at [https://github.com/jamesremuscat/pyze#obtaining-api-keys].


{% include integrations/config_flow.md %}

All vehicles linked to the account should then get added as devices, with sensors added as linked entity.

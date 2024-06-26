---
title: Iskra
description: Instructions on how to connect your Iskra energy meters to Home Assistant.
ha_release: 2024.6
ha_category:
  - Energy
  - Sensor
ha_codeowners:
  - '@iskrakranj'
ha_config_flow: true
ha_domain: iskra
ha_iot_class: local_polling
ha_platforms:
  - sensor
ha_integration_type: integration
---

# Iskra

## Description

Instructions on how to connect your Iskra energy meters to Home Assistant.

- **Home Assistant Release:** 2024.6
- **Categories:** Energy, Sensor
- **Code Owners:** [@iskrakranj](https://github.com/iskrakranj)
- **Config Flow:** True
- **Domain:** iskra
- **IoT Class:** Local Polling
- **Platforms:** Sensor
- **Integration Type:** Integration

The [Iskra](https://www.iskra.eu/) {% term integration %} provides data from Iskra's energy meters and power quality analyzers. It polls data using Modbus TCP or Iskra smartgateway's RestAPI.

## Supported devices

### Energy meters

Most energy meters support Modbus RTU over RS485 and IR, so a Modbus TCP gateway or Iskra's Smart Gateway is required:

- Impact series (IEXX)
- WM series (WMXX)

### Power quality analyzers

These usually support ethernet connection, so Modbus TCP is used to poll measurements:

- iMT/MT series
- iMC/MC series

## Prerequisites

- Set a static IP or assign a static DHCP lease for the power quality analyzer or smart gateway device.
- If using Iskra's Smart Gateway, select the Rest API connection type, and all connected devices will be automatically added.

{% include integrations/config_flow.md %}

## Monitored Data

The integration provides detailed information about power, current, and voltage for each phase, as well as energy counters. The data is updated every minute.

## Note

Energy counters are named "non-resettable counter" and "resettable counter." The direction (export/import) and energy type (active power, reactive power, apparent power) their count depend on the user's settings through MiQen software.

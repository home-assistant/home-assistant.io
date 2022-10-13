---
title: P1 Monitor
description: Instructions on how to integrate P1 Monitor within Home Assistant.
ha_category:
  - Energy
ha_release: 2021.9
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@klaasnicolaas'
ha_domain: p1_monitor
ha_platforms:
  - diagnostics
  - sensor
ha_quality_scale: platinum
ha_integration_type: integration
---

The P1 Monitor integration integrates the [P1 Monitor](https://www.ztatz.nl/p1-monitor/)
API platform with Home Assistant.

P1 Monitor is a platform that allows you to read the data from your smart meter via the serial port (P1), such as your energy consumption, but also that of gas or a water meter.

{% include integrations/config_flow.md %}

## Sensors

The P1 Monitor platform mainly provides sensors that you can use in your
[energy dashboard](/energy).

**Note** that by default, the gas consumption entities are disabled, so if you want to use them, you need to enable them manually.

### SmartMeter

Read out what your meter readings are for energy consumption/yield, see what your current power consumption is and in which tariff period you are currently.

- Gas Consumption (m3)
- Power Consumption / Production (W)
- Energy Consumption Low/High (kWh)
- Energy Production Low/High (kwH)
- Energy Tariff Period (low / high)

### Phases

See per phase what your voltage, current and power consumption/production is.

- Voltage phases L1/2/3 (V)
- Current Phases L1/2/3 (A)
- Power consumed phases L1/2/3 (W)
- Power Produced phases L1/2/3 (W)

### WaterMeter

See how much water you consume per day, in total and the number of counted pulses.

- Water Consumption - day (liters)
- Water Consumption - total (m3)
- Pulse Count

### Settings

You can use the rates set in P1 Monitor for your calculations in Home Assistant.

- Gas Consumption Price
- Energy Consumption Price Low/High
- Energy Production Price Low/High

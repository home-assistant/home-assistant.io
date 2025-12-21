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
ha_integration_type: integration
---

The **P1 Monitor** {% term integration %} allows you to gather data from your [P1 Monitor](https://www.ztatz.nl/p1-monitor/) device and use it in Home Assistant.

P1 Monitor is a piece of software that can be installed on a Raspberry Pi or other Linux-based system. It reads the data from your smart meter via the serial port (P1), such as your energy consumption, but also that of gas or a water meter.

{% note %}
If you’re not using **P1 Monitor** software, you’re likely looking for the [DSMR Smart Meter](/integrations/dsmr/) integration, which connects directly to DSMR-compatible smart meters.
{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or hostname of your P1 Monitor instance.
Port:
  description: The port number of your P1 Monitor instance. The default port is `80`.
{% endconfiguration_basic %}

## Data updates

The integration will poll your P1 Monitor instance every 5 seconds to update the data in Home Assistant.

## Sensors

The P1 Monitor platform mainly provides sensors that you can use in your [energy dashboard](/energy).

### SmartMeter

Read out what your meter readings are for energy consumption/yield, see what your current power consumption is and in which tariff period you are currently.

- Gas Consumption (m3)
- Power Consumption / Production (W)
- Energy Consumption Low/High (kWh)
- Energy Production Low/High (kWh)
- Energy Tariff Period (low / high)

{% note %}
By default, the gas consumption entity is disabled. To use it, you need to enable it.
{% endnote %}

### Phases

See per phase what your voltage, current and power consumption/production is.

- Voltage phases L1/2/3 (V)
- Current Phases L1/2/3 (A)
- Power consumed phases L1/2/3 (W)
- Power Produced phases L1/2/3 (W)

### WaterMeter

{% important %}
You need to run at least version **1.1.0** of P1 Monitor, to use a water meter.
{% endimportant %}

See how much water you consume per day, in total and the number of counted pulses.

- Water Consumption - day (liters)
- Water Consumption - total (m3)
- Pulse Count

### Settings

You can use the rates set in P1 Monitor for your calculations in Home Assistant.

- Gas Consumption Price
- Energy Consumption Price Low/High
- Energy Production Price Low/High

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

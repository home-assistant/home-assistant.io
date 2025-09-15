---
title: Imeon Inverter
description: Instructions on Imeon Inverter Integration for Imeon inverters with Home Assistant.
ha_release: 2025.5
ha_category:
  - Energy
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Imeon-Energy'
ha_domain: imeon_inverter
related:
  - url: https://imeon-energy.com/
  - title: Imeon Energy website
ha_integration_type: device
ha_quality_scale: bronze
ha_platforms:
  - sensor
  - select
ha_ssdp: true
---

The Imeon Energy Inverter {% term integrations %} will poll an [Imeon](https://imeon-energy.com/) solar inverter in Home Assistant.

## Prerequisites

- The Imeon inverter must be connected to the local network.
- [OS One](https://imeon-energy.com/os-one/) version must be **1.8.1.4** or higher.
- *ModuleAPI* application must be activated on the OS One pannel of your Imeon inverter.
   - To do so, connect to **OS One** > **Applications** and by hovering over *ModuleAPI*, select **Activate**.

{% include integrations/config_flow.md %}

## Supported functionality

This document provides an overview of the sensors available in the Imeon Inverter integration and details their functionality, units, and purpose.

### Battery sensors

| Sensor key         | Description                                      | Unit |
| ------------------ | ------------------------------------------------ | ---- |
| `battery_power`    | Power currently used or supplied by the battery. | W    |
| `battery_soc`      | State of charge of the battery.                  | %    |
| `battery_status`   | Current status of the battery.                   | —    |
| `battery_stored`   | Power stored in the battery.                     | W    |
| `battery_consumed` | Power consumed from the battery.                 | W    |

### Grid sensors

| Sensor key        | Description                   | Unit |
| ----------------- | ----------------------------- | ---- |
| `grid_current_l1` | Current on grid line 1.       | A    |
| `grid_current_l2` | Current on grid line 2.       | A    |
| `grid_current_l3` | Current on grid line 3.       | A    |
| `grid_frequency`  | Frequency of the grid supply. | Hz   |
| `grid_voltage_l1` | Voltage on grid line 1.       | V    |
| `grid_voltage_l2` | Voltage on grid line 2.       | V    |
| `grid_voltage_l3` | Voltage on grid line 3.       | V    |

### AC input sensors

| Sensor key          | Description            | Unit |
| ------------------- | ---------------------- | ---- |
| `input_power_l1`    | Power input on line 1. | W    |
| `input_power_l2`    | Power input on line 2. | W    |
| `input_power_l3`    | Power input on line 3. | W    |
| `input_power_total` | Total power input.     | W    |

### Inverter settings sensors

| Sensor key                        | Description                           | Unit |
| --------------------------------- | ------------------------------------- | ---- |
| `inverter_charging_current_limit` | Charging current limit of inverter.   | A    |
| `inverter_injection_power_limit`  | Power injection limit of inverter.    | W    |
| `manager_inverter_state`          | Current state of the inverter (enum). | —    |

### Inverter setting select

| Select key              | Description                                   | Unit |
| ----------------------- | --------------------------------------------- | ---- |
| `manager_inverter_mode` | View or change the inverter operating mode.   | —    |

### Meter sensors

| Sensor key    | Description                      | Unit |
| ------------- | -------------------------------- | ---- |
| `meter_power` | Current measured power by meter. | W    |

### AC output sensors

| Sensor key           | Description               | Unit |
| -------------------- | ------------------------- | ---- |
| `output_current_l1`  | Output current on line 1. | A    |
| `output_current_l2`  | Output current on line 2. | A    |
| `output_current_l3`  | Output current on line 3. | A    |
| `output_frequency`   | Frequency of the output.  | Hz   |
| `output_power_l1`    | Output power on line 1.   | W    |
| `output_power_l2`    | Output power on line 2.   | W    |
| `output_power_l3`    | Output power on line 3.   | W    |
| `output_power_total` | Total output power.       | W    |
| `output_voltage_l1`  | Output voltage on line 1. | V    |
| `output_voltage_l2`  | Output voltage on line 2. | V    |
| `output_voltage_l3`  | Output voltage on line 3. | V    |

### Solar panel sensors

| Sensor key       | Description                     | Unit |
| ---------------- | ------------------------------- | ---- |
| `pv_consumed`    | Power from PV consumed locally. | W    |
| `pv_injected`    | Power from PV injected to grid. | W    |
| `pv_power_1`     | Power from PV string 1.         | W    |
| `pv_power_2`     | Power from PV string 2.         | W    |
| `pv_power_total` | Total PV power production.      | W    |

### Temperature sensors

| Sensor key                   | Description                        | Unit |
| ---------------------------- | ---------------------------------- | ---- |
| `temp_air_temperature`       | Ambient air temperature.           | °C   |
| `temp_component_temperature` | Temperature of inverter component. | °C   |

### Monitoring sensors (last 24 hours)

| Sensor key                    | Description                  | Unit |
| ----------------------------- | ---------------------------- | ---- |
| `monitoring_self_produced`    | Power self-produced.         | W    |
| `monitoring_self_consumption` | Self-consumption percentage. | %    |
| `monitoring_self_sufficiency` | Self-sufficiency percentage. | %    |

### Monitoring sensors (instant minute data)

| Sensor key                               | Description                  | Unit |
| ---------------------------------------- | ---------------------------- | ---- |
| `monitoring_minute_building_consumption` | Building power consumption.  | W    |
| `monitoring_minute_grid_consumption`     | Grid power consumption.      | W    |
| `monitoring_minute_grid_injection`       | Power injected to grid.      | W    |
| `monitoring_minute_grid_power_flow`      | Net power flow to/from grid. | W    |
| `monitoring_minute_solar_production`     | Solar production power.      | W    |

### Timeline sensor

| Sensor key          | Description              | Unit |
| ------------------- | ------------------------ | ---- |
| `timeline_type_msg` | Current timeline status. | —    |

### Daily energy counters (made for the Home Assistant energy panel)

| Sensor key                    | Description                         | Unit |
| ----------------------------- | ----------------------------------- | ---- |
| `energy_pv`                   | Energy produced by PV today.        | Wh   |
| `energy_grid_injected`        | Energy injected to grid today.      | Wh   |
| `energy_grid_consumed`        | Energy consumed from grid today.    | Wh   |
| `energy_building_consumption` | Energy building consumption today.  | Wh   |
| `energy_battery_stored`       | Energy stored in battery today.     | Wh   |
| `energy_battery_consumed`     | Energy consumed from battery today. | Wh   |

## Troubleshooting

### What is my domain name?

The domain name is the internal name given to your inverter by Home Assistant. It's based on the initial name you gave to your device, albeit formatted to avoid internal issues.

- A name such as `Imeon Inverter number 57` would give you a domain name of `imeon_inverter_number_57`.
- If you're still struggling to find the domain name, check the internal name of the entities under the device. The name of each variable is `DOMAIN_variable-name`, for example `neo_110_inverter_software_version` tells us the domain name is `neo_110`.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

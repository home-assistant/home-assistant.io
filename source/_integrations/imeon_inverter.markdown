---
title: Imeon Inverter
description: Instructions on Imeon Energy Integration for Imeon inverters with Home Assistant.
ha_release: 2024.12
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
title: Imeon Energy website
ha_integration_type: device
---

The Imeon Energy Inverter integration will poll a [Imeon](https://imeon-energy.com/) solar inverter in Home Assistant.

**Please take a look at [extra resources](https://github.com/Imeon-Inverters-for-Home-Assistant/imeon-integration-extras) for custom dashboards for this integration**.

## Requirements

- The Imeon must be connected to the local network.
- [OS One](https://imeon-energy.com/os-one/) version must be **1.8.4** or higher.
- *ModuleAPI* application must be activated on the OS One pannel of your Imeon.
   > To do so, connect to `OS One` > `Applications` and by hovering over *ModuleAPI*, click on "Activate".

## Configuring the integration

The Imeon Inverter integration supports configuration via the Home Assistant UI. To set it up:

1. **Access Integrations:**
   - Go to the Home Assistant UI, navigate to `Configuration` > `Integrations`.

2. **Add Integration:**
   - Click the "+" button to add a new integration and search for "Imeon Inverter".

3. **Follow Setup Wizard:**
   - Follow the on-screen instructions to complete the integration setup.

## Imeon Inverter Sensors Documentation

This document provides an overview of the sensors available in the Imeon Inverter integration and details their functionality, units, and purpose.

### Battery Sensors

| Sensor Key           | Description                                            | Unit   |
|----------------------|--------------------------------------------------------|--------|
| `battery_autonomy`   | Indicates the battery autonomy.                        | None   |
| `battery_charge_time`| Time required to fully charge the battery.             | None   |
| `battery_power`      | Power currently being used or supplied by the battery. | W      |
| `battery_soc`        | State of charge of the battery.                        | %      |
| `battery_stored`     | Total energy stored in the battery.                    | Wh     |

### Grid Sensors

| Sensor Key           | Description                      | Unit   |
|----------------------|-------------------------------|--------|
| `grid_current_l1`    | Current on grid line 1.       | A      |
| `grid_current_l2`    | Current on grid line 2.       | A      |
| `grid_current_l3`    | Current on grid line 3.       | A      |
| `grid_frequency`     | Frequency of the grid supply. | Hz     |
| `grid_voltage_l1`    | Voltage on grid line 1.       | V      |
| `grid_voltage_l2`    | Voltage on grid line 2.       | V      |
| `grid_voltage_l3`    | Voltage on grid line 3.       | V      |

### AC Input Sensors

| Sensor Key           | Description            | Unit   |
|----------------------|------------------------|--------|
| `input_power_l1`     | Power input on line 1. | W      |
| `input_power_l2`     | Power input on line 2. | W      |
| `input_power_l3`     | Power input on line 3. | W      |
| `input_power_total`  | Total power input.     | W      |

### Inverter Settings Sensors

| Sensor Key                        | Description                           | Unit   |
|-----------------------------------|---------------------------------------|--------|
| `inverter_charging_current_limit` | Maximum charging current allowed.     | A      |
| `inverter_injection_power_limit`  | Maximum power injected into the grid. | W      |

### Electric Meter Sensors

| Sensor Key           | Description                       | Unit   |
|----------------------|-----------------------------------|--------|
| `meter_power`        | Power measured by the meter.      | W      |
| `meter_power_protocol`| Power measurement protocol type. | None   |

### AC Output Sensors

| Sensor Key           | Description               | Unit   |
|----------------------|---------------------------|--------|
| `output_current_l1`  | Current output on line 1. | A      |
| `output_current_l2`  | Current output on line 2. | A      |
| `output_current_l3`  | Current output on line 3. | A      |
| `output_frequency`   | Output frequency.         | Hz     |
| `output_power_l1`    | Power output on line 1.   | W      |
| `output_power_l2`    | Power output on line 2.   | W      |
| `output_power_l3`    | Power output on line 3.   | W      |
| `output_power_total` | Total power output.       | W      |
| `output_voltage_l1`  | Voltage output on line 1. | V      |
| `output_voltage_l2`  | Voltage output on line 2. | V      |
| `output_voltage_l3`  | Voltage output on line 3. | V      |

### Solar Panel Sensors

| Sensor Key           | Description                        | Unit   |
|----------------------|------------------------------------|--------|
| `pv_consumed`        | Energy consumed from solar panels. | Wh     |
| `pv_injected`        | Energy injected into the grid.     | Wh     |
| `pv_power_1`         | Power from solar panel 1.          | W      |
| `pv_power_2`         | Power from solar panel 2.          | W      |
| `pv_power_total`     | Total power from solar panels.     | W      |

### Temperature Sensors

| Sensor Key                 | Description                                  | Unit   |
|----------------------------|----------------------------------------------|--------|
| `temp_air_temperature`     | Ambient air temperature around the inverter. | °C     |
| `temp_component_temperature`| Temperature of internal components.         | °C     |

### Monitoring Sensors (Last 24 Hours)

| Sensor Key                       | Description                              | Unit   |
|----------------------------------|----------------------------------------|--------|
| `monitoring_building_consumption`| Total energy consumed by the building. | Wh     |
| `monitoring_economy_factor`      | Economy factor for energy usage.       | None   |
| `monitoring_grid_consumption`    | Energy consumed from the grid.         | Wh     |
| `monitoring_grid_injection`      | Energy injected into the grid.         | Wh     |
| `monitoring_grid_power_flow`     | Power flow through the grid.           | Wh     |
| `monitoring_self_consumption`    | Self-consumed energy percentage.       | %      |
| `monitoring_self_production`     | Self-produced energy percentage.       | %      |
| `monitoring_solar_production`    | Total solar energy produced.           | Wh     |

### Monitoring Sensors (Instant Minute Data)

| Sensor Key                            | Description                                 | Unit   |
|---------------------------------------|---------------------------------------------|--------|
| `monitoring_minute_building_consumption`| Energy consumed by the building (minute). | W      |
| `monitoring_minute_grid_consumption`  | Energy consumed from the grid (minute).     | W      |
| `monitoring_minute_grid_injection`    | Energy injected into the grid (minute).     | W      |
| `monitoring_minute_grid_power_flow`   | Power flow through the grid (minute).       | W      |
| `monitoring_minute_solar_production`  | Solar energy produced (minute).             | W      |

## Imeon Integration Extras

Custom dashboard templates for the custom [Imeon Integration](https://github.com/Imeon-Inverters-for-Home-Assistant/imeon-integration). Uses [APEXCharts-card](https://github.com/RomRider/apexcharts-card/blob/master/README.md#data_generator-option) for graphs and custom gauges.

### Requirements

- Required HACS installation
- APEXCharts-card installation steps

1. **Access Lovelace Dashboard:** Click on the "Overview" tab on the sidebar to access Lovelace, Home Assistant's dashboard interface.

2. **Edit the Dashboard:** Click on the three-dot menu in the top right corner and select "Edit Dashboard."

3. **Manage Dashboards:** Click on the three-dot menu again and select "Manage Dashboards."

4. **Create a New Dashboard:** Click on "Add Dashboard" to create a new one.

5. **Enable YAML Mode:** When creating the new dashboard, toggle the "YAML Mode" option to enable it.

6. **Paste the template**: Copy and paste the contents of the `dashboard.yaml` file from the [imeon-integration-extras repository](https://github.com/Imeon-Inverters-for-Home-Assistant/imeon-integration-extras/tree/master/dashboard) into the editor.

7. **Replace the keys:** Search and replace `#INVERTER#` with the domain name of your inverter, for example `imeon_84`.

### Troubleshooting

- **What is my domain name?** The domain name is the internal name given to your inverter by Home Assistant. It's based on the initial name you gave to your device, albeit formatted to avoid internal issues. 
   - A name such as `Imeon Inverter number 57` would give you a domain name of `imeon_inverter_number_57`.
   - If you're still struggling to find the domain name, check the internal name of the entities under the device. The name of each variable is `DOMAIN_variable-name`, for example `neo_110_inverter_software_version` tells us the domain name is `neo_110`.

- **How to install APEXCharts-card ?** [APEXCharts-card's README](https://github.com/RomRider/apexcharts-card/blob/master/README.md#data_generator-option) explains everything needed to install this custom ressource on your installation.

## Removing the integration

1. Navigate to `Configuration` > `Integrations`

2. Find the Imeon Inverter integration

3. Click on the three dots menu

4. Select `Delete`

5. Confirm the removal

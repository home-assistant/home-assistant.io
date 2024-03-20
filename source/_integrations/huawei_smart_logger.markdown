---
title: Huawei Smart Logger
description: Instructions on how to integrate Huawei Smart Logger 3000 with Home Assistant.
ha_category:
  - Sensor
ha_release: 0.79
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@mayberryjp'
ha_domain: huawei_smart_logger
ha_ssdp: false
ha_platforms:
  - sensor
ha_integration_type: integration
---

This is an integration for Huawei Smart Logger 3000 which is a component of the Huawei Fusion Solar system. The Smart Logger is installed within the home owner's home and network using an Ethernet connection. More information about the Smart Logger is available [here](https://support.huawei.com/enterprise/en/doc/EDOC1100108365/70ceb7c5/technical-specifications-of-the-smartlogger).

This integratione exposes 23 sensors including grid feed in and grid return. The Smart Logger is typically the device that reports to the Fusion Solar cloud website. However, with this integration, no cloud connection is required as it works over your local Ethernet network. 

The sensors exposed and description of those sensors can be found [here](https://support.huawei.com/enterprise/en/doc/EDOC1100108365/1a9e42de/webui-layout). This site also has screenshots that demonstrate what your UI should look like in order for this integration to work. 

This integration supports all the sensors needed to configure the energy dashboard within Home Assistant. 

There is no support in this integration for configuring or modifying the Smart Logger configuration. It only exposes sensors. 

## Setup

The integration can be enabled using the frontend, see below for details. 

The following configuration entries are required:

- Smart Logger Web UI IP Address
- Username used to log into the Web UI
- Password used to log into the Web UI

## Tested devices

Devices we know to be working with this integration:

- Huawei Smart Logger 3000

## Exposed Sensor List

The sensor exposed by this integration are as follows:

- soc (Battery Percentage)
- current_day_feedin_to_grid
- gridtied_active_power
- gridtied_reactive_power
- load_power
- active_power
- reactive_power
- todays_power_supply_from_grid
- current_day_supply_from_grid
- current_day_consumption
- total_power_supply_from_grid
- total_supply_from_grid
- total_feedin_to_grid
- total_power_consumption
- pv_output_power
- battery_chargedischarge_power
- reactive_pv_power
- reactive_ess_power
- currentday_charge_capacity
- currentday_discharge_capacity
- total_charge
- total_discharge
- rated_ess_power

---
title: "Huawei Solar"
description: "Instructions on how to connect your Huawei SUN2000 inverter to Home Assistant"
ha_release: "2022.3"
ha_category: 
    - Sensor
    - Energy
ha_iot_class: "Local Polling"
ha_config_flow: true
ha_codeowners:
  - '@wlcrs'
ha_domain: huawei_solar
---

The `huawei_solar` integration connects to the Modbus-interface from a Huawei SUN2000(L) inverter and integrates it into Home Assistant.

## Prerequisites

You will need to either set a static IP on your Huawei Inverter or assign a static DHCP lease to it. Refer to 'Router connection settings' in 'Configuration' > 'Communication configuration' to set a static IP address.

{% include integrations/config_flow.md %}

## Monitored data

A connected inverter will always expose the following sensors (updated every 15 seconds):

- Active Power
- Daily Yield
- Day Active Power Peak
- Efficiency
- Input Power
- Power Factor
- Total Yield
- A 'Current' and 'Voltage' sensor for each PV-string
- Device Status
- Startup Time (timestamp of the last time when your inverter started up in the morning)
- Shutdown Time (timestamp of the last time your inverter stopped in the evening)

If your installation has optimizers, an additional sensor 'Optimizers online' is available.

If you have a **battery** attached to your inverter, the following extra sensors are exposed (updated every 30 seconds):

- Battery Day Charge
- Battery Day Discharge
- Battery State of Capacity
- Battery Total Charge
- Battery Total Discharge
- Charge/Discharge Power
- Storage Bus Current
- Storage Bus Voltage

In case you have a Power meter installed, like the DTSU666-H, the following extra sensors are exposed (updated every 30 seconds):

- Active Power for each phase
- Total Active Power
- Grid Consumption (accumulative)
- Grid Expored (accumulative)
- Grid Frequency
- Power Factor

The following sensors are disabled by default:
- Line voltage between each of the phases
- Current for each phase
- Voltage for each phase
- Reactive Power
- Grid Reactive Power

A power meter is typically only installed when a battery is attached to the system.


## Energy dashboard

Recommended energy dashboard configuration for meter location in feed in path (`Meter location: 0`):

- For `Grid consumption` use the `Grid Consumption` sensor from the power meter.
- For `Return to grid` use the 'Grid Exported` sensor from the power meter.
- For `Solar production`: 
  - If no battery is connected to an inverter: Add each inverters `Daily Yield` sensor.
  - If a battery is connected to an inverter: Use [Riemann sum](/integrations/integration/) over the `Input Power` sensor 
- For `Battery systems` use the `Battery Total Charge` and `Battery Total Discharge` sensors
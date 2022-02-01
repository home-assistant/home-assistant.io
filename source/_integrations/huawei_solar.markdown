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

The Huawei Solar integration connects to the Modbus interface from a Huawei SUN2000(L) inverter and integrates it into Home Assistant.


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

- For "Grid consumption" use the "Grid Consumption" sensor from the power meter.
- For "Return to grid" use the "Grid Exported" sensor from the power meter.
- For "Solar production":
  - If no battery is connected to an inverter: Add each inverter's "Daily Yield" sensor.
  - If a battery is connected to an inverter: Use [Riemann sum](/integrations/integration/) over the "Input Power" sensor .
- For "Battery systems" use the "Battery Total Charge" and "Battery Total Discharge" sensors


## Inverter polling frequency

The integration will poll the inverter for new values every 30 seconds. If you wish to receive fresh inverter data less (or more) frequently, you can disable the automatic refresh in the integration's system options (Enable polling for updates) and create your own automation with your desired polling frequency.

```yaml
- alias: "Goodwe inverter data polling"
  trigger:
    - platform: time_pattern
      hours: "*"
      minutes: "*"
      seconds: "/10"
  action:
    - service: homeassistant.update_entity
      target:
        entity_id: sensor.daily_yield
```


## Debugging

If you have any problems and intend to write an issue, make sure you have the relevant logs included. For this integration, you can enable them like this:

```
logger:
  logs:
    pymodbus: debug # only include this if you're having connectivity issues
    huawei_solar: debug
    homeassistant.components.huawei_solar: debug
```

By providing logs directly when creating the issue, you will likely get help much faster.
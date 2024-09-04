---
title: Iskra
description: Instructions on how to connect your Iskra energy meters to Home Assistant.
ha_release: "2024.10"
ha_category:
  - Energy
  - Sensor
ha_codeowners:
  - '@iskramis'
ha_config_flow: true
ha_domain: iskra
ha_iot_class: local_polling
ha_platforms:
  - sensor
ha_integration_type: integration
---


The [Iskra](https://www.iskra.eu/) {% term integration %} allows you to connect Iskra energy meters and power quality analyzers to Home Assistant. Data is polled using Modbus TCP or the Iskra Smart Gateway's REST API.

## Supported devices

### Energy meters

Most Iskra's DIN rail mountable energy meters support Modbus RTU over RS485 and IR. To integrate them, you will need a Modbus TCP gateway or Iskra's Smart Gateway:

- Impact series ([IE38XX / IE14XX](https://www.iskra.eu/en/Iskra-Energy-meters/))
- WM series ([WM3XX / WM1XX](https://www.iskra.eu/en/Iskra-Energy-meters/))

### Power quality analyzers

These devices typically support Ethernet connections and use Modbus TCP for data polling:

- iMT/MT series ([MTXXX / iMTXXX](https://www.iskra.eu/en/NEW_SERIES_Universal_measuring_devices_/))
- iMC/MC series ([MCXXX / iMCXXX](https://www.iskra.eu/en/NEW_SERIES_Universal_measuring_devices_/))

## Configuration options

There are two ways to configure your devices with Home Assistant:

### Smart Gateway with REST API

If your device supports Modbus RTU over RS485/IR, you can use Iskra's Smart Gateway to connect them via the REST API:

- **Smart Gateway**: Connect your devices to the Smart Gateway and add your devices to the Smart Gateway's configuration. It's also recommended to set static IP on your smart gateway.
- **Home Assistant**: Add the Iskra integration, enter Smart Gateway's **IP address**, and select **RestAPI** as the connection type within the Home Assistant integration. If authentication is required, Home Assistant will prompt you to enter Smart Gateway's **credentials**. All devices configured on Smart Gateway will be automatically added to your Home Assistant.

### Modbus TCP connection

If your device supports a direct internet connection, such as PQ meters (iMC/MC series/ iMT/MT series usually), you can use Modbus TCP:

- **Device**: Find your device using the [MiQen](https://www.iskra.si/sl/Programska-oprema/MiQen/) software and configure it to use static IP.
- **Home Assistant**: Add the Iskra integration, enter the devices's **IP address**, and select **Modbus TCP** as the connection type within the Home Assistant integration. Home Assistant will prompt you to enter the Modbus TCP port and Modbus address of your device.

{% include integrations/config_flow.md %}

## Sensors

The integration provides detailed information about power, current, and voltage for each phase. The data is updated every minute.

| Name                | Unit | Description                                                                 |
| ------------------- | ---- | :-------------------------------------------------------------------------- |
| total_active_power  | W    | Total active power.                                                         |
| total_reactive_power| var  | Total reactive power.                                                       |
| total_apparent_power| VA   | Total apparent power.                                                       |
| phase1_power        | W    | Active power of phase 1.                                                    |
| phase2_power        | W    | Active power of phase 2.                                                    |
| phase3_power        | W    | Active power of phase 3.                                                    |
| phase1_voltage      | V    | Voltage of phase 1.                                                         |
| phase2_voltage      | V    | Voltage of phase 2.                                                         |
| phase3_voltage      | V    | Voltage of phase 3.                                                         |
| phase1_current      | A    | Current of phase 1.                                                         |
| phase2_current      | A    | Current of phase 2.                                                         |
| phase3_current      | A    | Current of phase 3.                                                         |
| frequency           | Hz   | Frequency.                                                                  |

## Note

This integration supports Iskra's energy meters, not Iskra Emeco ones.

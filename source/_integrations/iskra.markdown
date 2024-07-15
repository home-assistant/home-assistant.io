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

# Iskra Integration

## Description

The [Iskra](https://www.iskra.eu/) {% term integration %} allows you to connect Iskra energy meters and power quality analyzers to Home Assistant. Data is polled using Modbus TCP or the Iskra Smart Gateway's REST API.

## Supported devices

### Energy meters

Most Iskra's DIN rail mountable energy meters support Modbus RTU over RS485 and IR. To integrate them, you will need a Modbus TCP gateway or Iskra's Smart Gateway:
- Impact series (IE38XX/IE14XX)
- WM series (WM3XX/WM1XX)

### Power quality analyzers

These devices typically support Ethernet connections and use Modbus TCP for data polling:

- iMT/MT series (MTXXX/iMTXXX)
- iMC/MC series (MCXXX/iMCXXX)
- 
## Configuration Options

There are two ways to configure your devices with Home Assistant:

### Smart Gateway with REST API

If your device supports Modbus RTU over RS485/IR, you can use Iskra's Smart Gateway to connect them via REST API:

- **Smart Gateway**: Connect your devices to the Smart Gateway and add your devices to Smart Gateway's configuration. It's also recommended to set static IP on your smart gateway.
- **Home Assistant**: Add iskra integration, enter Smart Gateway's **IP address** and select **RestAPI** If authentication is required Home Assistant will prompt you to enter Smart Gateway's **credentials**. All devices configured on Smart Gateway will be automatically added to your Home Assistant.


### Modbus TCP Connection

If your device supports a direct internet connection, such as PQ meters (iMC/MC series/ iMT/MT series usually), you can use Modbus TCP:

- **Device**: Find your device using [MiQen](https://www.iskra.si/sl/Programska-oprema/MiQen/) software and configure it so it uses static IP.
- **Home Assistant**: Add iskra integration, enter Devices's **IP address** and select **Modbus TCP**. Home Assistant will prompt you to enter Modbus TCP port and Modbus address of your device.

{% include integrations/config_flow.md %}

## Monitored Data

The integration provides detailed information about power, current, and voltage for each phase, as well as energy counters. The data is updated every minute.

## Note

Energy counters are named "non-resettable counter" and "resettable counter." The direction (export/import) and energy type (active power, reactive power, apparent power) their count depend on the user's settings through MiQen software.

This integration supports Iskra's energy meters, not Iskra Emeco ones.

---
title: Qube heat pump
description: Instructions on how to integrate your Qube heat pump with Home Assistant.
ha_release: 2026.4
ha_category:
  - Binary sensor
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@MattieGit'
ha_domain: hr_energy_qube
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Qube heat pump** {% term integration %} allows you to monitor [Qube](https://www.hr-energy.com/nl/pvt-systemen/onderdelen/qube-warmtepomp/) heat pumps via the Modbus TCP protocol.

## Supported devices

The following devices are known to be supported by the integration:

- Qube heat pump

## Unsupported devices

The following devices are not supported by the integration:

- Qbooster heat pump (the predecessor of the Qube heat pump)

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or hostname of your Qube heat pump.
{% endconfiguration_basic %}

## Supported functionality

### Binary sensors

- **Outputs**: source pump, user pump, buffer pump, four-way valve, three-way valve, cooling output, and heater steps 1-3
- **Alarms**: global alarm, plus specific alarms for anti-legionella timeout, domestic hot water (DHW) timeout, dewpoint, supply too hot, flow, central heating, cooling, heating, source, compressor, and working hours
- **Demand signals**: thermostat demand, plant demand, and external demand
- **System status**: keypad, day mode, summer mode, anti-legionella, dewpoint, booster security, source flow, and photovoltaic (PV) surplus
- **Sensor status** (disabled by default): room sensor enabled, plant sensor enabled, buffer sensor enabled, and DHW controller enabled

### Sensors

- **Temperatures**: supply, return, source in/out, room, outside, and domestic hot water (DHW) temperatures (°C)
- **Power**: thermal and electric power (W)
- **Energy**: total electric consumption and total thermal yield (kWh)
- **Flow**: measured photovoltaic-thermal (PVT) flow rate (L/min)
- **Performance**: calculated coefficient of performance (COP)
- **Operation**: compressor speed (rpm), heat pump status, and room setpoints (°C)

## Data updates

The integration polls the heat pump every 15 seconds via Modbus TCP.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

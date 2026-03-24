---
title: HR-Energy Qube heat pump
description: Instructions on how to integrate your Qube heat pump with Home Assistant.
ha_release: 2026.4
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@MattieGit'
ha_domain: hr_energy_qube
ha_platforms:
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

### Sensors

- **Temperatures**: supply, return, source in/out, room, outside, and DHW temperatures (°C)
- **Power**: thermal and electric power (W)
- **Energy**: total electric consumption and total thermal yield (kWh)
- **Flow**: measured PVT flow rate (L/min)
- **Performance**: calculated COP
- **Operation**: compressor speed (rpm), heat pump status, and room setpoints (°C)

## Data updates

The integration polls the heat pump every 15 seconds via Modbus TCP.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

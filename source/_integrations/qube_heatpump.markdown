---
title: Qube Heat Pump
description: Instructions on how to integrate Qube Heat Pump within Home Assistant.
ha_category:
  - HVAC
ha_release: '2025.2'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@MattieGit'
ha_domain: qube_heatpump
ha_platforms:
  - sensor
---

The **Qube Heat Pump** {% term integration %} allows you to control and monitor [Qube](https://www.hr-energy.com/nl/pvt-systemen/onderdelen/qube-warmtepomp/) heat pumps via the Modbus TCP protocol.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or hostname of your Qube Heat Pump (default: `qube.local`).
{% endconfiguration_basic %}

## Configuration options

After configuration, you can change the following settings by selecting **Configure** on the integration entry:

{% configuration_basic %}
Host:
  description: Update the IP address if it changes.
Label:
  description: An optional label to append to entity names (useful for differentiating multiple units).
{% endconfiguration_basic %}

## Supported functionality

The integration exposes various entities to monitor and control your heat pump.

### Sensor

- **Temperatures**: inlet (°C), outlet (°C), buffer (°C), outside (°C), and domestic hot water (DHW) temperatures (°C).
- **Flow**: Current flow rate (L/min).
- **Power and energy**: standby power and total electric consumption (kWh).
- **Status**: Operation hours and system counters.

## Removing the integration
This integration follows standard integration removal.
{% include integrations/remove_device_service.md %}

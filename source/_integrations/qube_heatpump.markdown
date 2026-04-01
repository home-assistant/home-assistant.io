---
title: Qube Heat Pump
description: Instructions on how to integrate Qube Heat Pump within Home Assistant.
ha_release: 2026.4
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@MattieGit'
ha_domain: qube_heatpump
ha_platforms:
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---


The **Qube Heat Pump** {% term integration %} allows you to control and monitor [Qube](https://www.hr-energy.com/nl/pvt-systemen/onderdelen/qube-warmtepomp/) heat pumps via the Modbus TCP protocol.

## Supported devices

The following devices are known to be supported by the integration:

- Qube heat pump

## Unsupported devices

The following devices are not supported by the integration:

- Qbooster heat pump (the predecessor of the Qube heat pump)

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or hostname of your Qube Heat Pump (default is `qube.local`).
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

The **Qube Heat Pump** integration exposes various entities to monitor and control your heat pump.

### Sensor

- Temperatures: inlet (°C), outlet (°C), minimum and maximum setpoints (°C), outside temperature (°C), central heating (<abbr title="Central heating">CH</abbr>) and domestic hot water (<abbr title="Domestic hot water">DHW</abbr>) temperatures (°C).
- Flow: Current flow rate (L/min).
- Power: standby power and total electric power (W).
- Status: Operation hours (h).

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

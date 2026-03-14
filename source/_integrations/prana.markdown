---
title: Prana
description: Integration to control Prana recuperators.
ha_release: 2026.2
ha_iot_class: Local Polling
ha_codeowners:
  - '@prana-dev-official'
ha_domain: prana
ha_integration_type: device
related:
  - url: https://prana.ua
    title: Prana
ha_category: []
ha_quality_scale: bronze
ha_platforms:
  - switch
ha_config_flow: true
ha_zeroconf: true
---

The **Prana recuperators** {% term integration %} lets you control your Prana recuperator. You can manage motors and their operating modes, and monitor a range of sensors provided by the device.

Use case: If you have a Prana recuperator and want to automate ventilation, monitor filter status, or integrate the recuperator with other Home Assistant automations, this integration helps you do that.

## Supported devices

- Devices with Wi‑Fi control and firmware version 49 or newer

## Unsupported devices

- Models without a local network interface
- Devices with firmware version 48 or below

## Prerequisites

1. Connect the Prana recuperator to the same local network as Home Assistant.

{% include integrations/config_flow.md %}

## Supported functionality

### Entities

The integration exposes the following entities.

#### Fans

The integration provides fan entities to control the recuperator's speed and airflow.

- **Supply**
  - **Description**: Controls the fresh air intake speed independently.
- **Extract**
  - **Description**: Controls the exhaust air speed independently.
  
{% note %}
When **Bound mode** is active, the Supply and Extract fans operate in sync. Adjusting the speed of one fan will automatically update the other to the same value, ensuring balanced airflow.
{% endnote %}

All fan entities support speed control (0-100%) and the following presets:

  - **Night**: Sets the device to silent, minimum speed operation.
  - **Boost**: Sets the device to maximum speed.

#### Switches

- **Auto**
  - **Description**: Enable automatic control based on sensor readings.
- **Auto+**
  - **Description**: Enhanced automatic mode with quieter operation limits.
- **Winter**
  - **Description**: Winter mode to prevent icing and manage defrosting.
- **Heater**
  - **Description**: Turn on the mini-heating element (if equipped).
- **Bound**
  - **Description**: Synchronizes supply and extract fans. When enabled, you control the Bound fan. When disabled, you control Supply and Extract fans separately.

## Data updates

The integration uses local polling. By default, Home Assistant polls the device every 10 seconds. If the device stops responding, entities are marked as *unavailable* until communication is restored.

## Known limitations

- No official support for some older Prana models.
- Some indicators or device-specific details may only be available in the manufacturer's app.
- This integration does not provide cloud or remote control.

## Troubleshooting

### Device is not discovered

1. Make sure Home Assistant and the Prana device are on the same local network.
2. Restart the device and Home Assistant.
3. Check whether mDNS/LLMNR is allowed by your router.

### Entities show as unavailable

- Check the device network connection.
- Ensure the device is powered on and reachable; entities become available automatically when communication is restored.
- For fans, remember that supply and extract fans become unavailable when Bound mode is active (and vice versa). This is expected behavior.

## Community notes

- If you have a model that does not work as expected, add a note in the repository or community and include the model and firmware version.

## Removing the integration

This integration follows standard integration removal in Home Assistant. 

{% include integrations/remove_device_service.md %}

After you remove the integration from Home Assistant, we recommend checking the device settings in the Prana Online 2.0 app.

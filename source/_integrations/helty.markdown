---
title: Helty Flow
description: Instructions on how to integrate Helty Flow ventilation units with Home Assistant.
ha_category:
  - Fan
  - Sensor
ha_release: 2026.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@ebaschiera'
ha_domain: helty
ha_platforms:
  - fan
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **Helty Flow** {% term integration %} lets you control [Helty Flow](https://www.heltyair.com/) decentralized heat-recovery ventilation units (also known as <abbr title="Mechanical ventilation with heat recovery">MVHR</abbr> units) that have the smart Wi-Fi interface. The integration communicates with the unit directly on your local network, so it keeps working without an internet connection.

## Supported devices

Any unit in the Helty Flow line that has the smart Wi-Fi interface is expected to work, including:

- FlowPLUS
- FlowULTRA
- Flow40
- Flow120
- FlowMANHATTAN

The integration was developed and verified against a FlowPLUS. The other models share the same Wi-Fi interface and are expected to be compatible.

## Unsupported devices

Units without the smart Wi-Fi module, such as models that only offer an RS-485 connection, are not supported, as they do not expose this network protocol.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The IP address or hostname of the Helty Flow unit on your network. For example, `192.168.1.42` or `helty-flow-bedroom.local`. A static address (DHCP reservation) is recommended so it does not change over time."
{% endconfiguration_basic %}

## Supported functionality

The integration creates one device per configured unit, exposing a fan entity and a set of sensors.

### Fans

- **Ventilation**
  - **Description**: Turns the ventilation on and off, sets one of four speeds, and selects a preset mode (**Boost**, **Night**, or **Free cooling**).

### Sensors

- **Indoor temperature**
  - **Description**: The temperature of the air inside your home, as measured by the unit.
- **Outdoor temperature**
  - **Description**: The temperature of the outdoor air, as measured by the unit.
- **Indoor humidity**
  - **Description**: The relative humidity of the air inside your home, as measured by the unit.

## Data updates

Home Assistant {% term polling polls %} the unit every 60 seconds. When you send a command, such as changing the speed or selecting a preset, the integration requests an immediate refresh so the state updates promptly.

## Known limitations

The communication protocol has been reverse-engineered, as there is no official specification from the manufacturer.

The unit does not expose a serial number or MAC address over its interface, so each configured unit is identified by its host address. If the unit's IP address changes, remove it and add it again with the new address. A static IP (DHCP reservation) is recommended to avoid this.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

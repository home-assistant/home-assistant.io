---
title: Helty Flow
description: Instructions on how to integrate Helty Flow ventilation units with Home Assistant.
ha_category:
  - Fan
ha_release: 2026.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@ebaschiera'
ha_domain: helty
ha_platforms:
  - fan
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
    description: "The IP address or hostname of the Helty Flow unit on your network. A static address is recommended so it does not change over time."
Port:
    description: "The TCP port of the unit's smart interface, usually `5001`."
{% endconfiguration_basic %}

## Supported functionality

The integration creates one device per configured unit, with the following entity.

### Fans

- **Ventilation**
  - **Description**: Turns the ventilation on and off, sets one of four speeds, and selects a preset mode (`boost`, `night`, or `free_cooling`).

## Reconfiguration

If the unit's IP address changes, you do not need to remove and add it again. Reconfigure the entry from its device page and enter the new host and port. The integration checks that it is still the same unit before saving the change.

## Data updates

Home Assistant {% term polling polls %} the unit every 60 seconds. When you send a command, such as changing the speed or selecting a preset, the integration requests an immediate refresh so the state updates promptly.

## Known limitations

The communication protocol has been reverse-engineered, as there is no official specification from the manufacturer.

The unit does not expose a serial number or a MAC address over its interface, so the device name is used as its unique identifier. If you rename the unit in the Helty app, you need to remove and add it again in Home Assistant.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

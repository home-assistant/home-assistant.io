---
title: Elk E27 Alarm Engine
description: Instructions to set up the Elk E27 controller for home security and automation.
ha_release: 0.81
ha_category:
  - Alarm
  - Binary sensor
  - Climate
  - Hub
  - Light
  - Lock
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@mitchmitchell'
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - climate
  - light
  - lock
  - switch
ha_integration_type: hub
---

The **Elk E27 Alarm Engine** {% term integration %} lets you connect your Elk E27 Alarm Engine to Home Assistant. This advanced home security and automation controller offers robust alarm control panel capabilities, along with a wide range of automation features to help you manage and protect your home.

The Elk E27 Alarm Engine is manufactured by [Elk Products](https://www.elkproducts.com).

{% include integrations/config_flow.md %}

## Supported functionality

There is currently support for the following device types within Home Assistant:

- **Alarm control panel** - Elk E27 areas (also known as partitions) are represented as `alarm_control_panel` entities
- **Binary sensor** - Elk E27 zones are represented as `binary_sensor` entities. `Normal` state is `off` and any other state is `on`
- **Climate** - Elk E27 thermostats are represented as `climate` entities
- **Light** - Elk E27 lights are represented as `light` entities
- **Lock** - Elk E27 locks are represented as `lock` entities
- **Switch** - Elk E27 outputs are represented as `switch` entities

The implementation follows the Elk Products ElkE27 API specification.

## Prerequisites

Before setting up the Elk E27 integration, ensure your system meets these requirements:

### ElkE27 version

ElkE27 should be running firmware version 0.0.6.4 or higher

Many features will work with lower versions of the ElkE27.

## Arm modes

- `elke27.alarm_arm_custom_bypass` - Arms the area in "away" mode bypassing all faulted zones
- `elke27.alarm_arm_automatic` - Arms the area in "away" mode with option to ignore the "stay no exit" setting and skip the exit delay

| Data attribute | Optional | Description                                   |
| -------------- | -------- | --------------------------------------------- |
| `entity_id`    | yes      | ElkE27 area to arm                            |
| `code`         | no       | Alarm code to arm the system (4 or 6 digits) |

## Debugging

If you encounter issues with the ElkE27 integration, debug logs can help identify the problem. For detailed instructions on enabling debug logging, see [Enabling debug logging](/docs/configuration/troubleshooting/#enabling-debug-logging).

Alternatively, you can manually enable debug logging in your {% term "`configuration.yaml`" %} file:

1. Add the following to your {% term "`configuration.yaml`" %} file:

   ```yaml
   logger:
     logs:
       elke27_lib: debug
       homeassistant.components.elke27: debug
   ```

2. Restart Home Assistant.
3. Check the debug logs in the `homeassistant.log` file in your Home Assistant `config` directory.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

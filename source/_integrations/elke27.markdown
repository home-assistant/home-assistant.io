---
title: Elk E27 Alarm Engine
description: Instructions to set up the Elk E27 Alarm Engine integration.
ha_release: 2026.6
ha_category:
  - Alarm
  - Hub
ha_iot_class: Local Push
ha_domain: elke27
ha_config_flow: true
ha_codeowners:
  - '@mitchmitchell'
ha_platforms:
  - alarm_control_panel
ha_integration_type: hub
---

The **Elk E27 Alarm Engine** {% term integration %} lets you connect your Elk E27 Alarm Engine panel to Home Assistant.

The Elk E27 Alarm Engine is manufactured by [Elk Products](https://www.elkproducts.com).

{% include integrations/config_flow.md %}

## Supported functionality

This integration represents Elk E27 areas, also known as partitions, as `alarm_control_panel` entities.

Alarm control panel entities support:

- Arm away
- Arm home
- Arm night
- Arm custom bypass
- Disarm

## Prerequisites

Before setting up the Elk E27 integration, make sure the panel is reachable from the Home Assistant network.

Elk E27 panels should be running firmware version 0.0.6.4 or later.

## Actions

The integration provides the `elke27.alarm_arm_automatic` action for arming an Elk E27 area using the panel's automatic stay and exit-delay behavior.

The action requires:

- An Elk E27 `alarm_control_panel` entity as the target.
- A `mode` value of `away` or `home`.
- A `code` value with the alarm code used to arm the system.

## Debugging

If you encounter issues with the Elk E27 integration, debug logs can help identify the problem. For detailed instructions on enabling debug logging, see [Enabling debug logging](/docs/configuration/troubleshooting/#enabling-debug-logging).

Alternatively, you can manually enable debug logging in your {% term "`configuration.yaml`" %} file:

```yaml
logger:
  logs:
    elke27_lib: debug
    homeassistant.components.elke27: debug
```

Restart Home Assistant, then check the debug logs in the `homeassistant.log` file in your Home Assistant `config` directory.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

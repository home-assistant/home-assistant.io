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

## Prerequisites

Before setting up the Elk E27 integration, make sure the panel is reachable from the Home Assistant network.

Elk E27 panels should be running firmware version 0.0.6.4 or later.

{% include integrations/config_flow.md %}

## Supported functionality

This integration represents Elk E27 areas, also known as partitions, as `alarm_control_panel` entities.

Alarm control panel entities support:

- Arm away
- Arm home
- Arm night
- Arm custom bypass
- Disarm

## Troubleshooting

### Debug logs and diagnostics

If you encounter issues with the Elk E27 integration, debug logs can help identify the problem. For detailed instructions, see [debug logs and diagnostics](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).

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

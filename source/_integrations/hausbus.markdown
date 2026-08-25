---
title: HausBus
description: Integrate HausBus controllers and devices with Home Assistant.
ha_category:
  - Hub
  - Cover
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@hausbus'
ha_domain: hausbus
ha_platforms:
  - cover
ha_zeroconf: true
ha_integration_type: hub
---

The HausBus integration allows Home Assistant to discover, monitor, and control devices connected to a HausBus controller.

HausBus is a building automation system developed by haus-bus.de. The integration communicates locally with the HausBus controller and automatically discovers supported devices on the bus.

Currently, the integration provides support for roller shutters (covers).

## Prerequisites

Before setting up the integration:

- A supported HausBus controller must be installed and running on the local network.
- The controller must be reachable from Home Assistant.
- At least one supported HausBus shutter channel must be configured on the controller.

## Configuration

{% include integrations/config_flow.md %}

The integration is automatically discovered using Zeroconf.

1. In Home Assistant, go to **Settings** > **Devices & Services**.
2. When a HausBus controller is discovered, select **Add**.
3. Confirm the detected controller.
4. Complete the setup flow.

After setup, supported HausBus devices will be created automatically.

## Supported devices

The integration currently supports:

- Roller shutters (Cover entities)

Each shutter channel is exposed as a Home Assistant Cover entity.

Supported operations:

- Open cover
- Close cover
- Stop cover
- Set cover position

## Automation triggers

This integration does not currently provide additional device triggers.

Use the standard Home Assistant state triggers available for Cover entities.

## Automation conditions

This integration does not currently provide additional conditions.

Use the standard Home Assistant state conditions available for Cover entities.

## Actions

This integration does not currently provide additional actions.

Use the standard services provided by the Cover platform.

## Removing the integration

To remove the HausBus integration:

1. Navigate to **Settings** > **Devices & Services**.
2. Select the **HausBus** integration.
3. Open the menu.
4. Select **Delete**.

Removing the integration removes all entities created by the integration from Home Assistant.

## Troubleshooting

If no devices are discovered:

- Verify that the HausBus controller is connected to the local network.
- Verify that Home Assistant can reach the controller.
- Verify that supported shutter channels are configured on the controller.
- Restart the integration from **Settings** > **Devices & Services**.

For additional information about HausBus hardware, visit:

https://www.haus-bus.de/
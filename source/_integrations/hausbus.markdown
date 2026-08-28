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
ha_release: "2026.9"
ha_platforms:
  - cover
ha_integration_type: hub
---

The **HausBus** {% term integration %} lets you connect [HausBus](https://www.haus-bus.de/) controllers and devices to Home Assistant. It communicates locally with the HausBus controller and automatically discovers supported devices on the bus.

Currently, the integration provides support for roller shutters (covers).

## Prerequisites

Before setting up the integration:

- A supported HausBus controller must be installed and running on the local network.
- The controller must be reachable from Home Assistant.
- At least one supported HausBus shutter channel must be configured on the controller.

{% include integrations/config_flow.md %}

1. {% my integrations title="**Settings** > **Devices & services**" %}, then select **Add integration**, and search for **HausBus**.
2. Home Assistant searches your local network for a HausBus controller. This can take a moment.
3. If a controller is found, the integration is set up automatically.
4. If no controller is found within the search period, you can retry the search.

After setup, supported HausBus devices are created automatically.

## Supported devices

The integration currently supports:

- Roller shutters (cover entities)

Each shutter channel is exposed as a Home Assistant cover entity.

Supported operations:

- Open cover
- Close cover
- Stop cover
- Set cover position

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

Removing the integration does not modify the configuration of the HausBus controller or connected HausBus devices.

## Troubleshooting

If no devices are discovered:

- Verify that the HausBus controller is connected to the local network.
- Verify that Home Assistant can reach the controller.
- Verify that supported shutter channels are configured on the controller.
- Restart the integration from {% my integrations title="**Settings** > **Devices & services**" %}.

For more information, visit the [HausBus website](https://www.haus-bus.de/).


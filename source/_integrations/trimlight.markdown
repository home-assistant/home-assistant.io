---
title: Trimlight
description: Instructions on how to control Trimlight Edge Pro lights in Home Assistant.
ha_category:
  - Light
ha_release: '2026.10'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@spdevpro'
  - '@bsholy'
ha_domain: trimlight
ha_platforms:
  - light
ha_integration_type: device
ha_quality_scale: bronze
ha_zeroconf: true
---

The **Trimlight** {% term integration %} lets you control Trimlight Edge Pro permanent lighting over your local network.

## Supported devices

The integration supports **Trimlight Edge Pro** controllers.

Earlier Trimlight Edge controllers are not supported.

## Prerequisites

Set up your Trimlight Edge Pro controller using the Trimlight app. Make sure the controller is powered on and connected to the same network as Home Assistant.

## Configuration

Trimlight controllers are configured through automatic network discovery. Manual configuration is not supported.

1. Go to {% my integrations title="Settings > Devices & services" %}.
2. Under **Discovered**, find your Trimlight controller and select **Add**.
3. Follow the instructions on screen to complete the setup.

## Supported functionality

The integration adds a [light](/integrations/light/) entity for each controller.

You can:

- Turn the lights on or off.
- Adjust brightness.
- Set a static color.

Available color and white-channel controls depend on the controller's configured LED type.

## Known limitations

Scene selection and individual zone control are not supported.

## Removing the integration

{% include integrations/remove_device_service.md %}

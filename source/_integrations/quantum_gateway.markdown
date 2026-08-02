---
title: Quantum Gateway
description: Instructions on how to integrate Quantum Gateways into Home Assistant.
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 0.81
ha_codeowners:
  - '@cisasteelersfan'
ha_domain: quantum_gateway
ha_platforms:
  - device_tracker
ha_integration_type: device
related:
  - docs: /integrations/device_tracker/
    title: Device tracker
ha_quality_scale: legacy
---

The **Quantum Gateway** {% term integration %} offers presence detection by looking at devices connected to a Verizon Fios gateway.

It was tested with a Verizon Fios-G1100 and G3100 Quantum Gateway.

## Prerequisites

To set up the integration, you need the following:

- The password for logging into the gateway admin settings. You can find this on the back of your gateway.

{% include integrations/config_flow.md %}

## Configuration

{% configuration_basic %}
Host:
  description: The host name or IP address of your router, for example, `192.168.1.1`. By default, this is `myfiosgateway.com`.
Password:
  description: The password for the `admin` user. The default password may be printed on the gateway itself.
SSL:
  description: Use HTTPS when connecting to gateway. New firmware may require HTTPS while older may require this to be False.
{% endconfiguration_basic %}

## Migrating from YAML configuration

If you previously configured the integration through `configuration.yaml`:

1. Set up the integration through the UI to provide your credentials.
2. Remove the `quantum_gateway` entry under `device_tracker:` from your `configuration.yaml` file.
3. Restart Home Assistant.

A repair issue in {% my integrations title="**Settings** > **Devices & services**" %} will guide you through the same steps.

## Supported functionality

The integration creates a {% term "device tracker" %} entity for each device known to your Gateway device.
You can use these entities to track the presence of people in your home. For more information on how to assign tracked devices to people, see the [device tracker integration page](/integrations/device_tracker/).

## Data updates

Home Assistant {% term polling polls %} your Quantum Gateway every 30 seconds to retrieve the list of connected devices and update their connection status.

## Troubleshooting

If the setup fails or the integration stops working, check the following:

- Make sure the configured IP address or host of your Quantum Gateway is correct and reachable from Home Assistant.
- Make sure the device password is correct. The integration signs in to your Quantum Gateway to read the list of connected devices, so it needs valid credentials.
- Make sure the SSL toggle is properly configured. If you log into your device admin panel using HTTPS, then SSL should be set to on.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

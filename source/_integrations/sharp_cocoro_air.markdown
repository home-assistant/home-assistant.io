---
title: Sharp COCORO Air
description: Instructions on how to integrate Sharp COCORO Air devices within Home Assistant.
ha_release: "2026.4"
ha_category:
  - Fan
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: sharp_cocoro_air
ha_platforms:
  - diagnostics
  - fan
ha_codeowners:
  - "@rsokolowski"
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Sharp COCORO Air** {% term integration %} allows you to control and monitor Sharp air purifiers connected to the [Sharp COCORO Air EU cloud](https://cocoroair-eu.sharp.eu/). This is the same cloud service used by the official **Sharp Life AIR EU** mobile app.

## Supported devices

The following Sharp air purifier series sold in Europe with Wi-Fi connectivity are supported:

- **KC** series
- **KI** series
- **UA** series

## Prerequisites

Before setting up this integration, make sure you have the following:

- A Sharp air purifier with Wi-Fi, registered to the Sharp COCORO Air EU cloud
- A **Sharp Members EU** account with your device paired through the **Sharp Life AIR EU** mobile app

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: "The email address for your Sharp Members EU account."
Password:
  description: "The password for your Sharp Members EU account."
{% endconfiguration_basic %}

## Supported functionality

### Fan

For each air purifier, a fan entity is created. You can use it to turn the air purifier on or off and to set the cleaning mode.

The available preset modes are:

- **Auto**: Automatic mode based on sensor readings
- **Night**: Quiet operation for nighttime use
- **Pollen**: Optimized for pollen filtration
- **Silent**: Minimal noise level
- **Medium**: Medium fan speed
- **High**: Maximum fan speed
- **AI Auto**: AI-assisted automatic mode
- **Turbo clean**: Maximum cleaning power

{% note %}
Not all preset modes may be available on every device model. The integration exposes all modes, but unsupported modes may have no effect on your specific device.
{% endnote %}

## Data updates

The integration {% term polling polls %} data from the Sharp COCORO Air EU cloud API every 60 seconds to retrieve device states. Control commands like power and mode changes are sent immediately, and an optimistic state update is applied locally before the next poll confirms the change.

## Known limitations

- This integration only works with the **EU** Sharp COCORO Air cloud. Devices registered to the Japanese or other regional Sharp cloud services are not supported.
- A maximum of 5 terminal sessions can be active per device. If you see authentication errors, you may need to remove unused sessions through the mobile app.
- The integration relies on cloud connectivity. If the Sharp cloud service is unavailable, device control and state updates will be temporarily unavailable.

## Troubleshooting

### Cannot connect during setup

If you see a "cannot connect" error during setup:

1. Verify that your email and password are correct by logging in to the **Sharp Life AIR EU** mobile app.
2. Check that the Sharp COCORO Air EU cloud service is reachable. The service may occasionally experience outages.

### Entities show unavailable

If all entities become unavailable, the cloud connection may have been interrupted. The integration will automatically retry on the next polling cycle. If the issue persists, try reloading the integration from {% my integrations title="**Settings** > **Devices & services**" %}.

### Authentication errors after setup

Your session may have expired. Use the reauthentication flow to enter your credentials again. If you have multiple Home Assistant instances or the mobile app running simultaneously, you may hit the terminal session limit. Try reducing the number of active sessions.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

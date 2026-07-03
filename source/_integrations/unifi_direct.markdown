---
title: UniFi AP
description: Instructions on how to use a UniFi AP as a device tracker.
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 0.59
ha_domain: unifi_direct
ha_platforms:
  - device_tracker
ha_integration_type: device
ha_codeowners:
  - '@tofuSCHNITZEL'
related:
  - docs: /integrations/device_tracker/
    title: Device tracker
ha_quality_scale: legacy
---

This {% term integration %} allows you to detect presence by looking at devices connected to a [UniFi AP](https://www.ui.com/products/#unifi). This device tracker differs from [Ubiquiti UniFi](/integrations/unifi) because it doesn't require the UniFi Network application.

## Prerequisites

To set up the integration, you need the following:

- The IP address of your UniFi AP.
- The SSH device username and password. You can set this in the UniFi Network application under **Device Updates and Settings** > **Device SSH Settings**.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address of your UniFi AP."
Username:
  description: "The SSH device username."
Password:
  description: "The SSH device password."
Port:
  description: "The SSH port of your UniFi AP (default: 22)."
{% endconfiguration_basic %}

## Migrating from YAML configuration

If you previously configured the integration through `configuration.yaml`:

1. Set up the integration through the UI to provide your credentials.
2. Remove the `unifi_direct` entry under `device_tracker:` from your `configuration.yaml` file.
3. Restart Home Assistant.

A repair issue in {% my integrations title="**Settings** > **Devices & services**" %} will guide you through the same steps.

## Supported functionality

The integration creates a {% term "device tracker" %} entity for each device known to your UniFi AP.
You can use these entities to track the presence of people in your home. For more information on how to assign tracked devices to people, see the [device tracker integration page](/integrations/device_tracker/).

## Data updates

Home Assistant {% term polling polls %} your UniFi AP every 30 seconds to retrieve the list of connected devices and update their connection status.

## Troubleshooting

If the setup fails or the integration stops working, check the following:

- Make sure the IP address of your UniFi AP is correct and reachable from Home Assistant.
- Make sure the SSH device username and password are correct. The integration signs in to your UniFi AP over SSH to read the list of connected devices, so it needs valid credentials.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}


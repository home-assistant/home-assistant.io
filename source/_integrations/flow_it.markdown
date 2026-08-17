---
title: Flow-it
description: Instructions on how to integrate Flow-it ventilation systems into Home Assistant.
ha_category:
  - Fan
ha_release: 2026.9
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@albertogeniola'
ha_domain: flow_it
ha_platforms:
  - fan
ha_integration_type: device
ha_quality_scale: bronze
ha_zeroconf: true
related:
  - url: https://www.flow-it.it/en
    title: Flow-it
---

The **Flow-it** {% term integration %} lets you monitor and control your Flow-it ventilation system in Home Assistant.

Use case: You can control the fan speed, activate preset modes such as Auto or Boost, and automate your Flow-it ventilation system alongside other smart home devices.

## Supported devices

The integration supports the following devices:

- Flow-it <abbr title="Controlled Mechanical Ventilation">VMC</abbr> ventilation systems equipped with Wi-Fi connectivity.

## Prerequisites

Before setting up the integration:

1. Connect your Flow-it device to your local network.
2. Locate the password and IP address (if setting up manually) on the physical LCD screen by navigating to **Settings** > **Wi-Fi**.

{% tip %}
Automatic discovery via [Zeroconf](/integrations/zeroconf/) is recommended. When discovered automatically, Home Assistant configures the integration using the device hostname instead of its IP address, avoiding the need to set up a static DHCP lease in your router.
{% endtip %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your Flow-it device on your local network. For example, `192.168.1.100` or `vmc.local`. You can find the IP address on the physical LCD screen under **Settings** > **Wi-Fi**."
Username:
  description: "The username used to authenticate with the device API. The default username is `api`."
Password:
  description: "The password displayed on the physical LCD screen of your device under **Settings** > **Wi-Fi**."
{% endconfiguration_basic %}

## Supported functionality

The **Flow-it** integration provides the following entities.

### Fans

- **Fan**
  - **Description**: Controls the fan state, speed (levels 1 through 5), and preset modes.
  - **Presets**: `Auto`, `Boost`.

## Data updates

The Flow-it integration uses local push updates over a WebSocket connection to receive real-time status changes from the device, with periodic local polling every 60 seconds as a fallback.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

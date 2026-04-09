---
title: Mitsubishi Comfort
description: Integrate Mitsubishi Electric ductless minisplit heat pump and air conditioning systems with Home Assistant.
ha_category:
  - Climate
ha_release: 2026.5
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@nikolairahimi'
ha_domain: mitsubishi_comfort
ha_platforms:
  - climate
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Mitsubishi Comfort** {% term integration %} connects Mitsubishi Electric ductless minisplit heat pump and air conditioning systems to Home Assistant. It communicates directly with each indoor unit over your local network for low-latency control, using the Kumo Cloud account only for initial device discovery and credential retrieval.

This integration supports indoor units (full climate control) and Kumo Station outdoor units (temperature monitoring only).

## Prerequisites

- A [Kumo Cloud](https://app.kumocloud.com) account with your Mitsubishi devices registered
- Devices must be connected to your local network via their Wi-Fi adapters
- During setup you will be asked to enter the **username** and **password** for your Kumo Cloud account. The integration uses these credentials to discover your devices and retrieve the local API passwords needed for direct communication.

{% include integrations/config_flow.md %}

## Supported devices

- **Indoor unit** (ductless, ducted) — Full climate control: mode, temperature, fan speed, vane direction. Sensors: temperature, humidity, filter status, Wi-Fi signal.
- **Kumo Station** (outdoor unit) — Read-only: outdoor temperature, Wi-Fi signal.
## Supported functionality

The **Mitsubishi Comfort** integration provides the following entities.
### Climate

Each indoor unit is exposed as a climate entity with the following capabilities:

- **HVAC modes**: Off, Cool, Heat, Dry, Fan only, Heat/Cool (auto)
  - Availability depends on the specific unit.
- **Fan modes**: Super Quiet, Quiet, Low, Powerful, Super Powerful, Auto
  - The number of available speeds depends on the unit.
- **Swing modes**: Horizontal, Mid-Horizontal, Midpoint, Mid-Vertical, Vertical, Auto, Swing
  - Availability depends on the unit.
- **Temperature**: Single setpoint in Cool and Heat modes, separate high and low setpoints in Heat/Cool (auto) mode.
  - Temperature ranges vary by unit and mode.

Temperature ranges are read from the device profile and may vary by unit and mode.

## How it works

1. **Setup**: The integration authenticates with Kumo Cloud to discover devices and retrieve per-device API credentials.
2. **Runtime**: All communication happens directly with the devices over your LAN using their local HTTP API. No cloud connection is needed after initial setup.
3. **Polling**: Device status is polled every 60 seconds. Commands (mode changes, temperature adjustments) are sent immediately and use optimistic state updates for responsive UI feedback.
4. **Credentials**: Device credentials are cached locally so the integration can reconnect after a restart without contacting the cloud.


## Removing the integration

{% include integrations/remove_device_service.md %}

Removing the integration stops all polling and closes connections to the devices. Your Kumo Cloud account and device settings are not affected.

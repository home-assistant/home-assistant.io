---
title: Mitsubishi Comfort
description: Instructions on how to integrate Mitsubishi minisplit systems into Home Assistant.
ha_category:
  - Climate
ha_release: "2026.5"
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@nikolairahimi'
ha_domain: mitsubishi_comfort
ha_platforms:
  - climate
ha_dhcp: true
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Mitsubishi Comfort** integration connects Mitsubishi Electric ductless minisplit heat pump and air conditioning systems to Home Assistant. It communicates directly with each indoor unit over your local network for low-latency control, using the Kumo Cloud account only for initial device discovery and credential retrieval.

This integration supports indoor units (full climate control) and Kumo Station outdoor units (temperature monitoring only).

## Prerequisites

- A [Kumo Cloud](https://app.kumocloud.com) account with your Mitsubishi devices registered
- Devices must be connected to your local network via their Wi-Fi adapters

{% include integrations/config_flow.md %}

## Configuration

During setup you will be asked to enter the **username** and **password** for your Kumo Cloud account. The integration uses these credentials to discover your devices and retrieve the local API passwords needed for direct communication.

After setup, you can adjust the following options under **Settings** > **Devices & services** > **Mitsubishi Comfort** > **Configure**:

- **Connection timeout** — How long to wait when connecting to a device (default: 1.2 seconds)
- **Response timeout** — How long to wait for a device response (default: 8.0 seconds)

## Supported devices

- **Indoor unit** (ductless, ducted) — Full climate control: mode, temperature, fan speed, vane direction. Sensors: temperature, humidity, filter status, Wi-Fi signal.
- **Kumo Station** (outdoor unit) — Read-only: outdoor temperature, Wi-Fi signal.

## Climate entity

Each indoor unit is exposed as a climate entity with the following capabilities:

- **HVAC modes**: Off, Cool, Heat, Dry, Fan Only, Heat/Cool (auto) — availability depends on the specific unit's capabilities
- **Temperature setpoints**: Single setpoint in cool/heat modes, dual setpoints (high/low) in auto mode
- **Fan modes**: Super Quiet, Quiet, Low, Powerful, Super Powerful, Auto — number of speeds depends on the unit
- **Swing modes**: Horizontal, Mid-Horizontal, Midpoint, Mid-Vertical, Vertical, Auto, Swing — availability depends on the unit

Temperature ranges are read from the device profile and may vary by unit and mode.

## How it works

1. **Setup**: The integration authenticates with Kumo Cloud to discover devices and retrieve per-device API credentials.
2. **Runtime**: All communication happens directly with the devices over your LAN using their local HTTP API. No cloud connection is needed after initial setup.
3. **Polling**: Device status is polled every 60 seconds. Commands (mode changes, temperature adjustments) are sent immediately and use optimistic state updates for responsive UI feedback.
4. **Credentials**: Device credentials are cached locally so the integration can reconnect after a restart without contacting the cloud.

## DHCP discovery

The integration can automatically detect Mitsubishi adapters on your network via DHCP (MAC address prefixes `24:CD:8D` and `70:87:A7`). When a device is detected, you will be prompted to set up the integration.

## Removing the integration

{% include integrations/remove_device_service.md %}

Removing the integration stops all polling and closes connections to the devices. Your Kumo Cloud account and device settings are not affected.

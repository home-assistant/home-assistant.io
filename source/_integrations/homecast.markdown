---
title: Homecast
description: Instructions on setting up Homecast within Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
  - Climate
  - Cover
  - Fan
  - Hub
  - Light
  - Lock
  - Sensor
  - Switch
ha_release: 2025.12
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: homecast
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - climate
  - cover
  - fan
  - light
  - lock
  - sensor
  - switch
ha_integration_type: hub
ha_codeowners:
  - '@parob'
ha_quality_scale: bronze
---

[Homecast](https://homecast.cloud) bridges Apple HomeKit smart home devices to open standards, enabling remote control, API access, and AI assistant integration. The Homecast macOS or iOS app runs on your home network as a relay between HomeKit and the Homecast cloud.

This integration connects Home Assistant to the Homecast cloud API, exposing your HomeKit devices as native Home Assistant entities with real-time state updates.

{% include integrations/config_flow.md %}

## Prerequisites

- A [Homecast](https://homecast.cloud) account
- The Homecast macOS or iOS app running on your home network as a relay
- At least one HomeKit home with devices

## Setup

1. Go to **{% my integrations title="Settings > Devices & services" %}** and select **Add integration**.
2. Search for **Homecast** and select it.
3. Select **Homecast Cloud** or **Homecast Community** (local server).
4. You will be redirected to the Homecast OAuth consent screen.
5. Log in with your Homecast account.
6. Select which homes to share and the permission level (view or control).
7. Confirm — your HomeKit devices will appear in Home Assistant within seconds.

No manual OAuth client registration is needed — the integration registers credentials automatically.

## Supported devices

The following HomeKit device types are supported:

- **Lightbulb** — On/off, brightness, color, color temperature
- **Switch / Outlet** — On/off
- **Thermostat / Heater-Cooler** — HVAC mode, temperature targets
- **Lock** — Lock / unlock
- **Window Covering** — Position (0–100%), open/close
- **Fan** — On/off, speed
- **Security System** — Arm home/away/night, disarm
- **Motion Sensor** — Motion detected
- **Contact Sensor** — Open/closed
- **Temperature Sensor** — Temperature (°C)
- **Light Sensor** — Illuminance (lux)

Devices with batteries automatically get battery level and low battery entities.

## How it works

The integration connects to the Homecast cloud via WebSocket for real-time push updates. When a device state changes (from Apple Home, Siri, automations, or any other source), the update is pushed to Home Assistant within one to two seconds.

A full state resync via REST polling runs every five minutes as a safety net to catch any missed updates.

When you control a device through Home Assistant, the command is sent via the REST API and the WebSocket delivers the confirmed state change back.

Devices are automatically organized into Home Assistant areas based on their HomeKit room names. If you have multiple homes, room names are prefixed with the home name (for example, "County Hall - Living Room").

## Troubleshooting

### Devices not appearing

Make sure the Homecast relay app (macOS or iOS) is running and connected. The relay must be online for the API to return device state.

### Re-authentication

If your OAuth token expires, Home Assistant will show a notification prompting you to re-authenticate. Go to **{% my integrations title="Settings > Devices & services" %}** > **Homecast** and follow the re-auth flow.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

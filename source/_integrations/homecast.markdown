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
ha_release: "2025.12"
ha_iot_class: Cloud Polling
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

[Homecast](https://homecast.cloud) bridges Apple HomeKit smart home devices to open standards, enabling remote control, API access, and AI assistant integration. The Homecast Mac or iOS app runs on your home network as a relay between HomeKit and the Homecast cloud.

This integration connects Home Assistant to the Homecast cloud API, exposing your HomeKit devices as native Home Assistant entities.

{% include integrations/config_flow.md %}

## Prerequisites

- A [Homecast](https://homecast.cloud) account
- The Homecast Mac or iOS app running on your home network as a relay
- At least one HomeKit home with devices

## Setup

1. Go to **{% my integrations title="Settings > Devices & services" %}** and click **Add integration**.
2. Search for **Homecast** and select it.
3. You will be redirected to the Homecast OAuth consent screen.
4. Log in with your Homecast account.
5. Select which homes to share and the permission level (view or control).
6. Confirm — your HomeKit devices will appear in Home Assistant within seconds.

No manual OAuth client registration is needed — the integration handles this automatically using PKCE.

## Supported devices

| HomeKit device | Home Assistant platform | What you can control |
| --- | --- | --- |
| Lightbulb | Light | On/off, brightness, color, color temperature |
| Switch / Outlet | Switch | On/off |
| Thermostat / Heater-Cooler | Climate | HVAC mode, temperature targets |
| Lock | Lock | Lock / unlock |
| Window Covering | Cover | Position (0–100%), open/close |
| Fan | Fan | On/off, speed |
| Security System | Alarm control panel | Arm home/away/night, disarm |
| Motion Sensor | Binary sensor | Motion detected |
| Contact Sensor | Binary sensor | Open/closed |
| Temperature Sensor | Sensor | Temperature (°C) |
| Light Sensor | Sensor | Illuminance (lux) |

Devices with batteries automatically get battery level and low battery entities.

## How it works

The integration polls the Homecast REST API (`GET /rest/state`) every 30 seconds to fetch device state. When you control a device through Home Assistant, it sends the command via `POST /rest/state` and triggers an immediate refresh.

Devices are automatically organized into Home Assistant areas based on their HomeKit room names. If you have multiple homes, room names are prefixed with the home name (for example, "County Hall - Living Room").

## Data updates

The integration polls the Homecast cloud API every 30 seconds. After sending a control command, an additional refresh is triggered for faster feedback.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Troubleshooting

### Devices not appearing

Make sure the Homecast relay app (Mac or iOS) is running and connected. The relay must be online for the API to return device state.

### Stale or delayed state

State updates every 30 seconds via polling. WebSocket-based real-time updates are planned for a future release.

### Re-authentication

If your OAuth token expires, Home Assistant will show a notification prompting you to re-authenticate. Go to **{% my integrations title="Settings > Devices & services" %}** > **Homecast** and follow the re-auth flow.

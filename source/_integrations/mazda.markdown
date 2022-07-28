---
title: Mazda Connected Services
description: Instructions on how to integrate your Connected Services capable Mazda vehicle with Home Assistant.
ha_release: '2021.3'
ha_category:
  - Binary Sensor
  - Button
  - Car
  - Lock
  - Presence Detection
  - Sensor
  - Switch
ha_iot_class: Cloud Polling
ha_quality_scale: platinum
ha_config_flow: true
ha_codeowners:
  - '@bdr99'
ha_domain: mazda
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - lock
  - sensor
  - switch
ha_integration_type: integration
---

The Mazda Connected Services integration allows you to retrieve data from a Mazda vehicle. In order to use this integration, you must first register your vehicle using the MyMazda app ([iOS](https://apps.apple.com/us/app/mymazda/id451886367)/[Android](https://play.google.com/store/apps/details?id=com.interrait.mymazda)).

This integration requires an active Mazda Connected Services subscription and a compatible vehicle. The following Mazda vehicles are Mazda Connected Services capable:

- Mazda3: 2019+
- CX-30: 2020+
- CX-5: 2021+
- CX-9: 2021+
- MX-30: 2020+

{% include integrations/config_flow.md %}

<div class='note warning'>
    The MyMazda API only allows one active session at a time. Therefore, if you use the same account with both Home Assistant and the MyMazda mobile app, you may experience issues ("Multiple devices detected" notifications, session expired warnings, etc.) To fix this, you can create a secondary MyMazda account, and share your vehicle with the secondary account. Log in to the mobile app using the primary account and select Menu > MyMazda > My Vehicle > Drivers > Manage Drivers > Invite Driver. When finished, log into the secondary account with Home Assistant.
</div>

## Platforms

### Button

Button entities are available to perform the following actions:

- Start engine (engine can only be started 2 consecutive times; to reset this counter, the vehicle must be driven)
- Stop engine (only works if the engine was started remotely)
- Turn on hazard lights (lights will flash briefly and then turn off)
- Turn off hazard lights (if they have been manually turned on from inside the vehicle - lights will turn back on if a door is opened)

Additionally, the following button entity is available for electric vehicles:

- Refresh vehicle status (only refreshes electric vehicle-related information)

### Sensor

The following sensor entities are available:
- Fuel remaining (only for gas vehicles)
- Fuel distance remaining (only for gas vehicles)
- Odometer
- Tire pressure (not available for CX-5 and CX-9 models)
- Charge level (only for electric vehicles)
- Remaining range (only for electric vehicles)

### Binary sensor

The following binary sensor entities are available:
 - Doors (open/closed, individual entities for each door)
 - Trunk (open/closed)
 - Hood (open/closed)
 - Plugged in (plugged in/unplugged, only for electric vehicles)

### Device tracker

Tracks the current location of the vehicle. This will generally update when the vehicle is switched off.

### Lock

Displays the current door lock status of the vehicle, and locks/unlocks the doors of the vehicle.

<div class='note info'>
    The "Automatic Re-Lock" feature will automatically re-lock the doors if they are not opened shortly after being unlocked. This applies regardless of whether you are using the key, or unlocking the doors remotely using Home Assistant or the MyMazda app.
</div>

### Switch

For electric vehicles, a "charging" switch entity will be created, which allows viewing and controlling the charging state of the vehicle battery.

## Services

This integration provides a single service:

### Service `mazda.send_poi`

Send a GPS location to the vehicle's navigation system as a POI (Point of Interest). Requires a navigation SD card installed in the vehicle.

| Service Data Attribute | Required | Description |
| ---------------------- | -------- | ----------- |
| `device_id` | yes | The device ID of the vehicle to send the GPS location to |
| `latitude` | yes | The latitude of the location to send. |
| `longitude` | yes | The longitude of the location to send. |
| `poi_name` | yes | A friendly name for the location. |

## Disclaimer

This integration is not affiliated with or endorsed by Mazda.

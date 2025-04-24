---
title: "Autoskope"
description: "Instructions on how to integrate Autoskope devices into Home Assistant."
ha_category:
  - Device tracker
ha_release: 2025.5
ha_iot_class: cloud_polling
ha_domain: autoskope
ha_platforms:
  - device_tracker
ha_config_flow: true
ha_integration_type: integration
ha_codeowners:
  - '@mcisk'
ha_quality_scale: platinum
---

The **Autoskope** {% term integration %} allows you to integrate your [Autoskope](https://autoskope.de) vehicle tracking devices with Home Assistant. Autoskope provides GPS tracking devices and cloud services for vehicles and other assets, offering features like location tracking, voltage monitoring, and various alerts.

This integration connects to the Autoskope cloud service to retrieve the current status and location of your registered vehicles.

## Supported devices

This integration should work with all past, present, and future hardware devices offered by Autoskope.


## Prerequisites

Configuration is handled entirely through the UI flow during setup. You will need to provide:

* **Username:** Your Autoskope account username.
* **Password:** Your Autoskope account password.
* **Host:** URL of the Autoskope API server (e.g., `https://portal.autoskope.de`).

These are the same credentials used for the Autoskope web portal and mobile app.

{% include integrations/config_flow.md %}
## Supported functionality

This integration provides the following entities:

### Device Tracker

A `device_tracker` entity is created for each vehicle registered in your Autoskope account. This entity tracks the location of the vehicle.

The state of the tracker will be the zone it is currently in (`home`, `not_home`, or a custom zone name) or `unavailable` if no position data is available.

The following attributes are provided:

| Attribute          | Description                                                                 | Example Value                  |
| ------------------ | --------------------------------------------------------------------------- | ------------------------------ |
| `source_type`      | Source of the location data.                                                | `gps`                          |
| `latitude`         | Latitude coordinate of the vehicle.                                         | `54.12345`                     |
| `longitude`        | Longitude coordinate of the vehicle.                                        | `12.54321`                     |
| `gps_accuracy`     | Estimated accuracy of the GPS signal in meters.                             | `3.0`                          |
| `battery_voltage`  | Voltage of the device's internal battery (if available).                    | `4.1`                          |
| `external_voltage` | Voltage of the vehicle's main battery connected to the device (if available). | `12.5`                         |
| `gps_quality`      | Raw GPS quality indicator from the API (used to calculate `gps_accuracy`).  | `1.5`                          |
| `imei`             | Unique IMEI number of the tracking device.                                  | `123456789012345`              |
| `model`            | Model name/type of the tracking device.                                     | `Autoskope V3`                 |
| `speed`            | Current speed of the vehicle in the unit system configured in Home Assistant. | `55.0`                         |
| `park_mode`        | Boolean indicating if the device reports being in park mode.                | `true` / `false`               |
| `last_update`      | Timestamp of the last position update received from the API (UTC).          | `2025-01-01T10:05:00Z`         |
| `activity`         | Current activity state derived from `park_mode` and `speed`.                | `parked` / `moving`            |

Note: Sensor entities for battery voltages and other values are planned for a future update.

## Data update

The integration {% term polling polls %} the Autoskope API every 60 seconds to retrieve the latest status and location data for all registered vehicles associated with the account.

## Troubleshooting

* **Authentication Errors:** If you change your Autoskope password, the integration will fail to connect. Home Assistant should prompt you to re-authenticate. Go to **Settings** > **Devices & Services**, find the Autoskope integration card, and click **Reconfigure** to enter your new password.
* **Connection Failed during Setup:** Ensure you have entered the correct **Host** URL for the Autoskope API. The default value (`https://portal.autoskope.de`) should be correct for most users. Also, verify your username and password. Check if your Home Assistant instance can reach the Autoskope host URL (e.g., firewall rules, DNS issues).
* **Vehicles Not Appearing:** If a vehicle you expect to see is missing in Home Assistant, log in to the Autoskope web portal or app and confirm that the vehicle is correctly registered, active, and associated with the account you used to set up the integration.
* **Entities Become Unavailable:** If entities become unavailable, check the Home Assistant logs (**Settings** > **System** > **Logs**) for errors related to the Autoskope integration. This could indicate temporary connectivity issues with the Autoskope API or problems with your account credentials.

## Known limitations

* **Update Delay:** Due to the 60-second polling interval for the cloud API, there will be a delay of up to 60 seconds (plus processing time) before status changes (like location or activity) are reflected in Home Assistant.
* **Limited Sensor Data:** Currently, only the primary external voltage and internal battery voltage are exposed as attributes. Support for additional sensor data available on newer devices (like Autoskope V3's extra battery inputs or digital inputs) is planned for a future update.

## Supported Devices

This integration should work with all past, present, and future hardware devices offered by Autoskope.

## Automation Examples

Here are a few examples of how you can use the Autoskope device tracker entities in your automations. Replace `device_tracker.my_vehicle_name` with the actual entity ID of your vehicle's tracker.

**Notify when the vehicle arrives home:**

```yaml
# filepath: automations.yaml
alias: Notify when car arrives home
trigger:
  - platform: state
    entity_id: device_tracker.my_vehicle_name
    to: "home"
action:
  - service: notify.mobile_app_your_phone # Replace with your notification service
    data:
      message: "The car has arrived home."
mode: single
```

**Turn on porch light on arrival after sunset:**

```yaml
# filepath: automations.yaml
alias: Turn on porch light on arrival after sunset
trigger:
  - platform: state
    entity_id: device_tracker.my_vehicle_name
    to: "home"
condition:
  - condition: sun
    after: sunset
action:
  - service: light.turn_on
    target:
      entity_id: light.porch_light # Replace with your light entity
mode: single
```

**Open garage when arriving near home:**

```yaml
# filepath: automations.yaml
alias: Open garage when arriving near home
trigger:
  - platform: zone
    entity_id: device_tracker.my_vehicle_name
    zone: zone.near_home # Replace with your zone entity
    event: enter
action:
  - service: cover.open_cover
    target:
      entity_id: cover.garage_door # Replace with your garage door entity
mode: single
```

**Enable Wallbox when car is home:**

```yaml
# filepath: automations.yaml
alias: Enable Wallbox when car is home
trigger:
  - platform: state
    entity_id: device_tracker.my_vehicle_name
    to: "home"
action:
  - service: switch.turn_on # Or appropriate service for your wallbox
    target:
      entity_id: switch.wallbox_charging_enable # Replace with your wallbox switch
mode: single
```

**Arm garage alarm when car leaves home:**

```yaml
# filepath: automations.yaml
alias: Arm garage alarm when car leaves home
trigger:
  - platform: state
    entity_id: device_tracker.my_vehicle_name
    from: "home"
action:
  - service: alarm_control_panel.alarm_arm_away # Or appropriate arming service
    target:
      entity_id: alarm_control_panel.garage_alarm # Replace with your alarm entity
mode: single
```

## Removal

To remove the Autoskope integration:

1. Go to Settings > Devices & Services.
2. Find the Autoskope integration card.
3. Click the three dots (...) menu on the card.
4. Select Delete.
Note: Entities and devices associated with vehicles that are removed from your Autoskope account (e.g., subscription canceled) will be automatically removed from Home Assistant during the next update cycle.

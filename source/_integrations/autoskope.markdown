---
title: Autoskope
description: Instructions on how to integrate Autoskope devices into Home Assistant.
ha_category:
  - Device tracker
ha_release: 2026.4
ha_iot_class: Cloud Polling
ha_domain: autoskope
ha_platforms:
  - device_tracker
ha_config_flow: true
ha_integration_type: hub
ha_codeowners:
  - '@mcisk'
ha_quality_scale: bronze
---

The **Autoskope** {% term integration %} allows you to integrate your [Autoskope](https://autoskope.de) vehicle tracking devices with Home Assistant. Autoskope provides GPS tracking devices and cloud services for vehicles and other assets, offering GPS-based vehicle location tracking.

## Supported devices

This integration works with all hardware devices offered by Autoskope.

## Prerequisites

You need an active Autoskope account with at least one vehicle registered in the [Autoskope web portal](https://portal.autoskope.de).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: Your Autoskope account username.
Password:
  description: Your Autoskope account password.
Host:
  description: "The URL of the Autoskope API server. For most users, the default value `https://portal.autoskope.de` is correct."
{% endconfiguration_basic %}

## Supported functionality

### Entities

The **Autoskope** integration provides the following entities for each vehicle registered in your account.

#### Device trackers

A device tracker entity is created for each vehicle. It tracks the current location of the vehicle and reports the zone it is in (`home`, `not_home`, or a custom zone name). If no position data is available, the state is `unavailable`.

The following attributes are provided:

- **source_type**: Source of the location data (for example, `gps`).
- **latitude**: Latitude coordinate of the vehicle.
- **longitude**: Longitude coordinate of the vehicle.
- **gps_accuracy**: Estimated accuracy of the GPS signal in meters.

## Examples

### Notify when the vehicle arrives home

```yaml
alias: "Notify when vehicle arrives home"
triggers:
  - trigger: state
    entity_id: device_tracker.my_vehicle
    to: "home"
actions:
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      message: "The vehicle has arrived home."
```

## Data updates

The **Autoskope** integration {% term polling polls %} the Autoskope API every 60 seconds to retrieve the latest location and status data for all registered vehicles.

## Known limitations

Due to the 60-second polling interval, there will be a delay of up to 60 seconds before location or status changes are reflected in Home Assistant.

## Troubleshooting

### Connection failed during setup

Make sure the **Host** URL is correct. For most users, the default value `https://portal.autoskope.de` is correct. Also verify your username and password, and confirm that your Home Assistant instance can reach the Autoskope host (no firewall or DNS issues).

### Vehicles not appearing

Log in to the Autoskope web portal or app and confirm that the vehicle is correctly registered, active, and associated with the account you used to set up the integration.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

Entities and devices associated with vehicles that are removed from your Autoskope account will be automatically removed from Home Assistant during the next update cycle.

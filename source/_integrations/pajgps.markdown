---
title: PAJ GPS
description: Instructions on how to integrate PAJ GPS devices into Home Assistant.
ha_category:
  - Device tracker
ha_release: 2026.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@skipperro'
ha_domain: pajgps
ha_zeroconf: true
ha_platforms:
  - device_tracker
ha_integration_type: hub
ha_quality_scale: platinum
---

The **PAJ GPS** {% term integration %} allows you to incorporate PAJ GPS devices from www.paj-gps.de into your Home Assistant.

It provides entities for tracking the location of your PAJ GPS devices.

## Prerequisites

- To use this integration you need to have an account on www.v2.finder-portal.com and your device must be properly configured and connected to the platform. 
- You then authenticate the integration with the same credentials you use to log in on www.v2.finder-portal.com. This data will be saved only in your Home Assistant and is required to generate API tokens.

{% include integrations/config_flow.md %}

{% configuration_basic %} 
Entity name: 
    description: "The name of the account to differentiate it from other accounts if you have more than one. It has no effect on the API or the devices, it's just for your reference in Home Assistant."
Email: 
    description: "Email address used to log in on www.v2.finder-portal.com."
Password: 
    description: "Password used to log in on www.v2.finder-portal.com."
{% endconfiguration_basic %}

## Supported functionality

The PAJ GPS integration provides the following entities.

### Device Tracker
- Location (latitude and longitude)

## Data updates

The integration is using multi-tier system for cloud {% term polling polls %}.
- Tier 1: General, mostly static data like device list is updated every 5 minutes.
- Tier 2: Device location is updated every 30 seconds.

## Possible use-cases

- Track the location of your PAJ GPS devices on a map in Home Assistant.
- Create automations based on the location or status of your PAJ GPS devices (e.g., open garage door when car is near).

## Examples

Opening the garage door when a car with a PAJ GPS device is near using automations:

{% raw %}

```yaml
alias: Open garage door for the car
description: "If car enters the home zone, open the garage door"
triggers:
  - trigger: zone
    entity_id: person.car-tracker
    zone: zone.home
    event: enter
conditions: []
actions:
  - device_id: 911369e994d578d19c090779e00c1fc7 # Garage door device
    domain: button
    entity_id: 2bfe1a2461c42ca75c62e066aab89e47 # Button for opening the door
    type: press
mode: single
```

{% endraw %}

## Known limitations

- The integration relies on the PAJ GPS cloud API, so if there are any issues with the API or your internet connection, the integration may not work properly.
- PAJ GPS devices also rely on GPS and cellular signals, so if the device is in an area with poor signal, the location updates may be inaccurate or delayed.
- The location updates are not real-time and depend on the polling intervals, so there may be a small delay (up to 30 seconds) in receiving updates about the device's location or status.
- The integration does not support geofencing events and zone-alerts from PAJ GPS, but these features are already part of Home Assistant itself, so there is no need for implemting them in this integration.
- Advanced fleet-management features or drive-logbooks provided by PAJ GPS are also not supported, as they are not relevant for the typical Home Assistant user and would require a lot of additional work to implement.

## Supported devices

All PAJ GPS devices that are compatible with the PAJ GPS cloud platform (www.v2.finder-portal.com) should work with this integration. 
The integration is using official API provided by PAJ GPS, so it should be compatible with all devices that are supported by the API.
If you encounter any issues with PAJ GPS devices, please report them.

## Supported functions

The integration supports the following functions:
- Tracking the location of PAJ GPS devices (latitude and longitude).
- Automatically discovering all devices connected to the user's account on www.v2.finder-portal.com and creating corresponding entities in Home Assistant.
- Handling authentication with the PAJ GPS cloud API using the user's email and password to generate API tokens for accessing device data.

## Troubleshooting

### No sensors other than GPS location available

Those will be available in the next realease of this integration.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

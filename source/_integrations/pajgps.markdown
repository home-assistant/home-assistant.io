---
title: PAJ GPS
description: Instructions on how to integrate PAJ GPS devices into Home Assistant.
ha_category:
  - Binary sensor
  - Device tracker
  - Sensor
  - Switch
ha_release: 2026.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@skipperro'
ha_domain: pajgps
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - device_tracker
  - switch
  - sensor
ha_integration_type: hub
ha_quality_scale: platinum
---

The **PAJ GPS** {% term integration %} allows you to incorporate PAJ GPS devices from www.paj-gps.de into your Home Assistant.

It provides entities for tracking the location, battery level, speed, and other attributes of your PAJ GPS devices.
You can also receive notifications for specific events such as SOS alerts or low battery warnings and enable/disable those alerts.

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
Consume notifications: 
    description: "If enabled the alerts notifications read by Home Assistant will be marked as read in the Finder Portal."
Fetch elevation data: 
    description: "If enabled, the integration will fetch elevation data for the devices from open-meteo API. This is an optional feature and can be disabled if you don't need elevation data or want to reduce the number of API calls."
Force battery sensor: 
    description: "Some devices that have a battery are mislabeled in the API as having no battery, which causes the integration to not create battery sensor for them. Enabling this option will force the integration to create battery sensor for all devices, even those that are labeled as having no battery. This is a workaround for the issue in the API and is being worked on by PAJ GPS team."
{% endconfiguration_basic %}

## Supported functionality

The PAJ GPS integration provides the following entities.

### Device Tracker
- Location (latitude and longitude)

### Sensor
- Battery level
- Speed
- Elevation

### Binary Sensor
- Different alert statuses (SOS, low battery, etc.)

### Switch
- Enable/disable different alerts (SOS, low battery, etc.)

## Data updates

The integration is using multi-tier system for cloud {% term polling polls %}.
- Tier 1: General, mostly static data like device list is updated every 5 minutes.
- Tier 2: Device location is updated every 30 seconds.
- Tier 3: Device alerts that are time-critical (like SOS) are checked every 10 seconds.
- Elevation data is only updated when the device is moving.
- Enabling or disabling alerts via the switch entities will trigger an immediate update of the alert status in API.

## Possible use-cases

- Track the location of your PAJ GPS devices on a map in Home Assistant.
- Receive notifications on your phone when a specific alert is triggered (e.g., SOS alert, low battery).
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

Car-alarm - send a notification to your phone when tracker detects shock or movement at night:

{% raw %}

```yaml
alias: Car alarm
description: "Send an alert to the phone if shock or movement is detected (Speed > 0) by the tracker"
triggers:
  - platform: state
    entity_id:
      - binary_sensor.car_tracker_shock_alert
    to: "on"
  - platform: numeric_state
    entity_id: sensor.car_tracker_speed
    above: 0
conditions:
  - condition: time
    after: "22:00:00"
    before: "06:00:00"

actions:
  - service: notify.my_phone_notify
    data:
      title: "Car alarm"
      message: "Shock or movement detected by the tracker!"
      

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
- Monitoring the battery level of the devices.
- Monitoring the speed of the devices.
- Monitoring the elevation of the devices (through open-meteo API).
- Receiving notifications for specific events such as SOS alerts or low battery warnings.
- Enabling/disabling specific alerts (SOS, low battery, etc.) through switch entities.
- Automatically discovering all devices connected to the user's account on www.v2.finder-portal.com and creating corresponding entities in Home Assistant.
- Updating device data at appropriate intervals based on the type of data (location, alerts, etc.) to ensure timely and accurate information in Home Assistant.
- Handling authentication with the PAJ GPS cloud API using the user's email and password to generate API tokens for accessing device data.

## Troubleshooting

### Battery level on devices without battery
Some PAJ GPS devices are repoting battery level despite not having an integrated battery. 
There is a mixup in the API between battery level and measured voltage, which is causing the confusion. 
PAJ GPS team is aware of this issue and is working on fixing it.

### No battery sensor for devices with battery
For the same reson as above, some devices in API are mislabeled as having no battery, despite having one.
They receive battery level updates, so in order to force battery sensor to show for them there is an option to force battery sensor for all devices in the configuration.
This issue is also being worked on by PAJ GPS team.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

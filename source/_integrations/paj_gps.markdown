---
title: PAJ GPS
description: Instructions on how to integrate PAJ GPS devices into Home Assistant.
ha_category:
  - Device tracker
  - Sensor
ha_release: 2026.6
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@skipperro'
ha_domain: paj_gps
ha_platforms:
  - device_tracker
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **PAJ GPS** {% term integration %} allows you to incorporate PAJ GPS devices from <www.paj-gps.de> into your Home Assistant.

It provides entities for tracking the location of your PAJ GPS devices, monitoring their speed, and checking the battery level of battery-powered devices.

## Possible use cases

- Track the location of your PAJ GPS devices on a map in Home Assistant.
- Create automations based on the location or status of your PAJ GPS devices (for example, open garage door when car is near).
- Get notified when a device's battery is running low so you can recharge it before it goes offline.

## Supported devices

All PAJ GPS devices that are compatible with the PAJ GPS cloud platform (<www.v2.finder-portal.com>) should work with this integration.
The integration is using official API provided by PAJ GPS, so it should be compatible with all devices that are supported by the API.
If you encounter any issues with PAJ GPS devices, please report them.

## Prerequisites

- To use this integration you need to have an account on <www.v2.finder-portal.com> and your device must be properly configured and connected to the platform.
- You then authenticate the integration with the same credentials you use to log in on <www.v2.finder-portal.com>. This data will be saved only in your Home Assistant and is required to generate API tokens.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
    description: "Email address used to log in on <www.v2.finder-portal.com>."
Password:
    description: "Password used to log in on <www.v2.finder-portal.com>."
{% endconfiguration_basic %}

## Supported functionality

The PAJ GPS integration provides the following entities.

### Device tracker

The PAJ GPS {% term integration %} will track the location of each device registered to your account. The integration provides real-time GPS coordinates (latitude and longitude) for your PAJ GPS devices.

### Sensors

- **Speed**
  - **Description**: The current speed of the PAJ GPS device in km/h, as reported by the GPS module.
- **Battery level**
  - **Description**: Remaining battery charge (0–100%) for PAJ GPS devices that have a built-in battery. Devices that are powered by the vehicle's electrical system, such as OBD, USB, or hardwired trackers, usually do not have this sensor.

## Examples

Opening the garage door when a car with a PAJ GPS device is near using automations:

{% raw %}

```yaml
alias: Open garage door for the car
description: "If car enters the home zone, open the garage door"
triggers:
  - trigger: zone
    entity_id: person.car_tracker
    zone: zone.home
    event: enter
actions:
  - action: button.press
    target:
      entity_id: button.garage_door_open
```

{% endraw %}

Sending a notification when a device's battery drops below 25%:

{% example %}
automation: |
  alias: "Notify when PAJ GPS battery is low"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.my_tracker_battery
      below: 25
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_phone
      data:
        title: "Tracker battery low"
        message: "Please recharge your tracker soon."
{% endexample %}

## Data updates

- The location updates are not real-time and depend on the polling intervals, so there may be a small delay (up to 30 seconds) in receiving updates about the device's location or status.

## Known limitations

- The integration relies on the PAJ GPS cloud API, so if there are any issues with the API or your internet connection, the integration may not work properly.
- PAJ GPS devices also rely on GPS and cellular signals, so if the device is in an area with poor signal, the location updates may be inaccurate or delayed.
- PAJ GPS platform alerts, such as SOS/panic button, geofence entry/exit, movement, and speed alerts, are not currently supported.
- Fleet-management features available on the PAJ GPS platform, such as logbooks, are not currently supported.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

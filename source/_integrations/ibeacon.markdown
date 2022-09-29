---
title: iBeacon Tracker
description: Instructions on how to integrate iBeacon devices into Home Assistant.
ha_category:
  - Device Tracker
  - Presence Detection
  - Sensor
ha_release: '2022.10'
ha_iot_class: Local Push
ha_domain: ibeacon
ha_platforms:
  - device_tracker
  - sensor
ha_bluetooth: true
ha_config_flow: true
ha_integration_type: integration
ha_codeowners:
  - '@bdraco'
---

{% include integrations/config_flow.md %}

iBeacons are Bluetooth-enabled devices that advertise identifiers to announce their location. For example, an iBeacon attached to a trash can be used to determine if the trash can is in the garage or on the street. Home Assistant can estimate the distance of an iBeacon device in proximity to the nearest Bluetooth adapter.

iBeacon devices will be automatically detected and added as they are discovered once the integration has been added via the UI and the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

iBeacon Devices are tracked by a combination of the following data:

- UUID (universally unique identifier) is a 128-bit identifier that is generally set the same for all iBeacons at the same physical location.
- Major is an integer to differentiate between iBeacons with the same UUID.
- Minor is an integer to differentiate between iBeacons with the same UUID and Major value.
- MAC address (except for devices with a randomized MAC address)

Consider setting up your iBeacons with a schema similar to the following:

- uuid=UUID major=1000 minor=1000 Downstairs Front Room
- uuid=UUID major=1000 minor=1001 Downstairs Bathroom
- uuid=UUID major=2000 minor=1001 Upstairs Main Bedroom
- uuid=UUID major=2000 minor=1002 Upstairs Guest Bedroom
- uuid=UUID major=3000 minor=1000 Attic

iBeacon devices that do not have stable Major and Minor values are not supported. The system automatically removes iBeacon devices with unstable Major and Minor values once ten (10) or more Major and Minor values have been seen with the same UUID from an iBeacon device with a fixed MAC address.

## Fixed MAC addresses

iBeacons with a fixed MAC address will get their own set of entities for each UUID, major, minor, and MAC address combination, enabling distance and presence detection per physical device basis. In this type of setup, it is permissible to have multiple iBeacons broadcasting the same UUID, Major, and Minor combination as long as you do not exceed five devices.

## Randomized MAC addresses

iBeacons with a randomized MAC address will be combined into a single set of entities once the integration discovers the same UUID, Major, and Minor combination has been seen coming from 10 or more MAC addresses. This allows distance and presence detection based on the last reporting data. When using randomized MAC addresses, only one device must broadcast the unique UUID, Major, and Minor combination.

## Sensors

The integration will create an Estimated Distance sensor by default. This estimated distance assumes perfect RF conditions and line of sight between the iBeacon and the Bluetooth adapter. Estimated distance is generally only helpful to tell if the iBeacon is in the immediate vicinity, near, or far away from the adapter. If the system has multiple adapters, the adapter with the best RSSI value for the iBeacon will be the one reporting the distance. As this can change, checking the source attribute when considering the distance is essential.

## Known working devices

- [Blue Charm Beacons BC011-MultiBeacon](https://bluecharmbeacons.com/product/bluetooth-ble-multi-beacon-bc011/)
- [Blue Charm Beacons BC021-MultiBeacon](https://bluecharmbeacons.com/product/bluetooth-ble-ibeacon-bc021-multibeacon-with-button-trigger-and-motion-sensor/)
- [Blue Charm Beacons BC037G-GeoPattern-iBeacon](https://bluecharmbeacons.com/product/blue-charm-bc037-ibeacon/)
- [Blue Charm Beacons BC037S-SmoothPattern-iBeacon](https://bluecharmbeacons.com/product/bluetooth-ble-ibeacon-bc037s-ibeacon/)
- [Blue Charm Beacons BC08-MultiBeacon](https://bluecharmbeacons.com/product/blue-charm-beacons-bluetooth-ble-ibeacon-bc08-multibeacon-w-motion-sensor-and-button-trigger-ble-5-0/)
- [Feasycom FSC-BP103B](https://www.feasycom.com/bluetooth-ibeacon-da14531)
- [Feasycom FSC-BP104D](https://www.feasycom.com/dialog-da14531-bluetooth-low-energy-beacon)
- [Feasycom FSC-BP108](https://www.feasycom.com/bluetooth-5-1-waterproof-bluetooth-beacon)
- [Pawscout Tag](https://pawscout.com/shop/pawscout-tag/)

## Example automation

```yaml
alias: "The black trash can has left the building"
mode: single
trigger:
  - platform: state
    entity_id: sensor.black_trash_bin_estimated_distance
    to: "unavailable"
    for:
      hours: 0
      minutes: 5
      seconds: 0
  - platform: numeric_state
    entity_id: sensor.black_trash_bin_estimated_distance
    for:
      hours: 0
      minutes: 5
      seconds: 0
    above: 20
action:
  - service: notify.notify
    data:
      message: "The black trash can has left the building"
      title: "The black trash can has left the building"
```

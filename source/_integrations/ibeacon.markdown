---
title: iBeacon Tracker
description: Instructions on how to integrate iBeacon devices into Home Assistant.
ha_category:
  - Presence Detection
  - Device Tracker
  - Sensor
ha_release: 2022.10
ha_iot_class: Local Push
ha_domain: ibeacon
ha_platforms:
  - device_tracker
  - sensor
ha_bluetooth: true
ha_config_flow: true
ha_integration_type: integration
---

{% include integrations/config_flow.md %}

iBeacon devices will be automatically detected and added as they are discovered once the integration has been added via the UI.

iBeacon Devices are tracked by a combination of the following data:

- UUID (universally unique identifier) is a 128-bit identifier that is generally set the same for all iBeacons at the same physical location.
- Major is an integer to differentiate between iBeacons with the same UUID.
- Minor is an integer to differentiate between iBeacons with the same UUID and Major value.

Consider setting up your iBeacons with a schema similar to the following:

- uuid=UUID major=1000 minor=1000 Downstairs Front Room
- uuid=UUID major=1000 minor=1001 Downstairs Bathroom
- uuid=UUID major=2000 minor=1001 Upstairs Main Bedroom
- uuid=UUID major=2000 minor=1002 Upstairs Guest Bedroom
- uuid=UUID major=3000 minor=1000 Attic

iBeacon devices that do not have stable Major and Minor values are not supported and will automatically be removed once 10 or more Major and Minor values are discovered for the same UUID from a devices with a fixed MAC address.

## Fixed MAC address iBeacons

iBeacons with a fixed MAC address will each get their own set of entities. This allows distance and presence detection on a per physical device basis. In this type of setup it is permissible to have multiple iBeacons broadcasting the same UUID, Major, and Minor combination as long as you do not exceed 5 devices doing so.

## Random MAC address iBeacons

iBeacons with a random MAC address will be combined into a single set of entities once the integration discovers the same UUID, Major, and Minor combination has been seen coming from 10 or more MAC addresses. This allows distance and presence detection based on the last reporting data. It is important that only one device is broadcasting the unique UUID, Major, and Minor combination when using random MAC addresses.

## Sensors

The integration will create an Estimated Distance sensor by default. This distance is an estimated that assumes perfect RF conditions and line of sight between the iBeacon between the Bluetooth adapter. The distance is an estimate and is generally only useful to tell if the iBeacon is in the immediate vicinity, near, or far away from the adapter. If the system has multiple adapters, the adapter with the best RSSI value for the iBeacon will be the one reporting the distance. As this can change it is important to check the source attribute when considering the distance.



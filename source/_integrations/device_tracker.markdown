---
title: Device tracker
description: Instructions on how to setup device tracking within Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.7
ha_quality_scale: internal
ha_domain: device_tracker
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The device tracker allows you to track devices in Home Assistant. This can happen by querying your wireless router or by having applications push location info.

{% include integrations/building_block_integration.md %}

To set up device tracking, add an integration that provides `device_tracker` entities, like the [Home Assistant Companion app](/integrations/mobile_app/) for phone-based location tracking or a router-based integration such as [Ubiquiti UniFi](/integrations/unifi/).

## The state of a tracked device

- The smallest [zone](/integrations/zone/) the device is currently in
- **Home** if the device is in the [home zone](/integrations/zone#home-zone)
- **Not Home** if device is not in any zone. 

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

### Zones

The state attribute `in_zones` is a list of all zones a devices is in, sorted by size with the smallest zone first.

### Coordinates

If an exact location is known and shared, a device tracker will have state attributes `latitude`, `longitude` and optionally `gps_accuracy` in meters.

### Type of device tracker

Device trackers can either track the exact position of a device, for example with GPS, or if the device is connected to a fixed device such as a WLAN router or BLE beacon.

#### Position trackers

Device trackers which track the position of a device, for example by means of GPS or another GNSS, has the `tracking_type` state attribute set to `position`.

#### Connection trackers

Device trackers which track the connection to a fixed device has the `tracking_type` state attribute set to `connection`. Connection device trackers will assume the device is in its associated zone when connected. The default associated zone is the [home zone](/integrations/zone#home-zone), but the it's possible to [customize](/docs/configuration/customizing-devices/) the device tracker to change to another zone.

### Legacy device trackers

Some integrations provide an older device tracker model which do not have the `tracking_type` or `in_zones` state attributes. These device trackers are scheduled for removal in the first half of 2027.

<p class='img'>
<img src='/images/integrations/device_tracker/state_device_tracker.png' alt='Screenshot showing the state of a device tracker entity in the developer tools' />
Screenshot showing the state of a device tracker entity in the developer tools.
</p>

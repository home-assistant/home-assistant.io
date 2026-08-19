---
title: Device tracker
description: Instructions on how to set up device tracking within Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.7
ha_quality_scale: internal
ha_domain: device_tracker
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
related:
  - docs: /integrations/person/
    title: Person
  - docs: /integrations/zone/
    title: Zone
---

The device tracker allows you to track devices in Home Assistant. This can happen by querying your wireless router or by having applications push location info.

{% include integrations/building_block_integration.md %}

To set up device tracking, add an integration that provides `device_tracker` entities, like the [Home Assistant Companion app](/integrations/mobile_app/) for phone-based location tracking or a router-based integration such as [Ubiquiti UniFi](/integrations/unifi/). You can connect device trackers to [person](/integrations/person/) entities and use them with [zones](/integrations/zone/) for automations that react when people or tracked devices enter or leave a place.

## The state of a tracked device

- The name of the smallest [zone](/integrations/zone/) the device is currently in.
- **Home** if the device is in the [home zone](/integrations/zone#home-zone).
- **Not home** if the device is not in any zone.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

### Zones

The state attribute `in_zones` is a list of all zones a device is in, sorted by size with the smallest zone first.

### Coordinates

If an exact location is known and shared, a device tracker will have the state attributes `latitude`, `longitude`, and optionally `gps_accuracy` in meters.

### Type of device tracker

Device trackers can either track the exact position of a device, for example with GPS, or track whether the device is connected to a fixed device, such as a Wi-Fi router or Bluetooth beacon.

#### Position trackers

Device trackers that track the position of a device, for example with GPS or another GNSS, have the `tracking_type` state attribute set to `position`.

#### Connection trackers

Device trackers that track whether a device is connected to a fixed device have the `tracking_type` state attribute set to `connection`. Connection device trackers assume the device is in their associated zone when connected. The default associated zone is the [home zone](/integrations/zone#home-zone), but you can [customize](/docs/configuration/customizing-devices/) the device tracker to use a different zone.

### Legacy device trackers

Some integrations provide an older device tracker model which do not have the `tracking_type` or `in_zones` state attributes. These device trackers are scheduled for removal in the first half of 2027.

<p class='img'>
<img src='/images/integrations/device_tracker/state_device_tracker.png' alt='Screenshot showing the state of a device tracker entity in Settings > Tools > States' />
<img src='/images/integrations/device_tracker/state_device_tracker.png' alt='Screenshot showing the state of a device tracker entity in the States tab of Tools.' />
Screenshot showing the state of a device tracker entity in {% my developer_states title="Settings > Tools > States" %}
</p>

## Automating tracked devices

You can use tracked devices in automations by connecting them to [person](/integrations/person/) entities and using [zone triggers](/integrations/zone/#triggers). This is the recommended path for presence automations because a person can combine multiple trackers, such as a phone and a router-based tracker, into one presence state.

Zone triggers can run an automation when a person or tracked device enters or leaves a zone. For example, you can turn on lights when you arrive home or send a notification when a tracked device leaves a school zone.

If you need to react to the raw state of one device tracker entity, use a [state trigger](/triggers/state/). Device tracker states depend on the integration that provides the entity. GPS-based trackers can report zones or custom location names, while router-based trackers usually report `home` or `not_home`.

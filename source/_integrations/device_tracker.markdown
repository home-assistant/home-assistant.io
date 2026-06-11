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

The type of state a device tracker can have depends on whether it uses GPS or a router as the data source.

A device tracker with **GPS** as a source can have any number of string states. The integration can return one of the following options:

- Report GPS coordinates. The coordinates are then matched to a zone (which is set as state). If the home zone is matched, the state will be **Home**. If no zone was matched the state will be **Not home**.
- Report a location. This could be any string which is set as state.

A device tracker with **router** as a source can have one of two states: **Home**, or **Not home**.

- **Home**: Your tracked device is in the [home zone](/integrations/zone/#about-the-home-zone), detected by your network or Bluetooth-based presence detection. If you're using a presence detection method that includes coordinates: when it's in a zone, the state equals the name of the zone (case sensitive).
- **Not home**: When a device isn't at home and isn't in any zone.

<p class='img'>
<img src='/images/integrations/device_tracker/state_device_tracker.png' alt='Screenshot showing the state of a device tracker entity in the developer tools' />
Screenshot showing the state of a device tracker entity in the developer tools.
</p>

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

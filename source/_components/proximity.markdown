---
layout: page
title: "Proximity"
description: "Instructions how to setup Proximity monitoring within Home Assistant."
date: 2016-02-07 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Organization
---

The `proximity` component allows you to monitor the proximity of devices to a particular [zone](/components/zone/) and the direction of travel. The result is an entity created in Home Assistant which maintains the proximity data.

This component is useful to reduce the number of automation rules required when wanting to perform automations based on locations outside a particular zone. The [zone](/components/automation/#zone-trigger) and [state](/components/automation/#state-trigger) based triggers allow similar control but the number of rules grows exponentially when factors such as direction of travel need to be taken into account.

Some examples of its use include:

- Increase thermostat temperature as you near home
- Decrease temperature the further away from home you travel

The Proximity entity which is created has the following values:

- `state`: Distance from the monitored zone (in km)
- `dir_of_travel`: Direction of the closest device to the monitored zone. Values are:
  - 'not set'
  - 'arrived'
  - 'towards'
  - 'away_from'
  - 'unknown'
  - 'stationary'
- `dist_to_zone`: Distance from the monitored zone (in km)

To enable this component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
proximity:
  zone: home
  ignored_zones:
    - twork
    - elschool
  devices:
    - device_tracker.nwaring_nickmobile
    - device_tracker.eleanorsiphone
    - device_tracker.tsiphone
  tolerance: 50
```

Configuration variables:

- **zone** (*Optional*): The zone to which this component is measuring the distance to. Default is the home zone.
- **ignored_zones** array (*Optional*): Where proximity is not calculated for a device (either the device being monitored or ones being compared (e.g. work or school).
- **devices** array (*Optional*):  A list of devices to compare location against to check closeness to the configured zone.
- **tollerance** (*Optional*): The tolerance used to calculate the direction of travel in meters (m) to filter out small GPS coordinate changes.


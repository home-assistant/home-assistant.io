---
title: Proximity
description: Instructions on how to setup Proximity monitoring within Home Assistant.
ha_category:
  - Automation
  - Presence Detection
ha_release: 0.13
ha_quality_scale: internal
ha_domain: proximity
ha_iot_class: Calculated
ha_integration_type: integration
---

The `proximity` integration allows you to monitor the proximity of devices or persons to a particular [zone](/integrations/zone/) and the direction of travel.

This integration is useful to reduce the number of automation rules required when wanting to perform automations based on locations outside a particular zone. The [zone](/docs/automation/trigger#zone-trigger) and [state](/docs/automation/trigger#state-trigger) based triggers allow similar control but the number of rules grows exponentially when factors such as direction of travel need to be taken into account.

Some examples of its use include:

- Increase thermostat temperature as you near home
- Decrease temperature the further away from home you travel

{% include integrations/config_flow.md %}

## Sensors

The following sensor entities will be created

### Distance

For each tracked device or person, the distance from the monitored zone in an unit depending on your [Home Assistant Unit System](/docs/configuration/basic) selection.
You can use the [Min/Max](/integrations/min_max) integration to determine the nearest and furthest distance.

### Direction of travel

For each tracked device or person, the direction of travel to or from the monitored zone. Values are:

- `arrived`
- `towards`
- `away_from`
- `stationary`

### Nearest device

The device or person which is nearest to the zone

### Video tutorial

This video tutorial explains how to set up geofencing in Home Assistant using the proximity integration.

<lite-youtube videoid="pjAyRN5UiBg" videotitle="Geofencing in Home Assistant - Tutorial" posterquality="maxresdefault"></lite-youtube>

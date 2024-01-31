---
title: Proximity
description: Instructions on how to setup Proximity monitoring within Home Assistant.
ha_category:
  - Automation
  - Presence detection
ha_release: 0.13
ha_quality_scale: internal
ha_domain: proximity
ha_iot_class: Calculated
ha_integration_type: integration
ha_codeowners:
  - '@mib1185'
---

The `proximity` integration allows you to monitor the proximity of devices or persons to a particular [zone](/integrations/zone/) and the direction of travel.

This integration is useful to reduce the number of automation rules required when wanting to perform automations based on locations outside a particular zone. The [zone](/docs/automation/trigger#zone-trigger) and [state](/docs/automation/trigger#state-trigger) based triggers allow similar control but the number of rules grows exponentially when factors such as direction of travel need to be taken into account.

Some examples of its use include:

- Increase thermostat temperature as you near home
- Decrease temperature the further away from home you travel

{% include integrations/config_flow.md %}

## Sensors

The following sensor entities will be created.

### Distance

For each tracked device or person, a sensor showing the distance from the monitored zone in a unit depending on your [Home Assistant Unit System](/docs/configuration/basic) selection is created.
You can use the [Min/Max](/integrations/min_max) integration to determine the nearest and furthest distance.

### Direction of travel

For each tracked device or person, a sensor showing the direction of travel to or from the monitored zone is created. Possible states are:

- `arrived`
- `away_from`
- `stationary`
- `towards`
- `unknown`

### Nearest device

A sensor showing the device or person which is nearest to the monitored zone is created.

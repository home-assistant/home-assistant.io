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

## Configuration

To enable this integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
proximity:
  home: 
    ignored_zones:
      - work
    devices:
      - device_tracker.car1
    tolerance: 50
    unit_of_measurement: mi
```

### Video Tutorial
This video tutorial explains how to set up geofencing in Home Assistant using the proximity integration.

<lite-youtube videoid="pjAyRN5UiBg" videotitle="Geofencing in Home Assistant - Tutorial" posterquality="maxresdefault"></lite-youtube>

{% configuration %}
zone:
  description: The zone to which this integration is measuring the distance to. Default is the home zone.
  required: false
  type: map
  keys:
    ignored_zones:
      description: Where proximity is not calculated for a device or person (either the device being monitored or ones being compared (e.g., work or school).
      required: false
      type: list
    devices:
      description: A list of devices and/or persons to compare location against to check closeness to the configured zone.
      required: false
      type: list
    tolerance:
      description: The tolerance used to calculate the direction of travel in meters (m) to filter out small GPS coordinate changes.
      required: false
      type: integer
    unit_of_measurement:
      description: The unit of measurement for distance. Valid values are (km, m, mi, yd, ft) [kilometers, meters, miles, yards and feet respectively].
      required: false
      type: string
      default: km
{% endconfiguration %}

To add multiple proximity components, add a mapping to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
proximity:
  home:
    ignored_zones:
      - work
      - school
    devices:
      - device_tracker.car1
      - device_tracker.iphone1
      - device_tracker.iphone2
    tolerance: 50
    unit_of_measurement: mi
  home3:
    zone: home3
    devices:
      - device_tracker.iphone1
    tolerance: 50
  work:
    zone: work
    devices:
      - person.paulus
    tolerance: 10
```

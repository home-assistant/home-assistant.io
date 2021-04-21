---
title: Proximity
description: Instructions on how to setup Proximity monitoring within Home Assistant.
ha_category:
  - Automation
  - Presence Detection
ha_release: 0.13
ha_quality_scale: internal
ha_domain: proximity
ha_iot_class:
---

The `proximity` integration allows you to monitor the proximity of devices or persons to a particular [zone](/integrations/zone/) and the direction of travel. The result is an entity created in Home Assistant which maintains the proximity data.

This integration is useful to reduce the number of automation rules required when wanting to perform automations based on locations outside a particular zone. The [zone](/getting-started/automation-trigger/#zone-trigger) and [state](/getting-started/automation-trigger/#state-trigger) based triggers allow similar control but the number of rules grows exponentially when factors such as direction of travel need to be taken into account.

Some examples of its use include:

- Increase thermostat temperature as you near home
- Decrease temperature the further away from home you travel

The Proximity entity which is created has the following values:

- `state`: Distance from the monitored zone (in km)
- `dir_of_travel`: Direction of the closest device or person to the monitored zone. Values are:
  - `not set`
  - `arrived`
  - `towards`
  - `away_from`
  - `unknown`
  - `stationary`
- `dist_to_zone`: Distance from the monitored zone (in km)
- `unit_of_measurement`: Measurement of distance. Values are:
  - `km`
  - `m`
  - `mi`
  - `yd`
  - `ft`
- `nearest`: The device or person which is nearest to the zone

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

To add multiple proximity components, simply use a list in your `configuration.yaml` file:

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

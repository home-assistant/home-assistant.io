---
title: Zone
description: Instructions on how to set up zones within Home Assistant.
ha_category:
  - Organization
  - Presence Detection
ha_release: 0.69
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: zone
ha_iot_class:
---

Zones allow you to specify certain regions on earth (for now). When a device tracker sees a device to be within a zone, the state will take the name from the zone. Zones can also be used as a [trigger](/getting-started/automation-trigger/#zone-trigger) or [condition](/getting-started/automation-condition/#zone-condition) inside automation setups.

Zones can be added and managed through the user interface at **{% my zones title="Configuration -> Zones" %}**.

Zones can also be configured via `configuration.yaml`:

```yaml
# Example configuration.yaml entry
zone:
  - name: School
    latitude: 32.8773367
    longitude: -117.2494053
    radius: 250
    icon: mdi:school

  - name: Work
    latitude: 32.8753367
    longitude: -117.2474053

  # This will override the default home zone
  - name: Home
    latitude: 32.8793367
    longitude: -117.2474053
    radius: 100
    icon: mdi:account-multiple
```

{% configuration %}
name:
  description: The friendly name of the zone.
  required: true
  type: string
latitude:
  description: The latitude of the center point of the zone.
  required: true
  type: float
longitude:
  description: The longitude of the center point of the zone.
  required: true
  type: float
radius:
  description: The radius of the zone in meters.
  required: false
  type: integer
  default: 100
icon:
  description: The icon to show instead of name.
  required: false
  type: string
passive:
  description: To only use the zone for automation and hide it from the frontend and not use the zone for device tracker name.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

To find the latitude/longitude of a certain place you can use [Google Maps](https://www.google.com/maps/) or [Bing Maps](https://www.bing.com/maps). Just right click and copy the coordinates from there (Bing) or click on the "What is here?" (Google)

## Home zone

If no configuration is given, the `zone` integration will create a zone for home. This zone will use location provided in the `configuration.yaml` file and have a radius of 100 meters. To override this, create a zone configuration and name it **'Home'**.

<div class='note'>

Devices that are in the zone **'Home'** will not appear on the map in the Home Assistant UI.

</div>

## Icons

It is preferred to pick an icon to use for your zone. Pick any icon that you can find on [materialdesignicons.com](https://materialdesignicons.com/) and prefix the name with `mdi:`. For example `mdi:school`, `mdi:briefcase`, `mdi:home`, `mdi:cart`, or `mdi:castle`.

## State

`zoning` is the state a `zone` has when it is configured. A `zone` doesn't have another state; all configured zones are `zoning` all the time.

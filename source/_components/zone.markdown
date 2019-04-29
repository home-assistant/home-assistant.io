---
layout: page
title: "Zone"
description: "Instructions on how to set up zones within Home Assistant."
date: 2015-10-04 09:23
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Organization
ha_qa_scale: internal
ha_release: 0.69
---

Zones allow you to specify certain regions on earth (for now). When a device tracker sees a device to be within a zone, the state will take the name from the zone. Zones can also be used as a [trigger](/getting-started/automation-trigger/#zone-trigger) or [condition](/getting-started/automation-condition/#zone-condition) inside automation setups.

The `zone` component uses YAML sequences to configure multiple zones:

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
  required: false
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
area_threshold:
  description: Minimum GPS accuracy cycle area portion that needs to intersect with zone cycle for zone to match.
  required: false
  type: float
accuracy_threshold:
  description: Maximum GPS accuracy cycle radius for zone to match.
  required: false
  type: float
{% endconfiguration %}

To find the latitude/longitude of a certain place you can use [Google Maps](https://www.google.com/maps/) or [Bing Maps](https://www.bing.com/maps). Just right click and copy the coordinates from there (Bing) or click on the "What is here?" (Google)

## {% linkable_title Home zone %}

If no configuration is given, the `zone` component will create a zone for home. This zone will use location provided in the `configuration.yaml` file and have a radius of 100 meters. To override this, create a zone configuration and name it **'Home'**.

<p class='note'>
Devices that are in the zone **'Home'** will not appear on the map in the Home Assistant UI.
</p>

## {% linkable_title Thresholds %}

By default zone is matching GPS coordinates (assigned to device) if GPS accuracy cycle (with radius equal to coordinates accuracy)
at least touches the zone cycle (formed by zone coordinates and radius). Following parameters are provided to tune this behaviour:

If `accuracy_threshold` (defined in meters) is set then only GPS coordinates that have accuracy value lower than `accuracy_threshold` can match the zone.

If `area_threshold` (defined as value from 0.0 to 1.0) is set then GPS coordinates match the zone only if the following condition is met: 
the fraction of the area of GPS accuracy cycle intersecting with zone cycle should be not less that `area_threshold`.

## {% linkable_title Icons %}

It is preferred to pick an icon to use for your zone. Pick any icon that you can find on [materialdesignicons.com](https://materialdesignicons.com/) and prefix the name with `mdi:`. For example `mdi:school`, `mdi:worker`, `mdi:home`, `mdi:cart`, or `mdi:castle`.

## {% linkable_title State %}

`zoning` is the state a `zone` has when it is configured. A `zone` doesn't have another state; all configured zones are `zoning` all the time.

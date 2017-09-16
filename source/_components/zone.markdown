---
layout: page
title: "Zone"
description: "Instructions how to setup zones within Home Assistant."
date: 2015-10-04 09:23
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Organization
---

Zones allow you to specify certain regions on earth (for now). When a device tracker sees a device to be within a zone, the state will take the name from the zone. Zones can also be used as a [trigger](/getting-started/automation-trigger/#zone-trigger) or [condition](/getting-started/automation-condition/#zone-condition) inside automation setups.

The Zone component uses YAML sequences to configure multiple zones:

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

Configuration variables:

- **name** (*Optional*): Friendly name of the zone.
- **latitude** (*Required*): Latitude of the center point of the zone.
- **longitude** (*Required*): Longitude of the center point of the zone.
- **radius** (*Optional*): Optional radius in meters. Defaults to 100 meters.
- **icon** (*Optional*): Optional icon to show instead of name.
- **passive** (*Optional*): Optional boolean to only use the zone for automation and hide it from the UI and not use the zone for device tracker name. Defaults to false.

To find the latitude/longitude of a certain place you can use [Google Maps](https://www.google.com/maps/) or [Bing Maps](https://www.bing.com/maps). Just right click and copy the coordinates from there (Bing) or click on the "What is here?" (Google)

#### {% linkable_title Home zone %}

If no configuration is given, the `zone` component will create a zone for home. This zone will use location provided in the `configuration.yaml` file and have a radius of 100 meters. To override this, create a zone configuration and name it **'Home'**.

<p class='note'>
Devices that are in the zone **'Home'** will not appear on the map in the Home Assistant UI.
</p>

#### {% linkable_title Icons %}

It is preferred to pick an icon to use for your zone. Pick any icon that you can find on [materialdesignicons.com](https://materialdesignicons.com/) and prefix the name with `mdi:`. For example `mdi:school`, `mdi:worker`, `mdi:home`, `mdi:cart`, or `mdi:castle`.

#### State

`zoning` is the state a `zone` has when it is configured. A `zone` doesn't have another state; all configured zones are `zoning` all the time.

---
layout: component
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

Zones allow you to specify certain regions on earth (for now). When a device tracker sees a device to be within a zone, the state will take the name from the zone. Zones can also be used as a [trigger](/components/automation/#zone-trigger) or [condition](/components/automation/#zone-condition) inside automation setups.

Zones support the usual method to specify multiple zones, use keys `zone:`, `zone 2:` etc.

```yaml
# Example configuration.yaml entry
zone:
  name: School
  latitude: 32.8773367
  longitude: -117.2494053
  # Optional radius in meters (default: 100)
  radius: 250
  # Optional icon to show instead of name
  icon: mdi:school

zone 2:
  name: Work
  latitude: 32.8753367
  longitude: -117.2474053

# This will override the default home zone
zone 3:
  name: Home
  latitude: 32.8793367
  longitude: -117.2474053
  radius: 100
  icon: mdi:account-multiple
```

#### {% linkable_title Home zone %}

If no configuration is given, the zone component will create a zone for home. This zone will use location given in the `configuration.yaml` file and have a radius of 100 meters. To override this, create a zone configuration and name it 'Home'.

#### {% linkable_title Icons %}

It is preferred to pick an icon to use for your zone. Pick any zone that you can find on [materialdesignicons.com](https://materialdesignicons.com/) and prefix the name with `mdi:`. For example `mdi:school`, `mdi:worker`, `mdi:home`, `mdi:cart`, `mdi:castle`.

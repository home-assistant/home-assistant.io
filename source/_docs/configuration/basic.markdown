---
layout: page
title: "Setup basic information"
description: "Setting up the basic info of Home Assistant."
date: 2015-03-23 12:50
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/basic/
---

By default, Home Assistant will try to detect your location from IP address geolocation. Home Assistant will automatically select a temperature unit and time zone based on this location. You can overwrite this by adding the following information to your `configuration.yaml`:

```yaml
homeassistant:
  latitude: 32.87336
  longitude: 117.22743
  elevation: 430
  unit_system: metric
  time_zone: America/Los_Angeles
  name: Home
  whitelist_external_dirs:
    - /usr/var/dumping-ground
    - /tmp
```

Configuration variables:

- **latitude** (*Optional*): Latitude of your location required to calculate the time the sun rises and sets.
- **longitude** (*Optional*): Longitude of your location required to calculate the time the sun rises and sets.
- **elevation** (*Optional*): Altitude above sea level in meters. Impacts weather/sunrise data. 
- **unit_system** (*Optional*): `metric` for Metric, `imperial` for Imperial.
- **time_zone** (*Optional*): Pick yours from here: [http://en.wikipedia.org/wiki/List_of_tz_database_time_zones](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
- **name** (*Optional*): Name of the location where Home Assistant is running.
- **customize** (*Optional*): [Customize](/docs/configuration/customizing-devices/) entities.
- **customize_domain** (*Optional*): [Customize](/docs/configuration/customizing-devices/) all entities in a domain.
- **customize_glob** (*Optional*): [Customize](/docs/configuration/customizing-devices/) entities matching a pattern.
- **whitelist_external_dirs** (*Optional*): List of folders that can be used as sources for sending files.
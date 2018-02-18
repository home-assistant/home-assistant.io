---
layout: page
title: "Entity component platform options"
description: "Shows how to customize polling interval for any component via configuration.yaml."
date: 2016-02-12 23:17 -0800
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /topics/platform_options/
---

Some components or platforms (those that are based on the [entity](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/helpers/entity.py) class) allows various extra options to be set.

### {% linkable_title Entity namespace %}

By setting an entity namespace, all entities will be prefixed with that namespace. That way `light.bathroom` can become `light.holiday_house_bathroom`.

```yaml
# Example configuration.yaml entry
light:
  platform: hue
  entity_namespace: holiday_house
```

### {% linkable_title Scan Interval %}

Platforms that require polling will be polled in an interval specified by the main component. For example a light will check every 30 seconds for a changed state. It is possible to overwrite this scan interval for any platform that is being polled by specifying a `scan_interval` configuration key. In the example below we setup the Philips Hue lights but tell Home Assistant to poll the devices every 10 seconds instead of the default 30 seconds.

```yaml
# Example configuration.yaml entry to poll Hue lights every 10 seconds.
light:
  platform: hue
  scan_interval: 10
```

---
layout: page
title: "Geofancy device tracker"
description: "Instructions how to use Geofancy to track devices in Home Assistant."
date: 2015-10-13 19:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/geofancy.png' class='brand pull-right' />
This platform allows you to detect presence using [Geofancy](https://my.geofancy.com/). Geofancy allows users to track their location on iOS devices. 

To integrate Geofancy in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: geofancy
```

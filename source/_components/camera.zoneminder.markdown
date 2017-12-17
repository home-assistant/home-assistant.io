---
layout: page
title: "ZoneMinder Camera"
description: "View ZoneMinder camera streams within Home Assistant."
date: 2017-02-19 18:11
sidebar: true
comments: false
sharing: true
footer: true
logo: zoneminder.png
ha_category: Camera
ha_release: 0.39
ha_iot_class: "Local Polling"
---


The `zoneminder` camera platform lets you monitor the current stream of your [ZoneMinder](https://www.zoneminder.com) cameras.

<p class='note'>
You must have the [ZoneMinder component](/components/zoneminder/) configured to view the camera stream.
</p>

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: zoneminder
```

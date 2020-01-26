---
layout: page
title: "QVR Pro Camera"
description: "Instructions on how to integrate cameras from QVR Pro within Home Assistant."
date: 2020-01-25 19:29
sidebar: true
comments: false
sharing: true
footer: true
logo: camcorder.png
ha_category: Camera
ha_release: 0.105
ha_iot_class: "Local Polling"
---


The `qvrpro` camera platform allows integration of QVR Pro video 
channels into Home Assistant.

<p class='note'>
  You must have the [QVR Pro component](/components/qvrpro/) configured to use this camera.
</p>

To enable QVR Pro channels as cameras in your installation, add the following to your
`configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: qvrpro
```

Enabling the QVR Pro camera platform will add all QVR Pro channels by
default. Please see `exclude_channels` config option on the
[QVR Pro component](/components/qvrpro/) if you would like to exclude
certain channels. 
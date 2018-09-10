---
layout: page
title: "Z-Wave Cover"
description: "Instructions on how to setup the Z-Wave covers within Home Assistant."
date: 2016-12-18 19:41
sidebar: true
comments: false
sharing: true
footer: true
logo: z-wave.png
ha_category: Cover
ha_release: 0.23
ha_iot_class: "Local Push"
---

Z-Wave garage doors, blinds, and roller shutters are supported as cover in Home Assistant.

To get your Z-Wave covers working with Home Assistant, follow the instructions for the general [Z-Wave component](/components/zwave/).

If you discover that you need to [invert the operation](/docs/z-wave/installation/#invert_openclose_buttons) of open/close for a particular device, you may change this behavior in your Z-Wave section of your `configuration.yaml` file as follows:

```yaml
zwave:
  device_config:
    cover.my_cover:
      invert_openclose_buttons: true
```

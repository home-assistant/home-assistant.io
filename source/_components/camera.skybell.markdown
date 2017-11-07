---
layout: page
title: "Skybell Camera"
description: "Instructions on how to integrate your Skybell HD devices within Home Assistant."
date: 2017-10-03 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: skybell.png
ha_category: Camera
ha_release: 0.56
ha_iot_class: "Cloud Polling"
---

To get your [Skybell.com](https://www.skybell.com/) cameras working within Home Assistant, please follow the instructions for the general [Skybell component](/components/skybell).

Once you have enabled the [Skybell component](/components/skybell), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: skybell
```

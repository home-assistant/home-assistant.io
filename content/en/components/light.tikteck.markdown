---
layout: page
title: "Tikteck"
description: "Instructions on how to setup Tikteck LED bulbs within Home Assistant."
date: 2017-01-04 16:32
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
ha_iot_class: "Local Polling"
ha_logo: tikteck.png
ha_release: 0.36
---

Support for the Bluetooth smart bulb from [Tikteck](http://www.tikteck.com). To enable these lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: tikteck
    devices:
      00:21:4D:00:00:01:
        name: Bulb 1
        password: 76409387
      00:21:4D:00:00:01:
        name: Bulb 2
        password: 36478643
```

Configuration variables:

- **devices**: A list of devices with their bluetooth address, a custom name to use in the frontend and the bulb-specific password. The password can be obtained from an Android device using an app like [aLogcat](https://play.google.com/store/apps/details?id=org.jtb.alogcat&hl=en) or the `adb logcat` command for phones in developer mode. Look for a line like:

```
E LedoBleSDK: login =skName=======[Smart Light]=======skPw==[password]
```

The password is the text between the square brackets following `skPw`.

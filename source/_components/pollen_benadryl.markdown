---
layout: page
title: "Benadryl Social Pollen Count Sensor"
description: "How to integrate the Benadryl Social Pollen Count sensor into Home Assistant."
date: 2018-12-24 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: benadryl_pollen.png
ha_category:
  - Sensor
  - Health
ha_release: 0.95
ha_iot_class: Cloud Polling
---

The Benadryl Social Pollen Count sensor pulls the current pollen count from the [website](https://www.benadryl.co.uk/social-pollen-count) to your instance.

## {% linkable_title Configuration %}

To enable this platform, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pollen_benadryl
```

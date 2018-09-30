---
layout: page
title: "Huawei LTE Router Device Tracker"
description: "Instructions on how to use Huawei LTE routers to track devices within Home Assistant."
date: 2018-09-08 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: huawei.svg
ha_category: Presence Detection
ha_release: 0.79
---


This platform offers presence detection by looking at connected devices to a [Huawei LTE router](https://consumer.huawei.com/en/smart-home/).

This requires you to have set up the [Huawei LTE component](/components/huawei_lte/).

## {% linkable_title Configuration %}

To enable the sensor, add the following lines to your
`configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: huawei_lte
```

See the [device tracker component page](/components/device_tracker/)
for instructions how to configure the people to be tracked.

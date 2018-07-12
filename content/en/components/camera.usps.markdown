---
layout: page
title: USPS Camera
description: "Instructions on how to set up USPS camera within Home Assistant."
date: 2017-07-28 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: usps.png
ha_category: Camera
ha_release: 0.52
ha_iot_class: "Cloud Polling"
---


The `usps` camera component allows you to view the mail piece images made available through USPS via the Informed Delivery service.  You must "Opt-In" to [Informed Delivery](https://informeddelivery.usps.com/box/pages/intro/start.action) to see mail images. This works in concert with [USPS sensors](/components/sensor.usps).

<p class='note'>
You must have the [USPS component](/components/usps/) configured to use this camera. The camera will be setup if the `usps` component is configured and the required configuration is set.
</p>

To customize the interval that mail images are rotated in the mail camera you can edit your `configuration.yaml` file with the following settings:
```yaml
# Example configuration.yaml entry
camera:
  - platform: usps
    scan_interval: 5
```

To enable this camera in your installation, set up the [USPS component](/components/usps) with your username and password.

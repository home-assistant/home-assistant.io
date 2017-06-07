---
layout: page
title: "Ripple"
description: "Instructions how to integrate ripple.com data within Home Assistant."
date: 2017-06-06 16:20
sidebar: true
comments: false
sharing: true
footer: true
logo: ripple.png
ha_category: Finance
ha_release: 0.47
ha_iot_class: "Cloud Polling"
---


The `ripple` sensor platform displays Ripple wallet balances from [Ripple.com](https://ripple.com).

To add the Ripple sensor to your installation, specify a ripple address to watch in the `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ripple
    address: 'r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV'
```

Configuration variables:

- **address** (*Required*): Ripple wallet address to watch
- **name** (*Optional*): Name for the sensor to use in the frontend.

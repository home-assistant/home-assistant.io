---
layout: page
title: "Nest Fan"
description: "Instructions how to integrate Nest fans within Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: nest.png
ha_category: Fan
ha_release: 0.29
ha_iot_class: "Local Polling"
---


The `nest` fan platform let you control a fan from [Nest](https://nest.com).

<p class='note'>
You must have the [Nest component](/components/nest/) configured to use those thermostats.
</p>

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
fan:
  - platform: nest
```


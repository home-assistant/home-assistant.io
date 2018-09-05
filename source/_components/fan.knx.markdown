---
layout: page
title: "KNX Fan"
description: "Instructions on how to integrate KNX fans with Home Assistant."
date: 2018-09-05 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: knx.png
ha_category: Fan
ha_release: 0.78.0
ha_iot_class: "Local Polling"
---


The `knx` fan component is used as in interface to fan actuators.

The `knx` component must be configured correctly, see [KNX Component](/components/knx).

## {% linkable_title Configuration %}

To use your KNX fan in your installation, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
fan:
  - platform: knx
    name: living-room-fan
    speed_address: '1/3/7'
    speed_state_address: '1/3/8'
```

Configuration variables:

- **speed_address** (*Required*): KNX group address for seeting the fan speed.
- **name** (*Optional*): A name for this device used within Home Assistant.
- **speed_state_address** (*Optional*): separate KNX group address for retrieving the speed of the fan.


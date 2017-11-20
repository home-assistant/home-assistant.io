---
layout: page
title: "KNX Light"
description: "Instructions on how to integrate KNX lights with Home Assistant."
date: 2016-06-24 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: knx.png
ha_category: Light
ha_release: 0.44 
ha_iot_class: "Local Polling"
---


The `knx` light component is used as in interface to switching/light actuators.

The `knx` component must be configured correctly, see [KNX Component](/components/knx).

To use your KNX light in your installation, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: knx
    name: Kitchen-Light-1
    address: '1/0/9'
    brightness_address: '1/0/11'
```

Configuration variables:

- **name** (*Optional*): A name for this device used within Home Assistant.
- **address**: KNX group address for switching the light on and off.
- **brightness_address** (Optional): KNX group address for dimming light.
- **state_address** (*Optional*): separate KNX group address for retrieving the switch state of the light.
- **brightness_state_address** (*Optional*): separate KNX group address for retrieving the dimmed state of the light.

Some KNX devices can change their state internally without any messages on the KNX bus, e.g., if you configure a timer on a channel. The optional `state_address` can be used to inform Home Assistant about these state changes. If a KNX message is seen on the bus addressed to the given state address, this will overwrite the state of the switch object.
For switching/light actuators that are only controlled by a single group address and can't change their state internally, you don't have to configure the state address.

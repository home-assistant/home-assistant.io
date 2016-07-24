---
layout: page
title: "KNX Switches"
description: "Instructions on how to integrate KXN switches with Home Assistant."
date: 2016-06-24 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: knx.png
ha_category: DIY
ha_release: 0.24
---


The KNX switch component is used as in interface to switching actuators.

```yaml
switch:
  platform: knx
  name: KNX Switch
  address: 0/0/1
  state_address: 0/0/3
```

- **name** (*Optional*): A name for this devices used within Home assistant
- **address** (*Required*): The KNX group address that is used to turn on/off this actuator channel
- **state_address** (**Optional**): Some KNX devices can change their state internally without any messages on the KXN bus, e.g. if you configure a timer on a channel. The optional state_address can be used to inform Home assistant about these state changes. If a KNX message is seen on the bus addressed to the given state address, this wil overwrite the state of the switch object.
For switching actuators that are only controlled by a single group address and can't change their state internally, you don't have to configrue the state address

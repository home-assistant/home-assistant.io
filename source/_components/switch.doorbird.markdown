---
layout: page
title: "DoorBird Switch"
description: "Instructions how to integrate DoorBird video doorbell relays into Home Assistant."
date: 2017-08-06 11:30
sidebar: true
comments: false
sharing: true
footer: true
logo: doorbird.png
ha_category: Switch
ha_release: "0.54"
ha_iot_class: "Local Push"
---

The `doorbird` switch platform allows you to power relays in your [DoorBird](http://www.doorbird.com/) video doorbell device.

<p class='note'>
	You must have the [DoorBird component](/components/doorbird/) configured to use this switch.
</p>

To enable this switch, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: doorbird
    switches:
      - light_on
      - open_door
```

Configuration variables:

- **switches** (*Required*): A list of switches to include. Possible entries are `light_on` for control of the IR array and `open_door` for control of an electronic door strike or alarm.

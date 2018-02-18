---
layout: page
title: "KNX Cover"
description: "Instructions on how to integrate KNX covers with Home Assistant."
date: 2017-06-18 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: knx.png
ha_category: Cover
ha_release: 0.48
ha_iot_class: "Local Polling"
---


The `knx` cover platform is used as in interface with KNX covers.

The `knx` component must be configured correctly, see [KNX Component](/components/knx).

To use your KNX covers in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: knx
    name: "Kitchen.Shutter"
    move_long_address: '3/0/0'
    move_short_address: '3/0/1'
    position_address: '3/0/3'
    position_state_address: '3/0/2'
    travelling_time_down: 51
    travelling_time_up: 61
```

Configuration variables:

- **name** (*Optional*): A name for this device used within Home Assistant.
- **move_long_address**: KNX group address for moving the cover full up or down.
- **move_short_address** (*Optional*): KNX group address for moving the cover short time up or down.
- **position_address** (*Optional*): KNX group address for moving the cover to the dedicated position.
- **position_state_address** (*Optional*): Separate KNX group address for requesting the current position of the cover.
- **angle_address** (*Optional*): KNX group address for moving the cover to the dedicated angle.
- **angle_state_address** (*Optional*): Separate KNX group address for requesting the current angle of cover.
- **travelling_time_down** (*Optional*): Time cover needs to travel down in seconds. Needed to calculate the intermediate positions of cover while traveling. Defaults to 25.
- **travelling_time_up** (*Optional*): Time cover needs to travel up in seconds. Needed to calculate the intermediate positions of cover while traveling. Defaults to 25.
- **invert_position** (*Optional*): Set this to true if your actuator report fully closed as 100%.
- **invert_angle** (*Optional*): Set this to true if your actuator reports tilt fully closed as 100%.


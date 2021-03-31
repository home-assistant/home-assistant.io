---
title: Binary Sensor
description: Instructions on how-to setup binary sensors with Home Assistant.
ha_category:
  - Binary Sensor
ha_release: 0.9
ha_iot_class:
ha_quality_scale: internal
ha_domain: binary_sensor
---

Binary sensors are similar to other [sensors](https://www.home-assistant.io/integrations/sensor) in that they monitor the states and conditions of different entities. Where binary sensors differ is they can only return one of two mutually exclusive values. For example, a binary sensor for a window may report a value of `open` or `closed`, a switch `on` or `off`, a condition `true` or `false`.  	
	
This *either/or* constraint is what makes these sensors binary. They are digital in nature, whereas analog sensors, like temperature and weight sensors, return a range of values.	
	
Some binary sensors are created automatically when you add a device integration. For example, adding the [ecobee integration](https://www.home-assistant.io/integrations/ecobee/) will create a binary sensor to detect room occupancy. Other binary sensors can be created manually using the [template platform](https://www.home-assistant.io/integrations/binary_sensor.template/).

### Device Class

Knowing a sensor is binary impacts how the sensor's current state may be represented in Home Assistant's UI (see [Lovelace](https://www.home-assistant.io/lovelace/)). Opposing states may be given diffent icons, colors, and value labels to highlight a particular state over the other. This is set by the binary sensor's device class.
	
Here are a few examples of this representation in the UI:
<p class='img'>
<img src='/images/screenshots/binary_sensor_classes_icons.png' />
Example of various device classes icons in `on` and `off` state. The on image in this example has `state_color: true` specified in the Entities card configuration to receive the icon coloring.
</p>

The full list of supported binary sensor device classes is below *(note: these may also be modified in the [customizing section](https://www.home-assistant.io/docs/configuration/customizing-devices)).*

- **None**: Generic on/off. This is the default and doesn't need to be set.
- **battery**: `on` means low, `off` means normal
- **battery_charging**: `on` means charging, `off` means not charging
- **cold**: `on` means cold, `off` means normal
- **connectivity**: `on` means connected, `off` means disconnected
- **door**: `on` means open, `off` means closed
- **garage_door**: `on` means open, `off` means closed
- **gas**: `on` means gas detected, `off` means no gas (clear)
- **heat**: `on` means hot, `off` means normal
- **light**: `on` means light detected, `off` means no light
- **lock**: `on` means open (unlocked), `off` means closed (locked)
- **moisture**: `on` means moisture detected (wet), `off` means no moisture (dry)
- **motion**: `on` means motion detected, `off` means no motion (clear)
- **moving**: `on` means moving, `off` means not moving (stopped)
- **occupancy**: `on` means occupied, `off` means not occupied (clear)
- **opening**: `on` means open, `off` means closed
- **plug**: `on` means device is plugged in, `off` means device is unplugged
- **power**: `on` means power detected, `off` means no power
- **presence**: `on` means home, `off` means away
- **problem**: `on` means problem detected, `off` means no problem (OK)
- **safety**: `on` means unsafe, `off` means safe
- **smoke**: `on` means smoke detected, `off` means no smoke (clear)
- **sound**: `on` means sound detected, `off` means no sound (clear)
- **vibration**: `on` means vibration detected, `off` means no vibration (clear)
- **window**: `on` means open, `off` means closed

For comparison, here are the [device classes](https://www.home-assistant.io/integrations/sensor#device-class) for analog sensors.



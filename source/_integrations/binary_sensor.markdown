---
title: Binary Sensor
description: Instructions on how-to setup binary sensors with Home Assistant.
ha_category:
  - Binary Sensor
ha_release: 0.9
ha_quality_scale: internal
ha_domain: binary_sensor
---

Binary sensors gather information about the state of devices which have a "digital" return value (either 1 or 0). These can be switches, contacts, pins, etc. These sensors only have two states: **0/off/low/closed/false** and **1/on/high/open/true**. Knowing that there are only two states allows Home Assistant to represent these sensors in a better way in the frontend according to their functionality.

### Device Class

The way these sensors are displayed in the frontend can be modified in the [customize section](/getting-started/customizing-devices/). The following device classes are supported for binary sensors:

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

For analog sensors please check the [integration overview](/integrations/sensor).

<p class='img'>
<img src='/images/screenshots/binary_sensor_classes_icons.png' />
Example of various device classes icons in `on` and `off` state. The on image in this example has `state_color: true` specified in the Entities card configuration to receive the icon coloring.
</p>

---
title: Binary Sensor
description: Instructions on how-to setup binary sensors with Home Assistant.
logo: home-assistant.png
ha_category:
  - Binary Sensor
ha_qa_scale: internal
ha_release: 0.9
---

Binary sensors gather information about the state of devices which have a "digital" return value (either 1 or 0). These can be switches, contacts, pins, etc. These sensors only have two states: **0/off/low/closed/false** and **1/on/high/open/true**. Knowing that there are only two states allows Home Assistant to represent these sensors in a better way in the frontend according to their functionality.

### Device Class

The way these sensors are displayed in the frontend can be modified in the [customize section](/getting-started/customizing-devices/). The following device classes are supported for binary sensors:

- **None**: Generic on/off. This is the default and doesn't need to be set.
- **battery**: `On` means low, `Off` means normal
- **cold**: `On` means cold, `Off` means normal
- **connectivity**: `On` means connected, `Off` means disconnected
- **door**: `On` means open, `Off` means closed
- **garage_door**: `On` means open, `Off` means closed
- **gas**: `On` means gas detected, `Off` means no gas (clear)
- **heat**: `On` means hot, `Off` means normal
- **light**: `On` means light detected, `Off` means no light
- **lock**: `On` means open (unlocked), `Off` means closed (locked)
- **moisture**: `On` means moisture detected (wet), `Off` means no moisture (dry)
- **motion**: `On` means motion detected, `Off` means no motion (clear)
- **moving**: `On` means moving, `Off` means not moving (stopped)
- **occupancy**: `On` means occupied, `Off` means not occupied (clear)
- **opening**: `On` means open, `Off` means closed
- **plug**: `On` means device is plugged in, `Off` means device is unplugged
- **power**: `On` means power detected, `Off` means no power
- **presence**: `On` means home, `Off` means away
- **problem**: `On` means problem detected, `Off` means no problem (OK)
- **safety**: `On` means unsafe, `Off` means safe
- **smoke**: `On` means smoke detected, `Off` means no smoke (clear)
- **sound**: `On` means sound detected, `Off` means no sound (clear)
- **vibration**: `On` means vibration detected, `Off` means no vibration (clear)
- **window**: `On` means open, `Off` means closed

For analog sensors please check the [integration overview](/integrations/#sensor).

<p class='img'>
<img src='/images/screenshots/binary_sensor_classes_icons.png' />
Example of various device classes icons in `On` and `Off` state.
</p>

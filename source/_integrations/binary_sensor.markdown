---
title: Binary sensor
description: Instructions on how-to set up binary sensors with Home Assistant.
ha_category:
  - Binary sensor
ha_release: 0.9
ha_quality_scale: internal
ha_domain: binary_sensor
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

Binary sensors are similar to other [sensors](/integrations/sensor) in that they
monitor the states and conditions of different entities. Where binary sensors
differ is they can only return one of two mutually exclusive values.
For example, a binary sensor for a window may report a value
of `open` or `closed`, a switch `on` or `off`, a condition `true` or `false`.

This *either/or* constraint is what makes these sensors binary. They are digital
in nature, whereas analog sensors, like temperature and weight sensors,
return a range of values.

Some binary sensors are created automatically when you add a device integration.
For example, adding the [ecobee integration](/integrations/ecobee/) will create
a binary sensor to detect room occupancy. Other binary sensors can be created
manually using the [template integration](/integrations/template/)
or using an [input boolean helper](/integrations/input_boolean).

{% include integrations/building_block_integration.md %}

## Binary sensor states

A binary sensor has two states: `on` or `off`. In the Home Assistant interface, its device class determines the icon and the label shown for each state. For example, a lock binary sensor shows **Unlocked** when its state is `on` and **Locked** when its state is `off`.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

### Device class

{% include integrations/device_class_intro.md %}

The following device classes are supported for binary sensors. Each item shows how the `on` and `off` states appear in the Home Assistant interface.

- **None**: Generic on/off. This is the default and does not need to be set.
  - `on`: **On**
  - `off`: **Off**
- **battery**
  - `on`: **Low**
  - `off`: **Normal**
- **battery_charging**
  - `on`: **Charging**
  - `off`: **Not charging**
- **carbon_monoxide**
  - `on`: **Detected**
  - `off`: **Clear**
- **cold**
  - `on`: **Cold**
  - `off`: **Normal**
- **connectivity**
  - `on`: **Connected**
  - `off`: **Disconnected**
- **door**
  - `on`: **Open**
  - `off`: **Closed**
- **garage_door**
  - `on`: **Open**
  - `off`: **Closed**
- **gas**
  - `on`: **Detected**
  - `off`: **Clear**
- **glass_break**
  - `on`: **Glass break detected**
  - `off`: **Clear**
- **heat**
  - `on`: **Hot**
  - `off`: **Normal**
- **light**
  - `on`: **Light detected**
  - `off`: **No light**
- **lock**
  - `on`: **Unlocked**
  - `off`: **Locked**
- **moisture**
  - `on`: **Wet**
  - `off`: **Dry**
- **motion**
  - `on`: **Detected**
  - `off`: **Clear**
- **moving**
  - `on`: **Moving**
  - `off`: **Not moving**
- **occupancy**
  - `on`: **Detected**
  - `off`: **Clear**
- **opening**
  - `on`: **Open**
  - `off`: **Closed**
- **plug**
  - `on`: **Plugged in**
  - `off`: **Unplugged**
- **power**
  - `on`: **On**
  - `off`: **Off**
- **presence**
  - `on`: **Home**
  - `off`: **Away**
- **problem**
  - `on`: **Problem**
  - `off`: **OK**
- **running**
  - `on`: **Running**
  - `off`: **Not running**
- **safety**
  - `on`: **Unsafe**
  - `off`: **Safe**
- **smoke**
  - `on`: **Detected**
  - `off`: **Clear**
- **sound**
  - `on`: **Detected**
  - `off`: **Clear**
- **tamper**
  - `on`: **Tampering detected**
  - `off`: **Clear**
- **update**
  - `on`: **Update available**
  - `off`: **Up-to-date**
- **vibration**
  - `on`: **Detected**
  - `off`: **Clear**
- **window**
  - `on`: **Open**
  - `off`: **Closed**

For comparison, here are the [device classes](/integrations/sensor#device-class) for analog sensors.

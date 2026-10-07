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

In addition, the entity can have the following states. Each item shows the interface label, followed by the stored state:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

## Device class

The device class tells Home Assistant what a binary sensor detects, such as an open door or motion. Home Assistant uses the device class to choose the icon and the labels for `on` and `off`, such as **Open** and **Closed**. The device class also decides where you can use the binary sensor, such as in triggers and conditions, on the [Security dashboard](/dashboards/dashboards/#security-dashboard), or in voice assistants. If a binary sensor doesn't show up where you expect it, check its device class.

The integration that provides the binary sensor sets the device class. When you create a binary sensor yourself with a [template helper](/integrations/template/), you choose the device class.

### Device classes in automations and templates

- Automations: Some device classes have their own triggers and conditions, such as [Door opened](/triggers/door.opened/). Of your binary sensors, these triggers and conditions only list the ones with that device class. The list below shows the triggers and conditions of each device class.
- Templates: The device class is the `device_class` attribute of the entity. Use the stored value, such as `door`. For example, you can [find entities by device class](/docs/templating/patterns/#finding-entities-by-device-class).

### List of available device classes

A binary sensor without a device class shows **On** and **Off** as its state labels.

Each item shows the name you see in the Home Assistant interface, followed by the device class as Home Assistant stores it. Below each item are the labels the interface shows for the `on` and `off` states, and the triggers and conditions of the device class, if it has any.

- **Battery** (`battery`): Shows whether the battery is low.
  - **Low** (`on`)
  - **Normal** (`off`)
  - Triggers: [Battery low](/triggers/battery.became_low/), [Battery not low](/triggers/battery.no_longer_low/)
  - Conditions: [Battery is low](/conditions/battery.is_low/), [Battery is not low](/conditions/battery.is_not_low/)
- **Charging** (`battery_charging`): Shows whether the battery is charging. Under **Show as**, this type is called **Battery charging**.
  - **Charging** (`on`)
  - **Not charging** (`off`)
  - Triggers: [Battery started charging](/triggers/battery.started_charging/), [Battery stopped charging](/triggers/battery.stopped_charging/)
  - Conditions: [Battery is charging](/conditions/battery.is_charging/), [Battery is not charging](/conditions/battery.is_not_charging/)
- **Carbon monoxide** (`carbon_monoxide`): Shows whether carbon monoxide is detected.
  - **Detected** (`on`)
  - **Clear** (`off`)
  - Triggers: [Carbon monoxide cleared](/triggers/air_quality.co_cleared/), [Carbon monoxide detected](/triggers/air_quality.co_detected/)
  - Conditions: [Carbon monoxide cleared](/conditions/air_quality.is_co_cleared/), [Carbon monoxide detected](/conditions/air_quality.is_co_detected/)
- **Cold** (`cold`): Shows whether something is cold.
  - **Cold** (`on`)
  - **Normal** (`off`)
- **Connectivity** (`connectivity`): Shows whether a device is connected.
  - **Connected** (`on`)
  - **Disconnected** (`off`)
- **Door** (`door`): Shows whether a door is open.
  - **Open** (`on`)
  - **Closed** (`off`)
  - Triggers: [Door closed](/triggers/door.closed/), [Door opened](/triggers/door.opened/)
  - Conditions: [Door is closed](/conditions/door.is_closed/), [Door is open](/conditions/door.is_open/)
- **Garage door** (`garage_door`): Shows whether a garage door is open.
  - **Open** (`on`)
  - **Closed** (`off`)
  - Triggers: [Garage door closed](/triggers/garage_door.closed/), [Garage door opened](/triggers/garage_door.opened/)
  - Conditions: [Garage door is closed](/conditions/garage_door.is_closed/), [Garage door is open](/conditions/garage_door.is_open/)
- **Gas** (`gas`): Shows whether gas is detected.
  - **Detected** (`on`)
  - **Clear** (`off`)
  - Triggers: [Gas cleared](/triggers/air_quality.gas_cleared/), [Gas detected](/triggers/air_quality.gas_detected/)
  - Conditions: [Gas cleared](/conditions/air_quality.is_gas_cleared/), [Gas detected](/conditions/air_quality.is_gas_detected/)
- **Glass break** (`glass_break`): Shows whether breaking glass is detected.
  - **Detected** (`on`)
  - **Clear** (`off`)
- **Heat** (`heat`): Shows whether something is hot.
  - **Hot** (`on`)
  - **Normal** (`off`)
- **Light** (`light`): Shows whether light is detected.
  - **Light detected** (`on`)
  - **No light** (`off`)
  - Triggers: [Light level cleared](/triggers/illuminance.cleared/), [Light level detected](/triggers/illuminance.detected/)
  - Conditions: [Light level is detected](/conditions/illuminance.is_detected/), [Light level is not detected](/conditions/illuminance.is_not_detected/)
- **Lock** (`lock`): Shows whether a lock is unlocked.
  - **Unlocked** (`on`)
  - **Locked** (`off`)
- **Moisture** (`moisture`): Shows whether moisture is detected, such as a water leak.
  - **Wet** (`on`)
  - **Dry** (`off`)
  - Triggers: [Moisture cleared](/triggers/moisture.cleared/), [Moisture detected](/triggers/moisture.detected/)
  - Conditions: [Moisture is detected](/conditions/moisture.is_detected/), [Moisture is not detected](/conditions/moisture.is_not_detected/)
- **Motion** (`motion`): Shows whether motion is detected.
  - **Detected** (`on`)
  - **Clear** (`off`)
  - Triggers: [Motion cleared](/triggers/motion.cleared/), [Motion detected](/triggers/motion.detected/)
  - Conditions: [Motion is detected](/conditions/motion.is_detected/), [Motion is not detected](/conditions/motion.is_not_detected/)
- **Moving** (`moving`): Shows whether something is moving.
  - **Moving** (`on`)
  - **Not moving** (`off`)
- **Occupancy** (`occupancy`): Shows whether a room or area is occupied.
  - **Detected** (`on`)
  - **Clear** (`off`)
  - Triggers: [Occupancy cleared](/triggers/occupancy.cleared/), [Occupancy detected](/triggers/occupancy.detected/)
  - Conditions: [Occupancy is detected](/conditions/occupancy.is_detected/), [Occupancy is not detected](/conditions/occupancy.is_not_detected/)
- **Opening** (`opening`): Shows whether something is open, such as a cabinet or a drawer.
  - **Open** (`on`)
  - **Closed** (`off`)
- **Plug** (`plug`): Shows whether something is plugged in.
  - **Plugged in** (`on`)
  - **Unplugged** (`off`)
- **Power** (`power`): Shows whether power is detected.
  - **On** (`on`)
  - **Off** (`off`)
- **Presence** (`presence`): Shows whether someone is home.
  - **Home** (`on`)
  - **Away** (`off`)
- **Problem** (`problem`): Shows whether there is a problem.
  - **Problem** (`on`)
  - **OK** (`off`)
- **Running** (`running`): Shows whether something is running.
  - **Running** (`on`)
  - **Not running** (`off`)
- **Safety** (`safety`): Shows whether something is unsafe.
  - **Unsafe** (`on`)
  - **Safe** (`off`)
- **Smoke** (`smoke`): Shows whether smoke is detected.
  - **Detected** (`on`)
  - **Clear** (`off`)
  - Triggers: [Smoke cleared](/triggers/air_quality.smoke_cleared/), [Smoke detected](/triggers/air_quality.smoke_detected/)
  - Conditions: [Smoke cleared](/conditions/air_quality.is_smoke_cleared/), [Smoke detected](/conditions/air_quality.is_smoke_detected/)
- **Sound** (`sound`): Shows whether sound is detected.
  - **Detected** (`on`)
  - **Clear** (`off`)
- **Tamper** (`tamper`): Shows whether tampering is detected.
  - **Tampering detected** (`on`)
  - **Clear** (`off`)
- **Update** (`update`): Shows whether an update is available.
  - **Update available** (`on`)
  - **Up-to-date** (`off`)
- **Vibration** (`vibration`): Shows whether vibration is detected.
  - **Detected** (`on`)
  - **Clear** (`off`)
  - Triggers: [Vibration cleared](/triggers/vibration.cleared/), [Vibration detected](/triggers/vibration.detected/)
  - Conditions: [Vibration is detected](/conditions/vibration.is_detected/), [Vibration is not detected](/conditions/vibration.is_not_detected/)
- **Window** (`window`): Shows whether a window is open.
  - **Open** (`on`)
  - **Closed** (`off`)
  - Triggers: [Window closed](/triggers/window.closed/), [Window opened](/triggers/window.opened/)
  - Conditions: [Window is closed](/conditions/window.is_closed/), [Window is open](/conditions/window.is_open/)

For sensors that measure values, see the [sensor device classes](/integrations/sensor/#device-class).

### Changing the device class of a binary sensor

If a binary sensor shows up as the wrong type, for example as an opening instead of a door, you can change its device class.

You can only change the device class in the UI if the binary sensor has a unique ID. A binary sensor without a unique ID shows a message in its entity settings instead. For such a binary sensor, you can change the device class in YAML with [customization](/docs/configuration/customizing-devices/#customizing-an-entity-in-yaml).

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and select the binary sensor.
2. In the top-right corner, select **Settings** {% icon "mdi:cog-outline" %}.
3. Under **Show as**, select the type that matches your device.
4. Select **Update**.
   - Result: The binary sensor shows up as the new type in triggers and dashboards.

If you created the binary sensor with a template helper, change the device class in the options of the template helper instead.

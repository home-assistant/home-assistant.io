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

The device class tells Home Assistant what a binary sensor detects, such as an open door or motion.

The device class makes a difference in the following places:

- Automations: Several types of binary sensors have their own triggers and conditions, such as [Door opened](/triggers/door.opened/), [Motion detected](/triggers/motion.detected/), or [Battery low](/triggers/battery.became_low/). There are also triggers and conditions for battery charging, windows, garage doors, occupancy, moisture, vibration, light, carbon monoxide, gas, and smoke. They only list binary sensors with the matching device class.
- Assist: New door, garage door, lock, motion, opening, presence, and window sensors are [exposed to Assist](/voice_control/voice_remote_expose_devices/) by default. Other types aren't.
- Voice assistants and Apple Home: [Google Assistant](/integrations/google_assistant/), [Alexa](/integrations/alexa/), and Apple Home, through the [HomeKit Bridge](/integrations/homekit/) integration, show binary sensors as matching sensors, such as door and window sensors. Which device classes they support differs per voice assistant.
- Dashboards: The [Security dashboard](/dashboards/dashboards/#security-dashboard) shows locks, doors, garage doors, windows, openings, and safety sensors, such as smoke, gas, carbon monoxide, moisture, and tamper sensors. The [Climate dashboard](/dashboards/dashboards/#home-assistant-built-in-dashboards) shows window sensors, and the [Maintenance dashboard](/dashboards/dashboards/#home-assistant-built-in-dashboards) shows battery sensors. The [area card](/dashboards/area/) can show an alert icon for the types you choose under **Alert classes**. By default, these are motion and moisture.
- Icon and name: The icon and the label for each state match the type. For example, a door sensor shows **Open** or **Closed** instead of **On** or **Off**. If the integration doesn't give the entity its own name, Home Assistant names it after the device class, such as **Door**.
- History and Activity: If you have binary sensors with different device classes, the **Type** filter in the [History](/dashboards/dashboards/#history-dashboard) and [Activity](/dashboards/dashboards/#activity-dashboard) dashboards lists each device class separately.

The integration that provides the binary sensor sets the device class. When you create a binary sensor yourself with a [template helper](/integrations/template/), you choose it.

### List of available device classes

A binary sensor without a device class shows **On** and **Off** as its state labels.

Each item shows the name you see in the Home Assistant interface, followed by the device class as Home Assistant stores it. Below each item are the labels the interface shows for the `on` and `off` states.

- **Battery** (`battery`): Shows whether the battery is low.
  - **Low** (`on`)
  - **Normal** (`off`)
- **Charging** (`battery_charging`): Shows whether the battery is charging.
  - **Charging** (`on`)
  - **Not charging** (`off`)
- **Carbon monoxide** (`carbon_monoxide`): Shows whether carbon monoxide is detected.
  - **Detected** (`on`)
  - **Clear** (`off`)
- **Cold** (`cold`): Shows whether something is cold.
  - **Cold** (`on`)
  - **Normal** (`off`)
- **Connectivity** (`connectivity`): Shows whether a device is connected.
  - **Connected** (`on`)
  - **Disconnected** (`off`)
- **Door** (`door`): Shows whether a door is open.
  - **Open** (`on`)
  - **Closed** (`off`)
- **Garage door** (`garage_door`): Shows whether a garage door is open.
  - **Open** (`on`)
  - **Closed** (`off`)
- **Gas** (`gas`): Shows whether gas is detected.
  - **Detected** (`on`)
  - **Clear** (`off`)
- **Glass break** (`glass_break`): Shows whether breaking glass is detected.
  - **Glass break detected** (`on`)
  - **Clear** (`off`)
- **Heat** (`heat`): Shows whether something is hot.
  - **Hot** (`on`)
  - **Normal** (`off`)
- **Light** (`light`): Shows whether light is detected.
  - **Light detected** (`on`)
  - **No light** (`off`)
- **Lock** (`lock`): Shows whether a lock is unlocked.
  - **Unlocked** (`on`)
  - **Locked** (`off`)
- **Moisture** (`moisture`): Shows whether moisture is detected, such as a water leak.
  - **Wet** (`on`)
  - **Dry** (`off`)
- **Motion** (`motion`): Shows whether motion is detected.
  - **Detected** (`on`)
  - **Clear** (`off`)
- **Moving** (`moving`): Shows whether something is moving.
  - **Moving** (`on`)
  - **Not moving** (`off`)
- **Occupancy** (`occupancy`): Shows whether a room or area is occupied.
  - **Detected** (`on`)
  - **Clear** (`off`)
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
- **Window** (`window`): Shows whether a window is open.
  - **Open** (`on`)
  - **Closed** (`off`)

In templates, the device class is the `device_class` attribute of the entity. Use the stored value, such as `door`. For example, you can [find entities by device class](/docs/templating/patterns/#finding-entities-by-device-class).

For sensors that measure values, see the [sensor device classes](/integrations/sensor/#device-class).

### Changing the device class of a binary sensor

If a binary sensor shows up as the wrong type, for example as an opening instead of a door, you can change its device class.

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and select the binary sensor.
2. In the top-right corner, select **Settings** {% icon "mdi:cog-outline" %}.
3. Under **Show as**, select the type that matches your device.
4. Select **Update**.
   - Result: The binary sensor shows up as the new type in triggers and dashboards.

Google Assistant and Alexa through Home Assistant Cloud pick up the new type automatically. If you use Apple Home through the HomeKit Bridge, [reset the accessory](/actions/homekit.reset_accessory/) so Apple Home shows the new type. If you set up Google Assistant or Alexa without Home Assistant Cloud, ask your voice assistant to sync or discover devices again.

If you created the binary sensor with a template helper, change the device class in the options of the template helper instead.

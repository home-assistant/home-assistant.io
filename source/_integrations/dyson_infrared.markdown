---
title: Dyson Infrared
description: Integration to control Dyson fans and heater/coolers using an infrared transmitter.
ha_category:
  - Climate
  - Fan
ha_release: "2026.8"
ha_iot_class: Assumed State
ha_codeowners:
  - "@elax46"
ha_domain: dyson_infrared
ha_config_flow: true
ha_platforms:
  - climate
  - fan
ha_integration_type: device
ha_quality_scale: bronze
---

The **Dyson Infrared** {% term integration %} lets you control a Dyson device using any infrared transmitter previously configured in Home Assistant.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the device but there is no feedback channel to confirm the current state of the device. The integration therefore uses assumed states.

## Supported devices

The integration supports:

- Dyson fans that can be controlled via the standard Dyson infrared protocol.
- The Dyson AM09 Hot+Cool heater/cooler.

## Prerequisites

Before setting up the Dyson Infrared integration, you need a working infrared transmitter set up in Home Assistant that exposes an [Infrared](/integrations/infrared/) entity. For example, you can use an ESPHome device with an IR LED pointed at your Dyson device.

{% include integrations/config_flow.md %}

The first step asks which type of Dyson device you want to set up: Fan or Heater/Cooler. To set up both, add the integration twice.

{% configuration_basic %}
Device type:
  description: "The type of Dyson device to control. Select Fan for a Dyson fan, or Heater/Cooler for a Dyson AM09 Hot+Cool (or similar)."
Infrared transmitter:
  description: "The infrared transmitter entity to use for sending commands. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR transmitter."
Delay between repeated commands:
  description: "How long to wait between commands when stepping fan speed or target temperature by more than one level at a time. Defaults to 1 second. Increase it if your device misses commands when you make a large change, or lower it to make large changes complete faster."
Temperature unit:
  description: "The unit your heater/cooler itself is set to display. Each command steps the target temperature by one degree in that unit, so this must match what the device shows for the target temperature to stay accurate. This option is shown for a heater/cooler only, and defaults to the unit your Home Assistant system uses."
{% endconfiguration_basic %}

## Supported functionality

### Fan

A fan entity is created for each Dyson fan you set up.

- **Dyson Fan**
  - **Description**: Represents the Dyson fan and allows you to control it via IR commands.
  - **Supported features**: Turn on, turn off, set speed, and oscillate.

The fan has 10 speed levels, which are mapped onto the percentage scale used by Home Assistant.

### Heater/cooler

A climate entity is created for each Dyson AM09 Hot+Cool you set up.

- **Dyson Heater/Cooler**
  - **Description**: Represents the Dyson AM09 Hot+Cool and allows you to control it via IR commands.
  - **Supported features**: Set HVAC mode, set fan mode, set preset mode, and set swing mode. Set target temperature is also available while the unit is in heat mode.

#### Supported modes

- **Off**: Turns the unit off.
- **Cool**: Fan circulation without heating.
- **Heat**: Heats to a set temperature.

#### Fan speeds

The heater/cooler has 10 fan speeds, selectable as **1** through **10**.

#### Presets

- **Focused**: Concentrates the airflow into a narrow stream.
- **Diffused**: Spreads the airflow over a wider area.

#### Temperature range

Supported range: 1 °C to 37 °C, or 34 °F to 99 °F, in steps of one degree. Which range applies depends on the temperature unit you selected during setup.

## Known limitations

- All entities use **assumed state**, meaning Home Assistant cannot verify the actual state of the device. If the device is also operated with its physical remote, the two can drift apart. Setting the mode or speed again from Home Assistant brings them back in sync.
- The AM09 has no dedicated off command, only a power toggle. Turning the heater/cooler off therefore sends the same command as turning it on, so if the assumed state does not match the physical unit, the two are inverted until you correct it.
- The AM09 has no command for a cooling target temperature, so the target temperature is only available in heat mode. Setting it in another mode fails rather than silently doing nothing.
- The target temperature is stepped one degree per command in the unit the device itself displays, which is why the temperature unit option has to match your device. If it does not, targets set from Home Assistant end up off by a degree or more.
- Oscillation on the AM09 is a toggle rather than separate on and off commands, so it is only sent when the requested swing mode differs from the assumed one.
- Changing fan speed or target temperature by more than one level sends one command per step, separated by the delay between repeated commands you configured. Large changes therefore take a noticeable amount of time to complete.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

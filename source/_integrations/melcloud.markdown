---
title: MELCloud
description: MELCloud integration
ha_category:
  - Climate
ha_release: 0.106
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: melcloud
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - select
  - sensor
  - water_heater
ha_integration_type: device
ha_codeowners:
  - '@erwindouna'
---

The **MELCloud** {% term integration %} integrates Mitsubishi Electric's [MELCloud](https://www.melcloud.com/) enabled devices into Home Assistant.

## Device support

- Air-to-Air heat pumps, e.g., AC units - **Supported**
- Air-to-Water heat pumps - **Supported**
- Energy recovery ventilators - **Not supported**
- Other - **Not supported**

{% include integrations/config_flow.md %}

## Air-to-Air device

An Air-to-Air heat pump provides `climate` and `sensor` platforms. Device capabilities can limit the available parameters and sensors.

### Climate

The following parameters can be controlled for the `climate` platform entities:

- Power (using HVAC mode)
- Target temperature
- Operation mode (HVAC mode)
- Fan speed
- Horizontal and vertical vane positions

#### State attributes

|Attribute|Description|Example|
|---------|-----------|-------|
|`vane_horizontal` |Current horizontal vane position or mode|`auto`|
|`vane_horizontal_positions` |Available horizontal vane positions and modes|`auto, split, swing`|
|`vane_vertical` |Current vertical vane position or mode|`auto`|
|`vane_vertical_positions` |Available vertical vane positions and modes|`auto, split, swing`|

#### Controlling vanes

The horizontal and vertical vane positions can be controlled using the corresponding `melcloud.set_vane_horizontal` and `melcloud.set_vane_vertical` actions.

Swing mode can also be used to control vertical vane position.

### Sensor

The following attributes are available for `sensor` platform entities:

- Room temperature
- Outside temperature
- Energy - The total consumed energy in kWh. **Not supported by all models.**
- Daily energy - Energy consumption within a 24h window in kWh. This reading resets at midnight on the timezone of the MELCloud service. The exact time needs to be determined by following the sensor value until a reset is detected.

### Switch

The following switches can be used:

- **Frost protection**: Enables or disables the configured frost protection.
- **Overheat protection**: Enables or disables the configured overheat protection.

## Air-to-Water device

An Air-to-Water device provides `water_heater`, `climate`, `select`, `sensor`, and `binary_sensor` platforms.

### Climate

A `climate` platform entity is provided for each radiator zone in the air-to-water system. The following parameters can be controlled:

- Power (on/off). MELCloud exposes a single system-wide power state, so turning a zone off also stops the other zones and the hot water tank.
- HVAC mode: `heat` or `off`, and `cool` on cooling-capable systems.
- Target room temperature.

Each zone's temperature control method (**Room**, **Flow**, or **Curve**) is chosen with the operation mode `select` entity. See the [Select](#select) section below.

#### State attributes

|Attribute|Description|Example|
|---------|-----------|-------|
|`status` |Current operation status|`idle`|

### Select

An operation mode `select` entity is provided for each radiator zone. It sets how the zone controls its temperature, matching the **Room** / **Flow** / **Curve** options in the MELCloud app:

- **Room**: The zone targets the room temperature set on the `climate` entity.
- **Flow**: The zone targets a flow temperature.
- **Curve**: The zone follows the weather compensation curve configured on the unit; the target is determined automatically. Heating only.

The heating or cooling direction is set separately with the `climate` entity's HVAC mode, and the selected method is kept when the direction changes.

### Sensor

The following attributes are available for `sensor` platform entities:

**Zone sensors** (per radiator zone):

- Room temperature
- Zone flow temperature, polled every 1-2 hours
- Zone return temperature, polled every 1-2 hours

**Device sensors:**

- Tank water temperature
- Outside temperature – 1°C precision, polled every 1-2 hours
- System flow temperature
- System return temperature
- Boiler flow temperature
- Boiler return temperature
- Mixing tank temperature
- Condensing temperature
- Heat pump frequency (compressor frequency in Hz)
- Demand percentage
- Daily heating energy:
  - Consumed
  - Produced
- Daily cooling energy:
  - Consumed
  - Produced
- Daily hot water energy:
  - Consumed
  - Produced

The daily energy sensors use the state class `total_increasing` and are compatible with the Energy Dashboard. Values reset at midnight in the MELCloud service timezone.

### Binary sensor

The following binary sensors indicate component operating status and are categorized as diagnostic entities:

- Boiler
- Booster heater 1
- Booster heater 2 _(disabled by default)_
- Booster heater 2+ _(disabled by default)_
- Immersion heater
- Water pump 1
- Water pump 2
- Water pump 3 _(disabled by default)_
- Water pump 4 _(disabled by default)_
- 3-way valve
- 2-way valve _(disabled by default)_

Binary sensors are only created when the device reports the corresponding component status. Entities marked as _disabled by default_ can be enabled in the entity settings.

### Water heater

The following parameters can be controlled for the `water_heater` platform entities:

- Power - Controls the entire system.
- Target tank temperature
- Operation mode

#### State attributes

|Attribute|Description|Example|
|---------|-----------|-------|
|`status` |Current operation status|`heat`|

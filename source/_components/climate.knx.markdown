---
layout: page
title: "KNX Climate"
description: "Instructions on how to integrate KNX thermostats with Home Assistant."
date: 2016-06-24 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: knx.png
ha_category: Climate
ha_release: 0.25
ha_iot_class: "Local Polling"
---


The `knx` climate platform is used as in interface with KNX thermostats.

The `knx` component must be configured correctly, see [KNX Component](/components/knx).

To use your KNX thermostats in your installation, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
   - platform: knx
     name: HASS-Kitchen.Temperature
     temperature_address: '5/1/1'
     setpoint_shift_address: '5/1/2'
     setpoint_shift_state_address: '5/1/3'
     target_temperature_address: '5/1/4'
     operation_mode_address: '5/1/5'
```

Alternatively, if your device has dedicated binary group addresses for frost/night/comfort mode:

```yaml
# Example configuration.yaml entry
climate:
  - platform: knx
    name: HASS-Kitchen.Temperature
    temperature_address: '5/1/1'
    setpoint_shift_address: '5/1/2'
    setpoint_shift_state_address: '5/1/3'
    target_temperature_address: '5/1/4'
    operation_mode_frost_protection_address: '5/1/5'
    operation_mode_night_address: '5/1/6'
    operation_mode_comfort_address: '5/1/7'
```

Configuration variables:

- **name** (*Optional*): A name for this device used within Home Assistant.
- **temperature_address**: KNX group address for reading current room temperature from KNX bus.
- **target_temperature_address**: KNX group address for reading current target temperature from KNX bus.

The `knx` component sets the desired target temperature by modifying the setpoint_shift. The module provides the following configuration options:

* **setpoint_shift_address**: (*Optional*) KNX address for setpoint_shift
* **setpoint_shift_state_address**: (*Optional*) Explicit KNX address for reading setpoint_shift.
* **setpoint_shift_step**: (*Optional*) Defines for step size in Kelvin for each step of setpoint_shift. Default is 0.5 K.
* **setpoint_shift_min**: (*Optional*) Minimum value of setpoint shift. Default is "-6".
* **setpoint_shift_max**: (*Optional*) Maximum value of setpoint shift. Default is "6".

The operation modes may be controlled with the following directives:

- **operation_mode_address** (*Optional*): KNX address for operation mode (Frost protection/night/comfort).
- **operation_mode_state_address** (*Optional*): Explicit KNX address for reading operation mode
- **controller_status_address** (*Optional*): KNX address for HVAC controller status (in accordance with KNX AN 097/07 rev 3)
- **controller_status_state_address** (*Optional*): Explicit KNX address for reading HVAC controller status

- **operation_mode_frost_protection_address** (*Optional*): KNX address for switching on/off frost/heat protection mode.
- **operation_mode_night_address** (*Optional*): KNX address for switching on/off night mode.
- **operation_mode_comfort_address** (*Optional*): KNX address for switching on/off comfort mode.

`operation_mode_frost_protection_address` / `operation_mode_night_address` / `operation_mode_comfort_address` are not necessary if `operation_mode_address` was specified.

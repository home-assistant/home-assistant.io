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

{% configuration %}
name:
  description: A name for this device used within Home Assistant.
  required: false
  default: KNX Climate
  type: string
temperature_address:
  description: KNX group address for reading current room temperature from KNX bus.
  required: true
  type: string
target_temperature_address:
  description: KNX group address for reading current target temperature from KNX bus.
  required: true
  type: string
setpoint_shift_address:
  description: KNX address for setpoint_shift.
  required: false
  type: string
setpoint_shift_state_address:
  description: Explicit KNX address for reading setpoint_shift.
  required: false
  type: string
setpoint_shift_step:
  description: Defines for step size in Kelvin for each step of setpoint_shift.
  required: false
  default: 0.5
  type: float
setpoint_shift_min:
  description: Minimum value of setpoint shift.
  required: false
  default: -6
  type: integer
setpoint_shift_max:
  description: Maximum value of setpoint shift.
  required: false
  default: 6
  type: integer
operation_mode_address:
  description: KNX address for operation mode (Frost protection/night/comfort).
  required: false
  type: string
operation_mode_state_address:
  description: Explicit KNX address for reading operation mode.
  required: false
  type: string
controller_status_address:
  description: KNX address for HVAC controller status (in accordance with KNX AN 097/07 rev 3).
  required: false
  type: string
controller_status_state_address:
  description: Explicit KNX address for reading HVAC controller status.
  required: false
  type: string
operation_mode_frost_protection_address:
  description: KNX address for switching on/off frost/heat protection mode.
  required: false
  type: string
operation_mode_night_address:
  description: KNX address for switching on/off night mode.
  required: false
  type: string
operation_mode_comfort_address:
  description: KNX address for switching on/off comfort mode.
  required: false
  type: string
{% endconfiguration %}

`operation_mode_frost_protection_address` / `operation_mode_night_address` / `operation_mode_comfort_address` are not necessary if `operation_mode_address` is specified.

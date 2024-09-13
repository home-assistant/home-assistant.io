---
title: NuHeat
description: Instructions on how to integrate your NuHeat Signature thermostats within Home Assistant.
ha_category:
  - Climate
ha_release: 0.61
ha_iot_class: Cloud Polling
ha_domain: nuheat
ha_config_flow: true
ha_dhcp: true
ha_platforms:
  - climate
ha_integration_type: integration
ha_codeowners:
  - '@tstabrawa'
---

The `nuheat` integration lets control your connected [NuHeat Signature](https://www.nuheat.com/products/thermostats/signature-thermostat) floor heating thermostats from [NuHeat](https://www.nuheat.com/).

There is currently support for the following device types within Home Assistant:

- Climate

## Prerequisites

First, you will need to obtain your thermostat's numeric serial number or ID by logging into [MyNuHeat.com](https://mynuheat.com/) and selecting your thermostat(s).

{% include integrations/config_flow.md %}

## Concepts

The NuHeat Thermostat supports the following key concepts.

The `target temperature` is the temperature that the device attempts to achieve. The target temperature is either determined by the schedule programmed into the thermostat (`auto mode`) or may be overridden. When the target temperature is set by Home Assistant, the thermostat will hold this temperature until the schedule is resumed.

## Attributes

The following attributes are provided by the NuHeat thermostat: `name`, `temperature_unit`, `current_temperature`, `target_temperature`, `current_hold_mode`, `current_operation`, `operation_list`, `min_temp` and `max_temp`.

### Attribute `name`

Returns the name of the NuHeat Thermostat.

| Attribute type | Description |
| ---------------| ----------- |
| String | Name of the thermostat

### Attribute `temperature_unit`

Returns the unit of measurement used for temperature by the thermostat.

| Attribute type | Description |
| ---------------| ----------- |
| String | Name of the temperature unit

### Attribute `current_temperature`

Returns the current temperature measured by the thermostat.

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Currently measured temperature

### Attribute `target_temperature`

Returns the target temperature of the thermostat, when the thermostat is
not in auto operation mode.

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Target temperature

### Attribute `preset_mode`

Returns the current temperature hold, if any.

| Attribute type | Description |
| ---------------| ----------- |
| String | 'temperature', 'temporary_temperature', 'auto', etc.

### Attribute `hvac_action`

Returns the current HVAC mode of the thermostat.

| Attribute type | Description |
| ---------------| ----------- |
| String | 'heat', 'idle'

### Attribute `preset_modes`

Returns the list of available preset modes.

| Attribute type | Description |
| ---------------| ----------- |
| List of String | Available preset modes

### Attribute `min_temp`

Returns the minimum supported temperature by the thermostat

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Minimum supported temperature

### Attribute `max_temp`

Returns the maximum supported temperature by the thermostat

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Maximum supported temperature

## Actions

The following actions are provided by the NuHeat Thermostat: `set_temperature`, `set_hvac_mode`, `set_preset_mode`.

### Action `climate.set_hvac_mode` ([Climate integration](/integrations/climate/))

NuHeat Thermostats do not have an off concept. Setting the temperature to `min_temp` and changing the mode to `heat` will cause the device to enter a `Permanent Hold` preset and will stop the thermostat from turning on unless you happen to live in a freezing climate.

### Action `climate.set_temperature` ([Climate integration](/integrations/climate/))

If the thermostat is in auto mode, it puts the thermostat into a temporary hold at the given temperature.

If the thermostat is in heat mode, it puts the thermostat into a permanent hold at the given temperature.

### Action `climate.set_preset_mode` ([Climate integration](/integrations/climate/))

The following presets are available: `Run Schedule`, `Temporary Hold`, `Permanent Hold`.

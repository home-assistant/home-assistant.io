---
layout: page
title: "NuHeat Thermostat"
description: "Instructions how to integrate your NuHeat Signature thermostats within Home Assistant."
date: 2017-11-11 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: nuheat.png
ha_category: Climate
ha_release: 0.61
ha_iot_class: "Cloud Polling"
---

<p class='note'>
To get your [NuHeat Signature](http://www.nuheat.com/products/thermostats/signature-thermostat) thermostats working within Home Assistant, please follow the instructions for the general [NuHeat component](/components/nuheat)
</p>

## {% linkable_title Concepts %}

The NuHeat Thermostat supports the following key concepts.

The `target temperature` is the temperature that the device attempts to achieve. The target temperature is either determined by the schedule programmed into the thermostat (`auto mode`) or may be overridden. When the target temperature is set by Home Assistant, the thermostat will hold this temperature until the schedule is resumed.


## {% linkable_title Attributes %}

The following attributes are provided by the NuHeat thermostat: `name`, `temperature_unit`, `current_temperature`, `target_temperature`, `current_hold_mode`, `current_operation`, `operation_list`, `min_temp` and `max_temp`.


### {% linkable_title Attribute `name` %}

Returns the name of the NuHeat Thermostat.

| Attribute type | Description |
| ---------------| ----------- |
| String | Name of the thermostat

### {% linkable_title Attribute `temperature_unit` %}

Returns the unit of measurement used for temperature by the thermostat.

| Attribute type | Description |
| ---------------| ----------- |
| String | Name of the temperature unit

### {% linkable_title Attribute `current_temperature` %}

Returns the current temperature measured by the thermostat.

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Currently measured temperature

### {% linkable_title Attribute `target_temperature` %}

Returns the target temperature of the thermostat, when the thermostat is
not in auto operation mode.

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Target temperature

### {% linkable_title Attribute `target_temperature_low` %}

Returns the desired heating temperature set in the thermostat when in
auto operation mode.

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Target temperature

### {% linkable_title Attribute `target_temperature_high` %}

Returns the desired cooling temperature set in the thermostat when in
auto operation mode.

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Target temperature

### {% linkable_title Attribute `current_hold_mode` %}

Returns the current temperature hold, if any.

| Attribute type | Description |
| ---------------| ----------- |
| String | 'temperature', 'temporary_temperature', 'auto', etc.

### {% linkable_title Attribute `current_operation` %}

Returns the current operation of the thermostat.

| Attribute type | Description |
| ---------------| ----------- |
| String | 'heat', 'idle'

### {% linkable_title Attribute `operation_list` %}

Returns the list of available operation modes.

| Attribute type | Description |
| ---------------| ----------- |
| List of String | Available operation modes

### {% linkable_title Attribute `min_temp` %}

Returns the minimum supported temperature by the thermostat

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Minimum supported temperature

### {% linkable_title Attribute `max_temp` %}

Returns the maximum supported temperature by the thermostat

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Maximum supported temperature


## {% linkable_title Services %}

The following services are provided by the NuHeat Thermostat: `set_temperature`, `resume_program`.

The services `fan_min_on_time`, `set_aux_heat`, `set_away_mode`, `set_hold_mode`, `set_humidity`, `set_fan_mode`, `set_operation_mode` and `set_swing_mode` offered by the [Climate component](/components/climate/) are not implemented for this thermostat.

### {% linkable_title Service `set_temperature` %}

Puts the thermostat into a temporary hold at the given temperature.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `temperature` | no | Desired target temperature (when not in auto mode)

Only the target temperatures relevant for the current operation mode need to
be provided.

### {% linkable_title Service `resume_program` %}

Resumes the currently active schedule.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.

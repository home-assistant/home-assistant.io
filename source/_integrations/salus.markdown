---
title: Salus
description: Instructions on how to integrate your IT500 Salus thermostats within Home Assistant.
ha_category:
  - Climate
ha_release: 2021.4
ha_iot_class: Cloud Polling
ha_domain: salus
ha_config_flow: true
ha_codeowners:
  - '@cipacda'
---

The `salus` integration lets control your connected [IT500 Salus](https://salus-it500.com/public/login.php) thermostat to control your home temperature.

There is currently support for the following device types within Home Assistant:

- Climate

{% include integrations/config_flow.md %}

As a first step you will need to enter your credentials to login into the [Salus account](https://salus-it500.com/public/login.php), and on the second step you will be able to select the device you want to configure from a list of all devices in that account.

Alternatively, add the following information to your `configuration.yaml` file:

## Concepts

The Salus Thermostat supports the following key concepts.

The `target temperature` is the temperature that the device attempts to achieve. The target temperature is either determined by the schedule programmed into the thermostat (`auto mode`) or may be overridden. When the target temperature is set by Home Assistant, the thermostat will hold this temperature until the next configured scheduled checkpoint.

If the thermostat is set in `manual mode` from Salus, the target temperature will just reconfigure the target temperature for the manual mode and will not be reset. 

## Attributes

The following attributes are provided by the Salus thermostat: `name`, `temperature_unit`, `current_temperature`, `target_temperature`, `hvac_mode`, `hvac_action` and `hvac_modes`.

### Attribute `name`

Returns the name of the Salus Thermostat.

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

Returns the target temperature of the thermostat that is trying to achieve currently, based on the Auto schedule or the manual set temperature.

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Target temperature

### Attribute `hvac_mode`

Returns the current HVAC mode of the thermostat. It's off when the heater is not on.

| Attribute type | Description |
| ---------------| ----------- |
| String | 'heat', 'off'

### Attribute `hvac_action`

Returns the current HVAC action of the thermostat.

| Attribute type | Description |
| ---------------| ----------- |
| String | 'heat', 'idle'

### Attribute `hvac_modes`

Returns the list of available HVAC modes.

| Attribute type | Description |
| ---------------| ----------- |
| List of String | Available HVAC modes


## Services

The following services are provided by the Salus Thermostat: `set_temperature`.

### Service `climate.set_temperature`

If the thermostat is in auto mode, it overrides the current target temperature. This will be reset at the next schedule checkpoint.

If the thermostat is in manual mode, it sets the target temperature for the thermostat for the manual mode. This will not be reset automatically.

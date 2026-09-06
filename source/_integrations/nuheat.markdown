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
ha_integration_type: device
ha_codeowners:
  - '@tstabrawa'
---

The **NuHeat** {% term integration %} lets control your connected [NuHeat Signature](https://www.nuheat.com/products/thermostats/signature-thermostat) floor heating thermostats from [NuHeat](https://www.nuheat.com/).

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
| String | such as 'temperature', 'temporary_temperature', or 'auto'

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

## Using the thermostat in automations

To control a NuHeat thermostat from an automation or a script, use the climate actions and select your NuHeat climate entity as the target.

Available actions include:

- [**Set thermostat HVAC mode**](/actions/climate.set_hvac_mode/): Set the thermostat to `auto` or `heat` mode.
- [**Set thermostat preset mode**](/actions/climate.set_preset_mode/): Set the schedule hold mode. Available preset modes are `Run Schedule`, `Temporary Hold`, and `Permanent Hold`.
- [**Set thermostat target temperature**](/actions/climate.set_temperature/): Set the target floor temperature.

To use these actions from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you are setting up a new automation, add a trigger in the **When** section. Scripts do not need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target**, select your NuHeat climate entity.
6. From the actions shown for that target, select the thermostat action you want to use.
7. Set the required fields.
8. Select **Save**.

NuHeat thermostats do not have an off mode. To stop active heating, set the thermostat to its minimum temperature with the `heat` HVAC mode. This puts the thermostat in `Permanent Hold`, and it stops heating unless freeze protection is needed.

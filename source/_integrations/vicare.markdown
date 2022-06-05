---
title: Viessmann ViCare
description: Instructions how to integrate Viessmann heating devices with Home Assistant
ha_category:
  - Climate
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@oischinger'
ha_config_flow: true
ha_domain: vicare
ha_platforms:
  - binary_sensor
  - button
  - climate
  - diagnostics
  - sensor
  - water_heater
ha_dhcp: true
ha_integration_type: integration
---

The `ViCare` integration lets you control [Viessmann](https://www.viessmann.com) devices via the Viessmann ViCare (REST) API.
Most recent network-connected Viessmann heating devices (e.g., gas boilers) should be supported.

There is currently support for the following device types within Home Assistant:

- [Climate](#climate) (Heating)
- [Water Heater](#water-heater) (Domestic Hot Water)
- [Sensor](#sensor) (Sensor)
- [Button](#button) (Button)

{% include integrations/config_flow.md %}

Set `username`and `password` to your Viessmann Developer Portal login credentials.
The required Client ID can be obtained as follows:
1. Register and login in the [Viessmann Developer Portal](https://developer.viessmann.com).
2. In the menu navigate to API Keys.
3. Create a new OAuth client using the following data:
  ```txt
  Name: PyViCare
  Google reCAPTCHA: Disabled
  Redirect URIs: vicare://oauth-callback/everest
  ```

The `heating_type` can either be `auto` to automatically find the most suitable type for your device or one of `gas`, `oil`, `pellets`, `heatpump`, `fuelcell`, `hybrid`.

Multiple device instances might be generated depending on the number of burners and/or circuits of your installation. If there is more than a single instance all devices are suffixed with the circuit or burner ID.

## Viessmann API limits

The Viessmann API is rate-limited. If you exceed one of the limits below you will be banned for 24 hours:

- Limit 1: 120 calls for a time window of 10 minutes
- Limit 2: 1450 calls for a time window of 24 hours

The default `scan_interval` of 60 seconds will work within these limits. Note however that any additional requests to the API, e.g., by setting the temperature via the integration but also by interacting with the ViCare app also counts into those limits. It is therefore advised to adjust the scan_interval to your usage scenario.

## Climate

A note about the current temperature attribute: Viessmann devices with room temperature sensing will show the current room temperature via `current_temperature`. All other devices will show the current supply temperature of the heating circuit.

### Supported services `climate.vicare_heating`

The following services of the [Climate component](/integrations/climate/) are provided by the ViCare integration: `set_temperature`, `set_hvac_mode`, `set_preset_mode` 

#### Service `set_temperature`

Sets the target temperature to the given temperature.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. To target all entities, use `all` keyword instead of entity_id.
| `temperature` | no | Desired target temperature

Note that `set_temperature` will always affect the current normal temperature or, if a preset is set, the temperature of the preset (i.e., Viessman program like eco or comfort).

#### Service `climate.set_hvac_mode`

Set HVAC mode for the climate device. The following modes are supported:

The `climate.vicare_heating` component has the following mapping of HVAC modes to Viessmann operation modes:

| HVAC mode | Viessmann mode | Description |
| ---------------------- | -------- | ----------- |
| `off` | `ForcedReduced` | Permanently set heating to reduced temperature. Note: This will also deactivate domestic hot water
| `heat` | `ForcedNormal` | Permanently set heating to normal temperature.
| `auto` | `DHWandHeating` | Switches between reduced and normal temperature as by the heating schedule programmed in your device 
 
| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. To target all entities, use `all` keyword instead of entity_id.
| `hvac_mode` | no | New value of HVAC mode

#### Service `climate.set_vicare_mode`

Set the mode for the climate device as defined by Viessmann (see [set_hvac_mode](#service-climateset_hvac_mode) for a mapping to Home Assistant Climate modes. This allows more-fine grained control of the heating modes.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. To target all entities, use `all` keyword instead of entity_id.
| `vicare_mode` | no | New value of ViCare mode. For supported values see the `vicare_modes` attribute of the climate entity.

#### Service `set_preset_mode`

Sets the preset mode. Supported preset modes are *eco* and *comfort*. These are identical to the respective Viessmann programs and are only active temporarily for 8 hours.
Eco mode reduces the target temperature by 3°C, whereas Comfort mode sets the target temperature to a configurable value. Please consult your heating device manual for more information.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. To target all entities, use `all` keyword instead of entity_id.
| `preset_mode` | no | New value of preset mode.

## Water Heater

It is not possible to turn on/off water heating via the Water Heater component since this would conflict with the operation modes of the heating component. Therefore the operation mode of that component is just available as an attribute and cannot be modified.

### Supported services `water_heater.vicare_water`

The following services of the [Water Heater component](/integrations/water_heater/) are provided by the ViCare integration: `set_temperature`

#### Service `set_temperature`

Sets the target temperature of domestic hot water to the given temperature.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control.
| `temperature` | no | New target temperature for water heater

## Sensor

Additional data from ViCare is available as separate sensors. The sensors are automatically discovered based on the available API data points.

## Button

Button entities are available for triggering like a one-time charge of the water heater.

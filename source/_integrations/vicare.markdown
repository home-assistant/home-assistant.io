---
title: Viessmann ViCare
description: Instructions how to integrate Viessmann heating devices with Home Assistant
ha_category:
  - Climate
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: vicare
ha_platforms:
  - binary_sensor
  - button
  - climate
  - diagnostics
  - number
  - sensor
  - water_heater
ha_dhcp: true
ha_integration_type: integration
ha_codeowners:
  - '@CFenner'
---

The **Viessmann ViCare** {% term integration %} lets you control [Viessmann](https://www.viessmann.com) devices via the Viessmann ViCare (REST) API.
Most recent network-connected Viessmann heating devices (e.g., gas boilers) should be supported.

There is currently support for the following device types within Home Assistant:

- [Climate](#climate) (Heating)
- [Water heater](#water-heater) (Domestic hot water)
- [Sensor](#sensor) (Sensor)
- [Button](#button) (Button)
- [Number](#number)

{% include integrations/config_flow.md %}

Use your ViCare app login credentials for *username* and *password*.

The required *client ID* can be obtained from the [Viessmann Developer Portal](https://app.developer.viessmann.com/):
1. Log in with **your existing ViCare app username and password**.
2. On the developer dashboard, select **Add** in the **Clients** section.
3. Create a new client using the following data:
   - Name: `HomeAssistant`
   - Google reCAPTCHA: Disabled
   - Redirect URIs: `vicare://oauth-callback/everest`
4. Find the **Client ID** in the **Clients** section on the developer dashboard.

The `heating_type` can either be `auto` to automatically find the most suitable type for your device or one of `gas`, `oil`, `pellets`, `heatpump`, `fuelcell`, `hybrid`.

Important: the redirect URI that you configure requires that you perform the initial setup on a device that has the ViCare application installed. If your device does not know how to handle the `vicare://` URL, you will receive an **Invalid credentials** notification and the setup procedure will fail. This means: install the ViCare app on your phone and set up the {% term integration %} from your phone.

Multiple device instances might be generated depending on the number of burners and/or circuits of your installation. If there is more than a single instance all devices are suffixed with the circuit or burner ID.

## Viessmann API limits

The Viessmann API is rate-limited. If you exceed one of the limits below you will be banned for 24 hours:

- Limit 1: 120 calls for a time window of 10 minutes
- Limit 2: 1450 calls for a time window of 24 hours

The {% term integration %} polls the Viessmann API every 60 seconds and will work within these limits. Note however that any additional requests to the API, e.g., by setting the temperature via the {% term integration %} but also by interacting with the ViCare app also counts into those limits.

## Climate

A note about the current temperature attribute: Viessmann devices with room temperature sensing will show the current room temperature via `current_temperature`. All other devices will show the current supply temperature of the heating circuit.

### Supported services `climate.vicare_heating`

The following services of the [Climate integration](/integrations/climate/) are provided by the ViCare {% term integration %}: `set_temperature`, `set_hvac_mode`, `set_preset_mode` 

#### Service `set_temperature`

Sets the target temperature to the given temperature.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. To target all entities, use `all` keyword instead of entity_id.
| `temperature` | no | Desired target temperature

Note that `set_temperature` will always affect the current normal temperature or, if a preset is set, the temperature of the preset (i.e., Viessman program like eco or comfort).

#### Service `climate.set_hvac_mode`

Set HVAC mode for the climate device. The following modes are supported:

The `climate.vicare_heating` {% term integration %} has the following mapping of HVAC modes to Viessmann operation modes:

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
| `vicare_mode` | no | New value of ViCare mode. For supported values see the `vicare_modes` attribute of the climate {% term entity %}.

#### Service `set_preset_mode`

Sets the preset mode. Supported preset modes are *eco* and *comfort*. These are identical to the respective Viessmann programs and are only active temporarily for 8 hours.
Eco mode reduces the target temperature by 3°C, whereas Comfort mode sets the target temperature to a configurable value. Please consult your heating device manual for more information.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. To target all entities, use `all` keyword instead of entity_id.
| `preset_mode` | no | New value of preset mode.

## Water heater

It is not possible to turn on/off water heating via the water heater {% term integration %} since this would conflict with the operation modes of the heating {% term integration %}. Therefore the operation mode of that {% term integration %} is just available as an attribute and cannot be modified.

### Supported services `water_heater.vicare_water`

The following services of the [water heater integration](/integrations/water_heater/) are provided by the ViCare {% term integration %}: `set_temperature`

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

## Number

Number entities are available to adjust values like the predefined temperature for different heating programs or the heating curve shift and slope.

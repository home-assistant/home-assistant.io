---
title: Sensibo
description: Instructions on how to integrate Sensibo A/C controller into Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Fan
  - Number
  - Select
  - Sensor
  - Switch
  - Update
ha_release: 0.44
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@andrey-git'
  - '@gjohansson-ST'
ha_domain: sensibo
ha_platforms:
  - binary_sensor
  - button
  - climate
  - diagnostics
  - number
  - select
  - sensor
  - switch
  - update
ha_homekit: true
ha_dhcp: true
ha_integration_type: integration
---

Integrates [Sensibo](https://sensibo.com) devices into Home Assistant.

## Prerequisites

Please click [here](https://home.sensibo.com/me/api) and register to obtain the API key.

{% tip %}
If you create the API key using a dedicated user (and not your main user),
then in the Sensibo app log you will be able to distinguish between actions
done in the app and actions done by Home Assistant.
{% endtip %}

{% include integrations/config_flow.md %}

## Binary sensors

For motion sensors (supported by Sensibo Air devices), this integration provides the following sensors:

- Motion
- Alive
- Main sensor

For climate devices, these sensors are available:

- Room presence (for Air devices with an attached motion sensor)

For Pure devices, these sensors are available:

- Pure Boost Enabled
- Pure Boost linked with AC
- Pure Boost linked with Presence
- Pure Boost linked with Outdoor Air Quality

For all devices, these sensors are available:

- Filter Clean Required

## Button

You can reset your filter check by using the button available on climate devices.

By pressing the button, you tell your device that you have cleaned or replaced the filter.

## Number entities

By using the number entities you can calibrate the temperature and hunmidity of your device.

These entities are disabled by default.

## Select entities

For supported devices, this integration provides support to set the following modes by the select entity:

- Light

## Sensor entities

For all devices, these sensors are available:

- Filter last reset
- Feels Like
- Timer end time

For motion sensors (supported by Sensibo Air devices), this integration provides the following sensors:

- Temperature
- Humidity

For diagnostics, not automatically displayed on dashboards, these sensors are available for motion sensors:

- Voltage
- Rssi

For Pure devices, these sensors are available:

- PM2.5
- Pure Boost Sensitivity

For AirQ device, these sensors are available:

- TVOC
- CO2

For Element device, these sensors are available:

- PM 2.5
- TVOC
- CO2
- Ethanol
- Air quality

For climate devices, these sensors are available:

- Climate React low temperature threshold
- Climate React high temperature threshold

## Switch entities

For climate devices, these switches are available:

Support to enable/disable a timer to delay a start or stop (depending on the current state) of your device.

The switch uses a timer of 60 minutes delay. You can choose a custom delay using the custom `sensibo.enable_timer` action. See [Timer](#timer).

Support to enable/disable Climate React

Usage of the Climate React switch requires that the action has been configured previously in the app or by using the custom `sensibo.enable_climate_react` action. See [Climate React](#climate-react)

For Pure devices, this integration provides support to enable/disable Pure Boost.

To customize the settings of Pure Boost, you can use the custom `sensibo.enable_pure_boost` action. See [Pure Boost](#pure-boost)

## Custom actions

### Get device mode capabilities

As the below custom actions [Full state](#full-state) and [Climate react](#climate-react) both require their inputs to be exactly what the API requires, this custom action will provide the capabilities for the device for a certain HVAC mode to help the users on using those actions properly.

1. Go to [Developer Tools](https://my.home-assistant.io/redirect/server_controls/).
2. Switch to the **Actions** page.
3. Use the `sensibo.get_device_capabilities` action.
4. Select the `climate` entity as the target.
5. Select the `hvac_mode` from the available list.
6. Select **Perform action** to retrieve the available options per capability for that particular `climate` entity.

From the provided dictionary, copy the case-sensitive options as needed into other action calls used in automations or scripts.

### Full state

You can send a full state command to Sensibo instead of single commands using the `sensibo.full_state` action.

All fields are required to be according to Sensibo API specifications and are case-sensitive.

{% tip %}

Use the [Get device mode capabilities](#get-device-mode-capabilities) action to provide a list of capabilities.

{% endtip %}

### Assume state

For devices which are also controlled in other ways or often goes out of sync with Sensibo there is a `sensibo.assume_state` action.

With this action you can tell Sensibo if your device is currently running or not without sending a new command to you device.

### Pure Boost

You can configure your Pure Boost settings using the `sensibo.enable_pure_boost` action.

- Enable Pure Boost will enable the action with configured settings

Using Geo integration for Pure Boost is only possible by pre-configuration of Presence within the app.

### Timer

You can enable a timer with a custom delay using the `sensibo.enable_timer` action that is provided.

### Climate React

You can configure your Climate React settings using the `sensibo.enable_climate_react` action.

- Configuring this action also turns Climate React on

When using the action, the state needs to be set to precisely what Sensibo API expects. The first time it's recommended to use the app to configure it.

{% tip %}

Use the [Get device mode capabilities](#get-device-mode-capabilities) action to provide a list of capabilities.

{% endtip %}

Example for low threshold state:

{% raw %}

```yaml
on: true
fanLevel: "high"
temperatureUnit: "C"
targetTemperature: 23
mode: "cool"
swing: "fixedBottom"
horizontalSwing: "fixedLeft"
light: "on"
```

{% endraw %}

## Adding a quick switch example

If you want a "Quick Switch" to turn your AC On / Off, you can do that using the following `Switch Template`:

{% raw %}

```yaml
switch:
  - platform: template
    switches:
      ac:
        friendly_name: "AC"
        value_template: "{{ is_state('climate.ac', 'cool') or is_state('climate.ac', 'heat') or is_state('climate.ac', 'dry') or is_state('climate.ac', 'fan_only') }}"
        turn_on:
          action: climate.set_hvac_mode
          target:
            entity_id: climate.ac
          data:
            hvac_mode: "cool"
        turn_off:
          action: climate.set_hvac_mode
          target:
            entity_id: climate.ac
          data:
            hvac_mode: "off"
```

{% endraw %}

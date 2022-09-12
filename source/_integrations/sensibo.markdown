---
title: Sensibo
description: Instructions on how to integrate Sensibo A/C controller into Home Assistant.
ha_category:
  - Binary Sensor
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
ha_quality_scale: platinum
---

Integrates [Sensibo](https://sensibo.com) Air Conditioning controller into Home Assistant.

## Prerequisites

Please click [here](https://home.sensibo.com/me/api) and register to obtain the API key.
<div class="note">
If you create the API key using a dedicated user (and not your main user),
then in the Sensibo app log you will be able to distinguish between actions
done in the app and actions done by Home Assistant.
</div>

{% include integrations/config_flow.md %}

## Binary sensors

For motion sensors (supported by Sensibo Air devices), this integration provides the following sensors:

- Motion
- Alive
- Main sensor

For climate devices, these sensors are available:

- Room presence

For Pure devices, these sensors are available:

- Pure Boost Enabled
- Pure Boost linked with AC
- Pure Boost linked with Presence
- Pure Boost linked with Outdoor Air Quality

For climate devices, these sensors are available:

- Filter Clean Required

## Button

You can reset your filter check by using the button available on climate devices.

By pressing the button, you tell your device that you have cleaned or replaced the filter.

## Select Entities

For supported devices, this integration provides support to set the following modes by the select entity:

- Horizontal swing
- Light

## Sensor Entities

For motion sensors (supported by Sensibo Air devices), this integration provides the following sensors:

- Temperature
- Feels Like
- Humidity

For diagnostics, not automatically displayed on dashboards, these sensors are available:

- Voltage
- Rssi

For Pure devices, these sensors are available:

- PM2.5
- Pure Boost Sensitivity

For AirQ device, these sensors are available:

- TVOC
- CO2

For climate devices, these sensors are available:

- Filter last reset

## Switch Entities

For climate devices, this integration provides support to enable/disable a timer to delay a start or stop (depending on the current state) of your device.

The switch uses a timer of 60 minutes delay. You can choose a custom delay using the custom `sensibo.enable_timer` service. See [Timer](#timer).

For Pure devices, this integration provides support to enable/disable Pure Boost.

To customize the settings of Pure Boost, you can use the custom `sensibo.enable_pure_boost` service. See [Pure Boost](#pure-boost)

## Custom Services

### Pure Boost

You can configure your Pure Boost settings using the services `sensibo.enable_pure_boost`.

- Enable Pure Boost will enable the service with configured settings

Using Geo integration for Pure Boost is only possible by pre-configuration of Presence within the app.

### Timer

You can enable a timer with a custom delay using the service `sensibo.enable_timer` that is provided.

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
          service: climate.set_hvac_mode
          target:
            entity_id: climate.ac
          data:
            hvac_mode: "cool"
        turn_off:
          service: climate.set_hvac_mode
          target:
            entity_id: climate.ac
          data:
            hvac_mode: "off"
```

{% endraw %}

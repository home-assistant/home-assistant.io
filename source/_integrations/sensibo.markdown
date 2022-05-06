---
title: Sensibo
description: Instructions on how to integrate Sensibo A/C controller into Home Assistant.
ha_category:
  - Binary Sensor
  - Climate
  - Fan
  - Number
  - Select
  - Sensor
  - Updates
ha_release: 0.44
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@andrey-git'
  - '@gjohansson-ST'
ha_domain: sensibo
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - number
  - select
  - sensor
  - update
ha_homekit: true
ha_dhcp: true
ha_integration_type: integration
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
- Update available

## Select Entities

For supported devices, this integration provides support to set the following modes by the select entity:

- Horizontal swing
- Light

## Sensor Entities

For motion sensors (supported by Sensibo Air devices), this integration provides the following sensors:

- Temperature
- Humidity

For diagnostics, not automatically displayed on dashboards, these sensors are available:

- Voltage
- Rssi

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
            hvac_mode: cool
        turn_off:
          service: climate.set_hvac_mode
          target:
            entity_id: climate.ac
          data:
            hvac_mode: off
```

{% endraw %}

---
title: Palazzetti
description: Instructions on how to integrate Palazzetti within Home Assistant.
ha_category:
  - Climate
ha_release: 2024.11
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@dotvav'
ha_domain: palazzetti
ha_platforms:
  - climate
  - diagnostics
  - sensor
ha_integration_type: device
ha_dhcp: true
---

## Prerequisite

- You need the Connection Box bridge to be added to a network accessible to Home Assistant.
- You either need to:
  - know the IP address or hostname of the Connection Box on the network.
  - or configure the Connection Box with DHCP on the same network as Home Assistant.

The **Palazzetti** {% term integration %} integrates the [Palazzetti](https://palazzettigroup.com/)
stoves equipped with a [Connection Box](https://palazzettigroup.com/research-and-development/app/).
It is accessing the device's local API.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your Connection Box. You can find it in your router or in the Palazzetti app under **Settings** -> **Diagnostic information** -> **Ethernet** or **Wifi**."
  required: true
  type: string
{% endconfiguration_basic %}

## Climate

The Palazzetti integration offers a climate entity that allows you to read the
room temperature, start and stop the stove, set the target temperature, and set
the fan speed.

### Integration actions

This integration supports the following actions (see [Climate](/integrations/climate/)).

- [`set_temperature`](/integrations/climate/#action-climateset_temperature)
- [`set_hvac_mode`](/integrations/climate/#action-climateset_hvac_mode)
  - `heat` for heating mode
  - `off` to turn the stove off
- [`set_fan_mode`](/integrations/climate/#action-climateset_fan_mode)
  - `Silent` let the stove run in silent mode
  - `1`, `2`, `3`, `4`, `5` increasing fan speeds
  - `High` the highest available fan speed
  - `Auto` let the stove set the optimal fan speed

## Sensors

The Palazzetti integration offers the following sensors, for the products that provide them:

- Outlet air temperature (°C)
- Wood combustion temperature (°C)
- Room temperature (°C)
- Return water temperature (°C)
- Tank water temperature (°C)
- Hydro temperature 1 (°C)
- Hydro temperature 2 (°C)
- Pellet quantity (kg)
- Pellet level (cm)

## Possible use-cases

- Control the operations, temperature, fans
- Get alerts when the pellet level is low or empty, or on stove errors
- Auto start or stop the stove based on presence

## Automations

Get started quickly with these automation examples.

### Automatically lower the temperature when the last person leaves home

{% details "Example YAML configuration" %}

{% raw %}

```yaml
alias: "Lower the temperature when last person leaves"
description: "Lower the temperature when last person leaves the home"
mode: single
triggers:
  - trigger: state
    entity_id:
      - zone.home
    to: 0
actions:
  - action: climate.set_temperature
    data:
      temperature: 16
    target:
      entity_id: climate.my_stove
```

{% endraw %} {% enddetails %}

## Known Limitations

This integration does **not** yet support the following features and sensors:

- Light and Door on stove models equipped with them.
- Fan control other than the main one.
- Combustion power control.

## Troubleshooting

{% details "On and off switch does not always work" %}
During certain operations, it is not possible to turn the stove on or off. This action is available
only when the status of the stove is one of `off`, `off_timer`, `burning`, `burning_mod`, `cool_fluid`,
`clean_fire`, `cooling`, `ecomode`, `firewood_finished`.
{% enddetails %}

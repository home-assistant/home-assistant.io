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
  - button
  - climate
  - diagnostics
  - number
  - sensor
ha_integration_type: device
ha_dhcp: true
---

The **Palazzetti** {% term integration %} integrates the [Palazzetti](https://palazzettigroup.com/)
stoves equipped with a [Connection Box](https://palazzettigroup.com/research-and-development/app/).
It is accessing the device's local API. [WPalaControl](https://github.com/Domochip/WPalaControl)
devices have a compatible API and are supported by this integration too.

## Prerequisites

- You need the Connection Box bridge or WPalaControl to be added to a network accessible to Home Assistant.
- You either need to:
  - know the IP address or hostname of the Connection Box or WPalaControl on the network.
  - or configure the Connection Box or WPalaControl with DHCP on the same network as Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your Connection Box. You can find it in your router or in the Palazzetti app under **Settings** > **Diagnostic information** > **Ethernet** or **Wifi**."
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
  - `0` to `5` increasing fan speeds
  - `High` the highest available fan speed
  - `Auto` let the stove set the optimal fan speed

## Buttons

For the stoves that support it, this integration provides a Silent button to trigger the silent mode.

## Numbers

When the appliance supports it, the Palazzetti integration offers control over the following elements:

- The combustion power of the stove on a scale from `1` to `5`.
- The speed of the Left and Right fans.

## Sensors

The Palazzetti integration offers the following sensors, for the products that provide them:

State sensors:

- Status (current operational state) can take the following values:
  - `off`: Off
  - `off_timer`: Timer-regulated switch off
  - `test_fire`: Ignition test
  - `heatup`: Pellet feed
  - `fueling`: Ignition
  - `ign_test`: Fuel check
  - `burning`: Operating
  - `burning_mod`: Operating - Modulating
  - `unknown`: Unknown
  - `cool_fluid`: Stand-by
  - `fire_stop`: Switch off
  - `clean_fire`: Burn pot cleaning
  - `cool`: Cooling in progress
  - `cleanup`: Final cleaning
  - `ecomode`: Ecomode
  - `chimney_alarm`: Chimney alarm
  - `grate_error`: Grate error
  - `pellet_water_error`: Pellet probe or return water error
  - `t05_error`: T05 error disconnected or faulty probe
  - `hatch_door_open`: Feed hatch or door open
  - `pressure_error`: Safety pressure switch error
  - `main_probe_failure`: Main probe failure
  - `flue_probe_failure`: Flue gas probe failure
  - `exhaust_temp_high`: Too high exhaust gas temperature
  - `pellet_finished`: Pellets finished or ignition failed
  - `firewood_finished`: Firewood finished
  - `cooling`: Cooling
  - `general_error`: General error
  - `door_open`: Door open
  - `temp_too_high`: Temperature too high
  - `cleaning_warning`: Cleaning warning
  - `fuel_error`: Fuel error
  
Temperature sensors:

- Outlet air temperature (°C)
- Wood combustion temperature (°C)
- Room temperature (°C)
- Return water temperature (°C)
- Tank water temperature (°C)
- Hydro temperature 1 (°C)
- Hydro temperature 2 (°C)

Fuel Sensors:

- Pellet quantity (kg - cumulative quantity consumed)
- Pellet level (cm - current level)

## Possible use-cases

- Control the operations, temperature, and fans.
- Get alerts when the pellet level is low or empty, or on stove errors.
- Auto start or stop the stove based on presence.

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

## Known limitations

This integration does **not** yet support the following features and sensors:

- Light and Door entities on stove models equipped with them.
- Fan control other than the main one.
- Combustion power control.

## Troubleshooting

{% details "On and off switch does not always work" %}
During certain operations, it is not possible to turn the stove on or off. This action is available
only when the status of the stove is in one of the following states: `off`, `off_timer`, `burning`, `burning_mod`, `cool_fluid`,
`clean_fire`, `cooling`, `ecomode`, `firewood_finished`.
{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

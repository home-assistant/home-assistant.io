---
description: Instructions on how to integrate Palazzetti within Home Assistant.
ha_release: 2024.11
ha_domain: palazzetti
---

The **Palazzetti** {% term integration %} integrates pellet stoves manufactured by [Palazzetti](https://palazzettigroup.com/)
and OEM or rebranded stoves using the same hardware architecture (such as Jøtul, TurboFonte, and others)
equipped with a [Connection Box](https://palazzettigroup.com/research-and-development/app/).
It accesses the device's local API. Third-party bridges such as [WPalaControl](https://github.com/Domochip/WPalaControl)
implement a compatible API and are supported by this integration as well.

## Supported devices and brands

This integration supports pellet stoves equipped with a Palazzetti Connection Box, an OEM equivalent, or a compatible bridge (such as WPalaControl). Many manufacturers share this electronic architecture (Fumis controller).

Compatible brands and their commercial gateway names include:

- **Casatelli** (Kit Wi-Fi)
- **Fonte Flamme** (FFBox / FFBox2)
- **Godin** (Kit Wi-Fi C-Box)
- **Invicta** (Kit Wi-Fi C-Box)
- **Jøtul** (Jøtul Connection Box / CBox)
- **Palazzetti** (Palazzetti Connection Box)
- **Royal 1915** (Connection Box)
- **TurboFonte** (Connection Box / CBox)
- **WPalaControl** (open-source hardware bridge)

### Identifying compatible hardware

Compatible Wi-Fi modules connect directly to the stove's serial interface (RJ11/RJ12), communicate over local network HTTP (typically with hostname `connbox` or initial setup Wi-Fi SSID `connboxXXXXX`), and do not require a cloud service.

{% note %}
If your stove is equipped with a **Fumis WiRCU** Wi-Fi module (requiring a MAC address and PIN code to connect to the Fumis cloud), use the [Fumis](/integrations/fumis) integration instead.
{% endnote %}

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

- [`set_temperature`](/integrations/climate/#action-set-temperature)
- [`set_hvac_mode`](/integrations/climate/#action-set-hvac-mode)
  - `heat` for heating mode
  - `off` to turn the stove off
- [`set_fan_mode`](/integrations/climate/#action-set-fan-mode)
  - `0` to `5` increasing fan speeds
  - `High` the highest available fan speed
  - `Auto` let the stove set the optimal fan speed

## Buttons

For the stoves that support it, this integration provides a Silent button to trigger the silent mode.

## Light

For stoves that support it, this integration provides a Light entity to turn the stove's light on and off.

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

{% enddetails %}

## Data updates

The Palazzetti integration {% term polling polls %} the device for new data every 60 seconds.

## Known limitations

This integration does **not** yet support the following features and sensors:

- Door entity on stove models equipped with it.

## Troubleshooting

{% details "On and off switch does not always work" %}
During certain operations, it is not possible to turn the stove on or off. This action is available
only when the status of the stove is in one of the following states: `off`, `off_timer`, `burning`, `burning_mod`, `cool_fluid`,
`clean_fire`, `cooling`, `ecomode`, `firewood_finished`.
{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

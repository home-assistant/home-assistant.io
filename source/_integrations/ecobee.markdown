---
title: ecobee
description: Instructions for how to integrate ecobee thermostats and sensors within Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Humidifier
  - Notifications
  - Number
  - Sensor
  - Switch
  - Weather
ha_release: 0.9
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: ecobee
ha_platforms:
  - binary_sensor
  - climate
  - humidifier
  - notify
  - number
  - sensor
  - switch
  - weather
ha_zeroconf: true
ha_homekit: true
ha_integration_type: hub
---

The **ecobee** {% term integration %} lets you control and view sensor data from [ecobee](https://ecobee.com) thermostats.

<p class='img'>
  <img src='/images/screenshots/ecobee-sensor-badges.png' />
  <br />
  <img src='/images/screenshots/ecobee-thermostat-card.png' />
</p>

## Prerequisites

- Username and password for [ecobee.com](https://ecobee.com). 
   - You will need it when adding the integration to set up a connection between the integration and Home Assistant. 
- Have the devices connected to your ecobee.com account.
   - You can add devices either before or after you configure the service in Home Assistant, but having them connected to your ecobee.com account ahead of time is recommended to confirm that they are picked up by the service correctly.

{% note %}
Since version 2026.3, it is no longer required to get a [developer API key](https://www.ecobee.com/developers/) to use this integration. Existing API keys will continue to function. If you revoke your existing key in the ecobee portal, the integration will fail, and you will need to remove the service in Home Assistant and set it up again.
{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: If you have a developer API key, use this field and ignore the others. If you are logging in without an API key, leave this field blank and use username and password.
username:
  description: The email address you use to sign in to [ecobee.com](https://ecobee.com).
password:
  description: The password for the above account.
{% endconfiguration_basic %}

## Multi-factor authentication (MFA)

When signing in with your ecobee username and password, if your ecobee account has multi-factor authentication (MFA) enabled with a time-based one-time password (TOTP) from an authenticator app, Home Assistant will prompt you for the 6-digit code after you submit your credentials. The integration captures a refresh token after the initial login, so subsequent token refreshes happen without prompting you for the code again.

If the refresh token is ever invalidated (for example, after a password change on ecobee.com), Home Assistant will start a reauthentication flow. It will ask you for your password and the MFA code, if your account still has MFA enabled.

Other MFA methods (push, SMS, email) are not currently supported.

## Notifications

The `ecobee` notify platform allows you to send notifications to an ecobee thermostat. For each thermostat found, a `notify` entity will be added.

Example action:

```yaml
action: notify.send_message
data:
  message: "Hello, this is your thermostat."
  entity_id: notify.ecobee
```

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

## Thermostat

### Concepts

The ecobee thermostat supports the following key concepts.

The _target temperature_ is the temperature that the device attempts to achieve. The target temperature is either determined by the currently active climate or it may be overridden by a hold. When the
thermostat is not in auto mode, there is a single target temperature. When the thermostat is in auto HVAC mode, there is a pair of target temperatures: the lower target temperature determines the lowest desired temperature, while the higher target temperature determines the highest desired temperature (the thermostat will switch between heating and cooling to keep the temperature within these limits).

A _climate_ is a predefined or user-defined set of presets that the thermostat aims to achieve. The ecobee thermostat provides three predefined climates: Home, Away, and Sleep. Ecobee refers to these as _comfort settings_. The user can define additional climates.

A _preset_ is an override of the target temperature defined in the currently active climate. The temperature targeted in the preset mode may be explicitly set (temperature preset), it may be derived from a reference climate (such as home, away, or sleep), or it may be derived from a vacation defined by the thermostat. All holds are temporary. Temperature and climate holds expire when the thermostat transitions to the next climate defined in its program. A vacation hold starts at the beginning of the
defined vacation period and expires when the vacation period ends.

When in _away preset_, the target temperature is permanently overridden by the target temperature defined for the away climate. The away preset is a simple way to emulate a vacation mode.

The _HVAC mode_ of the device is the currently active operational modes that the ecobee thermostat provides: heat, cool, auto, and off.

The _target humidity_ is the humidity set point of the thermostat when a humidifier is connected and in manual control or "On" mode.

On a thermostat configured with auxiliary heat, an aux_heat_only switch will be present. When this switch is turned on, the ecobee thermostat HVAC mode will be changed to "Aux". However, Home Assistant will reflect that the thermostat is in "heat" mode. Turning off the aux_heat_only switch will change the thermostat back to the last active HVAC mode (heat, auto, etc).

### Attributes

The ecobee climate entity has some extra attributes to represent the state of the thermostat.

| Name                | Description                                                                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fan`               | If the fan is currently on or off: `on` / `off`.                                                                                                                                                  |
| `climate_mode`      | This is the climate mode that is active, or would be active if no override is active.                                                                                                             |
| `equipment_running` | This is a comma-separated list of equipment that is currently running.                                                                                                                            |
| `fan_min_on_time`   | The minimum amount of time (in minutes) that the fan will run per hour. This is determined by the minimum fan runtime setting which can be changed in the ecobee app or on the thermostat itself. |

## Ventilator

### Concepts

The ecobee thermostat supports the addition of an accessory. If you have an air exchanger (ventilator, HRV, or ERV), you can control it via the minimum time home and minimum time away numbers.

### Switch

The `ventilator 20 min` switch is behaving like the switch in the physical ecobee device. When switched on, the ventilator turns on for 20 min. When turned off, it stops the ventilator.

*Note: this does not interact with the `ventilator min time`*

### Number

| Name                          | Description                                                                                                                                                                                                                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ventilator_min_on_time_home` | The minimum amount of time (in minutes) that the ventilator will run per hour, when you are home. This is determined by the minimum ventilator runtime setting which can be changed in the ecobee app or on the thermostat itself. |
| `ventilator_min_on_time_away` | The minimum amount of time (in minutes) that the ventilator will run per hour, when you are away. This is determined by the minimum ventilator runtime setting which can be changed in the ecobee app or on the thermostat itself. |

## Auxiliary Heat

### Concepts 

When an HVAC system is equipped with a heat pump, a form of auxiliary heat is usually included. This may also be referred to as 'Emergency Heat'. You can control whether the thermostat requests only auxiliary heat, and adjust the outdoor temperature at which the heat pump compressor will no longer be used, for example, in response to utility costs or solar production in a hybrid system. A hybrid system refers to a system that does not use electricity for the auxiliary heat (such as natural gas or propane). This applies more to air source heat pumps than geothermal. 

### Switch

The `Auxiliary heat only` switch is provided to disable the use of the compressor (heat pump), only using the auxiliary heater. Be careful with this setting, as it can incur additional utility costs from using a less-efficient heat source. 

### Number

The `Compressor minimum temperature` number represents the outdoor temperature at which the compressor (heat pump) will not run. This is represented in the temperature units you have selected in Home Assistant; however, ecobee allows configuration only in increments of 5 degrees Fahrenheit. This is also represented in the thermostat user interface. When the outdoor temperature is below this value, only auxiliary heat will be used. Be careful with this setting, as it can incur additional utility costs from using a less-efficient heat source.

Check your heat pump Owners' Manual before adjusting this value; do not adjust it below the rated minimum operating temperature of the heat pump. **Failure to observe the rated minimum operating temperature can cause damage to the system**

{% include integrations/actions.md %}

In addition to these actions, the standard [Climate](/integrations/climate/) actions are available for ecobee thermostats.

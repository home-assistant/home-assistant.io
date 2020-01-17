---
title: Honeywell Total Connect Comfort (Europe)
description: Instructions on how to integrate a Honeywell evohome/TCC system with Home Assistant.
logo: honeywell.png
ha_category:
  - Hub
  - Climate
  - Water Heater
ha_release: 0.80
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@zxdavb'
---

The `evohome` integration links Home Assistant with all _non-US_ [Honeywell Total Connect Comfort (TCC)](https://international.mytotalconnectcomfort.com/Account/Login) CH/DHW systems, such as:

- The Honeywell evohome CH/DHW system, and
- The Honeywell Round Thermostat

It does not support the home security functionality of TCC.

It uses the [evohome-async](https://github.com/zxdavb/evohome-async) client library.

If your system is compatible with this integration, then you will be able to access it via [https://international.mytotalconnectcomfort.com/](https://international.mytotalconnectcomfort.com/) (note the `international`).

### Evohome

Evohome is a multi-zone system. Each zone is represented as a **Climate** entity: it will expose the zone's operating mode, temperature and setpoint.

The location (controller) is also represented as a **Climate** entity: it will expose the location's operating mode (see below for details). Note that the entity's current temperature is calculated as an average of all the Zones.

The DHW controller is represented as a **WaterHeater** entity: It will report its current temperature, and it can be turned on or off. The setpoint is not reported, and cannot cannot be changed.

### Round Thermostat

Such systems usually have only one Round Thermostat, although they can have two. Systems with one such thermostat are merged into a single **Climate** entity. Systems with two thermostats will have a 3rd entity for the TCC locations, much like evohome, above.

## Configuration

To set up this integration, add the following to your **configuration.yaml** file:

```yaml
# Example configuration.yaml entry
evohome:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The username (email address) that has access to [Honeywell TCC](https://international.mytotalconnectcomfort.com/Account/Login) web site.
  required: true
  type: string
password:
  description: The password corresponding to the above username.
  required: true
  type: string
location_idx:
  description: Used to select which location to use, if your login has access to more than one location. Multiple locations at one time are not officially supported.
  required: false
  type: integer
  default: 0
scan_interval:
  description: How often updates are retrieved from Honeywell's web servers. The minimum value is 60 seconds.
  required: false
  type: integer
  default: 300
{% endconfiguration %}

This is an IoT cloud-polling integration, and the recommended `scan_interval` is 180 seconds. Testing has indicated that this is a safe interval that - by itself - shouldn't cause you to be rate-limited by Honeywell.

## System modes, Zone overrides and Inheritance

Evohome locations support up to six distinct operating modes: **Auto**, **AutoWithEco**, **Away**, **DayOff**, **HeatingOff**, and **Custom**. Not all evohome systems support all modes.

Zones support three setpoint modes: **FollowSchedule**, **TemporaryOverride**, and **PermanentOverride** but 'inherit' an operating mode from their location (the actual algorithm for this is a little more complicated than indicated below - please see your vendor's documentation).

For **FollowSchedule**, a zone's `temperature` (target temperature, a.k.a setpoint) is a function of its scheduled temperature and its inherited mode. For example, **AutoWithEco** would be scheduled temperature less 3C.

If the location is set to **HeatingOff** (temperature set to a minimum) or **Away** (temperature set to 12C), then the zones will inherit that setpoint regardless of their own mode. For **Away**, the DHW controller will also be turned off.

If the zone's temperature is changed, then it will be a **TemporaryOverride** that will revert to **FollowSchedule** at the next scheduled setpoint (or in an hour, if there is no such schedule). Zones can be switched between the two override modes without changing the target temperature.

Some locations have a hidden mode, **AutoWithReset**, that will behave as **Auto**, and will reset all zones to **FollowSchedule**.

In Home Assistant schema, all this is done via a combination of `HVAC_MODE` and `PRESET_MODE` (but also see the state attributes `systemModeStatus` and `setpointStatus`, below).

## Service Calls

This integration provide service calls to expose the full functionality of evohome beyond the limitations of Home Assistant's standardised schema. Mostly, this relates to specifying the duration of mode changes, after which time the entities revert to **Auto** or **FollowSchedule** (for locations and zones, respectively).

### evohome.set_system_mode

This service call is used to set the system `mode`, either indefinitely, or for a set period of time, after which it will revert to **Auto** mode.

For some modes, such as **Away**, the duration is in `days`, where 1 day will revert after midnight, and 2 days reverts at midnight tomorrow. For other modes, such as **AutoWithEco**, the duration is in `hours`.

### evohome.reset_system

This service call is used to set the system to **AutoWithReset**, and reset all the zones to **FollowSchedule**.

### evohome.refresh_system

This service call is used to pull the latest state data from the vendor's servers.

### evohome.set_zone_override

This service call is used to set the `temperature` of a zone as identified by its `entity_id`. This change can either be indefinite, or for a set period of time, after which it will revert to **FollowSchedule**. The duration can be in `minutes` from the current time, or `until` a specified time within the next 24 hours.

### evohome.clear_zone_override

This service call is used to set a zone, as identified by its `entity_id`, to **FollowSchedule**.

## Useful Jinja Templates

The actual operating mode of evohome entities can be tracked via their state attributes, which includes a JSON data structure for the current state called `status`.

For the location (controller), see `system_mode_status`:

{% raw %}
```text
{% if state_attr('climate.my_home', 'status').system_mode_status.mode == "Away" %}
  The system is in Away mode
{% else %}
  The system is not in Away mode
{% endif %}
```
{% endraw %}

For the Zones, it is `setpointStatus`:

{% raw %}
```text
{{ state_attr('climate.kitchen', 'status').setpoint_status.setpoint_mode }}
```
{% endraw %}

The Zones will expose the current/upcoming scheduled `setpoints`:

{% raw %}
```text
{{ state_attr('climate.kitchen', 'status').setpoints.next_sp_temp }}
```
{% endraw %}

All evohome entities may have faults, and these can be turned into sensors, or:

{% raw %}
```text
{% if state_attr('climate.bedroom', 'status').active_faults %}
  {% if state_attr('climate.bedroom', 'status').active_faults[0].fault_type == 'TempZoneActuatorLowBattery' %}
    There is a low battery
  {% endif %}
    There is a Fault!
{% else %}
  Yay, everything is OK :)
{% endif %}
```
{% endraw %}

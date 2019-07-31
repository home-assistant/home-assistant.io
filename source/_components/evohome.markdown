---
title: "Honeywell evohome/TCC systems"
description: "Instructions on how to integrate a Honeywell evohome/TCC system with Home Assistant."
logo: honeywell.png
ha_category:
  - Hub
  - Climate
ha_release: 0.80
ha_iot_class: Cloud Polling
redirect_from:
  - /components/climate.evohome/
---

The `evohome` integration links Home Assistant with all _non-US_ [Honeywell Total Connect Comfort (TCC)](https://international.mytotalconnectcomfort.com/Account/Login) CH/DHW systems, such as:
 * the Honeywell evohome CH/DHW system, and
 * the Honeywell Round Thermostat

It does not support the home security functionality of TCC.

It uses v2 of the [evohome-client](https://github.com/watchforstock/evohome-client) client library.

Honeywell removed support for higher-precision temperatures from the v2 API, so temperatures are reported to the nearest 0.5C.

### evohome

evohome is a multi-zone system. Each Zone is represented as a **Climate** device: it will expose the Zone's operating mode, temperature and setpoint.

The Controller/Location is also represented as a **Climate** device: it will expose the location's operating mode (see below for details). Note that the Controller's temperatures are calculated as an average of all the Zones.

The DHW controller is represented as a **WaterHeater** device: It will report its current temperature (but not target temperature), and it can be turned on or off.

### Round Thermostat

Round Thermostat is a single zone system. It is currently implemented as two **Climate** devices, as if a single zone evohome system.

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
  description: Used to select which location to use, if your login has access to more than one location. Multiple locations at one time are not supported.
  required: false
  type: integer
  default: 0
scan_interval:
  description: How often updates are retrieved from Honeywell's web servers. The minimum value is 60 seconds.
  required: false
  type: integer
  default: 300
{% endconfiguration %}

This is an IoT cloud-polling device, and the recommended `scan_interval` is 180 seconds. Testing has indicated that this is a safe interval that - by itself - shouldn't cause you to be rate-limited by Honeywell.

## Operating modes, and Inheritance

Zones support only three setpoint modes: **FollowSchedule**, **TemporaryOverride**, and **PermanentOverride**.

Mostly, the Zone 'inherits' its functional operating mode from the controller (the actual algorithm for this is a little complicated).

The evohome Controller supports seven distinct system modes: **Auto**, **AutoWithEco**, **Away**, **DayOff**, **HeatingOff**, and **Custom**; **AutoWithReset** is a hidden mode that will revert all Zones to **FollowSchedule** mode.

If the zone is in **FollowSchedule** mode, its `temperature` (target temperature) is a function of its scheduled temperature and its functional mode - for example, **AutoWithEco** is scheduled temperature less 3C.

If the Controller is set to **HeatingOff** (target temperature to minimum) or **Away** (target temperature to 12C), then the Zones will inherit that mode regardless of their own setpoint mode.

If the Zone's temperature is changed, then it will be a **TemporaryOverride** that will revert to **FollowSchedule** at the next scheduled setpoint. Once this is done, the Zone can be switched to **PermanentOverride** mode.

In Home Assistant, all this is done via `HVAC_MODE` and `PRESET_MODE`.

## Useful Jinja Templates

The actual operating mode of evohome entities can be tracked via their state attributes, which includes a JSON data structure for current state called `status`.

For the Controller, see `systemModeStatus`:
{% raw %}
```
{% if state_attr('climate.my_home', 'status').systemModeStatus.mode == "Away" %}
  The system is in Away mode
{% else %}
  The system is not in Away mode
{% endif %}
```
{% endraw %}

For the Zones, it is `setpointStatus`:
{% raw %}
```
{{ state_attr('climate.kitchen', 'status').setpointStatus.setpointMode }}
```
{% endraw %}

The Zones will expose the current/upcoming scheduled `setpoints`:
{% raw %}
```
{{ state_attr('climate.kitchen', 'status').setpoints.next.temperature }}
```
{% endraw %}

All evohome entities may have faults, and these can be turned into sensors, or:
{% raw %}
```
{% if state_attr('climate.main_room', 'status').activeFaults %}
  {% if state_attr('climate.main_room', 'status').activeFaults[0].faultType == 'TempZoneActuatorLowBattery' %}
    There is a low battery
  {% endif %}
    There is a Fault!
{% else %}
  Yay, everything is OK :)
{% endif %}
```
{% endraw %}


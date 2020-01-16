---
title: Honeywell Total Connect Comfort (Europe)
description: Instructions on how to integrate a Honeywell evohome/TCC system with Home Assistant.
logo: honeywell.png
ha_category:
  - Hub
  - Climate
ha_release: 0.8
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@zxdavb'
---

The `evohome` integration links Home Assistant with all _non-US_ [Honeywell Total Connect Comfort (TCC)](https://international.mytotalconnectcomfort.com/Account/Login) CH/DHW systems, such as:

- The Honeywell evohome CH/DHW system, and
- The Honeywell Round Thermostat

It does not support the home security functionality of TCC.

It uses v2 of the [evohome-client](https://github.com/watchforstock/evohome-client) client library.

Honeywell removed support for higher-precision temperatures from the v2 API, and thus reported temperatures are rounded up to the nearest 0.5C.

### evohome

evohome is a multi-zone system. Each zone is represented as a **Climate** device: it will expose the zone's operating mode, temperature and setpoint.

The controller/location is also represented as a **Climate** device: it will expose the location's operating mode (see below for details). Note that the controller's current temperature is calculated as an average of all the Zones.

The DHW controller is represented as a **WaterHeater** device: It will report its current temperature (but not target temperature), and it can be turned on or off.

### Round Thermostat

Although Round Thermostat is, strictly speaking, a Controller and a single zone, they are merged into a single **Climate** device.

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

## Operating modes, and inheritance

Zones support only three setpoint modes: **FollowSchedule**, **TemporaryOverride**, and **PermanentOverride**.

Mostly, the zone 'inherits' its functional operating mode from the controller (the actual algorithm for this is a little complicated).

The evohome controller supports seven distinct system modes: **Auto**, **AutoWithEco**, **Away**, **DayOff**, **HeatingOff**, and **Custom**; **AutoWithReset** is a hidden mode that will revert all zones to **FollowSchedule** mode.

If the zone is in **FollowSchedule** mode, its `temperature` (target temperature) is a function of its scheduled temperature and its functional mode - for example, **AutoWithEco** is scheduled temperature less 3C.

If the controller is set to **HeatingOff** (target temperature to a minimum) or **Away** (target temperature to 12C), then the zones will inherit that mode regardless of their own setpoint mode.

If the zone's temperature is changed, then it will be a **TemporaryOverride** that will revert to **FollowSchedule** at the next scheduled setpoint. Once this is done, the zone can be switched to **PermanentOverride** mode.

In Home Assistant, all this is done via `HVAC_MODE` and `PRESET_MODE` (but also see `systemModeStatus`, `setpointStatus`, below).

## Useful Jinja Templates

The actual operating mode of evohome entities can be tracked via their state attributes, which includes a JSON data structure for the current state called `status`.

For the Controller, see `system_mode_status`:

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

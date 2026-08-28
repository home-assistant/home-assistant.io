---
title: Honeywell Total Connect Comfort (Europe)
description: Instructions on how to integrate a Honeywell Evohome/TCC system with Home Assistant.
ha_category:
  - Climate
  - Hub
  - Water heater
ha_release: '0.80'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@zxdavb'
ha_domain: evohome
ha_platforms:
  - button
  - climate
  - water_heater
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Evohome** {% term integration %} links Home Assistant with all _non-US_ [Honeywell Total Connect Comfort (TCC)](https://international.mytotalconnectcomfort.com/Account/Login) CH/DHW systems, such as:

- the Honeywell Evohome CH/DHW system, and
- the Honeywell Mobile Access Kit with a Round Thermostat

It does not support the home security functionality of TCC.

It uses the [evohome-async](https://github.com/zxdavb/evohome-async) client library.

For your system to be compatible with this integration, then you must be able to access it via [https://international.mytotalconnectcomfort.com/](https://international.mytotalconnectcomfort.com/) (note the 'international').

## Configuration

To set up this integration, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
evohome:
  username: "YOUR_USERNAME"
  password: "YOUR_PASSWORD"
```

{% configuration %}
username:
  description: The username (email address) that has access to the [TCC](https://international.mytotalconnectcomfort.com/Account/Login) website.
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
  description: How often updates are retrieved from the vendor's web servers. The minimum interval is 60 seconds.
  required: false
  type: integer
  default: 300
{% endconfiguration %}

This is an IoT cloud-polling integration and the recommended minimum `scan_interval` is 180 seconds. Testing has indicated that this is a safe interval that - by itself - shouldn't cause you to be rate-limited by the vendor. There is little value in shorter intervals, as this integration will automatically force a refresh shortly after any configuration changes.

## Locations and zones

TCC systems are implemented as a _location_, which consists of 1-12 _zones_ and, optionally, a DHW controller:

- The system location (for example, a house) is used for operating modes such as **Auto**, **AutoWithEco**, and **Away**.
- Heating zones (for example, rooms) are used for the target temperature.

### Evohome

Each heating zone is represented as a **Climate** entity that exposes the zone's operating mode, current temperature, and setpoint. Due to limitations with the vendor's public API, there is no cooling functionality.

Each zone also provides a **Button** entity to clear any override and return the zone to Evohome's **FollowSchedule** mode.

The Evohome controller is also represented as a **Climate** entity that exposes the system's current operating mode. A controller has neither a current temperature nor a setpoint, but all **Climate** entities in Home Assistant are required to report a temperature, so this value is calculated as the average of all zones.

The controller also provides a **Button** entity to reset the system mode. This returns the system to **AutoWithReset** when supported, or **Auto** when **AutoWithReset** is unsupported, and resets all zones and DHW to **FollowSchedule**.

The DHW controller is represented as a **WaterHeater** entity which will report its current temperature and can be turned on or off. Due to limitations with the vendor's RESTful API, the setpoint is not reported and cannot be changed.

If present, it also provides a **Button** entity to clear any DHW override and return the DHW controller to Evohome's **FollowSchedule** mode.

Note that support for schedules is limited. They cannot be changed, and there is no way to back up or restore that data. For that functionality, refer to the [evohome-async documentation](https://github.com/zxdavb/evohome-async).

### Round thermostat

These systems use an internet gateway rather than an Evohome controller. They usually have only one Round Thermostat, although they can have two. Systems with one such thermostat will still appear as two **Climate** entities, one for system mode (Away, AutoWithEco, and similar modes), and another for the zone setpoint.

## Temperature precision

Note that TCC devices may well measure temperatures with very high precision, but the vendor API will report temperatures rounded _towards_ the setpoint (that is, either up or down) with a precision of 0.5 °C; this is a proxy for the deadband as used by other climate systems. Where possible, this integration will leverage an older vendor API to obtain current temperatures with a precision of 0.01 °C.

Therefore, depending upon the above, Home Assistant will display/record current temperatures with a precision of either 0.5 °C or 0.1 °C (its highest supported precision).

## System modes, zone overrides and inheritance

TCC systems can support up to six distinct operating modes: **Auto**, **AutoWithEco**, **Away**, **DayOff**, **HeatingOff**, and **Custom**. Not all systems support all modes.

Zones support three setpoint modes: **FollowSchedule**, **TemporaryOverride**, and **PermanentOverride**, but 'inherit' an operating mode from their system (the actual algorithm for this is a little more complicated than indicated below - please see the vendor's documentation).

For **FollowSchedule**, a zone's `setpoint` (target temperature) is a function of its scheduled target temperature and its inherited mode:

- **Auto** setpoints are scheduled temperatures (the default)
- **AutoWithEco** setpoints are scheduled temperatures, less 3 °C

If the zone's target temperature is changed then it will either be a **TemporaryOverride** or a **PermanentOverride**, depending. A **TemporaryOverride** will revert to **FollowSchedule** after some specified time. A **PermanentOverride** is a persistent change until some subsequent intervention is made. Zones can be switched between the two override modes without changing the target temperature.

For some system modes all zones will have a setpoint enforced upon them, regardless of their own mode:

- **Away** setpoints to 12 °C
- **HeatingOff** setpoints to a minimum, usually 4 °C

For **Away**, the DHW controller will also be turned off.

Some locations have a hidden mode, **AutoWithReset**, that will behave as **Auto**, and will reset all zones to **FollowSchedule**.

In the Home Assistant schema, all this is done via a combination of `HVAC_MODE` and `PRESET_MODE` (but also see the state attributes `system_mode_status` and `setpoint_status`, below).

{% include integrations/actions.md %}

## Useful Jinja templates

The actual operating mode of Evohome entities can be tracked via their state attributes, which includes a JSON data structure for the current state called `status`.

For the system (controller), see `system_mode_status`:

{% raw %}

```text
{% if state_attr('climate.my_home', 'status').system_mode_status.mode == "Away" %}
  The system is in Away mode
{% else %}
  The system is not in Away mode
{% endif %}
```

{% endraw %}

For the Zones, it is `setpoint_status`:

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

All Evohome entities may have faults, and these can be turned into sensors, or:

{% raw %}

```text
{% if state_attr('climate.bedroom', 'status').active_faults %}
  {% if state_attr('climate.bedroom', 'status').active_faults[0].faultType == 'TempZoneActuatorLowBattery' %}
    There is a low battery
  {% endif %}
    There is a Fault!
{% else %}
  Yay, everything is OK :)
{% endif %}
```

{% endraw %}

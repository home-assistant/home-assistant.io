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
  description: The username (email address) that has access to the [TCC](https://international.mytotalconnectcomfort.com/Account/Login) web site.
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

TCC systems are implemented as a _location_, which consist of 1-12 _zones_ and, optionally, a DHW controller:

- The system location (e.g., a house) is used for operating modes such as home, away, economy, etc.
- Heating zones (e.g., rooms) are used for the target temperature.

### Evohome

Each zone is represented as a **Climate** entity which will expose the zone's operating mode, current temperature and setpoint.

The Evohome location (controller) is also represented as a **Climate** entity that will expose the location's operating mode. Locations have neither a current temperature nor a setpoint, but as all **Climate** entities are required by Home Assistant to report a temperature, this is calculated as the average of all the zones.

The DHW controller is represented as a **WaterHeater** entity which will report its current temperature and can be turned on or off. Due to limitations with the vendor's RESTful API, the setpoint is not reported and cannot be changed.

Note that there is limited support for schedules: they cannot be changed and there is no facility to backup/restore that data (see [here](https://evohome.readthedocs.io/en/latest/) for such functionality).

### Round thermostat

These systems use an internet gateway rather than an Evohome controller. They usually have only one Round Thermostat, although they can have two. Systems with one such thermostat will still appear as two **Climate** entities, one for location mode (away, economy, etc.), and another for the zone setpoint.

## Temperature precision

Note that TCC devices may well measure temperatures with very high precision, but the vendor API will report temperatures rounded _towards_ the setpoint (i.e., either up or down) with a precision of 0.5 °C; this a proxy for the deadband as used by other climate systems. Where possible, this integration will leverage an older vendor API to obtain current temperatures with a precision of 0.01 °C.

Therefore, depending upon the above, Home Assistant will display/record current temperatures with a precision of either 0.5 °C or 0.1 °C (it's highest supported precision).

## System modes, zone overrides and inheritance

TCC locations can support up to six distinct operating modes: **Auto**, **AutoWithEco**, **Away**, **DayOff**, **HeatingOff**, and **Custom**. Not all systems support all modes.

Zones support three setpoint modes: **FollowSchedule**, **TemporaryOverride**, and **PermanentOverride** but 'inherit' an operating mode from their location (the actual algorithm for this is a little more complicated than indicated below - please see the vendor's documentation).

For **FollowSchedule**, a zone's `setpoint` (target temperature) is a function of its scheduled target temperature and its inherited mode:

- **Auto** setpoints are scheduled temperatures (the default)
- **AutoWithEco** setpoints are scheduled temperatures, less 3 °C

If the zone's target temperature is changed then it will either be a **TemporaryOverride** or a **PermanentOverride**, depending. A **TemporaryOverride** will revert to **FollowSchedule** after some specified time. A **PermanentOverride** is a permanent change until some subsequent intervention is made. Zones can be switched between the two override modes without changing the target temperature.

For some location modes all zones will have a setpoint enforced upon them, regardless of their own mode:

- **Away** setpoints to 12 °C
- **HeatingOff** setpoints to a minimum, usually 4 °C

For **Away**, the DHW controller will also be turned off.

Some locations have a hidden mode, **AutoWithReset**, that will behave as **Auto**, and will reset all zones to **FollowSchedule**.

In the Home Assistant schema, all this is done via a combination of `HVAC_MODE` and `PRESET_MODE` (but also see the state attributes `system_mode_status` and `setpoint_status`, below).

## Action calls

This integration provides its own actions to expose the full functionality of TCC systems beyond the limitations of Home Assistant's standardized schema. Mostly, this relates to specifying the duration of mode changes, after which time the entities revert to **Auto** or **FollowSchedule** (for locations and zones, respectively).

It is recommended to use the native actions (e.g., `evohome.set_system_mode`) instead of Home Assistant's generic equivalents (e.g., `climate.set_hvac_mode`) whenever possible. However, it may be necessary to use the generic actions for integration with 3rd party systems such as Amazon Alexa or Google Home.

### evohome.set_system_mode

This action call will set the operating `mode` of the system for a specified period of time, after which it will revert to **Auto**. However, if no period of time is provided, then the change is permanent.

For **AutoWithEco**, the period of time is a `duration` is up to 24 hours.

```yaml
- actions:
    - action: evohome.set_system_mode
      data:
        mode: AutoWithEco
        duration: {hours: 1, minutes: 30}
```

For the other modes, such as **Away**, the duration is a `period` of days, where 1 day will revert at midnight tonight, and 2 days reverts at midnight tomorrow.

```yaml
- actions:
    - action: evohome.set_system_mode
      data:
        mode: Away
        period: {days: 30}
```

### evohome.reset_system

This action will set the operating mode of the system to **AutoWithReset**, and reset all the zones to **FollowSchedule**.

Not all systems support this feature.

### evohome.refresh_system

This action will immediately pull the latest state data from the vendor's servers rather than waiting for the next `scan_interval`.

### evohome.set_zone_override

This action will set the `setpoint` of a zone, as identified by its `entity_id`, for a specified period of time (**TemporaryOverride**). However, if no period of time is provided (c.f. a duration of 0, below), then the change is permanent (**PermanentOverride**).

```yaml
- actions:
    - action: evohome.set_zone_override
      target:
        entity_id: climate.loungeroom
      data:
        setpoint: 10
```

The `duration` can be up to 24 hours, after which the zone mode will revert to schedule (**FollowSchedule**). If the `duration` is 0 hours, then the change will be until the next setpoint.

```yaml
- actions:
    - action: evohome.set_zone_override
      target:
        entity_id: climate.loungeroom
      data:
        setpoint: 10
        duration: {minutes: 0}
```

### evohome.clear_zone_override

This action is used to set a zone, as identified by its `entity_id`, to **FollowSchedule**.

## Useful Jinja templates

The actual operating mode of Evohome entities can be tracked via their state attributes, which includes a JSON data structure for the current state called `status`.

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

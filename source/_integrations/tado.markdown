---
title: Tado
description: Instructions on how to integrate Tado devices with Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Hub
  - Presence detection
  - Sensor
  - Switch
  - Water heater
  - Weather
ha_release: 0.41
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@erwindouna'
ha_domain: tado
ha_config_flow: true
ha_homekit: true
ha_platforms:
  - binary_sensor
  - climate
  - device_tracker
  - sensor
  - switch
  - water_heater
ha_dhcp: true
ha_integration_type: integration
---

The Tado integration platform is used as an interface to the [my.tado.com](https://my.tado.com/) website.

There is currently support for the following device types within Home Assistant:

- Binary sensor - for some additional information of the zones.
- Climate - for every Tado zone.
- Water heater - for water heater zones.
- [Presence detection](#presence-detection)
- Sensor - for some additional information of the zones.
- Weather - for information about the current weather at the location of your Tado home.
- Switch - for controlling child lock on supported devices

## Unsupported device types

New Tado X devices are not supported by this integration, they have to be used through the [Matter integration](/integrations/matter).

{% include integrations/config_flow.md %}

The Tado thermostats are internet connected thermostats. There exists an unofficial API at [my.tado.com](https://my.tado.com/), which is used by their website and now by this component.

It currently supports presenting the current temperature, the setting temperature and the current operation mode. The operation mode can be set to manual, auto and off. If no user is at home anymore, all Tado zones show the away-state (Only with Tado assist mode). Manually switching between home-mode and away-mode is also supported. Manually switching to auto-mode is only supported with Tado assist mode. Any Tado climate card can be switched between these presence modes, this changes the setting for the entire home.

## Presence detection

The Tado device tracker is using the [Tado Smart Thermostat](https://www.tado.com/) and its support for person presence detection based on smartphone location by geofencing.

This tracker uses the Tado API to determine if a mobile device is at home.

By default the Tado device tracker will track all devices known to Tado associated with your home. The Tado app needs to have the `Geolocation` permission enabled for the device to be tracked.

Your device has to be at home at least once before showing up as *home* or *away*.
Polling Tado API for presence information will happen at most once every 30 seconds.

Beware that the Tado (v2) API does not provide GPS location of devices, only a bearing, therefore Home Assistant only uses `home`/`not-home` status.

## Actions

### Action `tado.set_climate_timer`

You can use the `tado.set_climate_timer` action to set your Tado climate device, for example a radiator valve, to switch on for a set time period. 

| Data attribute | Optional | Description                                                            |
| ---------------------- | -------- | ---------------------------------------------------------------------- |
| `entity_id`            | yes      | String, Name of entity e.g., `climate.heating`                         |
| `temperature`          | no       | String, The required target temperature e.g., `20.5`                   |
| `time_period`          | yes      | Time Period, Period of time the boost should last for e.g., `01:30:00` |
| `overlay`              | yes      | Override your defaults setting. NB dont set this and the time period   |

### Action `tado.set_water_heater_timer`

You can use the `tado.set_water_heater_timer` action to set your water heater to switch on for a set time period. 

| Data attribute | Optional | Description                                                            |
| ---------------------- | -------- | ---------------------------------------------------------------------- |
| `entity_id`            | yes      | String, Name of entity e.g., `water_heater.hot_water`                  |
| `time_period`          | no       | Time Period, Period of time the boost should last for e.g., `01:30:00` |
| `temperature`          | yes      | String, The required target temperature e.g., `20.5`                   |

### Action `tado.set_climate_temperature_offset`

You can use the `tado.set_climate_temperature_offset` action to set the temperature offset for Tado climate devices.

| Data attribute | Optional | Description                                                            |
| ---------------------- | -------- | ---------------------------------------------------------------------- |
| `entity_id`            | yes      | String, Name of entity e.g., `climate.heating`                         |
| `offset`               | no       | Float, Offset you would like to set                                    |


Examples:

```yaml
# Example script to set a timer for the water heater with no temperature specified
script:
  boost_heating:
    sequence:
      - action: tado.set_climate_timer
        target:
          entity_id: climate.heating
        data:
          time_period: "01:30:00"
          temperature: 25
      - action: tado.set_water_heater_timer
        target:
          entity_id: water_heater.hot_water
        data:
          time_period: "01:30:00"
```

{% raw %}
```yaml
# Example automation to set temperature offset based on another thermostat value
automation:
    # Trigger if the state of either thermostat changes
    triggers:
    - trigger: state
      entity_id:
        - sensor.temp_sensor_room
        - sensor.tado_temperature
    
    # Check if the room temp is more than 0.5 away from the tado thermostat reading condition. The sensors default to room temperature (20) when the reading is in error:
    conditions:
    - condition: template
      value_template: >
        {% set tado_temp = states('sensor.tado_temperature')|float(20) %}
        {% set room_temp = states('sensor.temp_sensor_room')|float(20) %}
        {{ (tado_temp - room_temp) | abs > 0.5 }}
    
    # Work out what the new offset should be (tado temp less the room temp but add the current offset value) and turn that to a negative value for setting as the new offset
    actions:
    - action: tado.set_climate_temperature_offset
      target:
        entity_id: climate.tado
      data:
        offset: >
          {% set tado_temp = states('sensor.tado_temperature')|float(20) %}
          {% set room_temp = states('sensor.temp_sensor_room')|float(20) %}
          {% set current_offset = state_attr('climate.tado', 'offset_celsius') %}
          {{ (-(tado_temp - room_temp) + current_offset)|round(1) }}
```
{% endraw %}

### Action `tado.add_meter_reading`

You can use the `tado.add_meter_reading` action to add your meter readings to Tado Energy IQ. With Energy IQ, you can track your energy consumption and take control of your heating expenses.

| Data attribute | Optional | Description                                                            |
| ---------------------- | -------- | ---------------------------------------------------------------------- |
| `config_entry`         | no       | String, Config entry to add meter readings to.                         |
| `reading`              | no       | Integer, Reading in m³ or kWh without decimals.                        |

Examples:

{% raw %}
```yaml
# Example automation add meter readings on a daily basis.
automation:
    # Trigger on specified time.
    triggers:
      - trigger: time
        at: "00:00:00"

    # Add meter readings from `sensor.gas_consumption` to Tado.
    # Retrieve your `config_entry` id by setting this automation up in UI mode.
    # Notice that you may have to convert the reading to integer.
    actions:
      - action: tado.add_meter_reading
        data:
          config_entry: ef2e84b3dfc0aee85ed44ac8e8038ccf
          reading: "{{ states('sensor.gas_consumption')|int }}"
```
{% endraw %}

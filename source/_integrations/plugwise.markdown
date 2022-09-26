---
title: Plugwise
description: Plugwise Smile platform integration.
ha_category:
  - Binary Sensor
  - Climate
  - Number
  - Select
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 0.98
ha_codeowners:
  - '@CoMPaTech'
  - '@bouwew'
  - '@brefra'
  - '@frenck'
ha_config_flow: true
ha_domain: plugwise
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - number
  - select
  - sensor
  - switch
ha_integration_type: integration
---

This enables [Plugwise](https://www.plugwise.com) components with a central Smile gateway to be integrated. This integration talks locally to your **Smile** interface, and you will need its password and IP address.
The platform supports [Anna](https://www.plugwise.com/en_US/products/anna), [Adam (zonecontrol)](https://www.plugwise.com/en_US/zonecontrol), [P1](https://www.plugwise.com/en_US/products/smile-p1) Smile products and the [Stretch](https://www.plugwise.com/nl_NL/het-systeem) products. See below list for more details.

Platforms available - depending on your Smile and setup include:

 - `climate` (for the Anna and Lisa products, or a single Tom)
 - `sensor` (for all relevant products including the Smile P1)
 - `binary_sensor` (for showing the status of e.g. domestic hot water heating or secondary heater)
 - `switch` (for Plugs connected to Adam or Stealths and Circles connected to a Stretch)
 - `select` (for changing a thermostat schedule)
 - `number` (for changing a boiler setpoint)

The password can be found on the bottom of your Smile or Stretch, the ID, it should consist of 8 characters. To find your IP address use the Plugwise App: 

 - Open the Plugwise App and choose the 'Settings'-icon (&#9776;) and choose 'HTML-interface'. 
 - Go to the (lower) 'Settings'-icon (&#9776;) and choose 'Preferences'. 
 - Choose 'System' then 'Networking' and your IP address will be shown.

## Entities

This integration will show all Plugwise entities present in your Plugwise configuration. In addition, you will see a 'Smile' entity representing your central Plugwise gateway (i.e., the Smile Anna, Smile P1, Adam or Stretch).

For example, if you have an Adam setup with a Lisa named 'Living' and a Tom named 'Bathroom', these will show up as individual entities. The heating/cooling device connected to your Smile will be shown as 'OpenTherm' or 'OnOff', depending on how the Smile communicates with the device. If you have Plugs (as in, pluggable switches connecting to an Adam) those will be discovered as switches. Various other measurements of your setup will be available as sensors or as binary sensors.

Centralized measurements such as 'power' for a P1, 'outdoor_temperature' on Anna or Adam will be assigned to your gateway entity. Heating/cooling device measurements such as 'boiler_temperature' will be assigned to the OpenTherm/OnOff entity.

## Configuration

The Plugwise Smile(s) present in your network will be automatically detected via Zeroconf discovery and will be shown on the Integrations-page. To set up an integration, click the "CONFIGURATION" button on the discovered integration and you will be presented with a dialog requesting your Smile password. After you click submit, you will have the opportunity to select the area(s) where individual Smile appliances are located. The username `smile` is shown as a default, when configuring your Stretch change this to `stretch` accordingly.

Repeat the above procedure for each Smile gateway (i.e., if you have an Adam setup and a P1 DSMR you'll have to add two integrations).

Please note: when you have an Anna and an Adam, make sure to only configure the Adam integration. You can press the "IGNORE" button on the Anna integration to remove this integration. In case you need to rediscover the Anna integration, make sure to click the "STOP IGNORING" button on the Plugwise integration first, available via "show ignored integrations".

For a thermostat, the active schedule can be deactivated or reactivated via the climate card. Please note, that when no schedule is active, one must first be activated in the Plugwise App. Once that has been done the Plugwise Integration can manage future operations.

Auto means the schedule is active, Heat means it's not active. The active thermostat schedule can be changed via the connected thermostat select-entity. Please note: that only schedules that have two or more schedule points will be shown as select options.

### Services

#### Update Smile data

Forced update of data from your Smile can be triggered by calling the generic `homeassistant.update_entity` service with your Smile entity as the target.

```yaml
# Example script change the temperature
script:
  force_adam_update:
    sequence:
      - service: homeassistant.update_entity
        target:
          entity_id: climate.anna
```

#### Set HVAC mode (limited to schedule active / not active)

Service: `climate.set_hvac_mode`

Available options include `auto`, `heat`, and `cool` (only when there is a cooling option available). The meaning of `auto` is that a schedule is active and the thermostat will change presets accordingly. The meaning of `heat/cool` is that there is no schedule active, i.e., the active preset or manually set temperature is used to control the climate in your house or rooms.
The last schedule that was active is determined the same way long-tapping the top of Anna works.

Example:

```yaml
# Example script set hvac_mode to auto = schedule active
script:
  lisa_reactivate_last_schedule:
    sequence:
      - service: climate.set_hvac_mode
        target:
          entity_id: climate.lisa_bios
        data:
          hvac_mode: auto
```

#### Change climate schedule

Service: `select.select_option`

```yaml
# Example script change the thermostat schedule
script:
  lisa_change_schedule:
    sequence:
      - service: select.select_option
        target:
          entity_id: select.lisa_bios_thermostat_schedule
        data:
          option: "Regulier"
```

#### Change boiler setpoint

Service: `number.set_value`

```yaml
# Example script change the boiler setpoint
script:
  change_max_boiler_tempeture_setpoint:
    sequence:
      - service: number.set_value
        target:
          entity_id: number.opentherm_max_boiler_temperature_setpoint
        data:
          value: 60
```

#### Set temperature

Service: `climate.set_temperature`

Example:

```yaml
# Example script change the temperature
script:
  anna_set_predefined_temperature:
    sequence:
      - service: climate.set_temperature
        target:
          entity_id: climate.anna
        data:
          temperature: 19.5
```

#### Set preset mode

Service: `climate.set_preset_mode`

Available options include: `home`, `vacation` (Anna only), `no_frost`, `asleep` & `away`.

Example:

```yaml
# Example script changing the active (or currently set by schedule) preset
script:
  anna_activate_preset_asleep:
    sequence:
      - service: climate.set_preset_mode
        data:
          preset_mode: asleep
```

### Supported devices

The current implementation of the Python module (Plugwise-Smile) includes:

Adam (zone_control) with On/Off, OpenTherm, and Loria/Thermastage heating and cooling support:

 - v3.x
 - v2.3

 - Devices supported are Anna, Lisa, Jip, Floor, Tom, Plug, Aqara Smart Plug, and Koen (a Koen always comes with a Plug, the active part)

Anna (thermostat) with OpenTherm heating, and Elga and Loria/Thermastage with heating and cooling support:

 - v4.x
 - v3.x
 - v1.x

Smile P1 (DSMR):

 - v4.x
 - v3.x
 - v2.x

Stretch (power switches):

 - v3.x
 - v2.x

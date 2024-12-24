---
title: Plugwise
description: Plugwise Smile platform integration.
ha_category:
  - Binary sensor
  - Button
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
  - '@frenck'
ha_config_flow: true
ha_domain: plugwise
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - button
  - climate
  - diagnostics
  - number
  - select
  - sensor
  - switch
ha_integration_type: hub
---

This enables [Plugwise](https://www.plugwise.com) integrations with a central Smile gateway to be integrated. This integration talks locally to your **Smile** interface, and you will need its password and IP address.
The platform supports [Anna](https://www.plugwise.com/en_US/products/anna), [Adam (zonecontrol)](https://www.plugwise.com/en_US/zonecontrol), [P1](https://www.plugwise.com/en_US/products/smile-p1) Smile products and the Stretch products (not in sale). See below list for more details.

Platforms available - depending on your Smile and setup include:

 - `climate` (for the stand-alone Anna, for Adam, a climate entity is shown for each zone containing devices like an Anna or another type of wired-thermostat, Jip or Lisa combined with one or more Tom/Floor devices)
 - `binary_sensor` (for showing the status of e.g. domestic hot water heating or secondary heater)
 - `button` (for the Adam and the non-legacy Anna and P1 gateways)
 - `number` (for changing a boiler setpoint, a temperature offset)
 - `sensor` (for all relevant products including the Smile P1)
 - `select` (for changing a thermostat schedule, a regulation mode (Adam only))
 - `switch` (for Plugs connected to Adam, or Circles and Stealths connected to a Stretch)


## Pre-requisites

The Plugwise Smile(s) in your network will be automatically discovered and shown on the integrations dashboard. All you need is the Smile ID as its password, which is an 8-character string printed on the sticker on the bottom of your Smile. Repeat this for each individual Smile.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your Smile. For example: `192.168.1.25`. You can find it in your router or in the Plugwise app using the **Settings** icon (&#9776;) -> **System** -> **Network**. If you are looking for a different device in the Plugwise App, on the main screen first select **Gateways** -> the Smile of your choice, and then follow the previous instruction. Normally, the Smile(s) are automatically discovered, and you don't have to provide the hostname or IP address."
Username:
  description: "Username to log in to the Smile. This should be just `smile` - or `stretch` for a Stretch."
Password:
  description: "This is the password (i.e. Smile ID) printed on the sticker on the back of your Smile (i.e. Adam, Smile-T, or P1) and should be 8 characters long."
{% endconfiguration_basic %}

### Further configuration

For a thermostat, the active schedule can be deactivated or reactivated via the climate card. Please note, that when no schedule is active, one must first be activated in the Plugwise App. Once that has been done, the Plugwise Integration can manage future operations.

Auto means the schedule is active, and Heat means it's not active. The active thermostat schedule can be changed via the connected thermostat select entity. Please note that only schedules with two or more schedule points will be shown as select options.

## Entities

This integration will show all Plugwise devices (like hardware devices, multi-thermostat climate-zones, and virtual switchgroups) present in your Plugwise configuration. In addition, you will see a Gateway device representing your central Plugwise gateway (i.e., the Smile Anna, Smile P1, Adam or Stretch).

For example, if you have an Adam setup with a Lisa named 'Living' and a Tom named 'Bathroom', these will show up as individual devices. The heating/cooling device connected to your Smile will be shown as 'OpenTherm' or 'OnOff', depending on how the Smile communicates with the device. If you have Plugs (as in, pluggable switches connecting to an Adam) those will be shown as devices as well.

Under each device there will be entities shown like binary_sensors, sensors, etc. depending on the capabilities of the device: for instance centralized measurements such as 'power' for a P1, 'outdoor_temperature' on Anna or Adam will be assigned to your gateway device. Heating/cooling device measurements such as 'boiler_temperature' will be assigned to the OpenTherm/OnOff device.

## Data updates

The interval which the integration fetches data from the Smile depends on the device:

- Power entities, such as the P1, will be refreshed every 10 seconds.
- Climate entities will be refreshed every 60 seconds.
- Stretch entities will be refreshed every 60 seconds.

## Removing the integration

This integration follows standard integration removal. No extra steps are required within Home Assistant or on your Plugwise devices.

{% include integrations/remove_device_service.md %}

This will also remove all connected Adam devices (such as Anna, Tom or Lisa) or connected Adam/Stretch plugs.

### Actions

#### Update Smile data

Forced update of data from your Smile can be triggered by calling the generic `homeassistant.update_entity` action with your Smile entity as the target.

```yaml
# Example script change the temperature
script:
  force_adam_update:
    sequence:
      - action: homeassistant.update_entity
        target:
          entity_id: climate.living_room
```

#### Reboot the Plugwise gateway

action: `button.press`

```yaml
# Example script change the thermostat schedule
script:
  reboot_gateway:
    sequence:
      - action: button.press
        target:
          entity_id: button.adam_reboot
```

#### Set HVAC mode

action: `climate.set_hvac_mode`

Available options include `off` (Adam only) `auto`, `cool`, `heat`, and `heat_cool` (Anna with Elga only).

The meaning of `off` is that the Adam regulation is set to off. This means that the connected HVAC-system does not heat or cool, only the domestic hot water heating function, when available, is active.

The meaning of `cool` or `heat` is that there is no schedule active. For example, if the system is manually set to cooling- or heating-mode, the system will be active if the room temperature is above/below the thermostat setpoint.

The meaning of `heat/cool` is that there is no schedule active. For example, if the system is in automatic cooling- or heating-mode, the active preset or manually set temperature is used to control the HVAC system.

The meaning of `auto` is that a schedule is active and the thermostat will change presets/setpoints accordingly.

The last schedule that was active is determined the same way long-tapping the top of Anna works.

Example:

```yaml
# Example script climate.set_hvac_mode to auto = schedule active
script:
  lisa_reactivate_last_schedule:
    sequence:
      - action: climate.set_hvac_mode
        target:
          entity_id: climate.living_room
        data:
          hvac_mode: auto
```

#### Turn on / turn off

action: `climate.turn_off`, `climate.turn_on` (Adam only)

These actions will switch the Adam regulation mode (= HVAC system mode) to off or on, affecting the operation of all connected thermostats.
`climate.turn_on` will activate the previously selected heating or cooling mode.

Example:

```yaml
# Example script climate.turn_off
script:
  turn_heating_on:
    sequence:
      - action: climate.turn_off
        target:
          entity_id: climate.bios
```

#### Change climate schedule

action: `select.select_option`

```yaml
# Example script change the thermostat schedule
script:
  lisa_change_schedule:
    sequence:
      - action: select.select_option
        target:
          entity_id: select.bios_thermostat_schedule
        data:
          option: "Regulier"
```

#### Change boiler setpoint

action: `number.set_value`

```yaml
# Example script change the boiler setpoint
script:
  change_max_boiler_tempeture_setpoint:
    sequence:
      - action: number.set_value
        target:
          entity_id: number.opentherm_max_boiler_temperature_setpoint
        data:
          value: 60
```

#### Set temperature

action: `climate.set_temperature`

Example:

```yaml
# Example script change the temperature
script:
  anna_set_predefined_temperature:
    sequence:
      - action: climate.set_temperature
        target:
          entity_id: climate.anna
        data:
          temperature: 19.5
```

#### Set preset mode

action: `climate.set_preset_mode`

Available options include: `home`, `vacation` (Anna only), `no_frost`, `asleep` & `away`.

Example:

```yaml
# Example script changing the active (or currently set by schedule) preset
script:
  anna_activate_preset_asleep:
    sequence:
      - action: climate.set_preset_mode
        data:
          preset_mode: asleep
```

### Supported devices

The current implementation of the Python module (Plugwise-Smile) includes:

Adam (zone_control) with On/Off, OpenTherm, and Loria/Thermastage heating and cooling support:

 - v3.x
 - v2.3

 - Devices supported are Anna, Lisa, Jip, Floor, Tom, Plug, Aqara Smart Plug, and Koen (a Koen always comes with a Plug, the active part)

Anna (thermostat) with OnOff, OpenTherm heating, and Elga and Loria/Thermastage with heating and cooling support:

 - v4.x
 - v3.x
 - v1.x

On the Elga, the cooling-mode can only be turned on, or off, via a switch present on the device, not via a toggle in the Plugwise App.
Please make sure to reload the Plugwise integration after the cooling-mode-switch is turned off after being on, or the other way around. This will ensure that the Plugwise integration is being adapted to the change in function of the Elga.

Smile P1 (DSMR):

 - v4.x
 - v3.x
 - v2.x

Stretch (power switches):

 - v3.x
 - v2.x

## Troubleshooting

### Accessing the local device

If you need to configure the gateway directly, without using the Plugwise App, you can find the link to your device by:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration.
2. If you have more than one Plugwise gateway, select the one to configure.
3. Select the gateway device, this should be called 'Adam', 'Stretch' or contain 'Smile' in its name.
4. On the integration entry, choose to open the configuration URL left of the {% icon "mdi:dots-vertical" %} icon.
5. A new window/tab will open, enter 'smile' (or 'stretch') as the username and the ID, from the sticker on the back, as the password.
6. Consult the manual or click the 'search' button on the [Plugwise Support](https://plugwise.com/support/) page for interactive help.

### Adjusting the update interval

Please note that the [default intervals](#data-updates) are considered best practice and according to how Plugwise normally updates their data. Updating too frequently may induce considerable load on your gateway(s) resulting in unexpected results or missing data.

{% include common-tasks/define_custom_polling.md %}

### Diagnostic data

If you need to create an issue to report a bug or want to inspect diagnostic data, use the below method to retrieve diagnostics:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration.
2. If you have more than one Plugwise gateway, select the gateway that is experiencing issues.
3. Select the gateway device, this should be called 'Adam', 'Stretch' or contain 'Smile' in its name.
4. On the integration entry, select the {% icon "mdi:dots-vertical" %}.
   - Then, select **Download diagnostics** and a JSON file will be downloaded.
5. You can inspect the downloaded file or, when requested, upload it to your issue report.

### Rebooting your gateway

For each gateway, there will be a reboot button available in your integration.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration.
2. If you have more than one Plugwise Smile, select the gateway that is experiencing issues.
3. Select the gateway device, this should be called 'Adam', 'Stretch' or contain 'Smile' in its name.
4. On the integration entry, look for the 'Reboot' button to press in the **Configuration** section.

## Known limitations

### Schedule configuration and pre-requisites

Creation, modification or deleting of climate schedules is not supported through this integration. We recommend using the Plugwise App or visit the local device to configure schedules. See [accessing the local device](#accessing-the-local-device) above on how to access the local device from Home Assistant.

To display your schedule as a valid `select` option for this integration, ensure that the schedule has a minimal of two schedule points.

### Anna connected to Adam

If you are using your Anna as part of your Adam zone control system, it becomes a zone thermostat, and cannot be configured as a smart thermostat. The integration will not discover your Anna or allow manual configuration.

### Anna with Elga

The cooling mode can only be toggled via a **physical switch** on the device (not through a toggle in the Plugwise App or using Home Assistant).

The change in cooling mode should be detected by Home Assistant. If not, please try to **reload** the Plugwise integration as indicated below and report your findings.

1. Create an issue including your [diagnostic data](#diagnostic-data).
2. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration.
3. On the "**Hubs**" page, use the {% icon "mdi:dots-vertical" %} icon next to your Anna and choose "**Reload**".

### Vacation preset

The `vacation` preset is only available on an Anna. Adam has a vacation-mode (called Action in the Plugwise App) that disables the active schedule and sets the vacation-preset for all zones.

Also, there's a pause-mode that disables the active schedule and sets the away-preset for all zones.

### Idling climate actions

You can only stop climate actions on an Adam, see [turn on / turn off](#turn-on--turn-off). An alternative could be to adjust your [preset mode](#set-preset-mode) to `no_frost` to stop any heating actions.

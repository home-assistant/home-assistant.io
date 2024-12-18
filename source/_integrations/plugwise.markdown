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

[Plugwise](https://www.plugwise.com) provides smart home climate and power monitoring devices. This integation allows you to monitor and control your climate and energy (including gas) consumption and energy production. The energy information can be used for the [energy dashboard](/home-energy-management).

## Supported devices

This integration supports Plugwise devices connected to a network connected hub called a **Smile**. You can connect to the Smile using your browser, their Plugwise App or this Home Assistant integration. There are 5 types of Smiles:

- Full zonecontrol using the [Adam](https://www.plugwise.com/en_US/zonecontrol) using [additional devices](#devices-overview) such as smart valves and smart-plugs.
- A stand-alone smart thermostat called [Anna](https://www.plugwise.com/en_US/products/anna).
- For power monitoring there is a device simply called the [P1](https://www.plugwise.com/en_US/products/smile-p1).
- Although no longer sold, there also is support for Stretch, a gateway to create network connectivity for their older power products.
- __Not supported yet__: The newest in the family, [Anna P1](https://www.plugwise.com/product/anna-p1/) cleverly uses energy (solar) information to transfer abundant energy in heatpump usage.

Plugwise formerly sold power-based products using a USB stick as the controller. This integration does not support the `Stick` directly, see [legacy power devices](#legacy-power-devices) for more information.

## Platforms

Depending on your specific Smile and connected devices, the following platforms will be available:

- [Climate](#climate) for Adam and (a stand-alone) Anna.
- [Binary Sensor](#binary-sensor) for status of your domestic hot water or secondary heater.
- [Button](#button) to reboot your Smile.
- [Number](#number) to change a boiler setpoint or temperature offset.
- [Sensor](#sensor) a variety of sensors is available for all Smiles.
- [Select](#select) to change your thermostat schedule or regulation mode.
- [Switch](#switch) allowing plugs to be commanded.

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

## Data updates

The interval which the integration fetches data from the Smile depends on the device-type.

|Device-type|Interval|
--- | ---
| Climate entities |60 seconds|
| Energy and gas entities |10 seconds|
| Stretch entities |60 seconds|

## Entities

This integration will show all Plugwise devices (like hardware devices, multi-thermostat climate-zones, and virtual switchgroups) present in your Plugwise configuration. In addition, you will see a Gateway device representing your central Plugwise gateway (i.e., the Adam, Smile Anna, Smile P1 or Stretch).

For example, if you have an Adam setup with a Lisa named `Living` and a Tom named `Bathroom`, these will show up as individual devices. The heating/cooling device connected to your Smile will be shown as `OpenTherm` or `OnOff`, depending on how the Smile communicates with the device. If you have Plugs (as in, pluggable switches connecting to an Adam) or Aqara Smart Plugs those will be shown as devices as well.

Under each device there will be entities shown like `binary_sensors`, `sensors`, etc. depending on the capabilities of the device: for instance centralized measurements such as `power` for a P1, `outdoor_temperature` on Anna or Adam will be assigned to your gateway device. Heating/cooling device measurements such as `boiler_temperature` will be assigned to the OpenTherm/OnOff device.

## Platform information

### Climate

The [climate entity](/integrations/climate) is shown for each zone containing a thermostat. This can be any supported themostat such as the Anna or another type of wired-thermostat, Jip or Lisa combined with one or more Tom/Floor devices.

#### Setting the HVAC mode

action: `climate.set_hvac_mode`

Available options include `off` (Adam only) `auto`, `cool`, `heat`, and `heat_cool` (Anna with Elga only).

|HVAC mode|Indication|Description|
--- | --- | ---
|`off`| Adam regulation is set to off | The connected HVAC-system does not heat or cool, only the domestic hot water heating function, if available, is active. |
|`cool` or `heat`| No active schedule | If the system is **manually** set to cooling- or heating-mode, the system will be active if the room temperature is above/below the thermostat setpoint. |
|`heat/cool`| No active schedule | If the system is in **automatic** cooling- or heating-mode, the active preset or manually set temperature is used to control the HVAC system. |
|`auto` | Active schedule |  The thermostat will change presets/setpoints accordingly. |

The last schedule that was active is determined the same way long-tapping the top of Anna works.

Example:

```yaml
# Example script climate.set_hvac_mode in the living room to auto = schedule active
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
# Example script climate.turn_off in the cinema
script:
  turn_heating_on:
    sequence:
      - action: climate.turn_off
        target:
          entity_id: climate.cinema
```

#### Update Smile data

Forced update of data from your Smile can be triggered by calling the generic `homeassistant.update_entity` action with your Smile entity as the target.

```yaml
# Example script change the living room temperature
script:
  force_adam_update:
    sequence:
      - action: homeassistant.update_entity
        target:
          entity_id: climate.living_room
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

### Binary Sensor

Depending on your setup, a [binary sensor](/integrations/binary_sensor) will provide the status of your domestic hot water heating or secondary heater.

### Button

For each Smile a [button](/integrations/button) is added to enable a restart (reboot) of the Smile.

### Number

Modifying specific [number](/integrations/button)-based settings allows you to fine-tune your setup.

Examples include the boiler setpoint as shown below and adjusting your temperature offset.

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

### Sensor

A number of [sensors](/integrations/sensor) will be available, included but not limited to the examples shown below. By default, not all sensors will be shown, for example; we disable the Anna's `outdoor_temperature` sensor in favor of the one provided by an auxiliary device if it has one.

Example sensors (not extensive):

|Sensor|Description|
--- | ---
|Outdoor temperature | For Anna, this will show the temperature it retrieves from the internet, unless you have an auxiliary device with a temperature sensor |
|Indoor temperature | For Anna, Lisa or Jip this will show the temperature measured at the specific thermostat |
|P1 Net Electricity Point | Your netto electricity use at this time, can be negative when producing energy, i.e. though solar panels |
|P1 Electricity Produced off-peak cumulative | The total produced electricity during off-peak |
|Gas Consumed Interval | The gas consumed since the last interval |

### Select

[Select](/integrations/select) allows for changing a thermostat schedule. If you have an Adam you can also select the regulation mode.

Schedules can be created using the Plugwise App or the web-interface.

#### Change climate schedule

action: `select.select_option`

```yaml
# Example script change the thermostat schedule in the cinema
script:
  lisa_change_schedule:
    sequence:
      - action: select.select_option
        target:
          entity_id: select.cinema_thermostat_schedule
        data:
          option: "Cosy"
```

### Switch

Allows commanding [switches](/integrations/switch), e.g. `on`/`off` for Plugs or Aqara Smart Plugs connected to Adam, or Circles and Stealths connected to a Stretch.

### Troubleshooting

#### Accessing the local device

If you need to configure the Smile directly, without using the Plugwise App, you can find the link to your device by:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration.
2. If you have more than one Plugwise Smile, select the one to configure.
3. Select the device with 'Smile' in its name.
4. On the integration entry, choose to open the configuration URL left of the {% icon "mdi:dots-vertical" %} icon.
5. A new window/tab will open, enter `smile` (or `stretch`) as the username and your Smile ID as the password.
6. Consult the manual or click the `search` button on the [Plugwise Support](https://plugwise.com/support/) page for interactive help.

#### Modify the Smile update interval

{% include common-tasks/define_custom_polling.md %}

#### Diagnostic data

If you need to create an issue to report a bug or want to inspect diagnostic data, use the below method to retrieve diagnostics:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration.
2. If you have more than one Plugwise Smile, select the gateway that is experiencing issues.
3. Select the device with 'Smile' in it's name.
4. On the integration entry, select the {% icon "mdi:dots-vertical" %}.
   - Then, select **Download diagnostics** and a JSON file will be downloaded.
5. You can inspect the downloaded file or, when requested, upload it to your issue report.

#### Adding a Smile reboot button

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

## Devices overview

The Plugwise integration relies on the [plugwise](https://pypi.org/project/plugwise/) module for Python. It currently provides support for:

### Adam

A complete zone control system also known as Adam HA, supporting:

- On/Off, OpenTherm or Loria/Thermastage heating and cooling support.
- Running firmwares v3.x or v2.3
- Additional devices:
  - Zone thermostats such as Lisa or Anna (see warning below on Anna),
  - A temperature sensor, Jip,
  - Valve controllers called Floor or Tom,
  - An under-floor heating controller Koen (always comes with a Plug as the active part),
  - Smart switches, either Plug or Aqara Smart Plug.

### Anna

A smart thermostat, supporting:

- OnOff, OpenTherm heating and Elga or Loria/Thermastage with heating and cooling support. (see [known limitations](#known-limitations) below for the Elga).
- Running firmware v4.x, v3.x or v1.x.

### Anna P1

A smart thermostat, providing abundant solar energy billing. Currently not supported. If you have one, let us know by opening a [feature request](https://github.com/plugwise/python-plugwise/issues/new/choose).

### P1 (DSMR)

A smart meter monitor for single or multi-phase P1 monitoring with the P1 running firmware v4.x, v3.x or v2.x.

### Stretch (end-of-sale)

For legacy power switches, such as the Circles or Stealths, with v3.x or v2.x Stretch firmware.

## Known limitations

### Schedule configuration and pre-requisites

Creation, modification or deleting of climate schedules is not supported through this integration. We recommend using the Plugwise App or visit the local device to configure schedules. See [accessing the local device](#accessing-the-local-device) above on how to access the local device from Home Assistant.

To display your schedule as a valid `select` option for this integration ensure that the schedule has a minimal of two schedule points.

### Anna as a zone thermostat

If you are using your Anna as part of your adam zone control system, it can not be configured as a smart thermostat. The integration will not discover your Anna or allow manual configuration.

### Anna with Elga

The cooling mode can only be toggled via a physical switch on the device (not through the Plugwise App).
After changing the cooling mode switch position, you must reload the Plugwise integration for the changes to take effect.

### Legacy power devices

Plugwise formerly sold Power based products comprised of a USB stick and smart plugs (amongst a few other items). This integration does **not** support the USB-stick. Reuse of the these products, such as Circles and Stealths using a Stretch or an Adam is supported. Work for USB support is in development by the community but not ready to become a formal Home Assistant integration just yet.

## Removing the integration

This integration follows standard integration removal. No extra steps are required within Home Assistant or on your Plugwise devices.

{% include integrations/remove_device_service.md %}

This will also remove all connected Adam devices (such as Anna, Tom or Lisa) or connected Adam/Stretch plugs.


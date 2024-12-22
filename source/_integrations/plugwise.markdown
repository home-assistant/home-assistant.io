---
title: Plugwise
description: Plugwise Gateway platform integration.
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

[Plugwise](https://www.plugwise.com) provides smart home climate and power monitoring devices. This integration allows you to monitor and control your climate, energy consumption (including gas) consumption, and energy production. The energy information can be used for the [energy dashboard](/home-energy-management).

## Supported devices

This integration supports one or more of the Plugwise Gateways available on your network. You can connect to these gateways using your browser, the Plugwise App, or this Home Assistant integration. There are 5 types of gateways:

- Full zonecontrol using the [Adam](https://www.plugwise.com/en_US/zonecontrol) using [additional devices](#devices-overview) such as smart valves and smart-plugs.
- A stand-alone smart thermostat called [Anna](https://www.plugwise.com/en_US/products/anna).
- For power monitoring there is a device simply called the [P1](https://www.plugwise.com/en_US/products/smile-p1).
- Although no longer sold, there also is support for Stretch, a gateway to create network connectivity for their older power products.
- **Not supported yet!** The newest in the family, [Anna P1](https://www.plugwise.com/product/anna-p1/) cleverly uses energy (solar) information to transfer abundant energy in heatpump usage. [Contact us](#anna-p1) if you have one!

Plugwise formerly sold power-based products using a USB stick as the controller. This integration does not support the `Stick` directly, see [legacy power devices](#legacy-power-devices) for more information.

## Platforms

Depending on your specific gateway and connected devices, the following platforms will be available:

- [Climate](#climate) for Adam and (a stand-alone) Anna.
- [Binary Sensor](#binary-sensor) for status of your domestic hot water or secondary heater.
- [Button](#button) to reboot your Plugwise Gateway.
- [Number](#number) to change a boiler setpoint or temperature offset.
- [Sensor](#sensor) a variety of sensors is available for all gateways and connected devices.
- [Select](#select) to change your thermostat schedule or regulation mode.
- [Switch](#switch) allowing plugs to be commanded.

## Pre-requisites

Plugwise gateways on your network are automatically discovered and displayed on the integrations dashboard. Each gateway requires its unique 8-character ID, found on a sticker at the bottom, as its password. Repeat this process for each gateway.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your Gateway. For example: `192.168.1.25`. You can find it in your router or in the Plugwise app using the **Settings** icon (&#9776;) -> **System** -> **Network**. In the Plugwise App, to locate a specific device, select **Gateways** on the main screen, choose your desired gateway, and then follow the previous instructions. Normally, the Gateway(s) are automatically discovered, and you don't have to provide the hostname or IP address."
Username:
  description: "Username to log in to the Gateway. This should be `smile` for most devices, or `stretch` for a Stretch."
Password:
  description: "Each gateway requires its unique 8-character ID, found on a sticker at the bottom, as its password."
{% endconfiguration_basic %}

### Schedule Management

1. **Initial Setup**: First, activate a schedule using the Plugwise App or browser.
2. **Control via Home Assistant**:
   - Use the [climate](#climate) card to activate/deactivate schedules.
   - `Auto` mode indicates the schedule is active.
   - `Heat` mode signifies the schedule is ininactive.
3. **Changing Schedules**: Use the thermostat [select](#select) entity.

{% note %}
Only schedules with two or more schedule points will appear as options.
{% endnote %}

## Data updates

The interval at which the integration fetches data from the gateway depends on the device-type.

|Device-type|Interval|
--- | ---
| Climate entities |60 seconds|
| Energy and gas entities |10 seconds|
| Stretch entities |60 seconds|

## Entities

This integration displays all Plugwise devices in your configuration, including hardware devices, multi-thermostat climate zones, and virtual switch groups. Additionally, a device representing your Plugwise gateway (e.g., Adam, Smile-T, or P1) will be visible.

For example, if you have an Adam setup with a Lisa named `Living` and a Tom named `Bathroom`, these will show up as individual devices. The heating/cooling device connected to your gateway will be shown as `OpenTherm` or `OnOff`, depending on how the gateway communicates with the device. If you have Plugs (as in, pluggable switches connecting to an Adam) or Aqara Smart Plugs those will be shown as devices as well.

Each device will list entities such as `binary sensors`, `sensors`, etc., depending on its capabilities: for instance centralized measurements such as `power` for a P1, `outdoor_temperature` on Anna or Adam will be assigned to your gateway device. Heating/cooling device measurements such as `boiler_temperature` will be assigned to the OpenTherm/OnOff device.

## Platform information

### Climate

The [climate entity](/integrations/climate) is displayed for each zone that includes a thermostat. This can be any supported single thermostat such as the Anna or another type of wired-thermostat, Jip or Lisa combined with one or more Tom/Floor devices. Or a combination of for instance a Lisa, two Jips and several Toms in one large zone.

#### Setting the HVAC mode

action: `climate.set_hvac_mode`

Available options include `off` (Adam only) `auto`, `cool`, `heat`, and `heat_cool` (Anna with Elga only).

|HVAC mode|Indication|Description|
--- | --- | ---
|`auto` | Active schedule | The thermostat will change presets/setpoints accordingly. |
|`cool` or `heat`| No active schedule | If the system is **manually** set to cooling- or heating-mode, the system will be active if the room temperature is above/below the thermostat setpoint. |
|`heat_cool`| No active schedule | If the system is in **automatic** cooling- or heating-mode, the active preset or manually set temperature is used to control the HVAC system. |
|`off`| Adam regulation is set to off | The connected HVAC-system does not heat or cool, only the domestic hot water heating function, if available, is active. |

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

Automation example:

```yaml
# Example automation using climate.turn_off for your cinema room
alias: Stop climate in cinema after movie
description: "Automatically turn off climate when the movie ends."
triggers:
  - trigger: state
    entity_id:
      - media_player.cinema
    attribute: sound_mode
    from: Movie
condition:
  - condition: state
    entity_id: climate.cinema
    state: 'on'
actions:
  - action: homeassistant.turn_off
    target:
      entity_id: climate.cinema
  - delay:
      seconds: 30
mode: single
```

#### Update gateway data

Forced update of data from your gateway can be triggered by calling the generic `homeassistant.update_entity` action.

```yaml
# Example script to retreive the latest living room temperature measurement
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
# Example script to change the temperature
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

Automation example:

```yaml
# Example automation changing the active (or currently set by schedule) preset
alias: Set climate to away when nobody is home
description: "Set climate to away when everyone is gone for considerable time"
triggers:
  - trigger: state
    entity_id:
      - person.mom
      - sensor.dad
    to: not_home
    for:
      hours: 0
      minutes: 15
      seconds: 0
actions:
  - action: climate.set_preset_mode
    data:
      preset_mode: away
    target:
      entity_id: climate.anna
```

### Binary Sensor

Depending on your setup, a [binary sensor](/integrations/binary_sensor) will provide the status of your domestic hot water heating or secondary heater.

### Button

For each gateway a [button](/integrations/button) is added to trigger a restart (reboot) of physical device.

### Number

Modifying specific [number](/integrations/button)-based settings allows you to fine-tune your setup.

Examples include the boiler setpoint as shown below and adjusting your temperature offset.

#### Change boiler setpoint

action: `number.set_value`

```yaml
# Example script to change the boiler setpoint
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

A number of [sensors](/integrations/sensor) will be available, included but not limited to the examples shown below.

Example sensors (not extensive):

|Sensor|Description|
--- | ---
|Gas Consumed Interval | The gas consumed since the last interval |
|Indoor temperature | For Anna, Lisa or Jip this will show the temperature measured at the specific thermostat |
|Outdoor temperature | The temperature your climate gateway retrieves online |
|Outdoor air temperature |  If you have an auxiliary device with a temperature sensor |
|P1 Net Electricity Point | Your netto electricity use at this time, can be negative when producing energy, i.e. though solar panels |
|P1 Electricity Produced off-peak cumulative | The total produced electricity during off-peak |

### Select

[Select](/integrations/select) allows for changing a thermostat schedule. If you have an Adam you can also select the regulation mode.

Schedules can be created using the Plugwise App or the web-interface.

#### Change climate schedule

action: `select.select_option`

Assuming you have something to indicate your current day of night shift based on a calendar you can automatically change the active schedule. The automation example below assumes an [`input_select`](/integrations/input_select/) helper is present, e.g., containing something like `Day shift`, `Night shift` and `Weekend shift`). Assuming you have created the appropriate schedules using your Plugwise App, your automation for night shifts could look like:

```yaml
# Example automation change the thermostate schedule based on your shift
alias: Change schedule according to active shift
description: "Select the appropriate schedule for todays shift"
triggers:
  - trigger: state
    entity_id:
      - input_select.shift
    to: Night shift
actions:
  - action: select.select_option
    data:
      option: Nightshift
    target:
      entity_id: select.anna_thermostat_schedule
mode: single
```

### Switch

Allows commanding [switches](/integrations/switch), e.g. `on`/`off` for Plugs or Aqara Smart Plugs connected to Adam, or Circles and Stealths connected to a Stretch.

### Troubleshooting

#### Accessing the local device

If you need to configure the gateway directly, without using the Plugwise App, you can find the link to your device by:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration.
2. If you have more than one Plugwise Gateway, select the one to configure.
3. Select the gateway device, this should be called `Adam` or contain `Smile` in its name.
4. On the integration entry, choose to open the configuration URL left of the {% icon "mdi:dots-vertical" %} icon.
5. A new window/tab will open, enter `smile` (or `stretch`) as the username and the ID, from the sticker on the back, as the password.
6. Consult the manual or click the `search` button on the [Plugwise Support](https://plugwise.com/support/) page for interactive help.

#### Adjusting the update interval

Please note that the [default intervals](#data-updates) are considered best practice and according to how Plugwise normally updates their data. Updating too frequently may induce considerable load on your gateway(s) resulting in unexpected results or missing data.

{% include common-tasks/define_custom_polling.md %}

#### Diagnostic data

If you need to create an issue to report a bug or want to inspect diagnostic data, use the below method to retrieve diagnostics:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration.
2. If you have more than one Plugwise Gateway, select the gateway that is experiencing issues.
3. Select the gateway device, this should be called `Adam` or contain `Smile` in its name.
4. On the integration entry, select the {% icon "mdi:dots-vertical" %}.
   - Then, select **Download diagnostics** and a JSON file will be downloaded.
5. You can inspect the downloaded file or, when requested, upload it to your issue report.

#### Rebooting your gateway

For each gateway there will be a reboot [button](#button) available in your integration.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration.
2. If you have more than one Plugwise Smile, select the gateway that is experiencing issues.
3. Select the gateway device, this should be called `Adam` or contain `Smile` in its name.
4. On the integration entry, look for the `Reboot` button to press in the **Configuration** section.

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
  - An under-floor heating controller Koen (note: a Koen always comes with a Plug, which is the active part),
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

If you are using your Anna as part of your adam zone control system, it cannot be configured as a smart thermostat. The integration will not discover your Anna or allow manual configuration.

### Anna with Elga

The cooling mode can only be toggled via a **physical switch** on the device (not through a toggle in the Plugwise App or using Home Assistant).

The change in cooling mode should be detected by Home Assistant. If not, please try to **reload** the Plugwsie integration as indicated below and report your findings.

1. Create an issue including your [diagnostic data](#diagnostic-data).
2. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration.
3. On the "**Hubs**" page, use the {% icon "mdi:dots-vertical" %} icon next to your Anna and choose "**Reload**"".

### Vacation preset

The `vacation` preset is only available on an Anna.

### Idling climate actions

You can only stop climate actions on an Adam, see [Turn on / Turn off](#turn-on--turn-off). An alternative could be to adjust your [preset mode](#set-preset-mode) to `no_frost` to stop any heating actions.

### Legacy power devices

Plugwise formerly sold power-based products comprised of a USB stick and smart plugs (amongst a few other items). This integration does **not** support the USB-stick. Reuse of the these products, such as Circles and Stealths using a Stretch or an Adam is supported. Work for USB support is in development by the community, but not ready to become a formal Home Assistant integration just yet.

## Removing the integration

This integration adheres to the standard removal process. No extra steps are required within Home Assistant, the Plugwise App or any other Plugwise devices.

{% include integrations/remove_device_service.md %}

This will also remove, from Home Assistant, any connected Adam devices (such as Anna, Tom, or Lisa) and connected Adam/Stretch plugs.


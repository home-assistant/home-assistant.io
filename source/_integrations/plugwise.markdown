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
ha_quality_scale: platinum
---

[Plugwise](https://www.plugwise.com) provides smart home devices that allow you to monitor and control your climate, energy (including gas) consumption, and energy production. The energy information can be used for the [energy dashboard](/home-energy-management).

This integration supports one or multiple Plugwise Gateways connected to your network. You can connect to these gateways using your browser, the Plugwise App, or Home Assistant. There are 4 [supported](#supported-devices) types of gateways:

- Full zonecontrol using the [Adam](https://www.plugwise.com/en_US/zonecontrol) using [additional devices](#adam) such as zone thermostats, smart valves and smart-plugs.
- A stand-alone smart thermostat called [Anna](https://www.plugwise.com/en_US/products/anna).
- For power and gas-usage monitoring there is a device simply called the [P1](https://www.plugwise.com/en_US/products/smile-p1).
- Although no longer sold, there also is support for Stretch, a gateway to create network connectivity for their older power products.

## Pre-requisites

Plugwise gateways on your network are automatically discovered and displayed on the integrations dashboard. Each gateway requires its unique 8-character ID, found on a sticker at the bottom, as its password. Repeat this process for each gateway.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your gateway. For example: `192.168.1.25`. You can find it in your router or in the Plugwise app using the **Settings** icon (&#9776;) -> **System** -> **Network**. In the Plugwise App, to locate a specific device, select **Gateways** on the main screen, choose your desired gateway, and then follow the previous instructions. Normally, the gateway(s) are automatically discovered, and you don't have to provide the hostname or IP address."
Username:
  description: "Username to log in to the gateway. This should be 'smile' for most devices, or 'stretch' for a Stretch."
Password:
  description: "Each gateway requires its unique 8-character ID, found on a sticker at the bottom, as its password."
{% endconfiguration_basic %}

### Schedule Management

1. **Initial Setup**: First, activate a schedule using the Plugwise App or browser.
2. **Control via Home Assistant**:
   - Use the climate card to activate/deactivate schedules.
   - 'Auto' mode indicates the schedule is active.
   - 'Heat', 'Cool' or 'Heat_cool' modes signify the schedule is inactive.
3. **Changing Schedules**: Use the thermostat [select](#change-climate-schedule) entity.

{% note %}
Only schedules with two or more schedule points will appear as options.
{% endnote %}

## Supported functionality

This integration displays all Plugwise devices in your configuration, including hardware devices, multi-thermostat climate zones, and virtual switch groups. Additionally, a device representing your Plugwise gateway (e.g., Adam, Smile-T, or P1) will be visible.

For example, if you have an Adam setup with a Lisa named 'Living' and a Tom named 'Bathroom', these will show up as individual devices. The heating/cooling device connected to your gateway will be shown as 'OpenTherm' or 'OnOff', depending on how the gateway communicates with the device. If you have Plugs (as in, pluggable switches connecting to an Adam) or Aqara Smart Plugs, those will be shown as devices as well.

Each device will list entities such as `binary sensors`, `sensors`, etc., depending on its capabilities: for instance, centralized measurements such as `power` for a P1, `outdoor_temperature` on Anna or Adam will be assigned to your gateway device. Heating/cooling device measurements such as `boiler_temperature` will be assigned to the OpenTherm/OnOff device.

### Climate entities

#### Binary sensors

Depending on your setup, one or more binary sensors will provide the state of your connected elements. Examples include:

- **Cooling** & **Heating** 
  - **Description**: Indicates if your system is actively cooling or heating.
- **DHW State**
  - **Description**: Indicates active heating of domestic hot water.
- **Flame State** 
  - **Description**: If gas is being consumed by your heater, i.e., firing for space or DHW-heating.

#### Numbers

Modifying specific number-based settings allows you to fine-tune your setup.

- **Maximum boiler temperature setpoint**
  - **Description**: Adjust the maximum temperature for secondary heater.
- **Domestic hot water setpoint**
  - **Description**: Adjust the temperature for your domestic hot water.
- **Temperature offset**
  - **Description**: Fine-tune the perceived temperature.

#### Sensors

A generous number of sensors is provided for your climate setup. Examples include:

- **Setpoint**
  - **Description**: The setpoint for the current zone (Adam) or generic (Anna).
- **Indoor temperature**
  - **Description**: For Anna, Lisa or Jip this will show the temperature measured at the specific thermostat.
- **Outdoor temperature**
  - **Description**: The temperature your climate gateway retrieves online.
- **Outdoor air temperature**
  - **Description**: The temperature reported by the sensor present in the outdoor unit of your HVAC system, such as a heat pump.

#### Selects

- **Thermostat schedule**
  - **Description**: Select between available schedules, generic (Anna) or for the current zone (Adam).
  - **Remark**: Please check the [further configuration](#further-configuration) for requirements on configuring schedules.

#### Switches

- **Cooling**
  - **Description**: Toggle if cooling should be enabled.
- **DHW Comfort Mode**
  - **Description**: Toggle comfort mode for domestic hot water.

### Power and gas entities

#### Sensors

A generous number of sensors is provided. Examples include:

- **Electricity consumed point**
  - **Description**: Electricity (in Watt) consumed currently by a phase (P1) or a plug.
  - **Gateways**: Adam, P1 or Stretch.
- **Gas Consumed Interval**
  - **Description**: The gas consumed since the last interval.
  - **Gateways**: P1.
- **P1 Net Electricity Point**
  - **Description**: Your netto electricity use at this time, can be negative when producing energy, i.e. though solar panels.
  - **Gateways**: P1.
- **P1 Electricity Produced off-peak cumulative**
  - **Description**: The total produced electricity during off-peak.
  - **Gateways**: P1.

#### Switches

- **Relay**
  - **Description**: Switch a plug on or off
  - **Gateways**: Adam, P1 or Stretch.

## Data updates

The interval at which the integration fetches data from the gateway depends on the device-type.

|Device-type|Interval|
--- | ---
| Climate entities |60 seconds|
| Energy and gas entities |10 seconds|
| Stretch entities |60 seconds|

## Removing the integration

This integration follows standard integration removal. No extra steps are required within Home Assistant or on your Plugwise devices.

{% include integrations/remove_device_service.md %}

This will also remove all connected Adam devices (such as Anna, Tom or Lisa) or connected Adam/Stretch plugs.

## Actions

### Climate control actions

For information on how to use the available actions, please refer to the [climate](/integrations/climate#climate-control-actions) integration.

Available actions to all climate gateways: `climate.set_temperature`, `climate.set_hvac_mode`, and `climate.set_preset_mode`.

Additional actions available for Adam: `climate.turn_on`, `climate.turn_off`, and `climate.toggle`.

{% note %}
The additional actions will change Adam's **regulation mode** (the HVAC system mode) to either on or off, affecting the operation of **all** connected thermostats. Turning on activates the previously selected heating or cooling mode.
{% endnote %}

### Schedule select action

Available action: `select.select_option`

{% tip %}
The available schedules depend on the [schedules](#schedule-management) you have configured.
{% endtip %}

### HVAC modes

The following HVAC modes are available:

- `auto`: Active schedule – The thermostat changes presets/setpoints according to the schedule.
- `cool or heat`: No active schedule – The system is manually set to cooling or heating mode, activating based on room temperature relative to the thermostat setpoint.

For Adam:

- `off`: Regulation is set to off – The HVAC system does not heat or cool, but the domestic hot water heating function (if available) remains active.

If you have an Anna with Elga:

- `heat_cool`: No active schedule – The system is in automatic cooling or heating mode, using the active preset or manually set temperature to control the HVAC system.

{% note %}
The last schedule that was active is determined the same way long-tapping the top of an Anna works.
{% endnote %}

## Gateway Modes

The Adam Gateway supports multiple operational modes that provide flexibility in managing your heating and cooling systems, allowing you to tailor your system's behavior to your needs.

- Normal Mode
  - **Description**: This is the default operational mode, operating based on the active schedules and presets configured. Ideal for day-to-day operations, ensuring optimal comfort and energy efficiency.
  - **Remarks**: Smart thermostats and zone controls continue their self-regulating behavior, including pre-heating or cooling based on their forecasted requirements.
- Pause Mode
  - **Description**: Pause mode temporarily halts the heating or cooling operations, disabling all schedules and temperature control.
  - **Remarks**: Useful for scenarios where no climate control is needed, such as extended periods when doors or windows are open for ventilation or maintenance work is ongoing. The system remains idle until switched back to Normal mode or another operational state.
- Vacation Mode
  - **Description**: Vacation mode optimizes the system for prolonged absence, reducing energy consumption while maintaining basic functionality. Heating or cooling is set to a minimal level to prevent freezing (in winter) or excessive heat (in summer).
  - **Remarks**: Ideal for extended trips or holidays when the house will be unoccupied. Active schedules are overridden until the mode is switched back to Normal.

{% tip %}
For best results, ensure your schedules and presets are appropriately configured for Normal mode and align Vacation mode settings with your energy-saving goals.
{% endtip %}

## Examples

### Energy-Based Automations

A great example of automating charging your car from the energy data the P1 provides can be found in the [Energy Management System for Car Charging](https://community.home-assistant.io/t/energy-management-system-for-car-charging-surplus-trip-calendar/744069) blueprint.

### Climate-Based Automations

When using smart zone controls or thermostats, relying heavily on additional automations may interfere with their ability to accurately predict warm-up or cool-down times. Instead, leverage their preset modes to optimize energy efficiency and reduce environmental impact, as well as your energy bills. Below are some examples to help you get started.

For advanced customization and full manual control, consider using a blueprint like [Advanced Heating Control](https://community.home-assistant.io/t/advanced-heating-control/469873/1). If you choose this route, we recommend disabling your Plugwise schedules to ensure the blueprint takes full control.

#### Presence-based preset mode

The example automation below adjusts the active preset to 'away' when no one is home, reducing unnecessary heating or cooling. For instance, if you unexpectedly head to the office on a work-from-home day, the system will conserve energy. The active schedule will later override the 'away' mode, or you can create a complementary automation to activate another preset when someone returns home.

```yaml
automation:
  alias: "Set climate to away when nobody is home"
  triggers:
    # When either occupant leaves for more than 15 minutes
    - trigger: state
      entity_id:
        - person.mom
        - person.dad
      to: not_home
      for:
        minutes: 15
  conditions:
    # If Anna is using the normal "home" preset
    - condition: state
      entity_id: climate.anna
      attribute: preset_mode
      state: home
    # And nobody is home
    - condition: state
      entity_id: person.mom
      entity_id: person.dad
      state: not_home
  actions:
    # Change Anna to Away
    - action: climate.set_preset_mode
      data:
        preset_mode: away
      target:
        entity_id: climate.anna
```

#### Calendar-based Vacation Mode

The example automations below will change the gateway mode of your Adam to Vacation mode (and back) assuming you have a [calendar](/integrations/calendar) integration with a specific calendar set up for events when nobody is at home.

```yaml
automation:
  - triggers:
    - trigger: calendar
      event: start
      # Calendar when your home is vacant
      entity_id: calendar.vacancy
  actions:
    # Change Adam operational mode
    - action: select.select_option
      data:
        option: "vacation"
      target:
        entity_id: select.adam_gateway_mode
  - triggers:
    - trigger: calendar
      event: end
      # Calendar when your home is vacant
      entity_id: calendar.vacancy
      # Offset by some time to allow to pre-condition
      offset: -04:00:00
  actions:
    # Change Adam operational mode
    - action: select.select_option
      data:
        option: "full"
      target:
        entity_id: select.adam_gateway_mode
```

### Supported devices

### Adam

A complete zone control system also known as [Adam HA](https://www.plugwise.com/en_US/zonecontrol), supporting:

- On/Off, OpenTherm heating and cooling support.
- Running firmwares v3.x or v2.3.
- Additional devices:
  - Zone thermostats such as Lisa or Anna (see warning below on Anna),
  - A temperature sensor, Jip,
  - Valve controllers called Floor or Tom,
  - An under-floor heating controller Koen (note: a Koen always comes with a Plug, which is the active part),
  - Smart switches, either Plug or Aqara Smart Plug.

{% note %}
You can also use the Adam SA (Stand-alone, no Zigbee stick present) to make your regular OpenTherm thermostat smart.
{% endnote %}

### Anna

A [smart thermostat](https://www.plugwise.com/en_US/products/anna), supporting:

- On/Off, OpenTherm heating and cooling support.
- Running firmware v4.x, v3.x or v1.x.

### P1 (DSMR)

A [P1](https://www.plugwise.com/en_US/products/smile-p1) smart meter monitor for the single- or multi-phase grid power connection to your home including gas usage monitoring. Running firmware v4.x, v3.x or v2.x.

### Stretch (end-of-sale)

For controlling and monitoring legacy power switches, such as the Circles or Stealths, with v3.x or v2.x Stretch firmware.

### Unsupported devices

#### Anna P1

A smart thermostat [combined](https://www.plugwise.com/en_US/products/anna-p1) with an energy monitor can transform the way you manage energy. If your solar setup generates surplus energy and you're charged for it, this combination ensures that excess solar power is redirected efficiently. Powering your heat pump for instance to make the most of renewable energy. Do you have a setup like this? We’d love to hear your experience!

#### Stick

Plugwise formerly sold power-based products comprised of a USB stick, as the controller, and smart plugs (amongst a few other items). This integration does not support the USB-stick. Reuse of the these products, such as Circles and Stealths using a Stretch or an Adam is supported. Work for USB support is in development by the community, but not ready to become a formal Home Assistant integration just yet.

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

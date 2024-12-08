---
title: Kostal Plenticore Solar Inverter
description: Instructions on how to integrate Kostal Plenticore solar inverter within Home Assistant.
ha_category:
  - Energy
ha_release: 2021.5
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@stegm'
ha_domain: kostal_plenticore
ha_platforms:
  - diagnostics
  - number
  - select
  - sensor
  - switch
ha_integration_type: integration
---

The Kostal Plenticore integration allows you to get data from [Kostal Plenticore](https://www.kostal-solar-electric.com/) solar inverters and integrate them into your Home Assistant installation. It allows you also to change some of settings values of the inverter.

The integration uses the REST-API interface which is also used by the integrated Web-UI and therefore uses the same password.

{% include integrations/config_flow.md %}

## Sensors

The integration disables most of the sensors per default. You can enable it in the *Entity* page. The sensors are split into two sets, one for the process data and one for the setting values.

{% note %}
The Plenticore inverter provides much more data endpoints, some of them are also dependent of the version of the firmware. If you are missing process data values, open an issue with the necessary information or make an pull request.
{% endnote %}

### Process Data Sensors

The following sensors are available in the library:

| Name                    | Unit | Description   |
|-------------------------|------|:-------------------------------------------|
| Inverter State          |      | State of the inverter. |
| Solar Power             | W    | Sum of all DC strings (including battery). |
| Grid Power              | W    | Power from (+)/to (-) the grid. |
| Home Power from Battery | W    | Power from the battery for home consumption. |
| Home Power from Grid    | W    | Power from the grid for home consumption. |
| Home Power from PV      | W    | Power from the PV for home consumption. |
| Home Power              | W    | Power used for home consumption. |
| AC Power                | W    | Output power of the inverter. |
| DC1 Power               | W    | Power of string 1. |
| DC2 Power               | W    | Power of string 2. |
| DC3 Power               | W    | Power of string 3. |
| DC1 Voltage             | V    | Voltage of string 1. |
| DC2 Voltage             | V    | Voltage of string 2. |
| DC3 Voltage             | V    | Voltage of string 3. |
| DC1 Current             | A    | Current of string 1. |
| DC2 Current             | A    | Current of string 2. |
| DC3 Current             | A    | Current of string 3. |
| PV to Battery Power     | W    | Power used to charge the battery. |
| Energy Manager State    |      | State of the energy manager. |
| Battery Cycles          |      | Number of full charge/discharge cycles. |
| Battery Power           | W    | Power from (+)/to (-) the battery. |
| Battery SoC             | %    | SoC of the Battery. |
| Autarky Day             | %    | Autarky of the current day. |
| Autarky Month           | %    | Autarky of the current month. |
| Autarky Year            | %    | Autarky of the current year. |
| Autarky Total           | %    | Autarky total. |
| Own Consumption Rate Day | %    | Own consumption rate of the current day. |
| Own Consumption Rate Month | %    | Own consumption rate of the current month. |
| Own Consumption Rate Year | %    | Own consumption rate of the current year. |
| Own Consumption Rate Total | %    | Own consumption rate total. |
| Home Consumption Day    | kWh  | Home energy consumption of the current day. |
| Home Consumption Month  | kWh  | Home energy consumption of the current month. |
| Home Consumption Year   | kWh  | Home energy consumption of the current year. |
| Home Consumption Total  | kWh  | Home energy consumption total. |
| Home Consumption from Battery Day    | kWh  | Home energy consumption from the battery of the current day. |
| Home Consumption from Battery Month  | kWh  | Home energy consumption from the battery of the current month. |
| Home Consumption from Battery Year   | kWh  | Home energy consumption from the battery of the current year. |
| Home Consumption from Battery Total  | kWh  | Home energy consumption from the battery total. |
| Home Consumption from Grid Day    | kWh  | Home energy consumption from the Grid of the current day. |
| Home Consumption from Grid Month  | kWh  | Home energy consumption from the Grid of the current month. |
| Home Consumption from Grid Year   | kWh  | Home energy consumption from the Grid of the current year. |
| Home Consumption from Grid Total  | kWh  | Home energy consumption from the Grid total. |
| Home Consumption from PV Day    | kWh  | Home energy consumption from the PV of the current day. |
| Home Consumption from PV Month  | kWh  | Home energy consumption from the PV of the current month. |
| Home Consumption from PV Year   | kWh  | Home energy consumption from the PV of the current year. |
| Home Consumption from PV Total  | kWh  | Home energy consumption from the PV total. |
| Energy PV1 Day          | kWh  | Energy of PV string 1 of the current day. |
| Energy PV1 Month        | kWh  | Energy of PV string 1 of the current month. |
| Energy PV1 Year         | kWh  | Energy of PV string 1 of the current year. |
| Energy PV1 Total        | kWh  | Energy of PV string 1 total. |
| Energy PV2 Day          | kWh  | Energy of PV string 2 of the current day. |
| Energy PV2 Month        | kWh  | Energy of PV string 2 of the current month. |
| Energy PV2 Year         | kWh  | Energy of PV string 2 of the current year. |
| Energy PV2 Total        | kWh  | Energy of PV string 2 total. |
| Energy PV3 Day          | kWh  | Energy of PV string 3 of the current day. |
| Energy PV3 Month        | kWh  | Energy of PV string 3 of the current month. |
| Energy PV3 Year         | kWh  | Energy of PV string 3 of the current year. |
| Energy PV3 Total        | kWh  | Energy of PV string 3 total. |
| Energy Yield Day        | kWh  | Energy yield of the current day. |
| Energy Yield Month      | kWh  | Energy yield of the current month. |
| Energy Yield Year       | kWh  | Energy yield of the current year. |
| Energy Yield Total      | kWh  | Energy yield total. |
| Energy Discharge to Grid Day    | kWh  | Energy discharged from battery to the Grid of the current day. |
| Energy Discharge to Grid Month  | kWh  | Energy discharged from battery to the Grid of the current month. |
| Energy Discharge to Grid Year   | kWh  | Energy discharged from battery to the Grid of the current year. |
| Energy Discharge to Grid Total  | kWh  | Energy discharged from battery to the Grid total. |
| Battery Charge from Grid Day    | kWh  | Energy charged to the battery from the Grid of the current day. |
| Battery Charge from Grid Month  | kWh  | Energy charged to the battery from the Grid of the current month. |
| Battery Charge from Grid Year   | kWh  | Energy charged to the battery from the Grid of the current year. |
| Battery Charge from Grid Total  | kWh  | Energy charged to the battery from the Grid total. |
| Battery Charge from PV Day    | kWh  | Energy to the battery on the DC side charged by PV during the current day. |
| Battery Charge from PV Month  | kWh  | Energy to the battery on the DC side charged by PV during the current month. |
| Battery Charge from PV Year   | kWh  | Energy to the battery on the DC side charged by PV during the current year. |
| Battery Charge from PV Total  | kWh  | Energy to the battery on the DC side charged by PV  total. |
| Battery Discharge Day | kWh | Energy from the battery on the DC side discharged during the current day. |
| Battery Discharge Month | kWh | Energy from PV on DC-side used to charge the battery of the current month. |
| Battery Discharge Year | kWh | Energy from PV on DC-side used to charge the battery of the current year. |
| Battery Discharge Total | kWh | Energy from PV on DC-side used to charge the battery total. |
| Energy to Grid Day | kWh | Energy fed into the grid for the current day. |
| Energy to Grid Month | kWh | Energy fed into the grid for the current month. |
| Energy to Grid Year | kWh | Energy fed into the grid for the current year. |
| Energy to Grid Total | kWh | Energy fed into the grid in total, since the system was installed. |
| Sum power of all PV DC inputs | W | Total sum of power provided by all PV inputs together. |

{% note %}
The inverter does not provide any data about the energy that is fed into the grid directly, but the `pykoplenti` library provides it via virtual process data.
{% endnote %}

#### Configuration of the energy dashboard

The following sensors can be used in the [energy dashboard](/docs/energy/):

| Energy dashboard | Sensor |
|------------------|:-------|
| Grid consumption | Home Consumption from Grid Total |
| Solar production | Energy PV1 Total, Energy PV2 Total, Energy PV3 Total |
| Battery systems  | Battery Discharge Total, Battery Charge from PV Total |

{% note %}
Some of the energy is measured on the DC side and some on the AC side, so the values may differ slightly due to losses between DC and AC.
{% endnote %}

### Settings Sensors

The following sensors are available in the library:

| Name                    | Unit | RW | Description   |
|-------------------------|------|----|:--------------|
| Battery Dynamic SoC     |      | RW | Dynamic SoC. |
| Battery Smart Control   |      | RW | Enable smart battery control |
| Battery Strategy        |      | RW | Battery strategy. |
| Shadow Management       |      | RW | PV string shadow management. |

{% note %}
Setting values change less often, therefore these sensors are only polled every 5 minutes.
{% endnote %}

#### Battery Strategy

This sensor is on by default, which maps to the "Automatically" mode in the Kostal Plenticore Plus documentation. This mode is recommended for regions with little snowfall.

Turning this sensor off maps to the "Automatically economical" mode. Consequently, the inverter controls the battery charging automatically but switches the battery off when there is insufficient PV energy to charge the battery for longer periods. This mode is recommended for regions with a lot of snowfall.

#### Battery Smart Control

The Battery Smart Control sensor appears as a select field labeled "Battery Charging / Usage Mode" with three options:

- **None**: the battery is loaded immediately when there is PV energy spare.
- **Battery:SmartBatteryControl:Enable**: the battery loading optimizes grid feed-in and battery loading. This setting is recommended when the grid feed-in is limited to, for example, 70% of the Plenticore Plus peak power.
- **Battery:TimeControl:Enable**: battery charging/discharging can be configured flexibly at different times (tariff periods). Detailed settings must be done on the web frontend of the Kostal Plenticore Plus inverter. This option activates the time-controlled battery usage mode.

## Number

The following Number entities are available. The values could also be change from Home Assistant.

| Name                    | Unit | RW | Description   |
|-------------------------|------|----|:--------------|
| Battery min Home Consumption | W    | RW | Min. home consumption power for battery. |
| Battery min SoC         | %    | RW | Min. SoC of battery. |

## Diagnostics

The following diagnostic sensors are available.

| Name                    | Data Type | Description   |
|-------------------------|-----------|:-------------------------------------------|
| Active Errors           | Integer   | Count of currently active errors. |

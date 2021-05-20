---
title: Kostal Plenticore Solar Inverter
description: Instructions on how to integrate Kostal Plenticore solar inverter within Home Assistant.
ha_category: Energy
ha_release: 2021.5
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@stegm'
ha_domain: kostal_plenticore
ha_platforms:
  - sensor
---

The Kostal Plenticore integration allows you to get data from [Kostal Plenticore](https://www.kostal-solar-electric.com/) solar inverters and integrate them into your Home Assistant installation. It allows you also to change some of settings values of the inverter.

The integration uses the REST-API interface which is also used by the integrated Web-UI and therefore uses the same password.

{% include integrations/config_flow.md %}

## Sensors

The integration disables most of the sensors per default. You can enable it in the *Entity* page. The sensors are split into two sets, one for the process data and one for the setting values.

<div class='note'>
The Plenticore inverter provides much more data endpoints, some of them are also dependent of the version of the firmware. If you are missing process data values, open an issue with the necessary information or make an pull request.
</div>

### Process Data Sensors

The following sensors are available in the library:

| Name                    | Unit | Description   |
|-------------------------|------|:-------------------------------------------|
| Inverter State          |      | State of the inverter. |
| Solar Power             | W    | Sum of all DC strings. |
| Grid Power              | W    | Power from (+)/to (-) the grid. |
| Home Power from Battery | W    | Power from the battery for home consumption. |
| Home Power from Grid    | W    | Power from the grid for home consumption. |
| Home Power from PV      | W    | Power from the PV for home consumption. |
| Home Power              | W    | Power used for home consumption. |
| AC Power                | W    | Output power of the inverter. |
| DC1 Power               | W    | Power of string 1. |
| DC2 Power               | W    | Power of string 2. |
| PV to Battery Power     | W    | Power used to charge the battery. |
| Energy Manager State    |      | State of the energy manager. |
| Battery Cycles          |      | Number of full charge/discharge cylces. |
| Battery Power           | W    | Power from (+)/to (-) the battery. |
| Battery SoC             | %    | Soc of the Battery. |
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
| Energy Yield Day        | kWh  | Energy yield of the current day. |
| Energy Yield Month      | kWh  | Energy yield of the current month. |
| Energy Yield Year       | kWh  | Energy yield of the current year. |
| Energy Yield Total      | kWh  | Energy yield total. |

### Settings Sensors

The following sensors are available in the library:

| Name                    | Unit | RW | Description   |
|-------------------------|------|----|:--------------|
| Battery Dynamic Soc     |      | RW | Dynamic SoC. |
| Battery min Home Consumption | W    | RW | Min. home consumption power for battery. |
| Battery min Soc         | %    | RW | Min. SoC of battery. |
| Battery Smart Control   |      | RW | Enable smart battery control |
| Battery Strategy        |      | RW | Battery strategy. |
| Shadow Management       |      | RW | PV string shadow management. |

<div class='note'>
Setting values change less often, therefore these sensors are only polled every 5 minutes.
</div>

## Services

### Service `kostal_plenticore.write_setting_value`

Write a new value to a setting.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String that point to a setting `entity_id`.
| `value` | no  | The new value to write to the setting.

Example:

Set the minimal SoC of the battery:

```yaml
entity_id: sensor.plenticore_battery_min_soc
value: 10
```

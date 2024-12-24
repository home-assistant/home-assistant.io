---
title: LG ThinQ
description: Setup for LG ThinQ Integration.
ha_category:
  - Hub
ha_release: '2024.11'
ha_iot_class: Cloud Push
ha_code_owners:
  - '@LG-ThinQ-Integration'
ha_config_flow: true
ha_domain: lg_thinq
ha_platforms:
  - binary_sensor
  - climate
  - event
  - fan
  - number
  - select
  - sensor
  - switch
  - vacuum
ha_integration_type: integration
ha_codeowners:
  - '@LG-ThinQ-Integration'
---

The **LG ThinQ** integration allows you to connect LG ThinQ devices to Home Assistant. The features of this integration include:

- Control LG appliances as Home Assistant entities through the [LG ThinQ Connect API](https://smartsolution.developer.lge.com/en/apiManage/thinq_connect).

## Prerequisites

- This feature works via LG ThinQ cloud. Therefore, an internet connection is required.
- A [personal access token](https://connect-pat.lgthinq.com) to use the [LG ThinQ Connect API](https://smartsolution.developer.lge.com/en/apiManage/thinq_connect).

### Personal Access Token (PAT)

1. Access the **[personal access token](https://connect-pat.lgthinq.com)** page (requires an LG ThinQ account).
2. Select **ADD NEW TOKEN**.
3. Enter a new token name and select the following authorized scopes:
    - **Permission to view all devices**
    - **Permission to view all device statuses**
    - **All device control rights**
    - **All device event subscription rights**
    - **All device push notification permissions**
4. Select **CREATE TOKEN**.
5. Once all the steps are completed, you will see that a **PAT** has been generated.

{% include integrations/config_flow.md %}

1. Enter the information to use LG ThinQ Connect API:
   - The **Token Value** obtained through the PAT issuance process. (Required)
   - The entry name.
2. Choose the region (country).

## Supported Devices

### Appliance

Support LG Appliances as follows:

- [Air Conditioner](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_conditioner)
- [Air Purifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_purifier)
- [Air Purifier Fan](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_purifier_fan)
- [Ceiling Fan](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/ceiling_fan)
- [Cooktop](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/cooktop)
- [Dehumidifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/dehumidifier)
- [Dishwasher](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/dish_washer)
- [Dryer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/dryer)
- [Home Brew](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/home_brew)
- [Hood](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/hood)
- [Humidifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/humidifier)
- [Kimchi Refrigerator](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/kimchi_refrigerator)
- [Microwave Oven](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/microwave_oven)
- [Oven](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/oven)
- [Plant Cultivator](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/plant_cultivator)
- [Refrigerator](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/refrigerator)
- [Robot Cleaner](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/robot_cleaner)
- [Stick Cleaner](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/stick_cleaner)
- [Styler](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/styler)
- [System Boiler](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/system_boiler)
- [Washcombo Main](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/main_washcombo)
- [Washcombo Mini](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/mini_washcombo)
- [Washer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washer)
- [Washtower](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower)
- [Washtower Dryer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower_dryer)
- [Washtower Washer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower_washer)
- [Water Heater](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/water_heater)
- [Water Purifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/water_purifier)
- [Wine Cellar](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/wine_cellar)

## Platforms

LG ThinQ represents devices as a set of [profiles](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/refrigerator). And these are mapped to entities in Home Assistant.

A list of all Entity Platforms provided by LG ThinQ Integration:

- [Binary sensor](#binary-sensor)
- [Climate](#climate)
- [Event](#event)
- [Fan](#fan)
- [Number](#number)
- [Select](#select)
- [Sensor](#sensor)
- [Switch](#switch)
- [Vacuum](#vacuum)

### Binary sensor

A read-only property which has only two states that can be toggled is represented as a binary sensor platform.

| Device | Property |
| ------ | -------- |
| [Cooktop](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/cooktop)<br> | Remote start |
| [Dish Washer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/dish_washer) | Chime sound<br>Clean indicator light<br>Door<br>Machine clean reminder<br>Remote start<br>Rinse refill needed |
| [Dryer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/dryer)<br> | Remote start |
| [Hood](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/hood) | Power |
| [Oven](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/oven) | Remote start |
| [Refrigerator](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/refrigerator) | Door<br>Eco friendly<br>Power saving mode<br>Sabbath |
| [Kimchi Refrigerator](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/kimchi_refrigerator) | Fresh air filter |
| [Styler](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/styler) | Remote start |
| [Washcombo Main](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/main_washcombo)<br>[Washcombo Mini](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/mini_washcombo)<br>[Washer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washer) | Remote start |
| [Washtower](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower)<br>[Washtower Dryer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower_dryer)<br>[Washtower Washer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower_washer) | Remote start |
| [Water Heater](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/water_heater) | Power |
| [Wine Cellar](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/wine_cellar) | Sabbath |

### Climate

The properties for controlling both the temperature and wind strength of the appliance are represented as a climate platform.

| Device | Property |
| ------ | -------- |
| [Air Conditioner](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_conditioner) | Current temperature<br>Fan mode<br>HVAC mode<br>Preset mode<br>Temperature<br>Temperature cool<br>Temperature heat<br>Unit |
| [System Boiler](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/system_boiler) | Current temperature<br>HVAC mode<br>Temperature<br>Temperature cool<br>Temperature heat<br>Unit |

### Event

A notification message pushed from the server is represented as an event platform.

| Device | Property |
| ------ | -------- |
| [Air Conditioner](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_conditioner) | Notification |
| [Air Purifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_purifier) | Notification |
| [Air Purifier Fan](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_purifier_fan) | Notification |
| [Dehumidifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/dehumidifier) | Notification |
| [Dish Washer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/dish_washer) | Error<br>Notification |
| [Dryer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/dryer) | Error<br>Notification |
| [Humidifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/humidifier) | Notification |
| [Kimchi Refrigerator](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/kimchi_refrigerator) | Notification |
| [Microwave Oven](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/microwave_oven) | Notification |
| [Oven](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/oven) | Notification |
| [Refrigerator](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/refrigerator) | Notification |
| [Robot Cleaner](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/robot_cleaner) | Error<br>Notification |
| [Stick Cleaner](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/stick_cleaner) | Notification |
| [Styler](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/styler) | Error<br>Notification |
| [Washcombo Main](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/main_washcombo)<br>[Washcombo Mini](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/mini_washcombo)<br>[Washer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washer) | Error<br>Notification |
| [Washtower](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower)<br>[Washtower Dryer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower_dryer)<br>[Washtower Washer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower_washer) | Error<br>Notification |
| [Wine Cellar](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/wine_cellar) | Notification |

### Fan

The properties for controlling the wind strength of the appliance are represented as a fan platform.

| Device | Property |
| ------ | -------- |
| [Ceiling Fan](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/ceiling_fan) | Power<br>Speed |

### Number

A read-write property which has a numeric value is represented as a number platform.

| Device | Property |
| ------ | -------- |
| [Air Conditioner](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_conditioner) | Schedule turn-off<br>Schedule turn-on<br>Sleep timer |
| [Air Purifier Fan](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_purifier_fan) | Sleep timer<br>Wind temperature |
| [Dryer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/dryer) | Delay ends in<br>Delay in |
| [Hood](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/hood) | Fan<br>Light |
| [Humidifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/humidifier) | Sleep timer<br>Target humidity |
| [Microwave Oven](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/microwave_oven) | Fan<br>Light |
| [Oven](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/oven) | Temperature |
| [Refrigerator](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/refrigerator) | Temperature |
| [Styler](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/styler) | Delay ends in |
| [Washcombo Main](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/main_washcombo)<br>[Washcombo Mini](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/mini_washcombo)<br>[Washer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washer) | Delay ends in<br>Delay in |
| [Washtower](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower)<br>[Washtower Dryer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower_dryer)<br>[Washtower Washer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower_washer) | Delay ends in<br>Delay in |
| [Water Heater](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/water_heater) | Temperature |
| [Wine Cellar](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/wine_cellar) | Light<br>Temperature |

### Select

A writable property which has a list of selectable values is represented as a select platform.

| Device |Property |
| ------ |-------- |
| [Air Conditioner](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_conditioner) | Air purify<br>Air quality sensor |
| [Air Purifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_purifier) | Operating mode<br>Speed |
| [Air Purifier Fan](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_purifier_fan) | Display brightness<br>Operating mode<br>Rotation<br>Speed |
| [Dehumidifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/dehumidifier) | Speed |
| [Dish Washer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/dish_washer) | Operation |
| [Dryer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/dryer) | Operation |
| [Humidifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/humidifier) | Display brightness<br>Drying mode<br>Operating mode<br>Speed |
| [Oven](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/oven) | Cook mode<br>Operation<br> |
| [Refrigerator](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/refrigerator) | Fresh air filter |
| [Styler](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/styler) | Operation |
| [Washcombo Main](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/main_washcombo)<br>[Washcombo Mini](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/mini_washcombo)<br>[Washer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washer) | Operation |
| [Washtower](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower)<br>[Washtower Dryer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower_dryer)<br>[Washtower Washer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower_washer) | Operation |
| [Water Heater](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/water_heater) | Operating mode |
| [Wine Cellar](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/wine_cellar) | Light<br>Operating mode |

### Switch

A read-write property which has only two states that can be toggled is represented as a switch platform.

| Device | Property |
| ------ | -------- |
| [Air Conditioner](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_conditioner) | Energy saving |
| [Air Purifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_purifier) | Power |
| [Air Purifier Fan](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_purifier_fan) | Heating<br>Power<br>UVnano |
| [Dehumidifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/dehumidifier) | Power |
| [Humidifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/humidifier) | Auto mode<br>Heating<br>Mood light<br>Power<br>Sleep mode |
| [Refrigerator](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/refrigerator) | Ice plus<br>Quick freeze |
| [System Boiler](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/system_boiler) | Hot water |
| [Wine Cellar](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/wine_cellar) | Ventilation |

### Vacuum

The properties for controlling the clean operations of the appliance are represented as a vacuum platform.

| Device | Property |
| ------ | -------- |
| [Robot Cleaner](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/robot_cleaner) | Battery<br>Current status<br>Operation |

### Sensor

A read-only property which has states is represented as a sensor platform.

| Device | Property |
| ------ | -------- |
| [Air Conditioner](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_conditioner) | Filter remaining<br>Humidity<br>Odor<br>Overall air quality<br>PM1<br>PM10<br>PM2.5<br>Schedule turn-off<br>Schedule turn-on<br>Sleep timer |
| [Air Purifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_purifier) | Air quality sensor<br>Humidity<br>Odor<br>Operating mode<br>Overall air quality<br>Personal mode<br>PM1<br>PM10<br>PM2.5<br>Filter remaining<br>Schedule turn-off<br>Schedule turn-on |
| [Air Purifier Fan](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/air_purifier_fan) | Air quality sensor<br>Humidity<br>Odor<br>Overall air quality<br>PM1<br>PM10<br>PM2.5<br>Sleep timer<br>Temperature<br>Schedule turn-off<br>Schedule turn-on |
| [Cooktop](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/cooktop) | Current status<br>Power level |
| [Dehumidifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/dehumidifier) | Humidity<br>Operating mode |
| [Dish Washer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/dish_washer) | Current cycle<br>Current status<br>Rinse aid dispenser level<br>Softening level<br>Delay in<br>Remaining time<br>Total time |
| [Home Brew](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/home_brew)| Brewing duration<br>Brewing period<br>Current status<br>Flavor<br>Homebrew recipe<br>Hops<br>Recipe progress<br>Wort<br>Yeast |
| [Humidifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/humidifier) | Air quality sensor<br>Humidity<br>Overall air quality<br>PM1<br>PM10<br>PM2.5<br>Schedule turn-off<br>Schedule turn-on<br>Sleep timer<br>Temperature |
| [Kimchi Refrigerator](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/kimchi_refrigerator) | Fresh air filter<br>Temperature |
| [Microwave Oven](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/microwave_oven) | Current status |
| [Oven](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/oven) | Current status<br>Temperature |
| [Plant Cultivator](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/plant_cultivator) | Current status<br>Day growth temperature<br>Lighting duration<br>Lighting intensity<br>Lights on time<br>Mode<br>Night growth temperature<br>Temperature<br>Wind speed |
| [Refrigerator](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/refrigerator) | Fresh air filter<br>Water filter used |
| [Robot Cleaner](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/robot_cleaner) | Current status<br>Operating mode<br>Running time |
| [Stick Cleaner](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/stick_cleaner) | Battery<br>Current status<br>Operating mode |
| [Water Heater](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/water_heater) | Temperature |
| [Water Purifier](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/water_purifier) | High-temp sterilization<br>Type<br>UVnano|
| [Styler](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/styler) | Current status<br>Delay in<br>Remaining time<br>Total time |
| [Washer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washer)<br>[Dryer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/dryer)<br>[Washcombo Main](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/main_washcombo)<br>[Washcombo Mini](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/mini_washcombo)<br>[Washtower](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower)<br>[Washtower Dryer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower_dryer)<br>[Washtower Washer](https://smartsolution.developer.lge.com/en/apiManage/device_profile?s=1734332716502#tag/washtower_washer) | Current status<br>Delay in<br>Remaining time<br>Total time |

### Custom card configuration

#### Timer Bar Card

- Supported devices: Washer, Dryer, Styler, Dish washer
- Entities: sensor.washer_current_status, sensor.washer_remaining_time, sensor.washer_total_time

```yaml
type: custom:timer-bar-card
entities:
  - entity: sensor.washer_current_status
    name: Washer
    active_state:
      - running
      - rinsing
      - spinning
      - drying
      - cooling
      - reserved
      - presteam
      - steam
    pause_state: pause
    icon: mdi:tumble-dryer-off
    active_icon: mdi:tumble-dryer
    end_time:
      entity: sensor.washer_remaining_time
    duration:
      entity: sensor.washer_total_time
      units: minutes
    invert: true
```

## Troubleshooting

### Setup

#### Aborted: The token is not valid

This error occurs when the Personal Access Token (PAT) is invalid or entered incorrectly. Please visit the [Personal Access Token Page](https://connect-pat.lgthinq.com) page to check if your token is valid.

#### Aborted: The country is not supported

Check your PAT's valid country in the **Choose the region / Country** section.

#### Error: The number of API calls has been exceeded

This error occurs when there's an abnormal number of API calls made using the PAT.
The LG ThinQ integration will work properly after some time.

## Debugging / Issue report
The LG ThinQ integration will show additional information by enabling log configuration.
1. Enable debug logging in /config/integrations/integration/lg_thinq,
2. Please report your device info (screenshot including name, device type, entities) and logs.

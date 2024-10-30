---
title: LG ThinQ
description: Setup for LG ThinQ Integration.
ha_category:
  - Hub
ha_release: "2024.11"
ha_iot_class: Cloud Push
ha_code_owners:
  - '@LG-ThinQ-Integration'
ha_config_flow: true
ha_domain: lg_thinq
ha_platforms:
  - switch
  - binary_sensor
  - climate
  - event
  - fan
  - number
  - sensor
  - select
  - vacuum
ha_integration_type: integration
---

The **LG ThinQ** integration allows you to connect LG ThinQ devices to Home Assistant. The features of this integration include:

- Control LG appliances as Home Assistant entities through the [LG ThinQ Connect API](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/overview/).

## Prerequisites

- This feature works via LG ThinQ cloud. Therefore, an internet connection is required.
- A [personal access token](https://connect-pat.lgthinq.com) to use the [LG ThinQ Connect API](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/overview/).

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

- [Air Conditioner](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/air-conditioner/)
- [Air Purifier](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/air-purifier/)
- [Air Purifier Fan](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Air-Purifier-Fan/)
- [Ceiling Fan](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/ceiling-fan/)
- [Cooktop](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/cooktop/)
- [Dehumidifier](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/dehumidifier/)
- [Dishwasher](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/dish-washer/)
- [Dryer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/dryer/)
- [Home Brew](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/home-brew/)
- [Hood](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/hood/)
- [Humidifier](https://thinq.developer.lge.com/ko/cloud/docs/thinq-connect/device-profile/humidifier/)
- [Kimchi Refrigerator](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/kimchi-refrigerator/)
- [Microwave Oven](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/microwave-oven/)
- [Oven](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/oven/)
- [Plant Cultivator](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/plant-cultivator/)
- [Refrigerator](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/refrigerator/)
- [Robot Cleaner](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/robot-cleaner/)
- [Stick Cleaner](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Stick-Cleaner/)
- [Styler](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/styler/)
- [System Boiler](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/system-boiler/)
- [Washcombo Main](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/)
- [Washcombo Mini](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/)
- [Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/)
- [Washtower](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Single-Unit/)
- [Washtower Dryer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Dryer/)
- [Washtower Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Washer/)
- [Water Heater](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/water-heater/)
- [Water Purifier](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/water-purifier/)
- [Wine Cellar](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/wine-cellar/)

## Platforms

LG ThinQ represents devices as a set of [profiles](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/refrigerator/). And these are mapped to entities in Home Assistant.

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
| [Cooktop](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Cooktop/)<br> | Remote start |
| [Dish Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/dish-washer/) | Chime sound<br>Clean indicator light<br>Door<br>Machine clean reminder<br>Remote start<br>Rinse refill needed |
| [Dryer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Dryer/)<br> | Remote start |
| [Hood](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Hood/) | Power |
| [Oven](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Oven/) | Remote start |
| [Refrigerator](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/refrigerator/) | Door<br>Eco friendly<br>Power saving mode<br>Sabbath |
| [Kimchi Refrigerator](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Kimchi-Refrigerator/) | Fresh air filter |
| [Styler](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/styler/) | Remote start |
| [Washcombo Main](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/)<br>[Washcombo Mini](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/)<br>[Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/) | Remote start |
| [Washtower](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Single-Unit/)<br>[Washtower Dryer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Dryer/)<br>[Washtower Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Washer/) | Remote start |
| [Water Heater](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Water-Heater/) | Power |
| [Wine Cellar](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Wine-Cellar/) | Sabbath |

### Climate

The properties for controlling both the temperature and wind strength of the appliance are represented as a climate platform.

| Device | Property |
| ------ | -------- |
| [Air Conditioner](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/air-conditioner/) | Current temperature<br>Fan mode<br>HVAC mode<br>Preset mode<br>Temperature<br>Temperature cool<br>Temperature heat<br>Unit |
| [System Boiler](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/System-Boiler/) | Current temperature<br>HVAC mode<br>Temperature<br>Temperature cool<br>Temperature heat<br>Unit |

### Event

A notification message pushed from the server is represented as an event platform.

| Device | Property |
| ------ | -------- |
| [Air Conditioner](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/air-conditioner/) | Notification |
| [Air Purifier](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/air-purifier/) | Notification |
| [Air Purifier Fan](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Air-Purifier-Fan/) | Notification |
| [Dehumidifier](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/dehumidifier/) | Notification |
| [Dish Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/dish-washer/) | Error<br>Notification |
| [Dryer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Dryer/) | Error<br>Notification |
| [Humidifier](https://thinq.developer.lge.com/ko/cloud/docs/thinq-connect/device-profile/humidifier/) | Notification |
| [Kimchi Refrigerator](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Kimchi-Refrigerator/) | Notification |
| [Microwave Oven](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Microwave-Oven/) | Notification |
| [Oven](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Oven/) | Notification |
| [Refrigerator](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/refrigerator/) | Notification |
| [Robot Cleaner](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/robot-cleaner/) | Error<br>Notification |
| [Stick Cleaner](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Stick-Cleaner/) | Notification |
| [Styler](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/styler/) | Error<br>Notification |
| [Washcombo Main](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/)<br>[Washcombo Mini](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/)<br>[Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/) | Error<br>Notification |
| [Washtower](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Single-Unit/)<br>[Washtower Dryer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Dryer/)<br>[Washtower Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Washer/) | Error<br>Notification |
| [Wine Cellar](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Wine-Cellar/) | Notification |

### Fan

The properties for controlling the wind strength of the appliance are represented as a fan platform.

| Device | Property |
| ------ | -------- |
| [Ceiling Fan](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/ceiling-fan/) | Power<br>Speed |

### Number

A read-write property which has numeric value is represented as a number platform.

| Device | Property |
| ------ | -------- |
| [Air Conditioner](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/air-conditioner/) | Schedule turn-off<br>Schedule turn-on<br>Sleep timer |
| [Air Purifier Fan](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Air-Purifier-Fan/) | Sleep timer<br>Wind temperature |
| [Dryer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Dryer/) | Delay ends in<br>Delay starts in |
| [Hood](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Hood/) | Fan<br>Light |
| [Humidifier](https://thinq.developer.lge.com/ko/cloud/docs/thinq-connect/device-profile/humidifier/) | Sleep timer<br>Target humidity |
| [Microwave Oven](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Microwave-Oven/) | Fan<br>Light |
| [Oven](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Oven/) | Temperature |
| [Refrigerator](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/refrigerator/) | Temperature |
| [Styler](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/styler/) | Delay ends in |
| [Washcombo Main](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/)<br>[Washcombo Mini](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/)<br>[Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/) | Delay ends in<br>Delay starts in |
| [Washtower](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Single-Unit/)<br>[Washtower Dryer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Dryer/)<br>[Washtower Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Washer/) | Delay ends in<br>Delay starts in |
| [Water Heater](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Water-Heater/) | Temperature |
| [Wine Cellar](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Wine-Cellar/) | Light<br>Temperature |

### Select

A writable property which has a list of selectable values is represented as a select platform.

| Device |Property |
| ------ |-------- |
| [Air Conditioner](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/air-conditioner/) | Air purify<br>Air quality sensor |
| [Air Purifier](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/air-purifier/) | Operating mode<br>Speed |
| [Air Purifier Fan](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Air-Purifier-Fan/) | Display brightness<br>Operating mode<br>Rotation<br>Speed |
| [Dehumidifier](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/dehumidifier/) | Speed |
| [Dish Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/dish-washer/) | Operation |
| [Dryer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Dryer/) | Operation |
| [Humidifier](https://thinq.developer.lge.com/ko/cloud/docs/thinq-connect/device-profile/humidifier/) | Display brightness<br>Drying mode<br>Operating mode<br>Speed |
| [Oven](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Oven/) | Cook mode<br>Operation<br> |
| [Refrigerator](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/refrigerator/) | Fresh air filter |
| [Styler](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/styler/) | Operation |
| [Washcombo Main](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/)<br>[Washcombo Mini](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/)<br>[Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/) | Operation |
| [Washtower](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Single-Unit/)<br>[Washtower Dryer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Dryer/)<br>[Washtower Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Washer/) | Operation |
| [Water Heater](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Water-Heater/) | Operating mode |
| [Wine Cellar](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Wine-Cellar/) | Light<br>Operating mode |

### Sensor

A read-only property which has states is represented as a sensor platform.

| Device | Property |
| ------ | -------- |
| [Air Conditioner](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/air-conditioner/) | Filter remaining<br>Humidity<br>Odor<br>Overall air quality<br>PM1<br>PM10<br>PM2.5<br>Schedule turn-off<br>Schedule turn-on<br>Sleep timer |
| [Air Purifier](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/air-purifier/) | Air quality sensor<br>Humidity<br>Odor<br>Operating mode<br>Overall air quality<br>Personal mode<br>PM1<br>PM10<br>PM2.5 |
| [Air Purifier Fan](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Air-Purifier-Fan/) | Air quality sensor<br>Humidity<br>Odor<br>Overall air quality<br>PM1<br>PM10<br>PM2.5<br>Sleep timer<br>Temperature |
| [Cooktop](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Cooktop/) | Current status<br>Power level<br>Remaining time |
| [Dehumidifier](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/dehumidifier/) | Humidity<br>Operating mode |
| [Dish Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/dish-washer/) | Current cycle<br>Current status<br>Delay starts in<br>Remaining time<br>Rinse aid dispenser level<br>Softening level<br>Total time |
| [Dryer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Dryer/) | Current status<br>Delay ends in<br>Delay starts in<br>Remaining time<br>Total time |
| [Home Brew](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Home-Brew/)| Brewing duration<br>Brewing period<br>Current status<br>Flavor<br>Homebrew recipe<br>Hops<br>Recipe progress<br>Wort<br>Yeast |
| [Humidifier](https://thinq.developer.lge.com/ko/cloud/docs/thinq-connect/device-profile/humidifier/) | Air quality sensor<br>Humidity<br>Overall air quality<br>PM1<br>PM10<br>PM2.5<br>Schedule turn-off<br>Schedule turn-on<br>Sleep timer<br>Temperature |
| [Kimchi Refrigerator](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Kimchi-Refrigerator/) | Fresh air filter<br>Temperature |
| [Microwave Oven](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Microwave-Oven/) | Current status<br>Remaining time |
| [Oven](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Oven/) | Cook time<br>Current status<br>Remaining time<br>Temperature |
| [Plant Cultivator](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Plant-Cultivator/) | Current status<br>Day growth temperature<br>Lighting duration<br>Lighting intensity<br>Lights on time<br>Mode<br>Night growth temperature<br>Temperature<br>Wind speed |
| [Refrigerator](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/refrigerator/) | Fresh air filter<br>Water filter used |
| [Robot Cleaner](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/robot-cleaner/) | Current status<br>Operating mode<br>Running time |
| [Stick Cleaner](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Stick-Cleaner/) | Battery<br>Current status<br>Operating mode |
| [Styler](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/styler/) | Current status<br>Delay ends in<br>Delay starts in<br>Remaining time<br>Total time |
| [Washcombo Main](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/)<br>[Washcombo Mini](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/)<br>[Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/) | Current status<br>Delay ends in<br>Delay starts in<br>Remaining time<br>Total time |
| [Washtower](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Single-Unit/)<br>[Washtower Dryer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Dryer/)<br>[Washtower Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Washer/) | Current status<br>Delay ends in<br>Delay starts in<br>Remaining time<br>Total time |
| [Water Heater](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Water-Heater/) | Temperature |
| [Water Purifier](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/water-purifier/) | High-temp sterilization<br>Type<br>UVnano|

### Switch

A read-write property which has only two states that can be toggled is represented as a switch platform.

| Device | Property |
| ------ | -------- |
| [Air Conditioner](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/air-conditioner/) | Energy saving |
| [Air Purifier](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/air-purifier/) | Power |
| [Air Purifier Fan](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Air-Purifier-Fan/) | Heating<br>Power<br>UVnano |
| [Dehumidifier](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/dehumidifier/) | Power |
| [Humidifier](https://thinq.developer.lge.com/ko/cloud/docs/thinq-connect/device-profile/humidifier/) | Auto mode<br>Heating<br>Mood light<br>Power<br>Sleep mode |
| [Refrigerator](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/refrigerator/) | Ice plus<br>Quick freeze |
| [System Boiler](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/System-Boiler/) | Hot water |
| [Wine Cellar](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Wine-Cellar/) | Ventilation |

### Vacuum

The properties for controlling the clean operations of the appliance are represented as a vacuum platform.

| Device | Property |
| ------ | -------- |
| [Robot Cleaner](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/robot-cleaner/) | Battery<br>Current status<br>Operation |

## Troubleshooting

### Setup

#### Aborted: The token is not valid

This error occurs when the Personal Access Token (PAT) is invalid or entered incorrectly. Please visit the [Personal Access Token Page](https://connect-pat.lgthinq.com) page to check if your token is valid.

#### Aborted: The country is not supported

Check your PAT's valid country in the **Choose the region / Country** section.

#### Error: The number of API calls has been exceeded

This error occurs when there's an abnormal number of API calls made using the PAT.
The LG ThinQ integration will work properly after some time.

## Debugging

The LG ThinQ integration will show additional information by enabling log configuration. Add the line to your {% term "`configuration.yaml`" %}:
Don't forget to remove the line again once you are done debugging.

```yaml
logger:
  default: info
  logs:
    homeassistant.components.lg_thinq: debug
```

---
title: LG ThinQ
description: Setup for LG ThinQ Integration.
ha_category:
  - Hub
ha_release: "2024.10"
ha_iot_class: Cloud Push
ha_code_owners:
  - '@LG-ThinQ-Integration'
ha_config_flow: true
ha_domain: lg_thinq
ha_platforms:
  - switch
  - binary_sensor
ha_integration_type: integration
---

The **LG ThinQ** integration allows you to connect LG ThinQ devices to Home Assistant. The features of this integration include:

- Control LG appliances as Home Assistant entities through the [LG ThinQ Connect API](https://thinq.developer.lge.com/ko/cloud/).

## Prerequisites

- This feature works via LG ThinQ cloud. Therefore, an internet connection is required.
- A [personal access token](https://connect-pat.lgthinq.com) to use the [LG ThinQ Connect API](https://thinq.developer.lge.com/ko/cloud/).

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
- [Ceiling Fan](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/ceiling-fan/)
- [Cooktop](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/cooktop/)
- [Dehumidifier](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/dehumidifier/)
- [Dishwasher](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/dish-washer/)
- [Dryer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/dryer/)
- [Home Brew](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/home-brew/)
- [Hood](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/hood/)
- [Kimchi Refrigerator](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/kimchi-refrigerator/)
- [Microwave Oven](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/microwave-oven/)
- [Oven](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/oven/)
- [Plant Cultivator](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/plant-cultivator/)
- [Refrigerator](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/refrigerator/)
- [Robot Cleaner](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/robot-cleaner/)
- [Stick Cleaner](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Stick-Cleaner/)
- [Styler](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/styler/)
- [System Boiler](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/system-boiler/)
- [Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/)
- [Water Heater](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/water-heater/)
- [Water Purifier](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/water-purifier/)
- [Wine Cellar](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/wine-cellar/)
{% note %}
Air Purifier Fan, Washtower Dryer, Washtower Washer, Humidifier, Washcombo Main and Washcombo Mini are also supported.
{% endnote %}

## Platforms

LG ThinQ represents devices as a set of [profiles](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/refrigerator/). And these are mapped to entities in Home Assistant.

A list of all Entity Platforms provided by LG ThinQ Integration:

- [Binary sensor](#binary-sensor)
- [Switch](#switch)

### Binary sensor

A read-only property which has only two states that can be toggled is represented as a binary sensor platform.

| Device | Property |
| ------ | -------- |
| [Cooktop](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Cooktop/)<br>[Dryer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Dryer/)<br>[Oven](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Oven/)<br>[Styler](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/styler/)<br>Washcombo Main<br>Washcombo Mini<br>[Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/washer/)<br>[Washtower Dryer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Dryer/)<br>[Washtower](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Single-Unit/)<br>[Washtower Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/WashTower-Washer/)<br> | Enable remote control |
| [Dish Washer](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/dish-washer/) | Rinse refill needed |
| [Refrigerator](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/refrigerator/) | Eco-friendly mode |
| | Power saving mode  |
| | Enable Sabbath mode |
| [Wine Cellar](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Wine-Cellar/) | Enable Sabbath mode |

### Switch

A read-wirte property which has only two states that can be toggled is represensted as a switch platform.

| Device | Property |
| ------ | -------- |
| [Air Purifier Fan](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/Air-Purifier-Fan/) | Fan operation mode |
| [Air Purifier](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/air-purifier/) | Air purifier operation mode |
| [Dehumidifier](https://thinq.developer.lge.com/en/cloud/docs/thinq-connect/device-profile/dehumidifier/) | Dehumidifier operation mode |
| Humidifier | Humidifier operation mode |

## Troubleshooting

### Setup

#### Aborted: The token is not valid

This error occurs when the Personal Access Token (PAT) is invalid or entered incorrectly. Please visit the [Personal Access Token Page](https://d1jykc6oogauei.cloudfront.net/) page to check if your token is valid.

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

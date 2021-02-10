---
title: Freedompro
description: Instructions for how to integrate Freedompro accessories within Home Assistant.
ha_category:
  - Sensor
  - Binary Sensor
  - Climate
  - Light
  - Fan
  - Lock
  - Cover
  - Switch
featured: true
ha_release: 2021.3
ha_iot_class: Cloud Poll
ha_config_flow: true
ha_codeowners:
  - '@stefano055415'
ha_domain: freedompro
---


[Freedompro](https://freedompro.eu/), a company specialized in home automation, designs and manufactures products to make domotics affordable for everyone, installers and enthusiasts. [Freedompro Products](https://freedompro.eu/collections/easykon) are designed to be easy to use and practical and fast to install.

This integration lets you control all [Freedompro](https://freedompro.eu/) accessories.

The list of Freedompro accessories mapped is the following:

| Freedompro accessory | Home Assistant Category |
|:--------------------:|:-----------------------:|
| Temperature Sensor   |        Sensor           |
| Humidity Sensor      |        Sensor           |
| Light Sensor         |        Sensor           |
| Smoke Sensor         |    Binary sensor        |
| Occupancy Sensor     |    Binary sensor        |
| Motion Sensor        |    Binary sensor        |
| Contact Sensor       |    Binary sensor        |
| Thermostat           |        Climate          |
| Window Covering      |        Cover            |
| Gate                 |        Cover            |
| Garage Door          |        Cover            |
| Door                 |        Cover            |
| Window               |        Cover            |
| Fan                  |        Fan              |
| Light                |        Lightbulb        |
| Lock                 |        Lock             |
| Switch               |        Switch           |
| Switch               |        Outlet           |

<div class='note'>
Make sure you have at least one accessory paired with the Freedompro Cloud before starting integration.
Check that the device has been correctly configured.  
</div>

## Preliminary Steps

You will need to obtain an API key from [Freedompro Cloud](https://home.freedompro.eu/) to use this integration.

1. Login to [Freedompro Cloud](https://home.freedompro.eu/).
2. Click on your photo profile.
3. Generate the API key,



## Configuration

1. In the **Configuration** > **Integrations** menu, click **+** and then select "freedompro" from the pop-up menu.
2. In the pop-up box, enter the API key you obtained from [Freedompro Cloud](https://home.freedompro.eu/).

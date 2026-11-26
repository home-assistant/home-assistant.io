---
title: Electrolux
description: Instructions on how to set up the Electrolux official integration within Home Assistant.
ha_release: 2026.12
ha_iot_class: Cloud Push
ha_codeowners:
  - '@electrolux-oss'
ha_domain: electrolux
ha_integration_type: hub
ha_config_flow: true
ha_categories:
  - appliances_cleaning
  - climate
ha_platforms:
  - binary_sensor
  - button
  - climate
  - fan
  - humidifier
  - light
  - number
  - select
  - sensor
  - switch
  - vacuum
ha_quality_scale: bronze
related:
  - url: https://developer.electrolux.one/documentation
    title: Electrolux Group for Developers documentation
---

The **Electrolux** {% term integration %} lets you connect and control your home appliances through the [official third-party API](https://developer.electrolux.one).

[Electrolux Group](https://www.electroluxgroup.com/) is a global appliance manufacturer that designs and produces solutions for taste, care, and wellbeing experiences. The company develops and sells products under several consumer brands, including **Electrolux**, **AEG**, and **Frigidaire**.

## Use cases

- Get a notification when the dishwasher or washing machine finishes.
- Start the robot vacuum when everyone leaves the house.
- Turn on the air purifier when the PM2.5 level rises.

## Supported devices

The integration supports the following appliance types:

- Dishwasher
- Washer dryer
- Washing machine
- Dryer
- Refrigerator
- Hob
- Hood
- Oven
- Air purifier
- Air conditioner
- Dehumidifier
- Robot vacuum cleaner

## Prerequisites

1. Log in to the [Electrolux Group for Developers](https://developer.electrolux.one/login) site using the same account you use in the Electrolux Group mobile apps.
2. Go to the **Dashboard**.
3. Create a new **API key**.
4. Generate the **Access Token** and **Refresh Token**.

After you have these credentials, you can use them to set up the Electrolux integration in Home Assistant.

{% include integrations/config_flow.md %}

Enter the following:
{% configuration_basic %}
API key:
    description: "Your developer API key from Electrolux Group for Developers."
Access token:
    description: "The access token provided by Electrolux Group for Developers to access your devices."
Refresh token:
    description: "The refresh token used to renew your access token."
{% endconfiguration_basic %}

## Reconfiguring the integration

If you need to replace your API key or tokens, you can reconfigure the integration without removing it.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Electrolux**.
2. Next to the entry, select the three dots {% icon "mdi:dots-vertical" %} menu, then select **Reconfigure**.
3. On the [Electrolux Group for Developers](https://developer.electrolux.one/generateToken) site, generate a new access token and refresh token.
4. Enter your **API key**, **Access token**, and **Refresh token**, then select **Submit**.

If your tokens stop working, Home Assistant asks you to reauthenticate.
You enter the new credentials the same way.

## Supported functionality

The **Electrolux** integration provides the following entities.

{% note %}
Entity availability depends on the appliance type and model. Some entities may not be supported by certain appliances and could appear as unavailable or not appear at all.
{% endnote %}

### Binary sensor

- **Connection state**
  - **Description**: Reports if the appliance is connected to the network.
  - **Available for appliance types**: All appliances.
- **Drawer status**
  - **Description**: Shows if the drawer of the appliance is open or closed.
  - **Available for appliance types**: Hood.
- **Auto switch off event**
  - **Description**: The Auto Switch Off event indicates when the appliance can be automatically turned off.
  - **Available for appliance types**: Hood.
- **Charcoal filter**
  - **Description**: Reports if charcoal filter is active.
  - **Available for appliance types**: Hood.
- **Zone 1 pot detected**, **Zone 2 pot detected**, and so on
  - **Description**: Detects if there is a pot on the zone. There is one sensor for each zone.
  - **Available for appliance types**: Hob.
- **Door state**
  - **Description**: Reports whether the door is open or closed.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher.
  - **Remarks**: On double ovens, there is a sensor for each cavity: **Upper door state** and **Lower door state**.
- **Fridge door**, **Freezer door**, and **Extra cavity door**
  - **Description**: Reports whether the door of each compartment is open or closed.
  - **Available for appliance types**: Refrigerator.
- **UI lock mode**
  - **Description**: Reports if the user interface is locked.
  - **Available for appliance types**: Washing machine, Dryer, Washer dryer, Dishwasher, Refrigerator, Hob.
- **Food probe state**
  - **Description**: Reports whether the food probe is inserted or not.
  - **Available for appliance types**: Oven.
  - **Remarks**: On double ovens, there is a sensor for each cavity: **Upper food probe state** and **Lower food probe state**.

### Button

This entity is used to control the appliance with the following actions:

- **Appliance start**
  - **Description**: Begin operation.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher.
  - **Remarks**: On double ovens, there are buttons for each cavity: **Upper oven start** and **Lower oven start**.
- **Appliance pause**
  - **Description**: Temporarily pause operation.
  - **Available for appliance types**: Washing machine, Dryer, Washer dryer, Dishwasher.
- **Appliance resume**
  - **Description**: Continue a paused operation.
  - **Available for appliance types**: Washing machine, Dryer, Washer dryer, Dishwasher.
- **Appliance stop**
  - **Description**: Stop the appliance.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher.
  - **Remarks**: On double ovens, there are buttons for each cavity: **Upper oven stop** and **Lower oven stop**.

### Climate

Air conditioners are added as a climate entity.
You can change the mode, set the target temperature, turn the air conditioner on or off, adjust the fan speed, and read the current temperature.

### Fan

- **Fan**
  - **Description**: Allows turning on and off the air purifier, setting the fan speed, and setting the work mode of the air purifier.
  - **Available for appliance types**: Air purifier.

### Humidifier

Dehumidifiers are added as a humidifier entity.
You can change the operating mode, set the target humidity, read the current humidity, and turn the dehumidifier on or off.

### Light

- **Cavity light**
  - **Description**: Turn the cavity light on or off.
  - **Available for appliance types**: Oven.
  - **Remarks**: On double ovens, there is a light for each cavity: **Upper cavity light** and **Lower cavity light**.
- **Light**
  - **Description**: Turn the hood light on or off, and change its color temperature and brightness.
  - **Available for appliance types**: Hood.

### Number

- **Target temperature**
  - **Description**: Set or report the target temperature.
  - **Available for appliance types**: Oven.
  - **Remarks**: On double ovens, there is a number for each cavity: **Upper cavity target temperature** and **Lower cavity target temperature**.
- **Fridge target temperature** and **Freezer target temperature**
  - **Description**: Set or report the target temperature of the fridge or freezer compartment.
  - **Available for appliance types**: Refrigerator.

### Select

- **Temperature**
  - **Description**: Used to select or report the analog temperature setting.
  - **Available for appliance types**: Washing machine, Washer dryer.
- **Spin speed**
  - **Description**: Used to select or report the spin speed.
  - **Available for appliance types**: Washing machine, Washer dryer.
- **Program**
  - **Description**: Used to select or report the program.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher.
- **Lower cavity program**
  - **Description**: Used to select or report the program of the lower cavity on double ovens.
  - **Available for appliance types**: Oven.
- **Upper cavity program**
  - **Description**: Used to select or report the program of the upper cavity on double ovens.
  - **Available for appliance types**: Oven.
- **Fan level**
  - **Description**: Used to select the fan level, allowing to turn off the fan entirely.
  - **Available for appliance types**: Hob, Hood.
- **Hood state**
  - **Description**: Used to select or report the current state of the hood.
  - **Available for appliance types**: Hob.
- **Sound tone**
  - **Description**: Used to select the sound tone.
  - **Available for appliance types**: Hob.
- **Fan speed**
  - **Description**: Used to select the fan speed; cannot be used to turn off the fan.
  - **Available for appliance types**: Dehumidifier.

### Sensor

- **Air filter state**
  - **Description**: Reports air filter status.
  - **Available for appliance types**: Refrigerator.
- **Appliance state**
  - **Description**: Reports the current appliance state.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher, Hood, Hob.
  - **Remarks**: On double ovens, there is a sensor for each cavity: **Upper cavity appliance state** and **Lower cavity appliance state**.
- **Fridge appliance state**, **Freezer appliance state**, **Ice maker appliance state**, and **Extra cavity appliance state**
  - **Description**: Reports the current state of each compartment.
  - **Available for appliance types**: Refrigerator.
- **Battery**
  - **Description**: Reports the battery level.
  - **Available for appliance types**: Robot vacuum cleaner.
- **Current temperature**
  - **Description**: Reports the current cavity temperature.
  - **Available for appliance types**: Oven.
  - **Remarks**: On double ovens, there is a sensor for each cavity: **Upper cavity current temperature** and **Lower cavity current temperature**.
- **Cycle phase**
  - **Description**: Reports the current wash/dry cycle phase.
  - **Available for appliance types**: Washing machine, Dryer, Washer dryer, Dishwasher.
- **End at**
  - **Description**: Reports when the appliance will stop running.
  - **Available for appliance types**: Washing machine, Dryer, Washer dryer, Dishwasher.
  - **Remarks**: Disabled by default.
- **Extra cavity target temperature**
  - **Description**: Reports the target temperature of the extra cavity (flexible drawer).
  - **Available for appliance types**: Refrigerator.
- **Food probe temperature**
  - **Description**: Reports food probe temperature.
  - **Available for appliance types**: Oven.
  - **Remarks**: On double ovens, there is a sensor for each cavity: **Upper food probe temperature** and **Lower food probe temperature**.
- **PM1**
  - **Description**: Reports concentration of fine particles 1 µm or smaller.
  - **Available for appliance types**: Air purifier.
- **PM2.5**
  - **Description**: Reports concentration of fine particles 2.5 µm or smaller.
  - **Available for appliance types**: Air purifier.
- **PM10**
  - **Description**: Reports concentration of particles 10 µm or smaller.
  - **Available for appliance types**: Air purifier.
- **Remote control**
  - **Description**: Reports the remote control status.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher, Hood, Hob.
- **Zone 1 residual heat state**, **Zone 2 residual heat state**, and so on
  - **Description**: Reports residual heat in the zone. There is one sensor for each zone.
  - **Available for appliance types**: Hob.
- **Running time**
  - **Description**: Reports the amount of time the appliance has been running for.
  - **Available for appliance types**: Oven.
  - **Remarks**: Disabled by default. Shown in hours by default. On double ovens, there is a sensor for each cavity: **Upper cavity running time** and **Lower cavity running time**.
- **Start at**
  - **Description**: Reports when the appliance will start running.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher.
  - **Remarks**: Disabled by default. On double ovens, there is a sensor for each cavity: **Upper cavity start at** and **Lower cavity start at**.
- **Time left**
  - **Description**: Reports the amount of time left until the appliance stops running.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher.
  - **Remarks**: Disabled by default. Shown in hours by default. On double ovens, there is a sensor for each cavity: **Upper cavity time left** and **Lower cavity time left**.
- **TVOC**
  - **Description**: Reports total volatile organic compounds.
  - **Available for appliance types**: Air purifier.
- **Water filter state**
  - **Description**: Reports water filter status.
  - **Available for appliance types**: Refrigerator.
- **Window notification**
  - **Description**: Reports if a window needs to be opened.
  - **Available for appliance types**: Hob.

### Switch

- **Child lock**
  - **Description**: Enables the child lock function. This switch cannot be turned off remotely.
  - **Available for appliance types**: Hob.

### Vacuum

This entity lets you control Electrolux Group robot vacuum cleaners. You can start, stop, and pause cleaning, send the vacuum back to its charging dock, change the fan speed, and see the vacuum's current state.

On Pure i series (PUREi9), 700 (Gordias), and 800 (Cybele) robot vacuums, you can also clean specific areas.

## Data updates

The integration receives updates from the Electrolux cloud as soon as they happen.
Each time Home Assistant connects to the Electrolux cloud, for example after a restart, it adds new appliances from your account.
It also removes devices for appliances that are no longer in your account.

## Known limitations

- The Electrolux Group third-party API does not provide full parity with the mobile app. Some options or settings available in the app may be unavailable or limited in Home Assistant.

## Removing the integration

{% include integrations/remove_device_service.md %}

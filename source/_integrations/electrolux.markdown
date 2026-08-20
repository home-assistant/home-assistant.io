---
title: Electrolux
description: Instructions on how to set up the Electrolux official integration within Home Assistant.
ha_release: 2026.6
ha_iot_class: Cloud Push
ha_codeowners:
  - '@electrolux-oss'
ha_domain: electrolux
ha_integration_type: hub
ha_config_flow: true
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Fan
  - Light
  - Number
  - Sensor
ha_platforms:
  - binary_sensor
  - button
  - climate
  - fan
  - light
  - Number
  - sensor
ha_quality_scale: bronze
related:
  - url: https://developer.electrolux.one/documentation
    title: Electrolux Group for Developers documentation
---

The **Electrolux** {% term integrations %} lets you connect and control your home appliances via the [official third-party API](https://developer.electrolux.one).

[Electrolux Group](https://www.electroluxgroup.com/) is a global appliance manufacturer that designs and produces solutions for taste, care, and wellbeing experiences. The company develops and sells products under several consumer brands, including **Electrolux**, **AEG**, and **Frigidaire**.

## Use cases

- Monitor multiple sensors of Electrolux Group appliances and trigger automations based on sensor data.
- Track the status of the appliances.

{% note %}
Note that feature availability may vary depending on the appliance model.
{% endnote %}

## Supported devices

The integration supports the following appliance types:

- **Dishwasher**
- **Washer Dryer**
- **Washing Machine**
- **Dryer**
- **Refrigerator**
- **Hob**
- **Hood**
- **Oven**
- **Air Purifier**
- **Air Conditioners**

## Prerequisites

1. Log in to the [Electrolux Group for Developers](https://developer.electrolux.one/login) site using the same account you use in the Electrolux Group mobile apps.
2. Navigate to the **Dashboard**.
3. Create a new **API key**.
4. Generate the **Access Token** and **Refresh Token**.

Once these credentials are obtained, you can use them to configure the Electrolux integration in Home Assistant.

{% include integrations/config_flow.md %}

Enter the following:
{% configuration_basic %}
API key:
    description: "Your developer API key from Electrolux Group for Developers."
Access Token:
    description: "The access token provided by Electrolux Group for Developers to access your devices."
Refresh Token:
    description: "The refresh token used to renew your access token."
{% endconfiguration_basic %}

## Supported functionality

The **Electrolux** integration provides the following entities.

{% note %}
Entity availability depends on the appliance type and model. Some entities may not be supported by certain appliances and could appear as unavailable or not appear at all.
{% endnote %}

### Binary sensors

{% details "List of binary sensors" %}

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
- **Pot detected**
  - **Description**: Detects pot presence on zone.
  - **Available for appliance types**: Hob.
- **Door state**
  - **Description**: Reports whether the door is open or closed.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher, Refrigerator.
- **UI lock mode**
  - **Description**: Reports if the user interface is locked.
  - **Available for appliance types**: Washing machine, Dryer, Washer dryer, Dishwasher, Refrigerator, Hob.

{% enddetails %}

### Button

{% details "List of button entities" %}

This entity is used to control the appliance with the following actions:

- **Start**
  - **Description**: Begin operation.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher.
- **Pause**
  - **Description**: Temporarily pause operation.
  - **Available for appliance types**: Washing machine, Dryer, Washer dryer, Dishwasher.
- **Resume**
  - **Description**: Continue a paused operation.
  - **Available for appliance types**: Washing machine, Dryer, Washer dryer, Dishwasher.
- **Stop**
  - **Description**: Stop the appliance.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher.

{% enddetails %}

### Climate

{% details "List of climate entities" %}

- **Air Conditioner climate**
  - **Description**: Allows controlling and reporting the appliance’s climate-related functions, such as changing the mode, setting the target temperature, turning the appliance on or off, adjusting the fan speed, and reading the current temperature.
  - **Available for appliance types**: Air Conditioner.

{% enddetails %}

### Fan

{% details "List of fan entities" %}

- **Air Purifier fan**
  - **Description**: Allows turning on and off the air purifier, setting the fan speed, and setting the work mode of the air purifier.
  - **Available for appliance types**: Air Purifier.

{% enddetails %}

### Light

{% details "List of light entities" %}

- **Cavity light**
  - **Description**: Turn the cavity light on or off.
  - **Available for appliance types**: Oven.
- **Hood light**
  - **Description**: Turn the overhead light on or off, and change the light's color and intensity.
  - **Available for appliance types**: Hood.

{% enddetails %}

### Numbers

{% details "List of number entities" %}

- **Target Temperature**
  - **Description**: Set or report the target temperature.
  - **Available for appliance types**: Oven, Fridge.

{% enddetails %}

### Sensors

{% details "List of sensors" %}

- **Appliance state**
  - **Description**: Reports the current appliance state.
  - **Available for appliance types**: Oven.
- **Current temperature**
  - **Description**: Reports the current cavity temperature.
  - **Available for appliance types**: Oven.
- **Food probe state**
  - **Description**: Reports the food probe state.
  - **Available for appliance types**: Oven.
- **Food probe temperature**
  - **Description**:  Reports food probe temperature.
  - **Available for appliance types**: Oven.
- **Remote control**
  - **Description**: Reports the remote control status.
  - **Available for appliance types**: Oven.

{% enddetails %}

## Known limitations

- The Electrolux Group third-party API does not provide full parity with the mobile app. Some options, or settings available in the app may be unavailable or limited when from Home Assistant.

## Removing the integration

{% include integrations/remove_device_service.md %}

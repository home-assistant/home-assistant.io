---
title: Whirlpool Appliances
description: Instructions on how to integrate Whirlpool appliances with Home Assistant.
ha_category:
  - Climate
  - Hub
ha_release: '2022.10'
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@abmantis'
  - '@mkmer'
ha_domain: whirlpool
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Whirlpool Appliances** {% term integration %} allows you to connect Whirlpool and Maytag appliances to Home Assistant.

## Supported devices

The following appliances are confirmed to be working, but other models may also work.

Air conditioners:

- Whirlpool SPIW309A2WF
- Whirlpool SPIW312A2WF
- Whirlpool SPIW409A2WF

Washers:

- Whirlpool WTW6120HW2
- Whirlpool WTW8127LW1
- Maytag MHW8630HW0

Dryers:

- Whirlpool WGD8127LW3

## Prerequisites

- Valid Whirlpool (or related brand) account credentials.
- Registered appliances in the official Whirlpool (or related brand) mobile app.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
    description: "The username of your Whirlpool (or related brand) account."
Password:
    description: "The password of your Whirlpool (or related brand) account."
Region:
    description: "The region in which your account is registered."
Brand:
    description: "The brand of the mobile app. It may not be the same brand as the appliances."
{% endconfiguration_basic %}

## Supported functionality

This {% term integration %} maps appliances to entities in Home Assistant. A single appliance may be represented by one or more entities.

- [Binary Sensor](#binary_sensor)
- [Climate](#climate)
- [Sensor](#sensor)

### Binary Sensor

The binary sensor platform provides the following functionality:

- state of the washer/dryer machine door (open/closed)

### Climate

The `whirlpool` climate platform integrates Whirlpool air conditioning systems into Home Assistant, allowing control of the appliance through the user interface. The current inside temperature is also displayed on the thermostat card.

The following actions are also available:

- [**set_hvac_mode**](/integrations/climate/#action-climateset_hvac_mode) (`off`, `heat`, `cool`, `fan_only`)
- [**target temperature**](/integrations/climate#action-climateset_temperature)
- [**turn on/off**](/integrations/climate#action-climateturn_on)
- [**fan mode**](/integrations/climate#action-climateset_fan_mode) (`low`, `medium`, `high`)
- [**swing mode**](/integrations/climate#action-climateset_swing_mode) (`off`, `horizontal`)

### Sensor

The `whirlpool` sensor platform integrates Whirlpool Washer and Dryer systems into Home Assistant, allowing views of the machine state, time remaining, and the "wash & go" tank fill status as sensors for each device.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
